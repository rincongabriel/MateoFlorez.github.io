/* ============================================================
   CURSOR PERSONALIZADO
============================================================ */
const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.left = e.clientX + 'px';
  dot.style.top  = e.clientY + 'px';
});

function animRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top  = ringY + 'px';
  requestAnimationFrame(animRing);
}
animRing();

/* ============================================================
   NAVBAR
============================================================ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ============================================================
   PARALLAX ZOOM — Hero background
============================================================ */
(function() {
  const hero = document.getElementById('hero');
  if (!hero) return;

  const BASE_SIZE = 100;
  const MAX_ZOOM  = 130;

  function onScroll() {
    const scrollY = window.scrollY;
    const heroH   = hero.offsetHeight;
    if (scrollY > heroH) return;
    const progress = scrollY / heroH;
    const size = BASE_SIZE + (MAX_ZOOM - BASE_SIZE) * progress;
    hero.style.backgroundSize = `${size.toFixed(2)}%`;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ============================================================
   HAMBURGER MENÚ MÓVIL
============================================================ */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ============================================================
   SCROLL REVEAL
============================================================ */
const revealEls = document.querySelectorAll('.reveal');
const observer  = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

/* ============================================================
   CARGA DE DATOS DESDE data.json
============================================================ */
fetch('data.json')
  .then(r => r.json())
  .then(datos => {
    construirPortafolio(datos.videos);
    construirExperiencia(datos.experiencia);
    construirTestimonios(datos.testimonios);
    construirRedes(datos.redes);
  });

function construirPortafolio(videos) {
  const contenedor = document.getElementById('portfolioGrid');
  contenedor.innerHTML = videos.map(video => `
    <div class="portfolio-item ${video.destacado ? 'featured' : ''}">
      <div class="vimeo-wrap">
        <iframe
          src="https://player.vimeo.com/video/${video.id}?autoplay=0&title=0&byline=0&portrait=0&color=fff500&dnt=1"
          title="${video.titulo}"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen>
        </iframe>
        <div class="vimeo-cover" style="background: linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('${video.coverUrl}') center/cover no-repeat;">
          <div class="vimeo-play-icon">&#9654;</div>
          <span class="vimeo-cover-title">Reproducir</span>
        </div>
      </div>
      <div class="portfolio-overlay">
        <p class="portfolio-cat">${video.categoria}</p>
        <h3 class="portfolio-name">${video.titulo}</h3>
        <a href="https://vimeo.com/${video.id}" target="_blank" class="portfolio-btn">Ver en Vimeo ↗</a>
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.vimeo-cover').forEach(cover => {
    cover.addEventListener('click', () => cover.classList.add('hidden'));
  });
}

function construirExperiencia(experiencia) {
  const contenedor = document.getElementById('expTimeline');
  contenedor.innerHTML = experiencia.map(item => `
    <div class="exp-item reveal">
      <p class="exp-date">${item.fechas}</p>
      <h3 class="exp-company">${item.empresa}</h3>
      <p class="exp-role">${item.cargo}</p>
      <p class="exp-desc">${item.descripcion}</p>
      <div class="exp-tags">
        ${item.tags.map(tag => `<span class="exp-tag">${tag}</span>`).join('')}
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.exp-item.reveal').forEach(el => observer.observe(el));
}

function construirTestimonios(testimonios) {
  const contenedor = document.getElementById('testimoniosGrid');
  contenedor.innerHTML = testimonios.map(t => `
    <div class="testimonio-card">
      <div class="quote-mark">"</div>
      <p class="testimonio-text">${t.texto}</p>
      <div class="testimonio-author">
        <div class="author-avatar">${t.iniciales}</div>
        <div>
          <p class="author-name">${t.nombre}</p>
          <p class="author-role">${t.cargo}</p>
        </div>
      </div>
    </div>
  `).join('');
}

function construirRedes(redes) {
  const btnWhatsapp = document.querySelector('a[href*="wa.me"]');
  if (btnWhatsapp && redes.whatsapp) btnWhatsapp.href = redes.whatsapp;
  document.querySelectorAll('a[href*="mailto"]').forEach(link => {
    if (redes.email) link.href = `mailto:${redes.email}`;
  });
}