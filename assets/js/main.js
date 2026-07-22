
const toggle = document.querySelector('[data-menu-toggle]');
const links = document.querySelector('[data-nav-links]');
if (toggle && links) {
  toggle.addEventListener('click', () => links.classList.toggle('is-open'));
}
const header = document.querySelector('[data-header]');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) header?.classList.add('is-scrolled');
  else header?.classList.remove('is-scrolled');
});
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
