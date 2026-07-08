const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-links a');
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('navLinks');

navLinks.forEach((link) => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
}

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.14 });

revealElements.forEach((element) => revealObserver.observe(element));

const visualizer = document.getElementById('visualizer');
if (visualizer) {
  const totalBars = 144;
  for (let i = 0; i < totalBars; i++) {
    const bar = document.createElement('span');
    bar.className = 'bar';
    const angle = (360 / totalBars) * i;
    const height = 72 + Math.sin(i * 0.31) * 34 + Math.random() * 68;
    const distance = window.innerWidth < 720 ? 136 : window.innerWidth < 920 ? 164 : 215;

    bar.style.setProperty('--height', `${Math.max(58, height)}px`);
    bar.style.transform = `rotate(${angle}deg) translateY(-${distance}px)`;
    bar.style.animationDelay = `${(i % 18) * 0.055}s`;
    bar.style.opacity = `${0.45 + Math.random() * 0.55}`;

    if (i % 5 === 0) {
      bar.style.background = 'linear-gradient(to top, rgba(139, 92, 246, 0.03), rgba(139, 92, 246, 0.85), #ffffff)';
      bar.style.boxShadow = '0 0 16px rgba(139, 92, 246, 0.5)';
    }

    if (i % 11 === 0) {
      bar.style.background = 'linear-gradient(to top, rgba(236, 72, 153, 0.03), rgba(236, 72, 153, 0.72), #ffffff)';
      bar.style.boxShadow = '0 0 16px rgba(236, 72, 153, 0.45)';
    }

    visualizer.appendChild(bar);
  }
}

const canvas = document.getElementById('space');
const ctx = canvas?.getContext('2d');
let stars = [];

function resizeCanvas() {
  if (!canvas || !ctx) return;
  canvas.width = window.innerWidth * window.devicePixelRatio;
  canvas.height = window.innerHeight * window.devicePixelRatio;
  ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);

  const count = Math.floor((window.innerWidth * window.innerHeight) / 12000);
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.4 + 0.2,
    a: Math.random() * 0.7 + 0.15,
    speed: Math.random() * 0.25 + 0.05,
  }));
}

function drawStars() {
  if (!canvas || !ctx) return;
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (const star of stars) {
    star.y += star.speed;
    if (star.y > window.innerHeight) {
      star.y = -3;
      star.x = Math.random() * window.innerWidth;
    }

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(226, 232, 240, ${star.a})`;
    ctx.fill();
  }

  requestAnimationFrame(drawStars);
}

resizeCanvas();
drawStars();
window.addEventListener('resize', resizeCanvas);
