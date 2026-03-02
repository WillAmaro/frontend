'use client'
import { useState, useEffect, useCallback, useRef } from "react";
import { useBarcodeScanner, ScanResult } from "./useBarcodeScanner";

// ─── SOUND ENGINE ─────────────────────────────────────────────────────────────
// Web Audio API — sin dependencias externas, funciona en cualquier browser moderno

function createAudioContext(): AudioContext | null {
  try {
    return new (window.AudioContext || (window as any).webkitAudioContext)();
  } catch {
    return null;
  }
}

function playBeep(
  ctx: AudioContext,
  frequency: number,
  duration: number,
  type: OscillatorType = "sine",
  gainValue = 0.3
) {
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

  gainNode.gain.setValueAtTime(gainValue, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + duration);
}

function soundSuccess(ctx: AudioContext) {
  // Dos tonos ascendentes — scan exitoso
  playBeep(ctx, 880, 0.08, "square", 0.25);
  setTimeout(() => playBeep(ctx, 1320, 0.12, "square", 0.2), 90);
}

function soundDuplicate(ctx: AudioContext) {
  // Tono medio sostenido — advertencia
  playBeep(ctx, 440, 0.15, "triangle", 0.3);
  setTimeout(() => playBeep(ctx, 440, 0.15, "triangle", 0.25), 200);
}

function soundError(ctx: AudioContext) {
  // Tres tonos descendentes — error
  playBeep(ctx, 400, 0.1, "sawtooth", 0.3);
  setTimeout(() => playBeep(ctx, 300, 0.1, "sawtooth", 0.25), 120);
  setTimeout(() => playBeep(ctx, 200, 0.15, "sawtooth", 0.2), 240);
}

// ─── TYPES ────────────────────────────────────────────────────────────────────

type ScanMode = "ENTRADA" | "SALIDA" | "INVENTARIO" | "VERIFICACION";

const MODE_CONFIG: Record<ScanMode, { label: string; color: string; bg: string; accent: string; icon: string }> = {
  ENTRADA: { label: "Entrada Hub", color: "#006B52", bg: "#E6F4EF", accent: "#00A87F", icon: "↓" },
  SALIDA: { label: "Salida / Despacho", color: "#B84A08", bg: "#FDF0E6", accent: "#E86A20", icon: "↑" },
  INVENTARIO: { label: "Toma de Inventario", color: "#1843A8", bg: "#EBF0FB", accent: "#3A6AE0", icon: "◎" },
  VERIFICACION: { label: "Verificación", color: "#5C1AA8", bg: "#F3EEFF", accent: "#8B45E0", icon: "✓" },
};

// ─── FLASH OVERLAY ────────────────────────────────────────────────────────────

function FlashOverlay({ status }: { status: "success" | "duplicate" | "error" | null }) {
  if (!status) return null;
  const colors = {
    success: "rgba(0, 168, 127, 0.12)",
    duplicate: "rgba(184, 74, 8, 0.12)",
    error: "rgba(168, 24, 24, 0.12)",
  };
  return (
    <div style={{
      position: "fixed", inset: 0, pointerEvents: "none", zIndex: 50,
      background: colors[status],
      animation: "flashFade 0.5s ease-out forwards",
    }} />
  );
}

// ─── SCAN ITEM ────────────────────────────────────────────────────────────────

function ScanItem({
  item,
  index,
  mode,
  onRemove,
}: {
  item: ScanResult;
  index: number;
  mode: ScanMode;
  onRemove: (value: string) => void;
}) {
  const mc = MODE_CONFIG[mode];
  const time = item.timestamp.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "10px 16px", borderRadius: 8,
      background: index === 0 ? mc.bg : "#FFFFFF",
      border: `1px solid ${index === 0 ? mc.color + "40" : "#E5E0D8"}`,
      borderLeft: `3px solid ${mc.color}`,
      transition: "all 0.2s",
      animation: index === 0 ? "slideIn 0.25s ease-out" : "none",
    }}>
      <span style={{ fontSize: 11, color: "#9B958E", fontFamily: "'JetBrains Mono', monospace", minWidth: 20, textAlign: "right" }}>
        {index + 1}
      </span>
      <span style={{ fontSize: 13, fontWeight: 700, color: "#1A1714", fontFamily: "'JetBrains Mono', monospace", flex: 1 }}>
        {item.value}
      </span>
      <span style={{ fontSize: 10, color: "#9B958E", fontFamily: "'JetBrains Mono', monospace" }}>{time}</span>
      <button onClick={() => onRemove(item.value)} style={{
        width: 24, height: 24, borderRadius: "50%", border: "none",
        background: "transparent", cursor: "pointer", color: "#9B958E",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 14, lineHeight: 1, transition: "all 0.15s",
      }}
        onMouseEnter={e => { (e.target as HTMLButtonElement).style.background = "#FEF2F2"; (e.target as HTMLButtonElement).style.color = "#A81818"; }}
        onMouseLeave={e => { (e.target as HTMLButtonElement).style.background = "transparent"; (e.target as HTMLButtonElement).style.color = "#9B958E"; }}
      >×</button>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function BarcodeScannerScreen() {
  const [mode, setMode] = useState<ScanMode>("INVENTARIO");
  const [flash, setFlash] = useState<"success" | "duplicate" | "error" | null>(null);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [lastError, setLastError] = useState<string | null>(null);
  const mc = MODE_CONFIG[mode];

  // Inicializar AudioContext en primer click (requisito de browsers modernos)
  const initAudio = useCallback(() => {
    if (!audioCtx) {
      const ctx = createAudioContext();
      setAudioCtx(ctx);
    }
  }, [audioCtx]);

  const triggerFlash = useCallback((status: "success" | "duplicate" | "error") => {
    setFlash(status);
    setTimeout(() => setFlash(null), 500);
  }, []);

  const { lastScan, scannedItems, isListening, currentBuffer, startListening, stopListening, clearHistory, removeScan, toggleDuplicateCheck, allowDuplicates } = useBarcodeScanner({
    scannerThresholdMs: 80,
    minLength: 4,
    maxLength: 60,
    allowDuplicates: false,
    ignoreWhenInputFocused: false,
    onScan: (result:any) => {
      triggerFlash("success");
      setLastError(null);
      if (audioEnabled && audioCtx) soundSuccess(audioCtx);
    },
    onDuplicate: (value:any) => {
      triggerFlash("duplicate");
      setLastError(`⚠ Serial duplicado: ${value}`);
      if (audioEnabled && audioCtx) soundDuplicate(audioCtx);
    },
    onError: (raw:any, reason:any) => {
      triggerFlash("error");
      setLastError(`✕ Error: ${reason} ("${raw}")`);
      if (audioEnabled && audioCtx) soundError(audioCtx);
    },
  });

  // Auto-iniciar al montar
  useEffect(() => {
    startListening();
    return () => stopListening();
  }, []);

  // Limpiar error después de un momento
  useEffect(() => {
    if (lastError) {
      const t = setTimeout(() => setLastError(null), 3000);
      return () => clearTimeout(t);
    }
  }, [lastError]);

  const handleToggle = () => {
    if (isListening) stopListening();
    else startListening();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #F0EDE6; font-family: 'Sora', sans-serif; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #CEC9BF; border-radius: 3px; }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes flashFade {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.96); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      <FlashOverlay status={flash} />

      <div style={{ minHeight: "100vh", background: "#F0EDE6", display: "flex", flexDirection: "column" }}>

        {/* ── TOP BAR ── */}
        <div style={{
          background: "#1A1714", padding: "0 24px", height: 56,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 4, height: 20, background: mc.accent, borderRadius: 2 }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: "#fff", letterSpacing: -0.2 }}>LPS Logística</span>
            <span style={{ fontSize: 10, color: "#5C5650", fontFamily: "'JetBrains Mono', monospace" }}>/ Scanner</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Audio toggle */}
            <button
              onClick={() => { initAudio(); setAudioEnabled(p => !p); }}
              style={{
                padding: "5px 12px", borderRadius: 6, border: "1px solid #2E2A26",
                background: audioEnabled ? "#2E2A26" : "transparent",
                color: audioEnabled ? "#fff" : "#5C5650",
                cursor: "pointer", fontSize: 11, fontWeight: 600,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >{audioEnabled ? "🔊 Sonido ON" : "🔇 Sonido OFF"}</button>

            {/* Duplicate toggle */}
            <button
              onClick={toggleDuplicateCheck}
              style={{
                padding: "5px 12px", borderRadius: 6, border: "1px solid #2E2A26",
                background: allowDuplicates ? "#2E2A26" : "transparent",
                color: allowDuplicates ? "#FFA040" : "#5C5650",
                cursor: "pointer", fontSize: 11, fontWeight: 600,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >{allowDuplicates ? "Dupl: ON" : "Dupl: OFF"}</button>

            {/* Count badge */}
            <div style={{
              padding: "4px 12px", borderRadius: 20,
              background: scannedItems.length > 0 ? mc.accent : "#2E2A26",
              color: "#fff", fontSize: 12, fontWeight: 700,
              fontFamily: "'JetBrains Mono', monospace",
            }}>{scannedItems.length} items</div>
          </div>
        </div>

        <div style={{ display: "flex", flex: 1, gap: 0, overflow: "hidden" }}>

          {/* ── LEFT: SCANNER AREA ── */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "24px", gap: 16 }}>

            {/* Mode selector */}
            <div style={{ display: "flex", gap: 8 }}>
              {(Object.keys(MODE_CONFIG) as ScanMode[]).map(m => {
                const cfg = MODE_CONFIG[m];
                const active = mode === m;
                return (
                  <button key={m} onClick={() => setMode(m)} style={{
                    flex: 1, padding: "10px 8px", borderRadius: 8,
                    border: `2px solid ${active ? cfg.color : "transparent"}`,
                    background: active ? cfg.bg : "#fff",
                    cursor: "pointer", transition: "all 0.15s",
                  }}>
                    <div style={{ fontSize: 18, marginBottom: 3 }}>{cfg.icon}</div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: active ? cfg.color : "#9B958E", letterSpacing: 0.5 }}>{cfg.label}</div>
                  </button>
                );
              })}
            </div>

            {/* ── MAIN SCAN DISPLAY ── */}
            <div
              onClick={initAudio}
              style={{
                flex: 1, borderRadius: 16, background: isListening ? mc.bg : "#f5f3f0",
                border: `2px solid ${isListening ? mc.color + "50" : "#E5E0D8"}`,
                display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center", gap: 20, cursor: "pointer",
                transition: "all 0.3s", position: "relative", overflow: "hidden",
                minHeight: 280,
              }}
            >
              {/* Animated ring when listening */}
              {isListening && (
                <div style={{
                  position: "absolute",
                  width: 200, height: 200,
                  borderRadius: "50%",
                  border: `2px solid ${mc.color}20`,
                  animation: "pulse 2s ease-in-out infinite",
                }} />
              )}

              {/* Scanner icon */}
              <div style={{
                width: 80, height: 80, borderRadius: "50%",
                background: isListening ? mc.color : "#E5E0D8",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 32, boxShadow: isListening ? `0 8px 32px ${mc.color}40` : "none",
                transition: "all 0.3s",
              }}>
                {isListening ? "📡" : "📵"}
              </div>

              {/* Status text */}
              <div style={{ textAlign: "center" }}>
                <div style={{
                  fontSize: 18, fontWeight: 700,
                  color: isListening ? mc.color : "#9B958E",
                  marginBottom: 6,
                }}>
                  {isListening ? "Escuchando..." : "Detenido"}
                </div>
                <div style={{ fontSize: 12, color: "#9B958E" }}>
                  {isListening
                    ? "Apunta la pistola y escanea cualquier código de barras"
                    : "Haz clic en Iniciar para comenzar a escanear"}
                </div>
              </div>

              {/* Buffer display — muestra los chars mientras entran */}
              {currentBuffer && (
                <div style={{
                  padding: "8px 20px", borderRadius: 8,
                  background: "rgba(0,0,0,0.06)",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 16, color: mc.color, fontWeight: 700, letterSpacing: 2,
                }}>
                  {currentBuffer}
                  <span style={{ animation: "blink 0.8s infinite" }}>|</span>
                </div>
              )}

              {/* Last scan result */}
              {lastScan && (
                <div style={{
                  padding: "12px 24px", borderRadius: 10, textAlign: "center",
                  background: lastScan.status === "success" ? mc.bg
                    : lastScan.status === "duplicate" ? "#FDF0E6"
                      : "#FEF2F2",
                  border: `1px solid ${lastScan.status === "success" ? mc.color + "50"
                    : lastScan.status === "duplicate" ? "#B84A0850"
                      : "#A8181850"}`,
                  animation: "slideIn 0.2s ease-out",
                }}>
                  <div style={{
                    fontSize: 11, fontWeight: 700, marginBottom: 4, letterSpacing: 1,
                    fontFamily: "'JetBrains Mono', monospace",
                    color: lastScan.status === "success" ? mc.color
                      : lastScan.status === "duplicate" ? "#B84A08"
                        : "#A81818",
                  }}>
                    {lastScan.status === "success" ? "✓ ESCANEADO" : lastScan.status === "duplicate" ? "⚠ DUPLICADO" : "✕ ERROR"}
                  </div>
                  <div style={{
                    fontSize: 18, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace",
                    color: "#1A1714",
                  }}>{lastScan.value}</div>
                </div>
              )}

              {/* Error message */}
              {lastError && (
                <div style={{
                  padding: "8px 16px", borderRadius: 7,
                  background: "#FEF2F2", border: "1px solid #A8181830",
                  fontSize: 12, color: "#A81818", fontFamily: "'JetBrains Mono', monospace",
                  animation: "slideIn 0.2s ease-out",
                }}>{lastError}</div>
              )}
            </div>

            {/* Controls */}
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => { initAudio(); handleToggle(); }}
                style={{
                  flex: 2, padding: "14px", borderRadius: 10, border: "none",
                  background: isListening ? "#1A1714" : mc.color,
                  color: "#fff", cursor: "pointer",
                  fontSize: 14, fontWeight: 700, transition: "all 0.2s",
                  boxShadow: isListening ? "none" : `0 4px 16px ${mc.color}50`,
                }}
              >{isListening ? "⏹ Detener" : `▶ Iniciar — ${mc.label}`}</button>

              <button
                onClick={() => { clearHistory(); setLastError(null); }}
                disabled={scannedItems.length === 0}
                style={{
                  flex: 1, padding: "14px", borderRadius: 10,
                  border: "1px solid #E5E0D8", background: "#fff",
                  color: scannedItems.length > 0 ? "#A81818" : "#9B958E",
                  cursor: scannedItems.length > 0 ? "pointer" : "not-allowed",
                  fontSize: 13, fontWeight: 600, transition: "all 0.15s",
                }}
              >🗑 Limpiar</button>
            </div>
          </div>

          {/* ── RIGHT: HISTORY ── */}
          <div style={{
            width: 360, background: "#fff", borderLeft: "1px solid #E5E0D8",
            display: "flex", flexDirection: "column",
          }}>
            {/* Header */}
            <div style={{
              padding: "16px 20px", borderBottom: "1px solid #E5E0D8",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1A1714" }}>Historial de Scan</div>
                <div style={{ fontSize: 10, color: "#9B958E", fontFamily: "'JetBrains Mono', monospace", marginTop: 2 }}>
                  {mc.label} · {scannedItems.length} registros
                </div>
              </div>
              {scannedItems.length > 0 && (
                <button
                  onClick={() => navigator.clipboard?.writeText(scannedItems.map(i => i.value).join("\n"))}
                  style={{
                    padding: "5px 12px", borderRadius: 6, border: "1px solid #E5E0D8",
                    background: "#F9F8F5", color: "#5C5650", cursor: "pointer",
                    fontSize: 11, fontWeight: 600,
                  }}
                >📋 Copiar todo</button>
              )}
            </div>

            {/* Items list */}
            <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px", display: "flex", flexDirection: "column", gap: 6 }}>
              {scannedItems.length === 0 ? (
                <div style={{
                  flex: 1, display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", gap: 10,
                  color: "#9B958E", textAlign: "center", padding: "40px 20px",
                }}>
                  <div style={{ fontSize: 40 }}>📦</div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>Sin escaneos aún</div>
                  <div style={{ fontSize: 11, lineHeight: 1.5 }}>
                    Inicia el scanner y escanea los códigos de barras de los equipos
                  </div>
                </div>
              ) : (
                scannedItems.map((item:any, i:any) => (
                  <ScanItem key={item.value + i} item={item} index={i} mode={mode} onRemove={removeScan} />
                ))
              )}
            </div>

            {/* Footer stats */}
            {scannedItems.length > 0 && (
              <div style={{
                padding: "12px 20px", borderTop: "1px solid #E5E0D8",
                display: "flex", gap: 16,
              }}>
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: mc.color, fontFamily: "'Sora', sans-serif" }}>{scannedItems.length}</div>
                  <div style={{ fontSize: 9, color: "#9B958E", textTransform: "uppercase", letterSpacing: 1 }}>Total</div>
                </div>
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "#1A1714", fontFamily: "'Sora', sans-serif" }}>
                    {scannedItems[0]?.timestamp.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" })}
                  </div>
                  <div style={{ fontSize: 9, color: "#9B958E", textTransform: "uppercase", letterSpacing: 1 }}>Último scan</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}