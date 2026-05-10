 const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  dot.style.left = e.clientX + 'px';
  dot.style.top = e.clientY + 'px';
  ringX += (e.clientX - ringX) * 0.12;
  ringY += (e.clientY - ringY) * 0.12;
});

function animRing() {
  ring.style.left = ringX + 'px';
  ring.style.top = ringY + 'px';
  requestAnimationFrame(animRing);
}
animRing();

// NAVBAR SCROLL
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// HAMBURGER MENÚ MÓVIL
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// SCROLL REVEAL
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));



// ============================================================
// CARGA DE DATOS DESDE data.json
// ============================================================
// fetch() le pide al navegador que vaya a buscar el archivo.
// .then() significa "cuando lo tengas, haz esto".
// Son dos pasos: primero convierte la respuesta a JSON,
// luego usa los datos para construir cada sección.
// ============================================================

fetch('data.json')
  .then(respuesta => respuesta.json())
  .then(datos => {
    construirPortafolio(datos.videos);
    construirExperiencia(datos.experiencia);
    construirTestimonios(datos.testimonios);
    construirRedes(datos.redes);
  });


// ------------------------------------------------------------
// PORTAFOLIO — construye las tarjetas de video
// ------------------------------------------------------------
// datos.videos es la lista del JSON. Con forEach recorremos
// cada video uno por uno y armamos el HTML de cada tarjeta.
// El template literal (las comillas invertidas ` `) nos deja
// mezclar HTML con variables usando ${variable}.
// ------------------------------------------------------------

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

  // Volver a activar el click en las covers después de generarlas
  document.querySelectorAll('.vimeo-cover').forEach(cover => {
    cover.addEventListener('click', () => cover.classList.add('hidden'));
  });
}


// ------------------------------------------------------------
// EXPERIENCIA — construye las tarjetas de cada empresa
// ------------------------------------------------------------
// Los tags son una lista dentro de cada empresa, así que
// usamos otro .map() adentro para construir cada tag.
// ------------------------------------------------------------

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

  // Volver a activar el scroll reveal en los elementos nuevos
  document.querySelectorAll('.exp-item.reveal').forEach(el => observer.observe(el));
}


// ------------------------------------------------------------
// TESTIMONIOS — construye cada tarjeta de testimonio
// ------------------------------------------------------------

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


// ------------------------------------------------------------
// REDES SOCIALES — actualiza los links de contacto
// ------------------------------------------------------------
// Solo actualizamos los que tengan valor. Si instagram está
// vacío (""), no mostramos nada para esa red.
// ------------------------------------------------------------

function construirRedes(redes) {
  // WhatsApp — actualiza el href del botón que ya existe
  const btnWhatsapp = document.querySelector('a[href*="wa.me"]');
  if (btnWhatsapp && redes.whatsapp) {
    btnWhatsapp.href = redes.whatsapp;
  }

  // Email — actualiza todos los links de correo
  document.querySelectorAll(`a[href*="mailto"]`).forEach(link => {
    if (redes.email) link.href = `mailto:${redes.email}`;
  });
}