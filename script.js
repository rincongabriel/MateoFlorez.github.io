 const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
    ringX += (e.clientX - ringX) * 0.12;
    ringY += (e.clientY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
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

  // SCROLL REVEAL (IntersectionObserver)
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

  // FORMULARIO DE CONTACTO (validación básica)
  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();
    const msgEl = document.getElementById('formMsg');

    msgEl.className = 'form-msg';
    msgEl.style.display = 'none';

    if (!nombre || !email || !mensaje) {
      msgEl.textContent = 'Por favor completa todos los campos obligatorios (*).';
      msgEl.className = 'form-msg error';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      msgEl.textContent = 'Por favor ingresa un correo electrónico válido.';
      msgEl.className = 'form-msg error';
      return;
    }

    // ÉXITO — Para conectar con un backend real (Formspree, EmailJS, etc.)
    // reemplaza esta sección con tu integración preferida.
    msgEl.textContent = '✓ ¡Mensaje enviado! Te contactaré pronto.';
    msgEl.className = 'form-msg success';
    this.reset();

    /*
    PARA CONECTAR CON FORMSPREE (servicio gratuito):
    1. Ir a formspree.io y crear una cuenta
    2. Crear un nuevo formulario y copiar el endpoint
    3. Cambiar el action del formulario: <form action="https://formspree.io/f/TUCODIGO" method="POST">
    4. Remover el e.preventDefault() de arriba
    */
  });