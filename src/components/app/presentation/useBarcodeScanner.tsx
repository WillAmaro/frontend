import { useState, useEffect, useCallback, useRef } from "react";

// ─── TYPES ────────────────────────────────────────────────────────────────────

export type ScanStatus = "idle" | "success" | "duplicate" | "error";

export interface ScanResult {
  value: string;
  timestamp: Date;
  status: ScanStatus;
}

export interface UseBarcodeScanner {
  // State
  lastScan: ScanResult | null;
  scannedItems: ScanResult[];
  isListening: boolean;
  currentBuffer: string;

  // Actions
  startListening: () => void;
  stopListening: () => void;
  clearHistory: () => void;
  removeScan: (value: string) => void;
  resetStatus: () => void;

  // Config
  toggleDuplicateCheck: () => void;
  allowDuplicates: boolean;
}

export interface UseBarcodeOptions {
  /**
   * Tiempo máximo en ms entre keystrokes para considerarlo scanner (no typing manual).
   * Las pistolas suelen enviar cada char en <50ms. El humano escribe más lento.
   * Default: 80ms
   */
  scannerThresholdMs?: number;

  /**
   * Longitud mínima del barcode para considerarlo válido.
   * Default: 4
   */
  minLength?: number;

  /**
   * Longitud máxima del barcode.
   * Default: 50
   */
  maxLength?: number;

  /**
   * Carácter que termina el scan (Enter = código 13).
   * Default: "Enter"
   */
  endChar?: string;

  /**
   * Si se permite escanear el mismo código más de una vez.
   * Default: false
   */
  allowDuplicates?: boolean;

  /**
   * Callback que se dispara cuando se detecta un scan válido.
   */
  onScan?: (result: ScanResult) => void;

  /**
   * Callback para duplicados.
   */
  onDuplicate?: (value: string) => void;

  /**
   * Callback para scans inválidos (muy corto, muy largo).
   */
  onError?: (rawValue: string, reason: string) => void;

  /**
   * Si el hook debe ignorar el input cuando el foco está en un input/textarea.
   * Default: false — la pistola normalmente funciona globalmente.
   * Pon en true si tienes formularios en la misma pantalla.
   */
  ignoreWhenInputFocused?: boolean;

  /**
   * Prefijos válidos para el barcode (para filtrar lecturas falsas).
   * Ejemplo: ["ZTE", "SAG", "MOT"] para tus modems.
   * Si es vacío no filtra.
   */
  validPrefixes?: string[];
}

// ─── HOOK ─────────────────────────────────────────────────────────────────────

export function useBarcodeScanner(options: UseBarcodeOptions = {}): UseBarcodeScanner {
  const {
    scannerThresholdMs = 80,
    minLength = 4,
    maxLength = 50,
    endChar = "Enter",
    allowDuplicates: initialAllowDuplicates = false,
    onScan,
    onDuplicate,
    onError,
    ignoreWhenInputFocused = false,
    validPrefixes = [],
  } = options;

  // ── State ────────────────────────────────────────────────────────────────
  const [lastScan, setLastScan] = useState<ScanResult | null>(null);
  const [scannedItems, setScannedItems] = useState<ScanResult[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [currentBuffer, setCurrentBuffer] = useState("");
  const [allowDuplicates, setAllowDuplicates] = useState(initialAllowDuplicates);

  // ── Refs (para no recrear el listener en cada render) ────────────────────
  const bufferRef = useRef<string>("");
  const lastKeystrokeRef = useRef<number>(0);
  const scannedItemsRef = useRef<ScanResult[]>([]);
  const isListeningRef = useRef(false);
  const allowDuplicatesRef = useRef(allowDuplicates);

  // Sync refs con state
  useEffect(() => {
    scannedItemsRef.current = scannedItems;
  }, [scannedItems]);

  useEffect(() => {
    allowDuplicatesRef.current = allowDuplicates;
  }, [allowDuplicates]);

  // ── Validar barcode ───────────────────────────────────────────────────────
  const validateBarcode = useCallback(
    (value: string): { valid: boolean; reason?: string } => {
      const trimmed = value.trim();

      if (trimmed.length < minLength) {
        return { valid: false, reason: `Demasiado corto (mínimo ${minLength} caracteres)` };
      }

      if (trimmed.length > maxLength) {
        return { valid: false, reason: `Demasiado largo (máximo ${maxLength} caracteres)` };
      }

      if (validPrefixes.length > 0) {
        const hasValidPrefix = validPrefixes.some((prefix) =>
          trimmed.toUpperCase().startsWith(prefix.toUpperCase())
        );
        if (!hasValidPrefix) {
          return {
            valid: false,
            reason: `Prefijo no reconocido. Esperados: ${validPrefixes.join(", ")}`,
          };
        }
      }

      return { valid: true };
    },
    [minLength, maxLength, validPrefixes]
  );

  // ── Handler de keydown ────────────────────────────────────────────────────
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isListeningRef.current) return;

      // Ignorar si el foco está en un input/textarea/select
      if (ignoreWhenInputFocused) {
        const tag = (event.target as HTMLElement)?.tagName?.toLowerCase();
        if (["input", "textarea", "select"].includes(tag)) return;
      }

      const now = Date.now();
      const timeSinceLast = now - lastKeystrokeRef.current;
      lastKeystrokeRef.current = now;

      // Si pasó demasiado tiempo entre teclas → no es scanner, resetear buffer
      // (Esto evita que typing manual sea confundido con scan)
      if (timeSinceLast > scannerThresholdMs * 3 && bufferRef.current.length > 0) {
        // Si el tiempo entre la última tecla del buffer y esta es muy grande,
        // probablemente el usuario empezó a tipear. Limpiamos.
        bufferRef.current = "";
        setCurrentBuffer("");
      }

      // Fin del scan (Enter o el carácter configurado)
      if (event.key === endChar) {
        event.preventDefault();

        const scannedValue = bufferRef.current.trim();
        bufferRef.current = "";
        setCurrentBuffer("");

        if (!scannedValue) return;

        const { valid, reason } = validateBarcode(scannedValue);

        if (!valid) {
          const errorResult: ScanResult = {
            value: scannedValue,
            timestamp: new Date(),
            status: "error",
          };
          setLastScan(errorResult);
          onError?.(scannedValue, reason!);
          return;
        }

        // Verificar duplicado
        const isDuplicate = scannedItemsRef.current.some(
          (item) => item.value === scannedValue
        );

        if (isDuplicate && !allowDuplicatesRef.current) {
          const dupResult: ScanResult = {
            value: scannedValue,
            timestamp: new Date(),
            status: "duplicate",
          };
          setLastScan(dupResult);
          onDuplicate?.(scannedValue);
          return;
        }

        // Scan válido ✓
        const successResult: ScanResult = {
          value: scannedValue,
          timestamp: new Date(),
          status: "success",
        };

        setLastScan(successResult);
        setScannedItems((prev) => [successResult, ...prev]);
        onScan?.(successResult);
        return;
      }

      // Detectar si es una tecla de carácter imprimible (no Shift, Ctrl, etc.)
      if (event.key.length === 1) {
        // Verificar timing: si es muy rápido, es scanner. Si es lento, podría ser manual.
        // Solo añadimos si el intervalo es menor al threshold (o es el primer char)
        if (timeSinceLast <= scannerThresholdMs || bufferRef.current.length === 0) {
          bufferRef.current += event.key;
          setCurrentBuffer(bufferRef.current);
        } else {
          // Tipeo manual: resetear buffer con el nuevo carácter
          bufferRef.current = event.key;
          setCurrentBuffer(bufferRef.current);
        }
      }
    },
    [
      scannerThresholdMs,
      endChar,
      validateBarcode,
      ignoreWhenInputFocused,
      onScan,
      onDuplicate,
      onError,
    ]
  );

  // ── Registrar / desregistrar el listener ─────────────────────────────────
  useEffect(() => {
    if (isListening) {
      isListeningRef.current = true;
      window.addEventListener("keydown", handleKeyDown);
    } else {
      isListeningRef.current = false;
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isListening, handleKeyDown]);

  // ── Actions ───────────────────────────────────────────────────────────────
  const startListening = useCallback(() => {
    bufferRef.current = "";
    setCurrentBuffer("");
    setIsListening(true);
  }, []);

  const stopListening = useCallback(() => {
    setIsListening(false);
    bufferRef.current = "";
    setCurrentBuffer("");
  }, []);

  const clearHistory = useCallback(() => {
    setScannedItems([]);
    setLastScan(null);
    scannedItemsRef.current = [];
  }, []);

  const removeScan = useCallback((value: string) => {
    setScannedItems((prev) => prev.filter((item) => item.value !== value));
    scannedItemsRef.current = scannedItemsRef.current.filter(
      (item) => item.value !== value
    );
  }, []);

  const resetStatus = useCallback(() => {
    setLastScan(null);
  }, []);

  const toggleDuplicateCheck = useCallback(() => {
    setAllowDuplicates((prev) => !prev);
  }, []);

  return {
    lastScan,
    scannedItems,
    isListening,
    currentBuffer,
    startListening,
    stopListening,
    clearHistory,
    removeScan,
    resetStatus,
    toggleDuplicateCheck,
    allowDuplicates,
  };
}