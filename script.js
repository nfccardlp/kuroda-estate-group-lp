/* =====================
   Opening Animation
   ===================== */
const opening = document.getElementById('opening');
const opSkip  = document.getElementById('op-skip');

function closeOpening() {
  opening.classList.add('exit');
  setTimeout(() => {
    opening.style.display = 'none';
    document.getElementById('nav').classList.add('visible');
    revealHero();
    initFloatLine();
  }, 900);
}

opSkip.addEventListener('click', closeOpening);
setTimeout(closeOpening, 3800);

/* =====================
   Hero Reveal
   ===================== */
function revealHero() {
  const els = document.querySelectorAll('[data-reveal]');
  els.forEach((el, i) => {
    const delay = el.dataset.delay
      ? parseFloat(el.dataset.delay) * 1000
      : i * 100;
    setTimeout(() => el.classList.add('revealed'), delay + 150);
  });
}

/* =====================
   Custom Cursor
   ===================== */
const cursor    = document.getElementById('cursor');
const cursorDot = document.getElementById('cursor-dot');
let cx = 0, cy = 0, dx = 0, dy = 0;

document.addEventListener('mousemove', e => {
  cx = e.clientX;
  cy = e.clientY;
  cursorDot.style.left = cx + 'px';
  cursorDot.style.top  = cy + 'px';
});

(function animCursor() {
  dx += (cx - dx) * 0.09;
  dy += (cy - dy) * 0.09;
  cursor.style.left = dx + 'px';
  cursor.style.top  = dy + 'px';
  requestAnimationFrame(animCursor);
})();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('active'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});

/* =====================
   Hero Particles
   ===================== */
(function createParticles() {
  const container = document.getElementById('hero-particles');
  if (!container) return;
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pFloat {
      0%   { transform: translateY(0) translateX(0);   opacity: 0; }
      15%  { opacity: 1; }
      85%  { opacity: 0.4; }
      100% { transform: translateY(-110px) translateX(18px); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
  for (let i = 0; i < 35; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 2.5 + 1;
    p.style.cssText = [
      'position:absolute',
      `width:${size}px`,
      `height:${size}px`,
      `background:rgba(196,146,42,${(Math.random() * 0.4 + 0.08).toFixed(2)})`,
      'border-radius:50%',
      `left:${(Math.random() * 100).toFixed(1)}%`,
      `top:${(Math.random() * 100).toFixed(1)}%`,
      `animation:pFloat ${(Math.random() * 9 + 5).toFixed(1)}s ease-in-out ${(Math.random() * 5).toFixed(1)}s infinite`,
      'pointer-events:none'
    ].join(';');
    container.appendChild(p);
  }
})();

/* =====================
   Scroll Reveal (IntersectionObserver)
   ===================== */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.zz-content, .stat-item').forEach(el => revealObs.observe(el));

/* =====================
   Counter Animation
   ===================== */
function animCount(el, target, duration) {
  let start = 0;
  const step = target / (duration / 16);
  const run = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = Math.floor(start);
    if (start >= target) clearInterval(run);
  }, 16);
}

const countObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const item   = entry.target;
      const target = parseInt(item.dataset.count);
      const el     = item.querySelector('.count');
      animCount(el, target, 1600);
      countObs.unobserve(item);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.stat-item[data-count]').forEach(el => countObs.observe(el));

/* =====================
   Horizontal Scroll (desktop)
   ===================== */
const hWrap  = document.querySelector('.h-scroll-wrap');
const hCards = document.getElementById('h-cards');

if (hWrap && hCards && window.innerWidth > 960) {
  window.addEventListener('scroll', () => {
    const rect     = hWrap.getBoundingClientRect();
    const wrapH    = hWrap.offsetHeight - window.innerHeight;
    const progress = Math.max(0, Math.min(1, -rect.top / wrapH));
    const maxX     = hCards.scrollWidth - window.innerWidth + 120;
    hCards.style.transform = `translateX(-${progress * maxX}px)`;
  }, { passive: true });
}

/* =====================
   Nav scroll behavior
   ===================== */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* =====================
   Mobile menu
   ===================== */
const burger     = document.getElementById('nav-burger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileClose = document.getElementById('mobile-close');

function openMenu()  { mobileMenu.classList.add('open'); }
function closeMenu() { mobileMenu.classList.remove('open'); }

if (burger)     burger.addEventListener('click', openMenu);
if (mobileClose) mobileClose.addEventListener('click', closeMenu);
if (mobileMenu) {
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
}

/* =====================
   Floating LINE
   ===================== */
function initFloatLine() {
  const btn = document.getElementById('float-line');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 320);
  }, { passive: true });
}

/* =====================
   Skyline Parallax
   ===================== */
const skyline = document.getElementById('hero-skyline');
if (skyline) {
  window.addEventListener('scroll', () => {
    skyline.style.transform = `translateY(${window.scrollY * 0.12}px)`;
  }, { passive: true });
}

/* =====================
   Smooth anchor scroll
   ===================== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
