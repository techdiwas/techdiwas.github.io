const toggle = document.querySelector('.theme-toggle');
if (toggle) {
  toggle.addEventListener('click', () => {
    document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    toggle.textContent = document.body.dataset.theme === 'dark' ? '☀️' : '🌙';
  });
  document.body.dataset.theme = 'light';
}
