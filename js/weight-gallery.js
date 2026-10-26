'use strict';
(() => {
  const gallery = document.querySelector('.weight-screen-grid');
  const dialog = document.getElementById('weight-screen-preview');
  if (!gallery || !dialog || typeof dialog.showModal !== 'function') return;
  const image = document.getElementById('weight-screen-preview-image');
  const title = document.getElementById('weight-screen-preview-title');
  gallery.addEventListener('click', event => {
    const link = event.target.closest('.weight-screen-link');
    if (!link || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    image.src = link.href;
    image.alt = link.querySelector('img').alt;
    title.textContent = link.closest('figure').querySelector('figcaption').textContent + '（Android版）';
    dialog.showModal();
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
})();
