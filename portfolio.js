document.addEventListener('DOMContentLoaded', () => {
  const images = Array.from(document.querySelectorAll('.media-item img'));
  let currentIndex = 0;

  const overlay = document.createElement('div');
  overlay.className = 'lightbox';

  const closeBtn = document.createElement('span');
  closeBtn.className = 'lightbox-close';
  closeBtn.textContent = '×';

  const prevBtn = document.createElement('button');
  prevBtn.className = 'lightbox-arrow lightbox-arrow--prev';
  prevBtn.innerHTML = '&#8592;';

  const nextBtn = document.createElement('button');
  nextBtn.className = 'lightbox-arrow lightbox-arrow--next';
  nextBtn.innerHTML = '&#8594;';

  const enlarged = document.createElement('img');

  const lightboxCaption = document.createElement('p');
  lightboxCaption.className = 'lightbox-caption';

  const lightboxContent = document.createElement('div');
  lightboxContent.className = 'lightbox-content';
  lightboxContent.appendChild(enlarged);
  lightboxContent.appendChild(lightboxCaption);

  overlay.appendChild(closeBtn);
  overlay.appendChild(prevBtn);
  overlay.appendChild(lightboxContent);
  overlay.appendChild(nextBtn);
  document.body.appendChild(overlay);

  function showImage(index) {
    currentIndex = (index + images.length) % images.length;
    const img = images[currentIndex];
    enlarged.src = img.src;
    enlarged.alt = img.alt;
    const captionEl = img.closest('.media-item').querySelector('.caption');
    lightboxCaption.textContent = captionEl ? captionEl.textContent : '';
    lightboxCaption.style.display = captionEl ? '' : 'none';
  }

  images.forEach((img, i) => {
    img.addEventListener('click', () => {
      showImage(i);
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function close() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  prevBtn.addEventListener('click', e => { e.stopPropagation(); showImage(currentIndex - 1); });
  nextBtn.addEventListener('click', e => { e.stopPropagation(); showImage(currentIndex + 1); });
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', e => {
    if (!overlay.classList.contains('active')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (e.key === 'ArrowRight') showImage(currentIndex + 1);
  });
});
