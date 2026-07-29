// ============================================================
//  Auditoría WM — interactions
// ============================================================

// --- AOS scroll animations (same lib ALTO uses) ---
if (window.AOS) {
  AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 80 });
}

// --- Scroll progress bar + header shadow + scroll-to-top ---
const progress = document.getElementById('scrollProgress');
const header = document.getElementById('siteHeader');
const scrollTopBtn = document.getElementById('scrollTop');

function onScroll() {
  const scrollTop = window.scrollY;
  const docH = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docH > 0 ? (scrollTop / docH) * 100 : 0;
  if (progress) progress.style.width = pct + '%';
  if (header) header.classList.toggle('scrolled', scrollTop > 20);
  if (scrollTopBtn) scrollTopBtn.classList.toggle('show', scrollTop > 600);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

scrollTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// --- Mobile nav toggle ---
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
navToggle?.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  mainNav.classList.toggle('open');
});
mainNav?.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    navToggle.classList.remove('open');
    mainNav.classList.remove('open');
  })
);

// --- Active nav link on scroll (scroll-spy) ---
const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.main-nav a')];
const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const id = e.target.id;
        navLinks.forEach((l) =>
          l.classList.toggle('active', l.getAttribute('href') === '#' + id)
        );
      }
    });
  },
  { rootMargin: '-45% 0px -50% 0px' }
);
sections.forEach((s) => spy.observe(s));

// --- Glosario: botón del header abre una modal ---
const glosarioBtn = document.getElementById('glosarioBtn');
const glosarioModal = document.getElementById('glosarioModal');
const glosarioClose = document.getElementById('glosarioClose');
function openGlosario() { if (!glosarioModal) return; glosarioModal.hidden = false; requestAnimationFrame(() => glosarioModal.classList.add('open')); document.body.style.overflow = 'hidden'; }
function closeGlosario() { if (!glosarioModal) return; glosarioModal.classList.remove('open'); document.body.style.overflow = ''; setTimeout(() => { glosarioModal.hidden = true; }, 320); }
glosarioBtn?.addEventListener('click', openGlosario);
glosarioClose?.addEventListener('click', closeGlosario);
glosarioModal?.addEventListener('click', (e) => { if (e.target === glosarioModal) closeGlosario(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && glosarioModal && !glosarioModal.hidden) closeGlosario(); });

// --- Animated count-up for stats ---
const counters = document.querySelectorAll('.stat-num[data-count]');
const countObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const duration = 1400;
      const start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * target).toString();
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  },
  { threshold: 0.5 }
);
counters.forEach((c) => countObserver.observe(c));

// ============================================================
//  Render: patrones, hallazgos y plan
// ============================================================
function esc(s) { const d = document.createElement('div'); d.textContent = s == null ? '' : s; return d.innerHTML; }
function sevClass(sev) { return sev === 'Crítica' ? 'critica' : sev === 'Alta' ? 'alta' : 'media'; }

// --- Los cuatro patrones ---
const patronesGrid = document.getElementById('patronesGrid');
if (patronesGrid && window.PATRONES) {
  patronesGrid.innerHTML = window.PATRONES.map((p, i) =>
    '<article class="strat patron" data-aos="' + (i % 2 ? 'fade-left' : 'fade-right') + '">'
    + '<span class="strat-num">' + esc(p.id.replace('P', '')) + '</span>'
    + '<h3>' + esc(p.tit) + '</h3>'
    + '<div class="patron-hals">' + p.hallazgos.map((h) => '<span>' + esc(h) + '</span>').join('') + '</div>'
    + '<p>' + esc(p.comun) + '</p>'
    + '<p class="patron-riesgo"><strong>Riesgo agregado:</strong> ' + esc(p.riesgo) + '</p>'
    + '<div class="patron-accion"><h4>La decisión que lo ataca</h4><p>' + esc(p.accion) + '</p></div>'
    + '</article>'
  ).join('');
}

// --- Acordeón de hallazgos ---
const halAccordion = document.getElementById('halAccordion');
if (halAccordion && window.HALLAZGOS) {
  halAccordion.innerHTML = window.HALLAZGOS.map((h) => {
    const acciones = (h.acciones || []).map((a) => {
      const plan = (window.PLAN || []).find((p) => p.id === a);
      return '<div class="hal-accion"><span class="hal-accion-id">Acción ' + esc(a) + '</span><p>' + esc(plan ? plan.txt : '') + '</p></div>';
    }).join('');
    return '<div class="mp-item" data-code="' + esc(h.code) + '">'
      + '<button class="mp-row" type="button" aria-expanded="false">'
      + '<span class="mp-row-id">' + esc(h.code.replace('HAL-0', 'H')) + '</span>'
      + '<span class="mp-row-title">' + esc(h.tit) + '</span>'
      + '<span class="sev-chip ' + sevClass(h.sev) + '">' + esc(h.sev) + '</span>'
      + '<span class="mp-row-ic" aria-hidden="true"></span>'
      + '</button>'
      + '<div class="mp-detail"><div class="mp-detail-inner">'
      + '<div class="mp-panel-foot hal-meta">'
      + '<span class="mp-id">' + esc(h.code) + '</span>'
      + '<span class="sev-chip ' + sevClass(h.sev) + '">' + esc(h.sev) + '</span>'
      + '<span class="mp-tag key">' + esc(h.cls) + '</span>'
      + '<span class="mp-tag trans">Deriva de: ' + esc(h.deriva) + '</span>'
      + '<span class="mp-tag">' + esc(h.criterio) + '</span>'
      + '</div>'
      + '<p class="mp-what">' + esc(h.desc) + '</p>'
      + '<div class="hal-acciones"><h4>En el plan de remediación</h4>' + acciones + '</div>'
      + '</div></div>'
      + '</div>';
  }).join('');

  halAccordion.querySelectorAll('.mp-row').forEach((row) => {
    row.addEventListener('click', () => {
      const item = row.closest('.mp-item');
      const detail = item.querySelector('.mp-detail');
      const isOpen = item.classList.contains('active');
      if (isOpen) {
        detail.style.maxHeight = detail.scrollHeight + 'px';
        requestAnimationFrame(() => { detail.style.maxHeight = '0px'; });
        item.classList.remove('active');
        row.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        detail.style.maxHeight = detail.scrollHeight + 'px';
        row.setAttribute('aria-expanded', 'true');
        detail.addEventListener('transitionend', function te(e) {
          if (e.propertyName === 'max-height' && item.classList.contains('active')) detail.style.maxHeight = 'none';
          detail.removeEventListener('transitionend', te);
        });
      }
    });
  });
}

// ============================================================
//  Modales genéricos (plan y análisis cuantitativo)
// ============================================================
function wireModal(overlay, closeBtn) {
  if (!overlay) return null;
  function open() { overlay.hidden = false; requestAnimationFrame(() => overlay.classList.add('open')); document.body.style.overflow = 'hidden'; overlay.querySelector('.modal-box').scrollTop = 0; }
  function close() { overlay.classList.remove('open'); document.body.style.overflow = ''; setTimeout(() => { overlay.hidden = true; }, 320); }
  closeBtn?.addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !overlay.hidden) close(); });
  return { open, close };
}
const planModal = wireModal(document.getElementById('planModal'), document.getElementById('planModalClose'));
const quantModal = wireModal(document.getElementById('quantModal'), document.getElementById('quantModalClose'));
const nf = new Intl.NumberFormat('es-CL');
function fmt(n) { return nf.format(n); }

// Íconos de entidad: offender (imputados) y expediente (causas)
const IC_IMP = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
const IC_CAU = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>';
function figIc(label, sm) {
  const cls = sm ? ' sm' : '';
  if (/imputado/i.test(label)) return '<span class="fig-chip imp' + cls + '">' + IC_IMP + '</span>';
  if (/causa/i.test(label)) return '<span class="fig-chip cau' + cls + '">' + IC_CAU + '</span>';
  return '';
}

// ============================================================
//  Análisis cuantitativo: tiles clickeables + barras + modal
// ============================================================
// Puntos del gráfico y botones "desmembrar" → modal de desmembrado
document.querySelectorAll('.qpt, .ss-link').forEach((el) => {
  el.addEventListener('click', () => {
    const b = (window.BASES || [])[+el.dataset.i];
    if (b) openQuantModal(b);
  });
});

// Conclusión: filas de 10 íconos (6 no correspondían / 4 reales)
document.querySelectorAll('.qc-dots[data-ic]').forEach((box) => {
  const ic = box.dataset.ic === 'imp' ? IC_IMP : IC_CAU;
  const bad = +box.dataset.bad || 6;
  let h = '';
  for (let i = 0; i < 10; i++) h += '<span class="ss-dot' + (i < bad ? '' : ' okc') + '">' + ic + '</span>';
  box.innerHTML = h;
});

// Scrollytelling: cada tarjeta enciende su etapa del panel fijo (una instancia por .scrolly)
document.querySelectorAll('.scrolly').forEach((sc) => {
  const staged = [...sc.querySelectorAll('[data-s]')];
  const steps = [...sc.querySelectorAll('.sstep')];
  let stage = -1;
  const stepObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const n = +e.target.dataset.step;
        if (n === stage) return;
        stage = n;
        staged.forEach((el) => el.classList.toggle('on', +el.dataset.s <= n));
        steps.forEach((s) => s.classList.toggle('active', +s.dataset.step === n));
      });
    },
    { rootMargin: '-32% 0px -32% 0px' }
  );
  steps.forEach((s) => stepObserver.observe(s));
});

function halBtn(bl) {
  if (!bl.hal) return '';
  return '<button type="button" class="qm-hal" data-hal="' + esc(bl.hal) + '">Ver hallazgo ' + esc(bl.hal) + ' →</button>';
}

function quantBlockHtml(bl) {
  if (bl.tipo === 'status') {
    return '<div class="qm-block"><h4>' + esc(bl.tit) + '</h4>'
      + bl.bars.map((bar) => {
        const w = Math.round((bar.val / bar.total) * 1000) / 10;
        return '<div class="qm-bar"><span class="qm-bar-label">' + figIc(bar.label, true) + esc(bar.label) + '</span>'
          + '<div class="qm-bar-track"><div class="qm-bar-fill" style="width:' + w + '%"></div></div>'
          + '<span class="qm-bar-val">' + esc(bar.txt) + '</span></div>';
      }).join('')
      + '<p class="qm-nota">' + esc(bl.nota) + '</p>' + halBtn(bl) + '</div>';
  }
  if (bl.tipo === 'delta') {
    return '<div class="qm-block"><h4>' + esc(bl.tit) + '</h4><div class="qm-deltas">'
      + bl.rows.map((r) =>
        '<div class="qm-delta-row"><span class="qm-dl">' + figIc(r.label, true) + esc(r.label) + '</span>'
        + '<span class="qm-dv">' + esc(r.from) + ' → ' + esc(r.to) + '</span>'
        + '<span class="qm-dd">' + esc(r.delta) + ' <em>' + esc(r.pct) + '</em></span></div>'
      ).join('')
      + '</div><p class="qm-nota">' + esc(bl.nota) + '</p>' + halBtn(bl) + '</div>';
  }
  // mags
  return '<div class="qm-block"><h4>' + esc(bl.tit) + '</h4><div class="qm-mags">'
    + bl.items.map((it) => '<div class="qm-mag"><strong>' + esc(it[0]) + '</strong><span>' + esc(it[1]) + '</span></div>').join('')
    + '</div><p class="qm-nota">' + esc(bl.nota) + '</p>' + halBtn(bl) + '</div>';
}

// Cierra el modal cuantitativo y lleva a la ficha del hallazgo, abriéndola.
function gotoHallazgo(code) {
  const item = document.querySelector('.mp-item[data-code="' + code + '"]');
  if (!item) return;
  quantModal?.close();
  setTimeout(() => {
    if (!item.classList.contains('active')) item.querySelector('.mp-row')?.click();
    const y = item.getBoundingClientRect().top + window.scrollY - 110;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }, 360);
}

function openQuantModal(b) {
  const body = document.getElementById('quantModalBody');
  if (!body || !quantModal) return;
  body.innerHTML = '<div class="modal-head">'
    + '<span class="modal-code' + (b.final ? ' ok' : '') + '">' + esc(b.fecha) + '</span>'
    + '<span class="modal-country">' + esc(b.tag) + '</span>'
    + '</div>'
    + '<h3 id="quantModalTitle" class="qm-title">'
    + '<span class="qm-t-fig">' + figIc('imputados') + fmt(b.imputados) + ' <small>imputados tramitados</small></span>'
    + '<span class="qm-t-sep" aria-hidden="true">·</span>'
    + '<span class="qm-t-fig">' + figIc('causas') + fmt(b.causas) + ' <small>causas</small></span>'
    + '</h3>'
    + '<p class="qm-resumen">' + esc(b.resumen) + '</p>'
    + b.bloques.map(quantBlockHtml).join('');
  body.querySelectorAll('.qm-hal').forEach((btn) =>
    btn.addEventListener('click', () => gotoHallazgo(btn.dataset.hal))
  );
  quantModal.open();
}

// ============================================================
//  Plan de remediación: ejes + lista clickeable + modal
// ============================================================
const ejesGrid = document.getElementById('ejesGrid');
if (ejesGrid && window.EJES) {
  ejesGrid.innerHTML = window.EJES.map((e) =>
    '<article class="eje-card"><span class="eje-num">Eje ' + e.n + '</span><h4>' + esc(e.tit) + '</h4><p>' + esc(e.desc) + '</p></article>'
  ).join('');
}

function estadoClass(e) { return e === 'Ejecutado' ? 'ejecutado' : e === 'En curso' ? 'encurso' : 'pendiente'; }

// Las ocho remediaciones como cuadros sobrios en una grilla: número y título;
// al pasar el cursor el cuadro cambia de color y al hacer clic se abre el
// expediente en una modal.
const ETAPAS_REM = ['Diseño', 'Aprobación', 'Implementación', 'Evidencia', 'Validación', 'Cierre'];
const planList = document.getElementById('planList');
if (planList && window.REMS) {
  const TOTAL_REMS = Math.max(8, window.REMS.length);
  const cnt = { doc: 0, diseno: 0, impl: 0, valid: 0, cerradas: 0, fecha: 0 };
  let tiles = '';

  for (let n = 1; n <= TOTAL_REMS; n++) {
    const r = window.REMS.find((x) => x.n === n);
    const seg = (r && r.seg) || {};
    const done = seg.etapaDone || 0;

    if (r) cnt.doc++; else cnt.diseno++;
    if (done >= 3) cnt.impl++;
    if (done >= 5) cnt.valid++;
    if (done >= 6) cnt.cerradas++;
    if (seg.fechaObjetivo && seg.fechaObjetivo !== 'Por definir') cnt.fecha++;

    const delay = ((n - 1) % 4) * 60;
    if (r) {
      tiles += '<button class="rem-tile" type="button" data-n="' + n + '" data-aos="fade-up" data-aos-delay="' + delay + '" aria-haspopup="dialog" aria-label="Abrir Remediación N.° ' + n + ': ' + esc(r.corto || r.tit) + '">'
        + '<span class="rt-num">' + n + '</span>'
        + '<span class="rt-word">Remediación</span>'
        + '<span class="rt-tit">' + esc(r.corto || r.tit) + '</span>'
        + '<span class="rt-state ok">' + esc(seg.docEstado || 'Documento emitido') + '</span>'
        + '</button>';
    } else {
      tiles += '<div class="rem-tile pending" data-aos="fade-up" data-aos-delay="' + delay + '">'
        + '<span class="rt-num">' + n + '</span>'
        + '<span class="rt-word">Remediación</span>'
        + '<span class="rt-tit">Documento en preparación</span>'
        + '<span class="rt-state">En preparación</span>'
        + '</div>';
    }
  }
  planList.innerHTML = tiles;

  planList.querySelectorAll('button.rem-tile').forEach((tile) => {
    tile.addEventListener('click', () => {
      const r = window.REMS.find((x) => x.n === +tile.dataset.n);
      if (r) openRemModal(r);
    });
  });

  // Resumen ejecutivo del tablero: documentos vs. estado real de la remediación.
  const remResumen = document.getElementById('remResumen');
  if (remResumen) {
    const chip = (val, label, cls) =>
      '<span class="rr-chip' + (val === 0 ? ' zero' : '') + (cls ? ' ' + cls : '') + '"><strong>' + val + '</strong> ' + label + '</span>';
    remResumen.innerHTML = '<span class="rr-total">' + TOTAL_REMS + ' remediaciones</span>'
      + chip(cnt.doc, 'con documento emitido', 'doc')
      + chip(cnt.diseno, 'en diseño')
      + chip(cnt.impl, 'implementadas')
      + chip(cnt.valid, 'validadas')
      + chip(cnt.cerradas, 'cerradas')
      + chip(cnt.fecha, 'con fecha comprometida');
  }
}

// El expediente de una remediación: ficha visual por componentes — claves con
// ícono, proceso como stepper interactivo (un paso a la vez), fórmula como
// ecuación de cajas, indicadores con la meta grande, evidencia en chips y
// cierre/control como callouts.
const IC_USER = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
const IC_SHIELD = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>';
const IC_CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>';
const IC_FLAG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>';
const IC_CHART = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>';
const IC_SHEET = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/></svg>';

// La fórmula del texto ('a + b − c ± d = e') como ecuación visual de cajas.
function formulaViz(f) {
  const tokens = f.split(/\s*([+−±=])\s*/).filter(Boolean);
  let isResult = false;
  return '<div class="rx-formula">' + tokens.map((t) => {
    if (/^[+−±=]$/.test(t)) { if (t === '=') isResult = true; return '<span class="rx-op">' + t + '</span>'; }
    return '<span class="rx-term' + (isResult ? ' result' : '') + '">' + esc(t) + '</span>';
  }).join('') + '</div>';
}

function rxStepPanel(p, i) {
  return '<strong>Paso ' + (i + 1) + ' · ' + esc(p.t) + '</strong>'
    + '<p>' + esc(p.d) + '</p>'
    + (p.formula ? formulaViz(p.formula) : '');
}

function openRemModal(r) {
  const body = document.getElementById('planModalBody');
  if (!body || !planModal) return;
  const seg = r.seg || {};
  const done = seg.etapaDone || 0;
  const cur = Math.min(seg.etapa || done + 1, ETAPAS_REM.length);

  let h = '<div class="modal-head">'
    + '<span class="modal-code">Remediación N.° ' + r.n + '</span>'
    + '<span class="estado-chip encurso">' + esc(seg.docEstado || 'Documento emitido') + '</span>'
    + '</div>'
    + '<h3 id="planModalTitle">' + esc(r.tit) + '</h3>'
    + '<p class="rx-resumen">' + esc(r.resumen) + '</p>';

  h += '<div class="rx-claves">'
    + '<div class="rx-clave">' + IC_USER + '<div><h4>Responsable</h4><p>' + esc(r.resp) + '</p></div></div>'
    + '<div class="rx-clave">' + IC_SHIELD + '<div><h4>Validador independiente</h4><p>' + esc(r.valid) + '</p></div></div>'
    + '<div class="rx-clave">' + IC_CAL + '<div><h4>Periodicidad</h4><p>' + esc(r.period) + '</p></div></div>'
    + '<div class="rx-clave">' + IC_FLAG + '<div><h4>Estado</h4><p>' + esc(seg.remEstado || 'Remediación no iniciada') + ' · etapa: ' + ETAPAS_REM[cur - 1] + ' (' + done + '/' + ETAPAS_REM.length + ') · fecha: ' + esc((r.fecha || 'por definir').toLowerCase()) + '</p></div></div>'
    + '</div>';

  h += '<div class="rx-block"><h4 class="rx-h">El proceso, paso a paso <em>haz clic en cada paso</em></h4>'
    + '<div class="rx-steps" role="tablist" aria-label="Pasos del proceso">'
    + r.pasos.map((p, i) =>
      '<button class="rx-step' + (i === 0 ? ' active' : '') + '" type="button" role="tab" aria-selected="' + (i === 0) + '" data-i="' + i + '">'
      + '<i>' + (i + 1) + '</i><span>' + esc(p.tc || p.t) + '</span></button>'
    ).join('')
    + '</div>'
    + '<div class="rx-panel" id="rxPanel" role="tabpanel">' + rxStepPanel(r.pasos[0], 0) + '</div>'
    + '</div>';

  h += '<div class="rx-block"><h4 class="rx-h">Indicadores de efectividad <em>los tres con meta obligatoria</em></h4><div class="rx-inds">'
    + r.indicadores.map((x) =>
      '<div class="rx-ind"><span class="rx-ind-meta">' + esc(x.meta) + '</span><strong>' + esc(x.t) + '</strong><p>' + esc(x.f) + '</p></div>'
    ).join('')
    + '</div></div>';

  h += '<div class="rx-block"><h4 class="rx-h">Qué recibe Walmart</h4><div class="rx-reps">'
    + r.reporteria.map((b, i) =>
      '<div class="rx-rep"><div class="rx-rep-head">' + (i === 0 ? IC_CHART : IC_SHEET) + '<h5>' + esc(b.t) + '</h5></div><p>' + esc(b.d) + '</p></div>'
    ).join('')
    + '</div></div>';

  h += '<div class="rx-block"><h4 class="rx-h">Evidencia exigida <em>' + r.evidencia.length + ' respaldos, todos verificables</em></h4><div class="rx-ev">'
    + r.evidencia.map((e2) => '<span>' + esc(e2) + '</span>').join('')
    + '</div></div>';

  h += '<div class="rx-foot">'
    + '<div class="rx-callout cierre"><h4>Cuándo se considera implementada</h4><p>' + esc(r.cierre) + '</p></div>'
    + '<div class="rx-callout control"><h4>Y después del cierre</h4><p>' + esc(r.control) + '</p></div>'
    + '</div>';

  body.innerHTML = h;

  // Stepper: un paso a la vez.
  const panel = body.querySelector('#rxPanel');
  const stepBtns = [...body.querySelectorAll('.rx-step')];
  stepBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      stepBtns.forEach((b) => { b.classList.toggle('active', b === btn); b.setAttribute('aria-selected', String(b === btn)); });
      panel.innerHTML = rxStepPanel(r.pasos[+btn.dataset.i], +btn.dataset.i);
    });
  });

  planModal.open();
}

function openPlanModal(p) {
  const body = document.getElementById('planModalBody');
  if (!body || !planModal) return;
  const eje = (window.EJES || []).find((e) => e.n === p.eje);
  body.innerHTML = '<div class="modal-head">'
    + '<span class="modal-code">Acción ' + p.n + '</span>'
    + '<span class="modal-country">Eje ' + p.eje + ' · ' + esc(eje ? eje.tit : '') + '</span>'
    + '<span class="estado-chip ' + estadoClass(p.estado) + '">' + esc(p.estado) + '</span>'
    + '</div>'
    + '<h3 id="planModalTitle">' + esc(p.tit) + '</h3>'
    + '<p class="pm-desc">' + esc(p.desc) + '</p>'
    + '<div class="modal-extra modal-gap pm-obtiene"><h4>Qué obtiene Walmart</h4><p>' + esc(p.obtiene) + '</p></div>'
    + '<div class="pm-meta">'
    + '<div class="pm-meta-item"><h4>Responsable</h4><p>' + esc(p.resp) + '</p></div>'
    + (p.dep ? '<div class="pm-meta-item dep"><h4>Dependencia externa</h4><p>' + esc(p.dep) + '</p></div>' : '')
    + '<div class="pm-meta-item"><h4>Entregable de cierre</h4><p>' + esc(p.entregable) + '</p></div>'
    + '<div class="pm-meta-item"><h4>Indicador · línea base → meta</h4><p>' + esc(p.indicador) + '</p></div>'
    + '</div>'
    + '<p class="qm-nota">Ninguna acción se cierra por declaración: el cierre exige evidencia fechada y validación por una instancia distinta de quien ejecuta. Metas propuestas, no aprobadas.</p>';
  planModal.open();
}

const planGob = document.getElementById('planGob');
if (planGob && window.PLAN_GOB) {
  planGob.innerHTML = window.PLAN_GOB.map((g) =>
    '<article class="gob-card"><h4>' + esc(g.tit) + '</h4><p>' + esc(g.desc) + '</p></article>'
  ).join('');
}
