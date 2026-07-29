# Auditoría Interna Especial — Servicio Walmart Chile

Presentación web del Informe Final de la Auditoría Interna Especial sobre el Servicio Walmart Chile (Grupo ALTO · Control Interno y Gobernanza).

**Fuente:** Informe Final v5 · 28 de julio de 2026 · Borrador para revisión de la Dirección, no emitido.

## Estructura

1. **Portada** — encargo, metodología (IIA), Dirección de Auditoría y Sponsor.
2. **El problema** — el incidente con el cliente (8.004 → 4.322 → 2.839), la causa raíz (mala gestión: la información se produce sin control sobre su propia elaboración) y el problema reputacional (se atribuyó la diferencia a la migración sin validarlo).
3. **Resultados** — 29 observaciones, 15 hallazgos (2 críticos · 10 altos · 3 medios), resultado general, fortalezas/debilidades y las dos acciones que no admiten espera.
4. **Patrones** — los cuatro patrones por causa raíz y la decisión de gobierno que ataca cada uno.
5. **Hallazgos** — los quince hallazgos uno a uno (acordeón), con clasificación, severidad, observación de origen, criterio y acciones del plan.
6. **Plan** — las trece acciones del plan consolidado de remediación.

## Stack

Sitio estático (HTML/CSS/JS vanilla) con el sistema de diseño ALTO (tokens de alto.us, fuente Raleway, animaciones AOS). Publicable en GitHub Pages tal cual (`.nojekyll` incluido).

- `index.html` — estructura y contenido fijo
- `styles.css` — sistema de diseño base (compartido con la presentación del Roadmap)
- `audit.css` — estilos específicos de esta presentación
- `hallazgos.js` — datos: 15 hallazgos, 4 patrones, plan de 13 acciones
- `script.js` — interacciones y render de las secciones dinámicas

**Clasificación del contenido: USO INTERNO Y CONFIDENCIAL.**
