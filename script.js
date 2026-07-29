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

// Tablero de seguimiento del plan: una tarjeta por remediación con su línea de
// etapas, estado documental y de remediación, plazo, validador y efectividad.
// El expediente documental (modal) es secundario y se abre desde la tarjeta.
const ETAPAS_REM = ['Diseño', 'Aprobación', 'Implementación', 'Evidencia', 'Validación', 'Cierre'];
const IC_FOLDER = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>';
const planList = document.getElementById('planList');
if (planList && window.REMS) {
  const TOTAL_REMS = Math.max(8, window.REMS.length);
  const cnt = { doc: 0, diseno: 0, impl: 0, valid: 0, cerradas: 0, fecha: 0 };
  let cards = '';

  for (let n = 1; n <= TOTAL_REMS; n++) {
    const r = window.REMS.find((x) => x.n === n);
    const seg = (r && r.seg) || {};
    const done = seg.etapaDone || 0;
    const cur = Math.min(seg.etapa || done + 1, ETAPAS_REM.length);
    const docEstado = r ? (seg.docEstado || 'Documento emitido') : 'Documento en preparación';
    const remEstado = r ? (seg.remEstado || 'Remediación no iniciada') : 'Remediación no iniciada';
    const plazo = seg.plazo || 'Sin fecha comprometida';
    const plazoCls = /atras|vencid/i.test(plazo) ? 'bad' : /en plazo/i.test(plazo) ? 'ok' : 'na';

    if (r) cnt.doc++; else cnt.diseno++;
    if (done >= 3) cnt.impl++;
    if (done >= 5) cnt.valid++;
    if (done >= 6) cnt.cerradas++;
    if (seg.fechaObjetivo && seg.fechaObjetivo !== 'Por definir') cnt.fecha++;

    const stages = ETAPAS_REM.map((et, i) => {
      const st = i + 1 <= done ? ' done' : i + 1 === cur ? ' cur' : '';
      return '<span class="rc-stage' + st + '"><i></i><em>' + et + '</em></span>';
    }).join('');

    cards += '<article class="rseg-card' + (r ? '' : ' pending') + '" data-aos="fade-up" data-aos-delay="' + ((n - 1) % 2) * 80 + '">'
      + '<header class="rc-head">'
      + '<span class="rc-n">R' + n + '</span>'
      + '<div class="rc-headb">'
      + '<h3 class="rc-tit">' + (r ? esc(r.corto || r.tit) : 'Remediación N.° ' + n + ' — alcance por definir') + '</h3>'
      + '</div>'
      + '</header>'
      + '<div class="rc-chips">'
      + '<span class="rc-chip doc' + (r ? '' : ' prep') + '">' + esc(docEstado) + '</span>'
      + '<span class="rc-chip rem">' + esc(remEstado) + '</span>'
      + '<span class="rc-chip plazo ' + plazoCls + '">' + esc(plazo) + '</span>'
      + '</div>'
      + '<div class="rc-stages" role="img" aria-label="Etapa actual: ' + esc(ETAPAS_REM[cur - 1]) + ' (' + done + ' de ' + ETAPAS_REM.length + ' etapas completadas)">' + stages + '</div>'
      + '<dl class="rc-meta">'
      + '<div><dt>Responsable</dt><dd>' + (r ? esc(r.resp) : 'Por asignar') + '</dd></div>'
      + '<div><dt>Validador independiente</dt><dd>' + (r ? esc(r.valid) : 'Por designar') + '</dd></div>'
      + '<div><dt>Fecha objetivo</dt><dd>' + esc(seg.fechaObjetivo || 'Por definir') + '</dd></div>'
      + '<div><dt>Efectividad</dt><dd>' + esc(seg.efectividad || 'Se define en el documento') + '</dd></div>'
      + '</dl>'
      + '<div class="rc-foot">'
      + (r
        ? '<button class="rc-open" type="button" data-n="' + n + '" aria-haspopup="dialog">' + IC_FOLDER + 'Ver expediente →</button>'
        : '<span class="rc-open prep">' + IC_FOLDER + 'Expediente en preparación</span>')
      + '</div>'
      + '</article>';
  }
  planList.innerHTML = cards;

  planList.querySelectorAll('button.rc-open').forEach((btn) => {
    btn.addEventListener('click', () => {
      const r = window.REMS.find((x) => x.n === +btn.dataset.n);
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

function openRemModal(r) {
  const body = document.getElementById('planModalBody');
  if (!body || !planModal) return;
  let h = '<div class="modal-head">'
    + '<span class="modal-code">Remediación N.° ' + r.n + '</span>'
    + '<span class="modal-country">' + esc(r.period) + '</span>'
    + '</div>'
    + '<h3 id="planModalTitle">' + esc(r.tit) + '</h3>'
    + '<p class="pm-desc">' + esc(r.resumen) + '</p>';
  h += '<div class="qm-block"><h4>Proceso de conciliación</h4>'
    + r.pasos.map((p, i) =>
      '<div class="rm-step"><span class="rm-step-n">' + (i + 1) + '</span><div class="rm-step-b"><strong>' + esc(p.t) + '</strong><p>' + esc(p.d) + '</p>'
      + (p.formula ? '<p class="rm-formula">' + esc(p.formula) + '</p>' : '') + '</div></div>'
    ).join('')
    + '</div>';
  h += '<div class="qm-block"><h4>Reportería a Walmart</h4><div class="pm-meta rm-rep">'
    + r.reporteria.map((b) => '<div class="pm-meta-item"><h4>' + esc(b.t) + '</h4><p>' + esc(b.d) + '</p></div>').join('')
    + '</div></div>';
  h += '<div class="pm-meta">'
    + '<div class="pm-meta-item"><h4>Responsable</h4><p>' + esc(r.resp) + '</p></div>'
    + '<div class="pm-meta-item"><h4>Validador</h4><p>' + esc(r.valid) + '</p></div>'
    + '<div class="pm-meta-item"><h4>Fecha de implementación</h4><p>' + esc(r.fecha) + '</p></div>'
    + '<div class="pm-meta-item"><h4>Periodicidad</h4><p>' + esc(r.period) + '</p></div>'
    + '</div>';
  h += '<div class="qm-block"><h4>Indicadores de efectividad</h4>'
    + r.indicadores.map((x) =>
      '<div class="rm-ind"><div class="rm-ind-b"><strong>' + esc(x.t) + '</strong><p>' + esc(x.f) + '</p></div><span class="rm-meta">Meta ' + esc(x.meta) + '</span></div>'
    ).join('')
    + '</div>';
  h += '<div class="qm-block"><h4>Evidencia</h4><ul class="rm-ev">' + r.evidencia.map((e2) => '<li>' + esc(e2) + '</li>').join('') + '</ul></div>';
  h += '<div class="modal-extra modal-gap"><h4>Criterio de cierre</h4><p>' + esc(r.cierre) + '</p></div>';
  h += '<div class="modal-extra modal-sug"><h4>Control permanente</h4><p>' + esc(r.control) + '</p></div>';
  body.innerHTML = h;
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
