/* ==========================================================================
   ABIRAMI - PORTFOLIO INTERACTIVE JAVASCRIPT
   Features: Particle Canvas, AI Neural Network Canvas, Circular Progress,
   Mobile Hamburger Nav, Scroll Animations, Dynamic Active Navigation
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive modules
  initNavbar();
  initBackgroundParticles();
  initHeroCanvas();
  initAcademicProgress();
  initScrollReveal();
});

/* --------------------------------------------------------------------------
   1. NAVBAR & NAVIGATION CONTROLLER
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbarHeader = document.querySelector('.navbar-header');
  const hamburgerToggle = document.getElementById('hamburger-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky Navbar Blur Effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbarHeader.classList.add('scrolled');
    } else {
      navbarHeader.classList.remove('scrolled');
    }
  });

  // Mobile Hamburger Toggle
  hamburgerToggle.addEventListener('click', () => {
    const isExpanded = hamburgerToggle.getAttribute('aria-expanded') === 'true';
    hamburgerToggle.setAttribute('aria-expanded', !isExpanded);
    hamburgerToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close Mobile Nav when clicking any nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburgerToggle.classList.remove('active');
      navMenu.classList.remove('active');
      hamburgerToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Active Link Highlight on Scroll
  const sections = document.querySelectorAll('section[id]');
  
  function highlightActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const activeLink = document.querySelector(`.nav-menu a[href*='${sectionId}']`);

      if (activeLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(l => l.classList.remove('active'));
          activeLink.classList.add('active');
        }
      }
    });
  }

  window.addEventListener('scroll', highlightActiveNav);
}

/* --------------------------------------------------------------------------
   2. BACKGROUND PARTICLES CANVAS
   -------------------------------------------------------------------------- */
function initBackgroundParticles() {
  const canvas = document.getElementById('bg-particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = 45;

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = Math.random() * 2 + 1;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.alpha = Math.random() * 0.5 + 0.2;
      this.color = Math.random() > 0.5 ? '#A78BFA' : '#F9A8D4';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = '#C4B5FD';
          ctx.globalAlpha = (1 - dist / 120) * 0.15;
          ctx.lineWidth = 0.8;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* --------------------------------------------------------------------------
   3. HERO AI NEURAL NETWORK CANVAS VISUAL
   -------------------------------------------------------------------------- */
function initHeroCanvas() {
  const canvas = document.getElementById('hero-nodes-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = canvas.parentElement.clientWidth);
  let height = (canvas.height = canvas.parentElement.clientHeight);

  window.addEventListener('resize', () => {
    if (!canvas.parentElement) return;
    width = canvas.width = canvas.parentElement.clientWidth;
    height = canvas.height = canvas.parentElement.clientHeight;
  });

  const nodes = [];
  const nodeCount = 22;
  const centerX = width / 2;
  const centerY = height / 2;

  class Node {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = Math.random() * 3 + 2;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.pulse = Math.random() * Math.PI;
      this.color = Math.random() > 0.4 ? '#F9A8D4' : '#A78BFA';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.pulse += 0.04;

      if (this.x < 20 || this.x > width - 20) this.vx *= -1;
      if (this.y < 20 || this.y > height - 20) this.vy *= -1;
    }

    draw() {
      const currentRadius = this.radius + Math.sin(this.pulse) * 1.5;
      ctx.beginPath();
      ctx.arc(this.x, this.y, Math.max(1, currentRadius), 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 15;
      ctx.shadowColor = this.color;
      ctx.fill();
    }
  }

  for (let i = 0; i < nodeCount; i++) {
    nodes.push(new Node());
  }

  function renderHeroCanvas() {
    ctx.clearRect(0, 0, width, height);

    // Connect nodes to center and to each other
    nodes.forEach(node => {
      node.update();
      node.draw();

      // Connect to center core
      const distToCenter = Math.hypot(node.x - centerX, node.y - centerY);
      if (distToCenter < 180) {
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(centerX, centerY);
        ctx.strokeStyle = '#F9A8D4';
        ctx.globalAlpha = (1 - distToCenter / 180) * 0.25;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    });

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = '#A78BFA';
          ctx.globalAlpha = (1 - dist / 110) * 0.3;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }

    requestAnimationFrame(renderHeroCanvas);
  }

  renderHeroCanvas();
}

/* --------------------------------------------------------------------------
   4. ACADEMIC PERFORMANCE CIRCULAR PROGRESS ANIMATIONS
   -------------------------------------------------------------------------- */
function initAcademicProgress() {
  const academicSection = document.getElementById('academic');
  if (!academicSection) return;

  const ring12th = document.getElementById('ring-12th');
  const ring10th = document.getElementById('ring-10th');
  const val12th = document.getElementById('val-12th');
  const val10th = document.getElementById('val-10th');

  const circumference = 452.389; // 2 * PI * r (r=72)
  let animated = false;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        
        // 12th Grade: EXACT 76%
        const offset12 = circumference - (76 / 100) * circumference;
        ring12th.style.transition = 'stroke-dashoffset 1.8s cubic-bezier(0.16, 1, 0.3, 1)';
        ring12th.style.strokeDashoffset = offset12;
        animateCounter(val12th, 0, 76, 1800, '%');

        // 10th Grade: EXACT 89.2%
        const offset10 = circumference - (89.2 / 100) * circumference;
        ring10th.style.transition = 'stroke-dashoffset 1.8s cubic-bezier(0.16, 1, 0.3, 1)';
        ring10th.style.strokeDashoffset = offset10;
        animateCounterDecimal(val10th, 0, 89.2, 1800, '%');
      }
    });
  }, { threshold: 0.3 });

  observer.observe(academicSection);
}

// Counter animation for integer
function animateCounter(el, start, end, duration, suffix = '') {
  let startTime = null;
  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    el.textContent = `${value}${suffix}`;
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = `${end}${suffix}`;
    }
  }
  requestAnimationFrame(step);
}

// Counter animation for decimal
function animateCounterDecimal(el, start, end, duration, suffix = '') {
  let startTime = null;
  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const value = (progress * (end - start) + start).toFixed(1);
    el.textContent = `${value}${suffix}`;
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = `${end}${suffix}`;
    }
  }
  requestAnimationFrame(step);
}

/* --------------------------------------------------------------------------
   5. SCROLL REVEAL ANIMATION CONTROLLER
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const cards = document.querySelectorAll('.glass-card, .tech-badge-card, .timeline-item, .project-card');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    revealObserver.observe(card);
  });
}
