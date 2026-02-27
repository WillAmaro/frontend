'use client'
import { JSX, useState } from "react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
  bg: "#F9F8F5",
  surface: "#FFFFFF",
  alt: "#F3F1EC",
  border: "#E5E0D8",
  borderMid: "#CEC9BF",
  text: "#18161200",
  ink: "#1A1714",
  mid: "#58534D",
  light: "#9B958E",
  green: "#006B52",
  greenBg: "#E6F4EF",
  greenMid: "#00A87F",
  blue: "#1843A8",
  blueBg: "#EBF0FB",
  orange: "#B84A08",
  orangeBg: "#FDF0E6",
  red: "#A81818",
  redBg: "#FEF2F2",
  purple: "#5C1AA8",
  purpleBg: "#F3EEFF",
  teal: "#0E7490",
  tealBg: "#E0F5F9",
};

// ─── TABS ─────────────────────────────────────────────────────────────────────
const TABS = [
  { id: "resumen", label: "Resumen" },
  { id: "entidades", label: "Entidades" },
  { id: "flujo", label: "Flujo Operativo" },
  { id: "arquitectura", label: "Arquitectura" },
  { id: "ms1", label: "MS1 — Logística" },
  { id: "tablas", label: "Modelo de Datos" },
  { id: "apis", label: "APIs" },
  { id: "ms2ms3", label: "MS2 / MS3" },
  { id: "decisiones", label: "Decisiones" },
  { id: "escala", label: "Escalabilidad" },
];

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────

function Badge({ children, color = C.green, bg = C.greenBg }: any) {
  return (
    <span style={{
      display: "inline-block", padding: "2px 9px", borderRadius: 4,
      fontSize: 10, fontWeight: 700, color, background: bg,
      fontFamily: "'JetBrains Mono', monospace", letterSpacing: 0.5,
    }}>{children}</span>
  );
}

function SectionH({ children, accent = C.green }: any) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
      <div style={{ width: 4, height: 24, background: accent, borderRadius: 2, flexShrink: 0 }} />
      <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: C.ink, fontFamily: "'Sora', sans-serif", letterSpacing: -0.3 }}>
        {children}
      </h2>
    </div>
  );
}

function SubH({ children, accent = C.green }: any) {
  return (
    <h3 style={{
      margin: "24px 0 12px", fontSize: 14, fontWeight: 700, color: accent,
      fontFamily: "'JetBrains Mono', monospace", letterSpacing: 0.5,
      textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8,
    }}>
      <span style={{ display: "inline-block", width: 16, height: 2, background: accent, borderRadius: 1 }} />
      {children}
    </h3>
  );
}

function Card({ children, style = {} }: any) {
  return (
    <div style={{
      background: C.surface, border: `1px solid ${C.border}`,
      borderRadius: 10, padding: "18px 20px", ...style,
    }}>{children}</div>
  );
}

function Tag({ method }: { method: string }) {
  const m: Record<string, [string, string]> = {
    GET: [C.blueBg, C.blue],
    POST: [C.greenBg, C.green],
    PUT: [C.orangeBg, C.orange],
    DELETE: [C.redBg, C.red],
  };
  const [bg, color] = m[method] || [C.alt, C.mid];
  return (
    <span style={{
      padding: "2px 8px", borderRadius: 4, fontSize: 10, fontWeight: 700,
      background: bg, color, fontFamily: "'JetBrains Mono', monospace",
      minWidth: 46, display: "inline-block", textAlign: "center",
    }}>{method}</span>
  );
}

function Rule({ n, text, color = C.green, bg = C.greenBg }: any) {
  return (
    <div style={{ display: "flex", gap: 10, padding: "10px 14px", borderRadius: 8, background: bg, border: `1px solid ${color}25`, marginBottom: 8 }}>
      <div style={{
        width: 20, height: 20, borderRadius: "50%", background: color,
        color: "#fff", fontSize: 9, fontWeight: 800, flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'JetBrains Mono', monospace",
      }}>{n}</div>
      <span style={{ fontSize: 12, color: C.ink, lineHeight: 1.65 }}>{text}</span>
    </div>
  );
}

function CodeBlock({ children }: any) {
  return (
    <pre style={{
      background: "#1E1B16", color: "#E8E0D0", borderRadius: 8,
      padding: "14px 18px", fontSize: 11, lineHeight: 1.7,
      fontFamily: "'JetBrains Mono', monospace", overflowX: "auto",
      margin: "12px 0", whiteSpace: "pre-wrap",
    }}>{children}</pre>
  );
}

function StateFlow({ states }: { states: { label: string; color: string; bg: string; desc: string }[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {states.map((s, i) => (
        <div key={s.label} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ padding: "4px 12px", borderRadius: 20, background: s.bg, border: `1px solid ${s.color}40`, fontSize: 11, fontWeight: 700, color: s.color, whiteSpace: "nowrap", fontFamily: "'JetBrains Mono', monospace" }}>{s.label}</div>
            {i < states.length - 1 && <div style={{ width: 1, height: 10, background: C.borderMid, margin: "3px 0" }} />}
          </div>
          <div style={{ fontSize: 12, color: C.mid, paddingTop: 4, lineHeight: 1.5 }}>{s.desc}</div>
        </div>
      ))}
    </div>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
      <thead>
        <tr style={{ background: C.alt }}>
          {headers.map(h => (
            <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontSize: 10, fontWeight: 700, color: C.mid, borderBottom: `2px solid ${C.border}`, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 0.5, textTransform: "uppercase" }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.surface : C.bg }}>
            {row.map((cell, j) => (
              <td key={j} style={{ padding: "8px 12px", color: j === 0 ? C.ink : C.mid, fontWeight: j === 0 ? 600 : 400, fontFamily: j === 0 ? "'JetBrains Mono', monospace" : "inherit", fontSize: j === 0 ? 11 : 12 }}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ─── TAB CONTENT ─────────────────────────────────────────────────────────────

function ResumenTab() {
  return (
    <div>
      {/* Hero strip */}
      <div style={{ background: C.ink, borderRadius: 12, padding: "32px 36px", marginBottom: 24, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: 200, height: "100%", background: `linear-gradient(to left, ${C.green}20, transparent)` }} />
        <div style={{ fontSize: 10, letterSpacing: 4, color: C.greenMid, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", marginBottom: 12, textTransform: "uppercase" }}>LPS GRUPO · SECCIÓN ALTAS · 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: "#fff", margin: "0 0 10px", fontFamily: "'Sora', sans-serif", letterSpacing: -0.5 }}>
          Sistema de Gestión Logística
        </h1>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", margin: "0 0 24px", maxWidth: 560, lineHeight: 1.7 }}>
          Arquitectura de microservicios para la gestión completa de instalaciones, mantenimientos y retiros de internet, cable y telefonía para Claro en Perú y LATAM.
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["Java 17", "Spring Boot 3", "PostgreSQL", "Arquitectura Hexagonal", "RabbitMQ", "React + MUI"].map(t => (
            <span key={t} style={{ padding: "4px 12px", borderRadius: 5, border: "1px solid rgba(255,255,255,0.15)", fontSize: 11, color: "rgba(255,255,255,0.55)", fontFamily: "'JetBrains Mono', monospace" }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
        {[
          { n: "3", label: "Microservicios", sub: "logistics · workorder · reporting", color: C.green },
          { n: "6", label: "Módulos MS1", sub: "hub · catálogos · inventario · kardex · abastecimiento · despacho", color: C.blue },
          { n: "14+", label: "Entidades de negocio", sub: "tablas definidas para MS1", color: C.orange },
          { n: "40+", label: "APIs REST", sub: "6 prioridades definidas", color: C.purple },
          { n: "4", label: "Fases de escala", sub: "Lima → Regiones → LATAM → Verticales", color: C.teal },
        ].map(s => (
          <Card key={s.n} style={{ flex: 1, borderTop: `3px solid ${s.color}` }}>
            <div style={{ fontSize: 34, fontWeight: 800, color: s.color, fontFamily: "'Sora', sans-serif", lineHeight: 1 }}>{s.n}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.ink, margin: "6px 0 4px" }}>{s.label}</div>
            <div style={{ fontSize: 10, color: C.light, lineHeight: 1.5 }}>{s.sub}</div>
          </Card>
        ))}
      </div>

      {/* Context grid */}
      <div style={{ display: "flex", gap: 14 }}>
        <div style={{ flex: 1 }}>
          <SubH accent={C.green}>Contexto del negocio</SubH>
          {[
            { label: "Empresa", value: "LPS GRUPO — Contratista oficial de Claro Perú", accent: C.green },
            { label: "Área", value: "Sección Altas: instalaciones, mantenimientos y retiros de internet, cable y telefonía", accent: C.blue },
            { label: "Rol operativo", value: "Operador logístico intermedio entre Claro y los técnicos ejecutores", accent: C.orange },
            { label: "Equipo", value: "4 desarrolladores · Entrega finales de marzo 2026", accent: C.purple },
            { label: "Despliegue", value: "Lima → 5 regiones Perú → LATAM: Chile, Colombia, Brasil", accent: C.teal },
          ].map(item => (
            <div key={item.label} style={{ display: "flex", marginBottom: 8, borderRadius: 7, overflow: "hidden", border: `1px solid ${C.border}` }}>
              <div style={{ width: 4, background: item.accent, flexShrink: 0 }} />
              <div style={{ padding: "9px 16px", display: "flex", gap: 16, alignItems: "center" }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: item.accent, fontFamily: "'JetBrains Mono', monospace", minWidth: 90, textTransform: "uppercase", letterSpacing: 1 }}>{item.label}</div>
                <div style={{ fontSize: 12, color: C.mid, lineHeight: 1.5 }}>{item.value}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ width: 280 }}>
          <SubH accent={C.blue}>Volumen operativo</SubH>
          {[
            "Despachos cada 2–3 días, entre 10 y 50 ítems por despacho",
            "Potencial de despachos masivos en picos operativos",
            "Carga masiva de órdenes de servicio vía Excel diariamente",
            "3 razones sociales de LPS (tenants) independientes",
            "Contratistas externos variables por proyecto",
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.blue, marginTop: 5, flexShrink: 0 }} />
              <div style={{ fontSize: 12, color: C.mid, lineHeight: 1.5 }}>{item}</div>
            </div>
          ))}
          <div style={{ marginTop: 16, padding: "12px 14px", borderRadius: 8, background: C.orangeBg, border: `1px solid ${C.orange}30` }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: C.orange, fontFamily: "'JetBrains Mono', monospace", marginBottom: 4 }}>FUTURO</div>
            <div style={{ fontSize: 12, color: C.mid }}>Escalable a otros verticales como instalación de torres de comunicaciones</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EntidadesTab() {
  return (
    <div>
      <SectionH accent={C.blue}>Entidades del Negocio</SectionH>

      {/* Hierarchy diagram */}
      <Card style={{ marginBottom: 20, background: "#1E1B16" }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: C.greenMid, fontFamily: "'JetBrains Mono', monospace", marginBottom: 12, letterSpacing: 2 }}>JERARQUÍA DE CONTEXTO</div>
        <pre style={{ color: "#E8E0D0", fontSize: 12, fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.8, margin: 0 }}>{`tenantId  (razón social LPS)
    └── projectId  (ej: Proyecto Altas Claro Lima)
            └── hubId  (local físico)
                    ├── supply_request    → solicitud de abastecimiento
                    ├── kardex_movement   → movimientos físicos del hub
                    └── inventory         → stock actual
                            └── dispatch  → despacho a cuadrillas
                                    ├── workerId        → jefe de cuadrilla (siempre)
                                    └── contractorId    → null = LPS | valor = contratista`}</pre>
      </Card>

      <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
        {[
          {
            title: "Empresas (Tenants)", badge: "3 razones sociales", color: C.green, bg: C.greenBg,
            items: [
              "Son las 3 razones sociales de LPS: LPS Peru SAC, LPS Chile SpA, LPS Colombia SAS",
              "El tenantId es el identificador de cada razón social y el nivel más alto de segregación",
              "Son entidades estables — no crecen ni cambian frecuentemente",
              "NO confundir con contratistas — las empresas son LPS, los contratistas son terceros externos",
            ],
          },
          {
            title: "Contratistas", badge: "Externos variables", color: C.orange, bg: C.orangeBg,
            items: [
              "Empresas externas que LPS subcontrata cuando no tiene suficiente personal propio",
              "Se asocian a proyectos específicos — no son transversales al sistema",
              "Se requieren cuando hay picos de órdenes de servicio de Claro",
              "Los despachos a personal de contratistas llevan contractorId para trazabilidad",
            ],
          },
        ].map(e => (
          <Card key={e.title} style={{ flex: 1, borderTop: `3px solid ${e.color}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{e.title}</div>
              <Badge color={e.color} bg={e.bg}>{e.badge}</Badge>
            </div>
            {e.items.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 7, alignItems: "flex-start" }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: e.color, marginTop: 6, flexShrink: 0 }} />
                <div style={{ fontSize: 12, color: C.mid, lineHeight: 1.5 }}>{item}</div>
              </div>
            ))}
          </Card>
        ))}
      </div>

      <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
        {[
          {
            title: "Proyectos", badge: "N:M con empresas", color: C.blue, bg: C.blueBg,
            items: [
              "Pertenecen a las empresas de LPS con relación muchos-a-muchos",
              "Un proyecto puede involucrar 1 o 2 razones sociales de LPS simultáneamente",
              "Los contratistas se asocian a proyectos específicos, no al sistema global",
              "Ejemplo: Proyecto Altas Claro Lima puede involucrar a LPS Peru SAC y LPS Chile SpA",
            ],
          },
          {
            title: "Hubs", badge: "N proyectos / N empresas", color: C.teal, bg: C.tealBg,
            items: [
              "Locales físicos identificados geográficamente — no pertenecen a una sola empresa",
              "Un hub puede operar para múltiples proyectos y empresas simultáneamente",
              "El inventario del hub se segrega por tenantId + projectId + hubId",
              "No tienen FK directa a empresa por diseño — flexibilidad operativa",
            ],
          },
        ].map(e => (
          <Card key={e.title} style={{ flex: 1, borderTop: `3px solid ${e.color}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{e.title}</div>
              <Badge color={e.color} bg={e.bg}>{e.badge}</Badge>
            </div>
            {e.items.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 7, alignItems: "flex-start" }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: e.color, marginTop: 6, flexShrink: 0 }} />
                <div style={{ fontSize: 12, color: C.mid, lineHeight: 1.5 }}>{item}</div>
              </div>
            ))}
          </Card>
        ))}
      </div>

      {/* Relaciones */}
      <SubH accent={C.purple}>Relaciones Clave</SubH>
      <div style={{ display: "flex", gap: 16 }}>
        <Card style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.ink, marginBottom: 8 }}>Proyectos ↔ Empresas (N:M)</div>
          <CodeBlock>{`companies ──< project_company >── projects
                    │
              - role (PRINCIPAL / PARTICIPANTE)
              - start_date
              - end_date
              - status`}</CodeBlock>
        </Card>
        <Card style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.ink, marginBottom: 8 }}>Catálogo de Productos por Empresa</div>
          <CodeBlock>{`companies ──< products
                 │
           - companyId
           - name
           - type (EQUIPMENT / MATERIAL / TOOL)
           - brand · model · specifications
           - status`}</CodeBlock>
          <div style={{ fontSize: 12, color: C.mid, marginTop: 8 }}>Cada empresa tiene su propio catálogo — no se comparte entre razones sociales de LPS.</div>
        </Card>
        <Card style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.ink, marginBottom: 8 }}>Trabajadores y contractorId</div>
          <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
            <div style={{ flex: 1, padding: "10px 12px", borderRadius: 7, background: C.greenBg, border: `1px solid ${C.green}30` }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.green, fontFamily: "'JetBrains Mono', monospace", marginBottom: 4 }}>LPS PROPIO</div>
              <div style={{ fontSize: 11, color: C.mid }}>workerId presente<br />contractorId = <code style={{ color: C.red }}>null</code></div>
            </div>
            <div style={{ flex: 1, padding: "10px 12px", borderRadius: 7, background: C.orangeBg, border: `1px solid ${C.orange}30` }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.orange, fontFamily: "'JetBrains Mono', monospace", marginBottom: 4 }}>CONTRATISTA</div>
              <div style={{ fontSize: 11, color: C.mid }}>workerId presente<br />contractorId = <code style={{ color: C.orange }}>id_externo</code></div>
            </div>
          </div>
          <div style={{ fontSize: 12, color: C.mid }}>LPS nunca se registra como contratista de sí misma — evita ensuciar la analítica.</div>
        </Card>
      </div>
    </div>
  );
}

function FlujoTab() {
  return (
    <div>
      <SectionH accent={C.green}>Flujo Operativo Completo</SectionH>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
        {[
          { n: "01", title: "Asignación de Órdenes", desc: "Claro asigna órdenes de servicio a LPS. Las órdenes determinan qué instalaciones, mantenimientos o retiros deben ejecutarse.", ms: "workorder", color: C.green },
          { n: "02", title: "Análisis y Solicitud de Abastecimiento", desc: "LPS analiza el historial del kardex del hub y genera automáticamente una solicitud de abastecimiento con cantidades sugeridas. El encargado puede ajustar manualmente antes de enviar a aprobación.", ms: "logistics", color: C.blue },
          { n: "03", title: "Entrega al Hub", desc: "Una vez aprobada la solicitud, Claro o el proveedor entrega los materiales físicamente al hub. El sistema registra cada entrega (puede ser parcial en días distintos).", ms: "logistics", color: C.orange },
          { n: "04", title: "Movimiento en Kardex e Inventario", desc: "Cada entrega registrada dispara en una sola @Transactional: ENTRADA en kardex + aumento de inventario del hub + actualización del estado de la solicitud.", ms: "logistics", color: C.purple },
          { n: "05", title: "Despacho a Cuadrillas", desc: "El encargado de despacho selecciona los ítems y los asigna a una cuadrilla (jefe + ayudantes opcionales). Genera SALIDA en kardex + registro de custodia + descuento de inventario en una sola transacción.", ms: "logistics", color: C.red },
          { n: "06", title: "Ejecución de Órdenes", desc: "Los técnicos ejecutan las órdenes de servicio, completan datos faltantes y registran qué equipos despachados fueron utilizados en cada instalación.", ms: "workorder", color: C.teal },
          { n: "07", title: "Supervisión y Liquidación", desc: "Los supervisores monitorean la producción por técnico y por contratista. Exportan la data estructurada para las liquidaciones que LPS presenta a Claro.", ms: "reporting", color: C.green },
        ].map((step, i) => (
          <div key={step.n} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: step.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: `0 3px 10px ${step.color}50` }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#fff", fontFamily: "'JetBrains Mono', monospace" }}>{step.n}</span>
              </div>
              {i < 6 && <div style={{ width: 1, height: 20, background: C.borderMid, margin: "4px 0" }} />}
            </div>
            <Card style={{ flex: 1, padding: "14px 18px", borderLeft: `3px solid ${step.color}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{step.title}</div>
                <Badge color={step.ms === "logistics" ? C.green : step.ms === "workorder" ? C.blue : C.orange}
                  bg={step.ms === "logistics" ? C.greenBg : step.ms === "workorder" ? C.blueBg : C.orangeBg}>
                  {step.ms === "logistics" ? "lps-logistics" : step.ms === "workorder" ? "lps-workorder" : "lps-reporting"}
                </Badge>
              </div>
              <div style={{ fontSize: 12, color: C.mid, lineHeight: 1.7 }}>{step.desc}</div>
            </Card>
          </div>
        ))}
      </div>

      <SubH accent={C.orange}>Reglas de Consistencia Transaccional</SubH>
      <div style={{ display: "flex", gap: 14 }}>
        {[
          { title: "Entrega → Hub", items: ["INSERT supply_request_delivery", "INSERT delivery_items por cada producto", "UPDATE supply_request_item (acumula partialQuantity)", "UPDATE supply_request (recalcula status)", "INSERT kardex ENTRADA por ítem", "UPDATE inventory (+stock)"], color: C.orange },
          { title: "Despacho → Cuadrilla", items: ["INSERT dispatch (jefe + contractorId)", "INSERT dispatch_assistants opcionales", "INSERT dispatch_items (EN_PODER)", "INSERT kardex SALIDA por ítem", "UPDATE inventory (-stock)"], color: C.red },
          { title: "Devolución → Hub", items: ["UPDATE dispatch_item (DEVUELTO)", "INSERT kardex REINGRESO", "UPDATE inventory (+stock)", "UPDATE dispatch status si aplica"], color: C.purple },
          { title: "Baja → Kardex", items: ["UPDATE dispatch_item (DADO_DE_BAJA)", "INSERT kardex BAJA", "NO aumenta inventario — ítem no recuperable"], color: C.blue },
        ].map(t => (
          <Card key={t.title} style={{ flex: 1, borderTop: `3px solid ${t.color}` }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: t.color, fontFamily: "'JetBrains Mono', monospace", marginBottom: 10 }}>@Transactional: {t.title}</div>
            {t.items.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 5, alignItems: "flex-start" }}>
                <div style={{ fontSize: 9, color: t.color, fontFamily: "'JetBrains Mono', monospace", paddingTop: 2, fontWeight: 700 }}>{i + 1}.</div>
                <div style={{ fontSize: 11, color: C.mid, lineHeight: 1.5, fontFamily: "'JetBrains Mono', monospace" }}>{item}</div>
              </div>
            ))}
          </Card>
        ))}
      </div>
    </div>
  );
}

function ArquitecturaTab() {
  return (
    <div>
      <SectionH accent={C.blue}>Arquitectura de Microservicios</SectionH>

      {/* Diagram */}
      <Card style={{ marginBottom: 20, textAlign: "center", padding: "32px" }}>
        <div style={{ display: "inline-block", padding: "10px 48px", borderRadius: 8, background: C.blueBg, border: `1px solid ${C.blue}40`, fontSize: 13, fontWeight: 700, color: C.blue, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1, marginBottom: 16 }}>API GATEWAY</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 120, height: 20 }}>
          {[0, 1, 2].map(i => <div key={i} style={{ width: 1, height: "100%", background: C.borderMid }} />)}
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 0 }}>
          {[
            { name: "lps-logistics-service", badge: "CORE", color: C.green, bg: C.greenBg, modules: ["Hub", "Catálogos", "Inventario", "Kardex", "Abastecimiento", "Despacho a Cuadrillas", "Maestros temporales"] },
            { name: "lps-workorder-service", badge: "OPS", color: C.blue, bg: C.blueBg, modules: ["Carga Masiva Excel", "Asignación de Órdenes", "Ejecución por Técnico", "Trazabilidad Contratista", "Exportable Liquidaciones"] },
            { name: "lps-reporting-service", badge: "BI", color: C.orange, bg: C.orangeBg, modules: ["Supervisión Diaria", "Productividad Técnico", "Análisis Contratista", "Comparativas Regionales", "Exportables Contabilidad"] },
          ].map(ms => (
            <div key={ms.name} style={{ flex: 1, borderRadius: 10, border: `1px solid ${ms.color}30`, overflow: "hidden" }}>
              <div style={{ padding: "10px 14px", background: ms.bg, borderBottom: `1px solid ${ms.color}20`, display: "flex", alignItems: "center", gap: 8 }}>
                <Badge color={ms.color} bg={ms.color + "30"}>{ms.badge}</Badge>
                <span style={{ fontSize: 10, fontWeight: 700, color: ms.color, fontFamily: "'JetBrains Mono', monospace" }}>{ms.name}</span>
              </div>
              <div style={{ padding: "12px 14px" }}>
                {ms.modules.map(m => (
                  <div key={m} style={{ display: "flex", gap: 7, marginBottom: 5, alignItems: "center" }}>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: ms.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 11, color: C.mid }}>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 16 }}>
          <div style={{ padding: "6px 18px", border: `1px dashed ${C.border}`, borderRadius: 6, fontSize: 10, color: C.light, fontFamily: "'JetBrains Mono', monospace" }}>lps-master-service (futuro — trabajadores, contratistas, roles)</div>
        </div>
      </Card>

      {/* Communication */}
      <SubH accent={C.teal}>Comunicación entre Servicios</SubH>
      <div style={{ display: "flex", gap: 14, marginBottom: 20 }}>
        <Card style={{ flex: 1, borderLeft: `4px solid ${C.teal}` }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.teal, marginBottom: 8 }}>WebClient Síncrono</div>
          <div style={{ fontSize: 12, color: C.mid, lineHeight: 1.7, marginBottom: 8 }}>Para lecturas en tiempo real donde la respuesta es necesaria inmediatamente para continuar el flujo.</div>
          <div style={{ padding: "8px 12px", background: C.tealBg, borderRadius: 6, fontSize: 11, color: C.teal, fontFamily: "'JetBrains Mono', monospace" }}>
            workorder-service → logistics-service<br />
            "¿Qué tiene despachado el técnico X?"
          </div>
        </Card>
        <Card style={{ flex: 1, borderLeft: `4px solid ${C.purple}` }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.purple, marginBottom: 8 }}>RabbitMQ + Outbox Pattern</div>
          <div style={{ fontSize: 12, color: C.mid, lineHeight: 1.7, marginBottom: 8 }}>Para escrituras críticas entre servicios distintos donde no se puede perder el evento aunque el broker esté caído.</div>
          <div style={{ padding: "8px 12px", background: C.purpleBg, borderRadius: 6, fontSize: 11, color: C.purple, fontFamily: "'JetBrains Mono', monospace" }}>
            Outbox: escribe en DB + tabla events<br />
            Proceso separado publica al broker
          </div>
        </Card>
        <Card style={{ flex: 1, borderLeft: `4px solid ${C.blue}` }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.blue, marginBottom: 8 }}>PostgreSQL por Schemas</div>
          <div style={{ fontSize: 12, color: C.mid, lineHeight: 1.7, marginBottom: 8 }}>Cada microservicio tiene su schema separado. Aislamiento lógico en Phase 1, físico en Phase 2 por región.</div>
          <div style={{ padding: "8px 12px", background: C.blueBg, borderRadius: 6, fontSize: 11, color: C.blue, fontFamily: "'JetBrains Mono', monospace" }}>
            schema: logistics<br />
            schema: workorders<br />
            schema: reporting
          </div>
        </Card>
      </div>

      <SubH accent={C.green}>Arquitectura Hexagonal</SubH>
      <div style={{ display: "flex", gap: 14 }}>
        {[
          { n: "01", layer: "Domain", color: C.green, bg: C.greenBg, desc: "Entidades puras de negocio sin dependencias de framework.", examples: ["Hub", "KardexMovement", "Dispatch", "SupplyRequest", "DispatchItem", "EquipmentUnit"] },
          { n: "02", layer: "Application", color: C.blue, bg: C.blueBg, desc: "Casos de uso y puertos (interfaces). Orquesta el dominio.", examples: ["CreateHubUseCase", "GenerateSupplyRequestUseCase", "ExecuteDispatchUseCase", "RegisterDeliveryUseCase"] },
          { n: "03", layer: "Infrastructure", color: C.orange, bg: C.orangeBg, desc: "Adaptadores que implementan los puertos. JPA, REST, eventos.", examples: ["HubJpaRepository", "KardexJpaRepository", "DispatchRestController", "RabbitMQEventPublisher"] },
        ].map(l => (
          <Card key={l.layer} style={{ flex: 1, background: l.bg, border: `1px solid ${l.color}25` }}>
            <div style={{ fontSize: 9, letterSpacing: 3, fontWeight: 700, color: l.color, fontFamily: "'JetBrains Mono', monospace", marginBottom: 4, textTransform: "uppercase" }}>Layer {l.n}</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: C.ink, marginBottom: 8, fontFamily: "'Sora', sans-serif" }}>{l.layer}</div>
            <div style={{ fontSize: 12, color: C.mid, lineHeight: 1.6, marginBottom: 14 }}>{l.desc}</div>
            {l.examples.map(ex => (
              <div key={ex} style={{ padding: "4px 10px", borderRadius: 5, background: C.surface, border: `1px solid ${l.color}30`, fontSize: 10, color: l.color, fontFamily: "'JetBrains Mono', monospace", marginBottom: 5 }}>{ex}</div>
            ))}
          </Card>
        ))}
      </div>
      <div style={{ marginTop: 12, padding: "10px 16px", borderRadius: 8, background: C.alt, border: `1px solid ${C.border}`, fontSize: 12, color: C.mid, textAlign: "center" }}>
        Cada módulo interno del MS1 — Hub, Kardex, Inventario, Abastecimiento, Despacho — replica esta estructura de forma independiente
      </div>
    </div>
  );
}

function MS1Tab() {
  const [mod, setMod] = useState("hub");
  const modules: Record<string, any> = {
    hub: {
      title: "Hub", color: C.green, bg: C.greenBg,
      desc: "Los hubs son los locales físicos de LPS identificados geográficamente. Son la base de toda la operación logística. Un hub puede operar para múltiples proyectos y empresas simultáneamente sin pertenecer formalmente a ninguna.",
      data: [
        { label: "Identificador único", ex: "HUB-LIMA-001" },
        { label: "Nombre del local", ex: "Hub Miraflores" },
        { label: "Dirección física", ex: "Av. Larco 1234, Miraflores" },
        { label: "Tenant (razón social LPS)", ex: "LPS Peru SAC" },
        { label: "Estado operativo", ex: "ACTIVO / INACTIVO" },
      ],
      rules: [
        "Un hub puede recibir abastecimiento de múltiples proyectos bajo distintos tenants simultáneamente",
        "El inventario se segrega por tenantId + projectId + hubId — no hay inventario global del hub",
        "No tiene FK a empresa por diseño — un hub físico sirve a múltiples operaciones",
      ],
    },
    catalogs: {
      title: "Catálogos", color: C.blue, bg: C.blueBg,
      desc: "Los catálogos definen las entidades maestras: razones sociales de LPS, proyectos y el catálogo de productos. Cada empresa tiene su propio catálogo de productos porque LPS Peru puede manejar distintos modelos de equipos que LPS Chile.",
      data: [
        { label: "Empresa (razón social LPS)", ex: "LPS Peru SAC · LPS Chile SpA · LPS Colombia SAS" },
        { label: "Proyecto", ex: "Altas Claro Lima 2026" },
        { label: "Rol empresa en proyecto", ex: "PRINCIPAL / PARTICIPANTE" },
        { label: "Producto", ex: "Modem ZTE F680 · Cable UTP Cat6" },
        { label: "Tipo de producto", ex: "EQUIPMENT / MATERIAL / TOOL" },
        { label: "Marca y modelo", ex: "ZTE · F680 · Blanco 4 puertos" },
      ],
      rules: [
        "Cada empresa tiene su propio catálogo de productos — no se comparte entre razones sociales",
        "Un proyecto puede involucrar 1 o 2 razones sociales de LPS simultáneamente (relación N:M)",
        "Los contratistas externos NO son empresas — se gestionan separadamente en el módulo de despacho",
      ],
    },
    inventory: {
      title: "Inventario", color: C.orange, bg: C.orangeBg,
      desc: "El inventario opera en dos niveles. El nivel agregado responde cuántos modems ZTE tengo hoy en el hub. El nivel unitario responde dónde está exactamente el modem con serial X. Ambos se segregan por tenant, proyecto y hub.",
      data: [
        { label: "Stock agregado por producto", ex: "47 uds. Modem ZTE F680 en Hub Lima bajo LPS Peru / Proyecto Altas" },
        { label: "Serial number del equipo", ex: "ZTE2024081200134" },
        { label: "Dirección MAC del equipo", ex: "A8:3F:A1:22:BC:11" },
        { label: "Estado unitario del equipo", ex: "EN_HUB / DESPACHADO / DEVUELTO / BAJA" },
        { label: "Contexto de segregación", ex: "tenantId + projectId + hubId" },
        { label: "Tipo de inventario", ex: "EQUIPMENT (serial) / MATERIAL (agregado) / TOOL (agregado)" },
      ],
      rules: [
        "El inventario agregado se actualiza en la misma @Transactional que el movimiento de kardex",
        "Equipos con número de serie tienen trazabilidad individual completa",
        "Materiales y herramientas se gestionan a nivel agregado — sin serial individual",
        "Herencia: hub_inventory → equipment_inventory / material_inventory / tool_inventory",
      ],
    },
    kardex: {
      title: "Kardex", color: C.purple, bg: C.purpleBg,
      desc: "El kardex es el registro histórico de todos los movimientos físicos que ocurren en el hub. Solo registra cuando algo pasa físicamente por el hub. Los intercambios directos entre técnicos NO tocan el kardex.",
      data: [
        { label: "ENTRADA", ex: "Llega material del proveedor o Claro vía entrega de solicitud de abastecimiento" },
        { label: "SALIDA", ex: "Sale del hub hacia un técnico vía despacho a cuadrilla" },
        { label: "REINGRESO", ex: "Vuelve al hub desde un técnico vía devolución de despacho" },
        { label: "BAJA", ex: "Se da de baja por daño, pérdida o deterioro irreparable" },
      ],
      rules: [
        "El kardex NO tiene FK constraints — optimiza performance en alto volumen de inserts",
        "La integridad referencial se valida en la capa de aplicación antes del save, no en DB",
        "Índices obligatorios: hubId, serialNumber, fechaMovimiento, workerId, tenantId, projectId",
        "Regla de integridad: SALIDA en kardex sin custodia activa en dispatch = inconsistencia detectable",
        "Transferencia técnico A → técnico B NO genera movimiento en kardex — solo actualiza dispatch",
      ],
    },
    supply: {
      title: "Abastecimiento", color: C.orange, bg: C.orangeBg,
      desc: "El módulo analiza el historial del kardex y sugiere automáticamente qué reabastecer. El encargado puede ajustar cantidades. Las entregas pueden ser múltiples y parciales en días distintos, cada una con su propia fecha y detalle.",
      data: [
        { label: "suggestedQuantity", ex: "20 uds — calculado automáticamente desde el análisis del kardex" },
        { label: "requiredQuantity", ex: "25 uds — ajustado manualmente por el encargado" },
        { label: "partialQuantity", ex: "10 uds — acumulado de entregas parciales recibidas hasta ahora" },
        { label: "deliveredQuantity", ex: "25 uds — total al completarse todos los ítems de la solicitud" },
        { label: "Estado solicitud", ex: "BORRADOR → APROBADO → ENTREGA_PARCIAL → ENTREGADO" },
        { label: "Estado ítem", ex: "PENDIENTE / ENTREGADO_PARCIAL / ENTREGADO_COMPLETO / CANCELADO" },
      ],
      rules: [
        "Una solicitud puede recibir N entregas físicas en días distintos — cada entrega es registro independiente",
        "Cada entrega dispara @Transactional: actualiza ítems + ENTRADA kardex + aumenta inventario hub",
        "Estado RECHAZADO: solicitud no aprobada → vuelve al encargado para revisión",
        "Estado CERRADO_PARCIAL: cierre administrativo aunque falten ítems pendientes",
        "supply_request_delivery_item usa campos planos sin FK — usa índices compensatorios en su lugar",
      ],
    },
    dispatch: {
      title: "Despacho a Cuadrillas", color: C.red, bg: C.redBg,
      desc: "El encargado del área de despacho selecciona ítems y los asigna a una cuadrilla. Cada cuadrilla tiene un jefe responsable (siempre requerido) y puede tener ayudantes opcionales. Se distingue explícitamente entre personal propio LPS y personal de contratistas.",
      data: [
        { label: "Jefe de cuadrilla", ex: "workerId: Juan Pérez — responsable formal, siempre presente" },
        { label: "Contratista asignado", ex: "contractorId: Contratista XYZ — null si es personal propio LPS" },
        { label: "Ayudantes de cuadrilla", ex: "workerId: Carlos Ríos — opcionales, 1 o más, tabla dispatch_assistant" },
        { label: "Estado del ítem", ex: "EN_PODER / TRANSFERIDO / DEVUELTO / DADO_DE_BAJA" },
        { label: "Tipo de ítem despachado", ex: "EQUIPMENT / MATERIAL / TOOL" },
        { label: "Serial del equipo", ex: "ZTE2024081200134 — trazabilidad unitaria en campo" },
        { label: "Estado del despacho", ex: "ACTIVO / CERRADO / CERRADO_PARCIAL" },
      ],
      rules: [
        "contractorId = null es personal LPS — LPS nunca se registra como su propio contratista",
        "Transferencia interna (mismo cuadrilla) no toca kardex — solo actualiza custodia",
        "Transferencia a otra cuadrilla marca original TRANSFERIDO + crea nuevo EN_PODER en destino",
        "Devolución: DEVUELTO en dispatch + REINGRESO en kardex + aumenta inventario (@Transactional)",
        "Baja: DADO_DE_BAJA en dispatch + BAJA en kardex — NO aumenta inventario (ítem no recuperable)",
        "El jefe es el responsable formal aunque el ítem esté físicamente con un ayudante",
        "Trazabilidad completa por serial: kardex (movimientos hub) + dispatch (cadena de custodia en campo)",
      ],
    },
  };
  const m = modules[mod];
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <Badge color="#fff" bg={C.green}>CORE</Badge>
        <span style={{ fontSize: 11, color: C.light, fontFamily: "'JetBrains Mono', monospace" }}>Microservicio 1 de 3 · lps-logistics-service</span>
      </div>
      <SectionH accent={C.green}>lps-logistics-service</SectionH>

      {/* Module tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
        {Object.entries(modules).map(([key, val]: any) => (
          <button key={key} onClick={() => setMod(key)} style={{
            padding: "6px 16px", borderRadius: 6, border: `1px solid ${mod === key ? val.color : C.border}`,
            background: mod === key ? val.color : C.surface, color: mod === key ? "#fff" : C.mid,
            cursor: "pointer", fontSize: 12, fontWeight: 600, transition: "all 0.15s",
          }}>{val.title}</button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 18 }}>
        <div style={{ flex: 1 }}>
          <div style={{ padding: "12px 0 16px" }}>
            <Badge color={m.color} bg={m.bg}>{m.title.toUpperCase()}</Badge>
            <p style={{ fontSize: 13, color: C.mid, lineHeight: 1.75, margin: "10px 0 16px" }}>{m.desc}</p>
          </div>
          <div style={{ fontSize: 10, fontWeight: 700, color: C.light, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>Datos que persiste</div>
          {m.data.map((d: any, i: number) => (
            <div key={i} style={{ display: "flex", marginBottom: 7, borderRadius: 6, overflow: "hidden", border: `1px solid ${C.border}` }}>
              <div style={{ width: 3, background: m.color, flexShrink: 0 }} />
              <div style={{ padding: "8px 14px", flex: 1 }}>
                <div style={{ fontSize: 9, color: C.light, fontFamily: "'JetBrains Mono', monospace", marginBottom: 2 }}>{d.label}</div>
                <div style={{ fontSize: 12, color: C.mid, fontStyle: "italic" }}>{d.ex}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ width: 300, flexShrink: 0 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: C.light, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>Reglas de negocio</div>
          {m.rules.map((r: string, i: number) => (
            <Rule key={i} n={i + 1} text={r} color={m.color} bg={m.bg} />
          ))}
        </div>
      </div>

      {/* Stack info at bottom */}
      <div style={{ marginTop: 20, padding: "12px 18px", borderRadius: 8, background: C.greenBg, border: `1px solid ${C.green}30` }}>
        <span style={{ fontSize: 11, color: C.green }}>
          <strong>Stack técnico:</strong> Java 17 · Spring Boot 3 · PostgreSQL (schema: logistics) · JPA/Hibernate · HikariCP (pool: 20) · Arquitectura Hexagonal · @Transactional unificado
        </span>
      </div>
    </div>
  );
}

function TablasTab() {
  const [group, setGroup] = useState("supply");
  const groups: Record<string, any> = {
    hub: {
      label: "Hub & Catálogos", color: C.green,
      desc: "Entidades maestras del sistema. FK constraints en todas porque el volumen es bajo y la integridad es crítica.",
      fkNote: "Todas estas entidades tienen FK constraints — son entidades de bajo volumen y alta integridad.",
      entities: [
        { name: "hub", color: C.green, fields: [{ f: "id", t: "UUID", note: "PK" }, { f: "name", t: "VARCHAR" }, { f: "address", t: "TEXT" }, { f: "tenantId", t: "VARCHAR" }, { f: "status", t: "ENUM" }, { f: "createdAt", t: "TIMESTAMP" }] },
        { name: "company", color: C.blue, fields: [{ f: "id", t: "UUID", note: "PK" }, { f: "name", t: "VARCHAR" }, { f: "ruc", t: "VARCHAR" }, { f: "type", t: "ENUM" }, { f: "status", t: "ENUM" }] },
        { name: "project", color: C.blue, fields: [{ f: "id", t: "UUID", note: "PK" }, { f: "name", t: "VARCHAR" }, { f: "companyId", t: "UUID", note: "FK" }, { f: "status", t: "ENUM" }, { f: "startDate", t: "DATE" }] },
        { name: "project_company", color: C.purple, fields: [{ f: "id", t: "UUID", note: "PK" }, { f: "projectId", t: "UUID", note: "FK" }, { f: "companyId", t: "UUID", note: "FK" }, { f: "role", t: "ENUM" }, { f: "startDate", t: "DATE" }, { f: "status", t: "ENUM" }] },
        { name: "product", color: C.orange, fields: [{ f: "id", t: "UUID", note: "PK" }, { f: "companyId", t: "UUID", note: "FK" }, { f: "name", t: "VARCHAR" }, { f: "type", t: "ENUM" }, { f: "brand", t: "VARCHAR" }, { f: "model", t: "VARCHAR" }, { f: "status", t: "ENUM" }] },
      ],
    },
    inventory: {
      label: "Inventario & Kardex", color: C.orange,
      desc: "Alto volumen — sin FK constraints en kardex ni inventario. Usan índices compensatorios.",
      fkNote: "kardex_movement y hub_inventory usan campos planos sin FK. Validación en capa de aplicación.",
      entities: [
        { name: "hub_inventory", color: C.orange, note: "sin FK", fields: [{ f: "id", t: "UUID", note: "PK" }, { f: "hubId", t: "UUID", note: "campo" }, { f: "tenantId", t: "VARCHAR", note: "campo" }, { f: "projectId", t: "UUID", note: "campo" }, { f: "productId", t: "UUID", note: "campo" }, { f: "quantity", t: "INTEGER" }, { f: "type", t: "ENUM" }] },
        { name: "equipment_unit_inventory", color: C.teal, fields: [{ f: "id", t: "UUID", note: "PK" }, { f: "hubId", t: "UUID", note: "campo" }, { f: "tenantId", t: "VARCHAR", note: "campo" }, { f: "productId", t: "UUID", note: "campo" }, { f: "serialNumber", t: "VARCHAR", note: "IDX" }, { f: "mac", t: "VARCHAR" }, { f: "status", t: "ENUM" }] },
        { name: "kardex_movement", color: C.purple, note: "sin FK", fields: [{ f: "id", t: "UUID", note: "PK" }, { f: "hubId", t: "UUID", note: "campo" }, { f: "tenantId", t: "VARCHAR", note: "campo" }, { f: "projectId", t: "UUID", note: "campo" }, { f: "productId", t: "UUID", note: "campo" }, { f: "movementType", t: "ENUM" }, { f: "quantity", t: "INTEGER" }, { f: "serialNumber", t: "VARCHAR", note: "IDX" }, { f: "referenceId", t: "UUID" }, { f: "date", t: "TIMESTAMP", note: "IDX" }] },
      ],
    },
    supply: {
      label: "Abastecimiento", color: C.teal,
      desc: "FK en cabecera e ítems. Sin FK en delivery_item para optimizar inserts en entregas con muchos productos.",
      fkNote: "supply_request_delivery_item usa campos planos sin FK — índices compensatorios en delivery_id y supply_request_item_id.",
      entities: [
        { name: "supply_request", color: C.green, fields: [{ f: "id", t: "UUID", note: "PK" }, { f: "hubId", t: "UUID", note: "FK" }, { f: "tenantId", t: "VARCHAR" }, { f: "projectId", t: "UUID" }, { f: "status", t: "ENUM" }, { f: "generatedBy", t: "UUID" }, { f: "createdAt", t: "TIMESTAMP" }, { f: "updatedAt", t: "TIMESTAMP" }] },
        { name: "supply_request_item", color: C.blue, fields: [{ f: "id", t: "UUID", note: "PK" }, { f: "supplyRequestId", t: "UUID", note: "FK" }, { f: "productId", t: "UUID" }, { f: "suggestedQuantity", t: "INTEGER" }, { f: "requiredQuantity", t: "INTEGER" }, { f: "partialQuantity", t: "INTEGER" }, { f: "deliveredQuantity", t: "INTEGER" }, { f: "itemStatus", t: "ENUM" }] },
        { name: "supply_request_delivery", color: C.orange, fields: [{ f: "id", t: "UUID", note: "PK" }, { f: "supplyRequestId", t: "UUID", note: "FK" }, { f: "deliveryDate", t: "DATE" }, { f: "receivedBy", t: "UUID" }, { f: "notes", t: "TEXT" }, { f: "createdAt", t: "TIMESTAMP" }] },
        { name: "supply_request_delivery_item", color: C.purple, note: "sin FK", fields: [{ f: "id", t: "UUID", note: "PK" }, { f: "deliveryId", t: "UUID", note: "IDX" }, { f: "supplyRequestItemId", t: "UUID", note: "IDX" }, { f: "quantityDelivered", t: "INTEGER" }] },
      ],
    },
    dispatch: {
      label: "Despacho a Cuadrillas", color: C.red,
      desc: "Cabecera con FK a hub. Detalles con campos planos para optimizar inserts en despachos masivos.",
      fkNote: "dispatch_assistant y dispatch_item usan dispatchId como campo plano — índices compensatorios requeridos.",
      entities: [
        { name: "dispatch", color: C.red, fields: [{ f: "id", t: "UUID", note: "PK" }, { f: "hubId", t: "UUID", note: "FK" }, { f: "tenantId", t: "VARCHAR" }, { f: "projectId", t: "UUID" }, { f: "dispatchedBy", t: "UUID" }, { f: "workerId", t: "UUID", note: "IDX" }, { f: "contractorId", t: "UUID", note: "IDX null=LPS" }, { f: "status", t: "ENUM" }, { f: "dispatchDate", t: "TIMESTAMP" }, { f: "createdAt", t: "TIMESTAMP" }, { f: "updatedAt", t: "TIMESTAMP" }] },
        { name: "dispatch_assistant", color: C.orange, note: "sin FK", fields: [{ f: "id", t: "UUID", note: "PK" }, { f: "dispatchId", t: "UUID", note: "IDX" }, { f: "workerId", t: "UUID" }] },
        { name: "dispatch_item", color: C.purple, note: "sin FK", fields: [{ f: "id", t: "UUID", note: "PK" }, { f: "dispatchId", t: "UUID", note: "IDX" }, { f: "productId", t: "UUID" }, { f: "serialNumber", t: "VARCHAR", note: "IDX" }, { f: "quantity", t: "INTEGER" }, { f: "itemType", t: "ENUM" }, { f: "itemStatus", t: "ENUM" }] },
      ],
    },
    master: {
      label: "Maestros Auxiliares", color: C.mid,
      desc: "Temporales hasta que exista lps-master-service. Se migrarán sin romper contratos de API.",
      fkNote: "Temporales — se migrarán a lps-master-service cuando se extraiga ese servicio.",
      entities: [
        { name: "worker", color: C.teal, fields: [{ f: "id", t: "UUID", note: "PK" }, { f: "name", t: "VARCHAR" }, { f: "dni", t: "VARCHAR" }, { f: "role", t: "ENUM" }, { f: "contractorId", t: "UUID" }, { f: "hubId", t: "UUID" }, { f: "status", t: "ENUM" }] },
        { name: "contractor", color: C.orange, fields: [{ f: "id", t: "UUID", note: "PK" }, { f: "name", t: "VARCHAR" }, { f: "ruc", t: "VARCHAR" }, { f: "projectId", t: "UUID" }, { f: "status", t: "ENUM" }] },
      ],
    },
  };
  const g = groups[group];

  return (
    <div>
      <SectionH accent={C.teal}>Modelo de Datos — lps-logistics-service</SectionH>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {Object.entries(groups).map(([key, val]: any) => (
          <button key={key} onClick={() => setGroup(key)} style={{
            padding: "5px 14px", borderRadius: 6, border: `1px solid ${group === key ? val.color : C.border}`,
            background: group === key ? val.color : C.surface, color: group === key ? "#fff" : C.mid,
            cursor: "pointer", fontSize: 11, fontWeight: 600, transition: "all 0.15s",
          }}>{val.label}</button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <div style={{ flex: 1, padding: "10px 14px", borderRadius: 7, background: C.alt, border: `1px solid ${C.border}`, fontSize: 12, color: C.mid }}>{g.desc}</div>
        <div style={{ flex: 1, padding: "10px 14px", borderRadius: 7, background: C.orangeBg, border: `1px solid ${C.orange}30`, fontSize: 11, color: C.orange, fontFamily: "'JetBrains Mono', monospace" }}><strong>FK Decision:</strong> {g.fkNote}</div>
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {g.entities.map((entity: any) => (
          <div key={entity.name} style={{ flex: "1 1 220px", borderRadius: 10, overflow: "hidden", border: `1px solid ${entity.color}30`, minWidth: 200 }}>
            <div style={{ padding: "9px 14px", background: entity.color + "15", borderBottom: `1px solid ${entity.color}25`, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: entity.color, fontFamily: "'JetBrains Mono', monospace" }}>{entity.name}</span>
              {entity.note && <Badge color={C.orange} bg={C.orangeBg}>{entity.note}</Badge>}
            </div>
            <div style={{ padding: "10px 14px", background: C.surface }}>
              {entity.fields.map((field: any, i: number) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 0", borderBottom: i < entity.fields.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <span style={{ fontSize: 11, color: field.f === "id" ? C.light : C.ink, fontFamily: "'JetBrains Mono', monospace", fontWeight: field.note && field.note !== "PK" ? 700 : 400 }}>{field.f}</span>
                  <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                    <span style={{ fontSize: 9, color: C.light, fontFamily: "'JetBrains Mono', monospace" }}>{field.t}</span>
                    {field.note && field.note !== "PK" && (
                      <span style={{
                        fontSize: 8, padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700,
                        background: field.note === "FK" ? C.blueBg : field.note === "IDX" ? C.greenBg : field.note.includes("null") ? C.orangeBg : C.purpleBg,
                        color: field.note === "FK" ? C.blue : field.note === "IDX" ? C.green : field.note.includes("null") ? C.orange : C.purple,
                      }}>{field.note}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 14, display: "flex", gap: 12 }}>
        {[
          { label: "FK", desc: "Foreign Key constraint en DB", color: C.blue, bg: C.blueBg },
          { label: "IDX", desc: "Índice compensatorio — sin FK constraint", color: C.green, bg: C.greenBg },
          { label: "sin FK", desc: "Campo plano — validación en aplicación", color: C.orange, bg: C.orangeBg },
        ].map(l => (
          <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Badge color={l.color} bg={l.bg}>{l.label}</Badge>
            <span style={{ fontSize: 11, color: C.light }}>{l.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function APIsTab() {
  const [active, setActive] = useState(0);
  const groups = [
    {
      priority: "P1", name: "Hubs", color: C.green,
      apis: [
        { m: "POST", p: "/api/v1/hubs", d: "Crear hub" },
        { m: "GET", p: "/api/v1/hubs", d: "Listar hubs del tenant" },
        { m: "GET", p: "/api/v1/hubs/{hubId}", d: "Obtener hub por ID" },
        { m: "PUT", p: "/api/v1/hubs/{hubId}", d: "Actualizar hub" },
        { m: "DELETE", p: "/api/v1/hubs/{hubId}", d: "Desactivar hub (soft delete)" },
      ],
    },
    {
      priority: "P2", name: "Catálogos", color: C.blue,
      apis: [
        { m: "POST", p: "/api/v1/catalog/companies", d: "Crear empresa (razón social LPS)" },
        { m: "GET", p: "/api/v1/catalog/companies", d: "Listar empresas" },
        { m: "GET", p: "/api/v1/catalog/companies/{companyId}", d: "Obtener empresa" },
        { m: "PUT", p: "/api/v1/catalog/companies/{companyId}", d: "Actualizar empresa" },
        { m: "DELETE", p: "/api/v1/catalog/companies/{companyId}", d: "Desactivar empresa" },
        { m: "POST", p: "/api/v1/catalog/projects", d: "Crear proyecto" },
        { m: "GET", p: "/api/v1/catalog/projects", d: "Listar proyectos" },
        { m: "GET", p: "/api/v1/catalog/projects/{projectId}", d: "Obtener proyecto" },
        { m: "PUT", p: "/api/v1/catalog/projects/{projectId}", d: "Actualizar proyecto" },
        { m: "DELETE", p: "/api/v1/catalog/projects/{projectId}", d: "Desactivar proyecto" },
        { m: "GET", p: "/api/v1/catalog/projects/{projectId}/companies", d: "Listar empresas del proyecto" },
        { m: "POST", p: "/api/v1/catalog/companies/{companyId}/products", d: "Crear producto en catálogo empresa" },
        { m: "GET", p: "/api/v1/catalog/companies/{companyId}/products", d: "Productos de la empresa" },
        { m: "GET", p: "/api/v1/catalog/companies/{companyId}/products/{productId}", d: "Obtener producto" },
        { m: "PUT", p: "/api/v1/catalog/companies/{companyId}/products/{productId}", d: "Actualizar producto" },
        { m: "DELETE", p: "/api/v1/catalog/companies/{companyId}/products/{productId}", d: "Desactivar producto" },
        { m: "GET", p: "/api/v1/catalog/companies/{companyId}/products?type=EQUIPMENT", d: "Filtrar solo equipos" },
        { m: "GET", p: "/api/v1/catalog/companies/{companyId}/products?type=MATERIAL", d: "Filtrar solo materiales" },
        { m: "GET", p: "/api/v1/catalog/companies/{companyId}/products?type=TOOL", d: "Filtrar solo herramientas" },
      ],
    },
    {
      priority: "P3", name: "Abastecimiento", color: C.orange,
      apis: [
        { m: "POST", p: "/api/v1/supply-requests/generate", d: "Generar solicitud sugerida desde análisis de kardex" },
        { m: "POST", p: "/api/v1/supply-requests", d: "Crear solicitud manual sin consultar kardex" },
        { m: "POST", p: "/api/v1/supply-requests/upload-excel", d: "Carga masiva de solicitudes por Excel" },
        { m: "GET", p: "/api/v1/supply-requests", d: "Listar solicitudes con filtros (estado, hub, fecha)" },
        { m: "GET", p: "/api/v1/supply-requests/{requestId}", d: "Obtener solicitud con sus ítems" },
        { m: "PUT", p: "/api/v1/supply-requests/{requestId}/submit", d: "Enviar a aprobación (BORRADOR → pendiente aprobador)" },
        { m: "PUT", p: "/api/v1/supply-requests/{requestId}/approve", d: "Aprobar solicitud (→ APROBADO)" },
        { m: "PUT", p: "/api/v1/supply-requests/{requestId}/reject", d: "Rechazar solicitud (→ RECHAZADO)" },
        { m: "PUT", p: "/api/v1/supply-requests/{requestId}/cancel", d: "Cancelar solicitud" },
        { m: "POST", p: "/api/v1/supply-requests/{requestId}/deliveries", d: "Registrar entrega — parcial o total (@Transactional)" },
        { m: "GET", p: "/api/v1/supply-requests/{requestId}/deliveries", d: "Historial de todas las entregas de la solicitud" },
        { m: "GET", p: "/api/v1/supply-requests/{requestId}/deliveries/summary", d: "Resumen: pedido vs entregado por ítem" },
      ],
    },
    {
      priority: "P4", name: "Inventario", color: C.purple,
      apis: [
        { m: "GET", p: "/api/v1/inventory/{hubId}", d: "Inventario agregado total del hub (todos los tipos)" },
        { m: "GET", p: "/api/v1/inventory/{hubId}/equipment", d: "Solo equipos del hub" },
        { m: "GET", p: "/api/v1/inventory/{hubId}/materials", d: "Solo materiales del hub" },
        { m: "GET", p: "/api/v1/inventory/{hubId}/tools", d: "Solo herramientas del hub" },
        { m: "GET", p: "/api/v1/inventory/{hubId}/units", d: "Unidades con serial (filtros: status, productId)" },
        { m: "GET", p: "/api/v1/inventory/{hubId}/units/{serialNumber}", d: "Detalle completo de unidad por serial" },
      ],
    },
    {
      priority: "P5", name: "Maestros", color: C.mid,
      apis: [
        { m: "POST", p: "/api/v1/contractors", d: "Crear contratista externo" },
        { m: "GET", p: "/api/v1/contractors", d: "Listar contratistas" },
        { m: "GET", p: "/api/v1/contractors/{contractorId}", d: "Obtener contratista" },
        { m: "PUT", p: "/api/v1/contractors/{contractorId}", d: "Actualizar contratista" },
        { m: "POST", p: "/api/v1/workers", d: "Crear trabajador (LPS o contratista)" },
        { m: "GET", p: "/api/v1/workers", d: "Listar trabajadores" },
        { m: "GET", p: "/api/v1/workers/{workerId}", d: "Obtener trabajador" },
        { m: "PUT", p: "/api/v1/workers/{workerId}", d: "Actualizar trabajador" },
        { m: "GET", p: "/api/v1/workers/{workerId}/custody", d: "Ver qué tiene actualmente en su poder el técnico" },
      ],
    },
    {
      priority: "P6", name: "Despacho", color: C.red,
      apis: [
        { m: "POST", p: "/api/v1/dispatches", d: "Generar despacho — SALIDA kardex + descuenta inventario (@Transactional)" },
        { m: "GET", p: "/api/v1/dispatches", d: "Listar despachos con filtros (hub, técnico, estado)" },
        { m: "GET", p: "/api/v1/dispatches/{dispatchId}", d: "Obtener despacho con jefe y ayudantes" },
        { m: "GET", p: "/api/v1/dispatches/{dispatchId}/items", d: "Ítems del despacho con estado por ítem" },
        { m: "POST", p: "/api/v1/dispatches/{dispatchId}/transfer", d: "Transferir ítem entre técnicos — NO toca kardex" },
        { m: "POST", p: "/api/v1/dispatches/{dispatchId}/return", d: "Devolver ítems al hub — REINGRESO kardex (@Transactional)" },
        { m: "GET", p: "/api/v1/dispatches/worker/{workerId}/active", d: "Custodia activa de un técnico específico" },
        { m: "GET", p: "/api/v1/dispatches/hub/{hubId}/active", d: "Todo lo que está fuera del hub actualmente" },
      ],
    },
  ];
  const g = groups[active];
  return (
    <div>
      <SectionH accent={C.blue}>APIs — lps-logistics-service</SectionH>
      <div style={{ padding: "10px 14px", borderRadius: 7, background: C.blueBg, border: `1px solid ${C.blue}30`, fontSize: 11, color: C.blue, marginBottom: 16, fontFamily: "'JetBrains Mono', monospace" }}>
        Headers requeridos en <strong>TODAS</strong> las rutas: &nbsp;<strong>X-Tenant-Id</strong> &nbsp;·&nbsp; <strong>X-Project-Id</strong>
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 18, flexWrap: "wrap" }}>
        {groups.map((gr, i) => (
          <button key={i} onClick={() => setActive(i)} style={{
            padding: "5px 14px", borderRadius: 6, border: `1px solid ${active === i ? gr.color : C.border}`,
            background: active === i ? gr.color : C.surface, color: active === i ? "#fff" : C.mid,
            cursor: "pointer", fontSize: 11, fontWeight: 600, transition: "all 0.15s",
          }}>
            <span style={{ opacity: 0.7, marginRight: 4 }}>{gr.priority}</span>{gr.name}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {g.apis.map((api, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 14px", borderRadius: 7, background: C.surface, border: `1px solid ${C.border}` }}>
            <Tag method={api.m} />
            <span style={{ fontSize: 12, color: C.ink, fontFamily: "'JetBrains Mono', monospace", flex: 1 }}>{api.p}</span>
            <span style={{ fontSize: 11, color: C.light }}>{api.d}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MS2MS3Tab() {
  return (
    <div>
      <div style={{ display: "flex", gap: 20 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <Badge color="#fff" bg={C.blue}>OPS</Badge>
            <span style={{ fontSize: 11, color: C.light, fontFamily: "'JetBrains Mono', monospace" }}>Microservicio 2 de 3</span>
          </div>
          <SectionH accent={C.blue}>lps-workorder-service</SectionH>
          {[
            { name: "Carga Masiva Excel", desc: "Importación diaria de órdenes de servicio asignadas por Claro. Procesamiento batch optimizado para miles de registros.", color: C.blue },
            { name: "Asignación de Órdenes", desc: "Las órdenes pueden venir asignadas directamente por Claro o ser reasignadas internamente por LPS a cuadrillas específicas.", color: C.blue },
            { name: "Ejecución por Técnico", desc: "Los técnicos completan datos faltantes y seleccionan qué equipos del despacho utilizaron en cada orden ejecutada.", color: C.blue },
            { name: "Trazabilidad Contratista", desc: "Campo contractorId en cada orden para segregar la producción entre personal LPS propio y contratistas externos.", color: C.blue },
            { name: "Exportable para Liquidaciones", desc: "Export de órdenes ejecutadas por periodo, por técnico y por contratista para el área contable de LPS.", color: C.blue },
          ].map((mod, i) => (
            <Card key={i} style={{ marginBottom: 10, borderLeft: `3px solid ${mod.color}` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.ink, marginBottom: 5 }}>{mod.name}</div>
              <div style={{ fontSize: 12, color: C.mid, lineHeight: 1.6 }}>{mod.desc}</div>
            </Card>
          ))}
          <div style={{ padding: "11px 14px", borderRadius: 8, background: C.blueBg, border: `1px solid ${C.blue}30`, fontSize: 12, color: C.blue }}>
            <strong>Consume de logistics-service:</strong> WebClient para consultar qué tiene despachado cada técnico antes de registrar uso
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <Badge color="#fff" bg={C.orange}>BI</Badge>
            <span style={{ fontSize: 11, color: C.light, fontFamily: "'JetBrains Mono', monospace" }}>Microservicio 3 de 3</span>
          </div>
          <SectionH accent={C.orange}>lps-reporting-service</SectionH>
          {[
            { name: "Supervisión Diaria", desc: "Monitoreo en tiempo real de órdenes ejecutadas por día, por cuadrilla y por hub.", color: C.orange },
            { name: "Productividad por Técnico", desc: "Cuántas órdenes ejecutó cada técnico en un periodo. Base para cálculo de liquidaciones a Claro.", color: C.orange },
            { name: "Análisis por Contratista", desc: "Segregación de producción entre personal LPS y contratistas externos para comparativas operativas.", color: C.orange },
            { name: "Comparativas Regionales", desc: "Al expandir a 5 regiones, permite comparar performance entre Lima, Arequipa, Trujillo y más.", color: C.orange },
            { name: "Exportables Contabilidad", desc: "Export estructurado en el formato que necesita el área de liquidaciones. No calcula pagos.", color: C.orange },
          ].map((mod, i) => (
            <Card key={i} style={{ marginBottom: 10, borderLeft: `3px solid ${mod.color}` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.ink, marginBottom: 5 }}>{mod.name}</div>
              <div style={{ fontSize: 12, color: C.mid, lineHeight: 1.6 }}>{mod.desc}</div>
            </Card>
          ))}
          <div style={{ padding: "11px 14px", borderRadius: 8, background: C.orangeBg, border: `1px solid ${C.orange}30`, fontSize: 12, color: C.orange }}>
            <strong>Principio:</strong> 100% lectura — nunca escribe en otros servicios. Consume de logistics-service y workorder-service.
          </div>
        </div>
      </div>
      <div style={{ marginTop: 24, padding: "14px 18px", borderRadius: 8, background: C.alt, border: `1px solid ${C.border}` }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.mid, fontFamily: "'JetBrains Mono', monospace", marginBottom: 8, letterSpacing: 1 }}>LPS-MASTER-SERVICE (FUTURO)</div>
        <div style={{ fontSize: 12, color: C.mid, lineHeight: 1.7 }}>
          Maestro central de entidades transversales. Se extraerá cuando la escala lo justifique. <strong>Contendrá:</strong> Empresas, proyectos, trabajadores, contratistas y roles. Mientras tanto estas entidades viven como maestros auxiliares temporales en lps-logistics-service.
        </div>
      </div>
    </div>
  );
}

function DecisionesTab() {
  return (
    <div>
      <SectionH accent={C.blue}>Decisiones Técnicas Clave</SectionH>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {[
          {
            n: "01", title: "@Transactional Unificado", icon: "⚡", color: C.green, bg: C.greenBg,
            desc: "Kardex, inventario y despacho comparten la misma base de datos PostgreSQL. Una sola transacción Spring garantiza atomicidad completa sin necesidad de Two-Phase Commit ni XA Transactions.",
            code: `@Transactional
public void ejecutarDespacho(DespachoCommand cmd) {
    despachoRepository.save(...);        // custodia
    kardexMovementRepository.save(...);  // SALIDA
    inventoryService.decreaseStock(...); // stock
    // Si falla cualquiera → rollback automático
}`,
            why: "Dos DataSources distintos requieren JtaTransactionManager con XA, lo que añade infraestructura (Atomikos/Bitronix), degrada performance por locks y puede dejar transacciones in-doubt si el coordinador falla.",
          },
          {
            n: "02", title: "FK Selectivas por Volumen", icon: "🔗", color: C.blue, bg: C.blueBg,
            desc: "Solo las entidades de bajo volumen de inserts tienen FK constraints en base de datos. Las tablas de alto volumen (kardex, inventario, dispatch_item) usan campos planos con índices compensatorios.",
            code: `-- Alto volumen: sin FK, con índice
CREATE INDEX idx_kardex_hub_id ON kardex_movement(hub_id);
CREATE INDEX idx_kardex_serial ON kardex_movement(serial_number);

-- JPA sin @ManyToOne
@Column(name = "hub_id", nullable = false)
private UUID hubId;`,
            why: "Cada FK constraint implica una verificación de existencia en la tabla padre en cada INSERT. En tablas con miles de movimientos diarios el overhead se acumula significativamente.",
          },
          {
            n: "03", title: "Context Headers", icon: "📡", color: C.orange, bg: C.orangeBg,
            desc: "El tenantId y projectId viajan como headers HTTP en todas las peticiones. Un filtro global los captura e inyecta en el contexto del request sin contaminar la firma de cada endpoint.",
            code: `// Filter global (una vez, no en cada controller)
@Component
public class TenantContextFilter implements Filter {
    public void doFilter(request, response, chain) {
        String tenantId = request.getHeader("X-Tenant-Id");
        String projectId = request.getHeader("X-Project-Id");
        TenantContext.set(tenantId, projectId);
        chain.doFilter(request, response);
    }
}`,
            why: "Alternativa era pasar tenantId y projectId como @PathVariable o @RequestParam en cada endpoint. Con 40+ APIs eso contamina todos los contratos y complica los tests.",
          },
          {
            n: "04", title: "contractorId null = Personal LPS", icon: "🏢", color: C.purple, bg: C.purpleBg,
            desc: "Personal propio de LPS siempre tiene contractorId = null en los despachos. LPS nunca se registra como contratista de sí misma. Esto mantiene la analítica limpia y las queries simples.",
            code: `-- Producción contratistas externos
SELECT workerId, COUNT(*) 
FROM dispatch 
WHERE contractor_id IS NOT NULL
  AND dispatch_date BETWEEN ? AND ?
GROUP BY workerId;

-- Producción personal LPS
WHERE contractor_id IS NULL`,
            why: "Si LPS se registrara como su propio contratista habría que excluirla explícitamente en cada query analítica. Eso genera bugs difíciles de detectar y reportes incorrectos en liquidaciones.",
          },
          {
            n: "05", title: "RabbitMQ + Outbox Pattern", icon: "📨", color: C.red, bg: C.redBg,
            desc: "Las escrituras críticas entre microservicios distintos van por eventos con garantía de entrega. El Outbox Pattern asegura que el evento no se pierda aunque el broker esté caído en el momento del write.",
            code: `// Outbox: escribe en DB y tabla de eventos en la misma transacción
@Transactional
public void procesarOrden(Orden orden) {
    ordenRepository.save(orden);
    outboxRepository.save(
        OutboxEvent.of("orden.completada", orden.getId())
    );
    // Proceso separado lee outbox y publica a RabbitMQ
}`,
            why: "Sin Outbox Pattern: servicio escribe, llama a RabbitMQ, RabbitMQ timeout → inconsistencia sin rollback posible. Con Outbox: la escritura y el evento son atómicos en la misma DB transaction.",
          },
          {
            n: "06", title: "Schemas Separados en PostgreSQL", icon: "🗄️", color: C.teal, bg: C.tealBg,
            desc: "Cada microservicio tiene su propio schema de PostgreSQL (logistics, workorders, reporting). Aislamiento lógico en Phase 1 que permite migración a bases de datos físicas separadas en Phase 2 sin cambiar código.",
            code: `-- Phase 1: misma instancia, schemas separados
logistics.kardex_movement
logistics.hub_inventory
workorders.service_orders
reporting.liquidations

-- Phase 2 Regiones: logistics en servidor propio por región
jdbc:postgresql://lima-db:5432/lps?currentSchema=logistics
jdbc:postgresql://arequipa-db:5432/lps?currentSchema=logistics`,
            why: "Credenciales separadas por schema limitan lo que cada servicio puede ver en DB. La extracción a bases de datos físicas en Phase 2 es operacional (cambio de URL de conexión) sin tocar el código.",
          },
        ].map(d => (
          <Card key={d.n} style={{ borderLeft: `4px solid ${d.color}` }}>
            <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: d.bg, border: `1px solid ${d.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{d.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <span style={{ fontSize: 9, color: d.color, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>DECISIÓN {d.n}</span>
                  <span style={{ fontSize: 15, fontWeight: 700, color: C.ink }}>{d.title}</span>
                </div>
                <p style={{ fontSize: 12, color: C.mid, lineHeight: 1.7, margin: "0 0 12px" }}>{d.desc}</p>
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ flex: 1 }}><CodeBlock>{d.code}</CodeBlock></div>
                  <div style={{ width: 240, padding: "10px 14px", borderRadius: 7, background: d.bg, border: `1px solid ${d.color}25` }}>
                    <div style={{ fontSize: 9, fontWeight: 700, color: d.color, fontFamily: "'JetBrains Mono', monospace", marginBottom: 6, letterSpacing: 1 }}>¿POR QUÉ?</div>
                    <div style={{ fontSize: 11, color: C.mid, lineHeight: 1.65 }}>{d.why}</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function EscalaTab() {
  return (
    <div>
      <SectionH accent={C.green}>Plan de Escalabilidad</SectionH>
      <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
        {[
          {
            phase: "Fase 1", name: "Lima", color: C.green, bg: C.greenBg,
            items: ["3 microservicios desplegados en Docker", "PostgreSQL con 3 schemas separados en una instancia", "RabbitMQ para eventos críticos entre servicios", "API Gateway centralizado", "HikariCP pool: 20 conexiones por servicio"],
          },
          {
            phase: "Fase 2", name: "5 Regiones Perú", color: C.blue, bg: C.blueBg,
            items: ["1 instancia de lps-logistics-service por región", "Bases de datos físicamente separadas por región", "Aislamiento geográfico real: Lima no afecta Arequipa", "Servicio de consolidación nacional para reportes", "Config Server para gestionar configuración centralizada"],
          },
          {
            phase: "Fase 3", name: "LATAM", color: C.orange, bg: C.orangeBg,
            items: ["Mismo proyecto desplegado por país en servidores distintos", "Evaluación de migración de RabbitMQ a Kafka si el volumen lo justifica", "lps-master-service extraído como servicio independiente", "Nuevos verticales: torres de comunicaciones"],
          },
        ].map(p => (
          <Card key={p.phase} style={{ flex: 1, background: p.bg, border: `1px solid ${p.color}25` }}>
            <div style={{ fontSize: 9, letterSpacing: 3, fontWeight: 700, color: p.color, fontFamily: "'JetBrains Mono', monospace", marginBottom: 6, textTransform: "uppercase" }}>{p.phase}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: C.ink, marginBottom: 20, fontFamily: "'Sora', sans-serif" }}>{p.name}</div>
            {p.items.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: p.color, marginTop: 5, flexShrink: 0 }} />
                <div style={{ fontSize: 12, color: C.mid, lineHeight: 1.5 }}>{item}</div>
              </div>
            ))}
          </Card>
        ))}
      </div>

      <SubH accent={C.purple}>Pendiente por Debatir</SubH>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {[
          "Modelo detallado de entidades JPA de lps-logistics-service",
          "Estrategia de herencia JPA para inventario (JOINED vs SINGLE_TABLE)",
          "Estructura interna hexagonal completa por módulo",
          "lps-workorder-service: flujo completo y APIs detalladas",
          "lps-master-service: timing de extracción y alcance exacto",
          "Roles y permisos: técnico, supervisor, administrador de hub",
          "Estrategia de despliegue y Config Server",
          "Kardex: lógica del algoritmo de sugerencia automática de cantidades",
        ].map((item, i) => (
          <div key={i} style={{ padding: "7px 14px", borderRadius: 6, background: C.purpleBg, border: `1px solid ${C.purple}25`, fontSize: 12, color: C.purple }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

const tabContent: Record<string, JSX.Element> = {
  resumen: <ResumenTab />,
  entidades: <EntidadesTab />,
  flujo: <FlujoTab />,
  arquitectura: <ArquitecturaTab />,
  ms1: <MS1Tab />,
  tablas: <TablasTab />,
  apis: <APIsTab />,
  ms2ms3: <MS2MS3Tab />,
  decisiones: <DecisionesTab />,
  escala: <EscalaTab />,
};

export default function LpsPresentation() {
  const [active, setActive] = useState("resumen");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #CEC9BF; border-radius: 3px; }
        button { outline: none; }
      `}</style>
      <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Sora', sans-serif" }}>
        {/* Top bar */}
        <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "0 32px", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, maxWidth: 1300, margin: "0 auto" }}>
            <div style={{ padding: "14px 0", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
              <div style={{ width: 4, height: 20, background: C.green, borderRadius: 2 }} />
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: -0.2 }}>LPS ERP Latam</div>
                <div style={{ fontSize: 9, color: C.light, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 0.5 }}>SECCIÓN ALTAS · 2026</div>
              </div>
            </div>
            <div style={{ width: 1, height: 32, background: C.border, flexShrink: 0 }} />
            <div style={{ display: "flex", gap: 2, overflowX: "auto", flex: 1 }}>
              {TABS.map(tab => (
                <button key={tab.id} onClick={() => setActive(tab.id)} style={{
                  padding: "18px 16px", border: "none", background: "transparent",
                  fontSize: 12, fontWeight: active === tab.id ? 700 : 500,
                  color: active === tab.id ? C.green : C.mid,
                  cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
                  borderBottom: active === tab.id ? `2px solid ${C.green}` : "2px solid transparent",
                  transition: "all 0.15s",
                }}>{tab.label}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ maxWidth: 1300, margin: "0 auto", padding: "32px 32px" }}>
          {tabContent[active]}
        </div>
      </div>
    </>
  );
}