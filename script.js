const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');
const modal = document.querySelector('.modal');
const modalTitle = document.querySelector('#modal-title');
const modalClose = document.querySelector('.modal-close');

const setTheme = (isDark) => {
  body.classList.toggle('dark', isDark);
  localStorage.setItem('nora-theme', isDark ? 'dark' : 'light');
};

setTheme(localStorage.getItem('nora-theme') === 'dark');
themeToggle.addEventListener('click', () => setTheme(!body.classList.contains('dark')));

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

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
