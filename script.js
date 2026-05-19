/* =====================================================
   POINT SELECT GROUP  |  script.js
   ===================================================== */

// -- CURSOR GLOW
var cursor = document.createElement('div');
cursor.className = 'cursor-glow';
document.body.appendChild(cursor);
var mouseX = 0, mouseY = 0, curX = 0, curY = 0;
document.addEventListener('mousemove', function(e) { mouseX = e.clientX; mouseY = e.clientY; });
(function loop() {
  curX += (mouseX - curX) * 0.1;
  curY += (mouseY - curY) * 0.1;
  cursor.style.left = curX + 'px';
  cursor.style.top = curY + 'px';
  requestAnimationFrame(loop);
})();

// -- NAV SCROLL
var nav = document.getElementById('topnav');
window.addEventListener('scroll', function() {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// -- NAV TOGGLE
var navToggle = document.getElementById('navToggle');
var navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', function() {
  navLinks.classList.toggle('open');
});
document.addEventListener('click', function(e) {
  if (!nav.contains(e.target)) navLinks.classList.remove('open');
});

// -- ACTIVE NAV LINK
var sections = document.querySelectorAll('section[id]');
var links = document.querySelectorAll('.nav-links a');
var secObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) {
      links.forEach(function(l) { l.classList.remove('active'); });
      var link = document.querySelector('.nav-links a[href="#' + e.target.id + '"]');
      if (link) link.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(function(s) { secObs.observe(s); });

// -- SCROLL REVEAL
var reveals = document.querySelectorAll('.reveal');
var revObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) {
      e.target.classList.add('revealed');
      revObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(function(r) { revObs.observe(r); });

// -- COUNTER ANIMATION
var counters = document.querySelectorAll('[data-count]');
var cntObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (!e.isIntersecting) return;
    var el = e.target;
    var target = parseFloat(el.dataset.count);
    var suffix = el.dataset.suffix || '';
    var start = null;
    var duration = 1900;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
    cntObs.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(function(c) { cntObs.observe(c); });

// -- FAQ ACCORDION
document.querySelectorAll('.faq-item').forEach(function(item) {
  item.querySelector('.faq-q').addEventListener('click', function() {
    var isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(function(o) { o.classList.remove('open'); });
    if (!isOpen) item.classList.add('open');
  });
});

// -- SERVICE CARD 3D TILT
document.querySelectorAll('.service-card').forEach(function(card) {
  card.addEventListener('mousemove', function(e) {
    var r = card.getBoundingClientRect();
    var x = ((e.clientX - r.left) / r.width - 0.5) * 9;
    var y = ((e.clientY - r.top) / r.height - 0.5) * 9;
    card.style.transform = 'perspective(700px) rotateY(' + x + 'deg) rotateX(' + (-y) + 'deg) translateY(-4px)';
  });
  card.addEventListener('mouseleave', function() {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease, border-color 0.4s, box-shadow 0.4s';
    setTimeout(function() { card.style.transition = ''; }, 500);
  });
});