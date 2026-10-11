const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const modal = document.querySelector('.modal');
const modalTitle = document.querySelector('#modal-title');
const modalClose = document.querySelector('.modal-close');

const setTheme = (isDark) => {
  body.classList.toggle('dark', isDark);
  localStorage.setItem('nora-theme', isDark ? 'dark' : 'light');
};

setTheme(localStorage.getItem('nora-theme') === 'dark');
themeToggle.addEventListener('click', () => setTheme(!body.classList.contains('dark')));

const setNavOpen = (isOpen) => {
  navLinks.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
};

navToggle.addEventListener('click', () => setNavOpen(!navLinks.classList.contains('open')));
navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setNavOpen(false)));
document.addEventListener('click', (event) => {
  if (!navLinks.contains(event.target) && !navToggle.contains(event.target)) setNavOpen(false);
});

document.querySelectorAll('[data-project]').forEach((button) => {
  button.addEventListener('click', () => {
    modalTitle.textContent = button.dataset.project;
    modal.hidden = false;
    modalClose.focus();
  });
});

const closeModal = () => { modal.hidden = true; };
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !modal.hidden) closeModal(); });
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navLinks.classList.contains('open')) {
    setNavOpen(false);
    navToggle.focus();
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
