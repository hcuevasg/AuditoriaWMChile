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

// --- Tabla del plan ---
const planTable = document.querySelector('#planTable tbody');
if (planTable && window.PLAN) {
  planTable.innerHTML = window.PLAN.map((p) =>
    '<tr>'
    + '<td class="plan-id">' + esc(p.id) + '</td>'
    + '<td>' + esc(p.txt) + (/(inmediat)/i.test(p.plazo) ? ' <span class="plan-flag">' + esc(p.plazo) + '</span>' : '') + '</td>'
    + '<td class="plan-cubre">' + esc(p.cubre) + '</td>'
    + '<td class="plan-resp">' + esc(p.resp) + '</td>'
    + '<td><span class="sev-chip ' + sevClass(p.prio) + '">' + esc(p.prio) + '</span></td>'
    + '</tr>'
  ).join('');
}
