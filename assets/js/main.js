const ring = document.querySelector('[data-ring]');
if (ring) {
  const bars = 96;
  const radius = 225;
  for (let i = 0; i < bars; i++) {
    const bar = document.createElement('span');
    bar.className = 'bar';
    const angle = (360 / bars) * i;
    const height = 70 + Math.round(Math.abs(Math.sin(i * 1.7)) * 100) + Math.round(Math.random() * 35);
    bar.style.setProperty('--h', `${height}px`);
    bar.style.setProperty('--radius-bar', `${radius}px`);
    bar.style.transform = `rotate(${angle}deg) translateY(-${radius}px)`;
    bar.style.animationDelay = `${(i % 18) * 0.055}s`;
    ring.appendChild(bar);
  }
}

const toggle = document.querySelector('[data-menu-toggle]');
const links = document.querySelector('[data-nav-links]');
if (toggle && links) {
  toggle.addEventListener('click', () => links.classList.toggle('open'));
}

const path = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach((a) => {
  const href = a.getAttribute('href');
  if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
