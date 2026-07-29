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

// ============================================================
//  Análisis cuantitativo: tiles clickeables + barras + modal
// ============================================================
const quantTiles = document.getElementById('quantTiles');
const quantBars = document.getElementById('quantBars');
if (quantTiles && window.BASES) {
  quantTiles.innerHTML = window.BASES.map((b, i) =>
    '<button class="quant-tile' + (b.final ? ' final' : '') + '" type="button" data-i="' + i + '">'
    + '<span class="qt-date">' + esc(b.fecha) + '</span>'
    + '<span class="qt-tag">' + esc(b.tag) + '</span>'
    + '<span class="qt-figs">'
    + '<span class="qt-fig"><strong>' + fmt(b.imputados) + '</strong><em>imputados tramitados</em></span>'
    + '<span class="qt-fig"><strong>' + fmt(b.causas) + '</strong><em>causas</em></span>'
    + '</span>'
    + '<span class="qt-go">Desmembrar el número →</span>'
    + '</button>'
  ).join('');
  quantTiles.querySelectorAll('.quant-tile').forEach((tile) => {
    tile.addEventListener('click', () => openQuantModal(window.BASES[+tile.dataset.i]));
  });
}
if (quantBars && window.BASES) {
  const series = [
    { key: 'imputados', label: 'Imputados tramitados' },
    { key: 'causas', label: 'Causas' },
  ];
  quantBars.innerHTML = series.map((s) => {
    const max = Math.max(...window.BASES.map((b) => b[s.key]));
    return '<div class="qb-row"><span class="qb-title">' + esc(s.label) + '</span>'
      + window.BASES.map((b) => {
        const w = Math.round((b[s.key] / max) * 1000) / 10;
        return '<div class="qb-line"><span class="qb-name">' + esc(b.fecha.replace(' de ', ' ')) + '</span>'
          + '<div class="qb-track"><div class="qb-fill' + (b.final ? ' final' : '') + '" style="width:' + w + '%"></div></div>'
          + '<span class="qb-val">' + fmt(b[s.key]) + '</span></div>';
      }).join('')
      + '</div>';
  }).join('');
}

function quantBlockHtml(bl) {
  if (bl.tipo === 'status') {
    return '<div class="qm-block"><h4>' + esc(bl.tit) + '</h4>'
      + bl.bars.map((bar) => {
        const w = Math.round((bar.val / bar.total) * 1000) / 10;
        return '<div class="qm-bar"><span class="qm-bar-label">' + esc(bar.label) + '</span>'
          + '<div class="qm-bar-track"><div class="qm-bar-fill" style="width:' + w + '%"></div></div>'
          + '<span class="qm-bar-val">' + esc(bar.txt) + '</span></div>';
      }).join('')
      + '<p class="qm-nota">' + esc(bl.nota) + '</p></div>';
  }
  if (bl.tipo === 'delta') {
    return '<div class="qm-block"><h4>' + esc(bl.tit) + '</h4><div class="qm-deltas">'
      + bl.rows.map((r) =>
        '<div class="qm-delta-row"><span class="qm-dl">' + esc(r.label) + '</span>'
        + '<span class="qm-dv">' + esc(r.from) + ' → ' + esc(r.to) + '</span>'
        + '<span class="qm-dd">' + esc(r.delta) + ' <em>' + esc(r.pct) + '</em></span></div>'
      ).join('')
      + '</div><p class="qm-nota">' + esc(bl.nota) + '</p></div>';
  }
  // mags
  return '<div class="qm-block"><h4>' + esc(bl.tit) + '</h4><div class="qm-mags">'
    + bl.items.map((it) => '<div class="qm-mag"><strong>' + esc(it[0]) + '</strong><span>' + esc(it[1]) + '</span></div>').join('')
    + '</div><p class="qm-nota">' + esc(bl.nota) + '</p></div>';
}

function openQuantModal(b) {
  const body = document.getElementById('quantModalBody');
  if (!body || !quantModal) return;
  body.innerHTML = '<div class="modal-head">'
    + '<span class="modal-code' + (b.final ? ' ok' : '') + '">' + esc(b.fecha) + '</span>'
    + '<span class="modal-country">' + esc(b.tag) + '</span>'
    + '</div>'
    + '<h3 id="quantModalTitle">' + fmt(b.imputados) + ' imputados tramitados · ' + fmt(b.causas) + ' causas</h3>'
    + '<p class="qm-resumen">' + esc(b.resumen) + '</p>'
    + b.bloques.map(quantBlockHtml).join('');
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

const planList = document.getElementById('planList');
if (planList && window.PLAN_IMPL) {
  planList.innerHTML = window.PLAN_IMPL.map((p, i) => {
    const eje = (window.EJES || []).find((e) => e.n === p.eje);
    return '<button class="plan-item" type="button" data-i="' + i + '">'
      + '<span class="plan-item-n">' + p.n + '</span>'
      + '<span class="plan-item-body">'
      + '<span class="plan-item-eje">Eje ' + p.eje + ' · ' + esc(eje ? eje.tit : '') + '</span>'
      + '<span class="plan-item-tit">' + esc(p.tit) + '</span>'
      + '</span>'
      + '<span class="estado-chip ' + estadoClass(p.estado) + '">' + esc(p.estado) + '</span>'
      + '<span class="plan-item-go" aria-hidden="true">→</span>'
      + '</button>';
  }).join('');
  planList.querySelectorAll('.plan-item').forEach((item) => {
    item.addEventListener('click', () => openPlanModal(window.PLAN_IMPL[+item.dataset.i]));
  });
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
