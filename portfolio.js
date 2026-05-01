document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.createElement('div');
  overlay.className = 'lightbox';

  const closeBtn = document.createElement('span');
  closeBtn.className = 'lightbox-close';
  closeBtn.textContent = '×';

  const enlarged = document.createElement('img');

  overlay.appendChild(closeBtn);
  overlay.appendChild(enlarged);
  document.body.appendChild(overlay);

  document.querySelectorAll('.media-item img').forEach(img => {
    img.addEventListener('click', () => {
      enlarged.src = img.src;
      enlarged.alt = img.alt;
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function close() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
});
