
const header = document.querySelector('.site-header');
const button = document.querySelector('.menu-btn');
if (button && header) {
  button.addEventListener('click', () => header.classList.toggle('open'));
}
