'use strict';

/* ---- Loader ---- */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) loader.classList.add('is-hidden');
});

/* ---- Theme (dark mode) ---- */
const root = document.documentElement;
const themeBtn = document.getElementById('theme-toggle');
const themeLabel = document.getElementById('theme-label');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

function readSaved() {
  try { return localStorage.getItem('theme'); } catch { return null; }
}
function save(theme) {
  try { localStorage.setItem('theme', theme); } catch { /* хадгалах боломжгүй */ }
}
function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  const dark = theme === 'dark';
  themeBtn.setAttribute('aria-pressed', String(dark));
  themeLabel.textContent = dark ? 'Гэрэлтэй горим' : 'Харанхуй горим';
}

applyTheme(readSaved() || (systemDark.matches ? 'dark' : 'light'));

themeBtn.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  save(next);
});

/* ---- 3D flip ---- */
document.querySelectorAll('.card').forEach((card) => {
  const btn = card.querySelector('.card__flip');
  const front = card.querySelector('.card__front');
  const back = card.querySelector('.card__back');

  btn.addEventListener('click', () => {
    const flipped = card.classList.toggle('is-flipped');
    btn.setAttribute('aria-pressed', String(flipped));
    btn.textContent = flipped ? 'Буцаах' : 'Эргүүлэх';
    // Харагдахгүй талыг дэлгэц уншигчаас нууна
    front.setAttribute('aria-hidden', String(flipped));
    back.setAttribute('aria-hidden', String(!flipped));
  });
});
