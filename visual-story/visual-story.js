(() => {
  const TOTAL = 12;
  const pages = Array.from({ length: TOTAL }, (_, i) => ({
    number: i + 1,
    image: `visual-story/pages/page-${String(i + 1).padStart(2, '0')}.jpg`,
    // Add optional text later, e.g.:
    // kicker: 'THE QUESTION',
    // caption: 'A short line that belongs to this frame.'
  }));

  const qs = (s) => document.querySelector(s);
  const stage = qs('#stage');
  const frame = qs('#imageFrame');
  const image = qs('#storyImage');
  const placeholder = qs('#imagePlaceholder');
  const placeholderNumber = qs('#placeholderNumber');
  const counter = qs('#pageCounter');
  const label = qs('#pageLabel');
  const dots = qs('#dots');
  const prev = qs('#prevButton');
  const next = qs('#nextButton');
  const zoom = qs('#zoomButton');
  const fullscreen = qs('#fullscreenButton');
  const hint = qs('#hint');
  const endScreen = qs('#endScreen');
  const infoButton = qs('#infoButton');
  const infoModal = qs('#infoModal');
  const closeInfo = qs('#closeInfo');
  const caption = qs('#caption');
  const captionKicker = qs('#captionKicker');
  const captionText = qs('#captionText');

  let current = 0;
  let touchStartX = 0;
  let touchStartY = 0;
  let isDragging = false;

  pages.forEach((p, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'vs-dot';
    dot.setAttribute('aria-label', `Go to page ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dots.appendChild(dot);

    const preload = new Image();
    preload.src = p.image;
  });

  function render(index, animate = true) {
    current = Math.max(0, Math.min(TOTAL - 1, index));
    const p = pages[current];

    counter.textContent = `${String(p.number).padStart(2, '0')} / ${TOTAL}`;
    label.textContent = 'BEYOND WHAT WE SEE';
    placeholderNumber.textContent = String(p.number).padStart(2, '0');
    placeholder.querySelector('.placeholder-note').textContent = `Upload page-${String(p.number).padStart(2, '0')}.jpg to visual-story/pages/`;

    image.classList.remove('loaded');
    image.removeAttribute('src');
    frame.classList.remove('zoomed');
    zoom.textContent = 'LOOK CLOSER';

    if (animate) {
      stage.classList.remove('is-changing');
      void stage.offsetWidth;
      stage.classList.add('is-changing');
    }

    image.onload = () => {
      placeholder.style.display = 'none';
      image.classList.add('loaded');
    };
    image.onerror = () => {
      image.classList.remove('loaded');
      placeholder.style.display = 'flex';
    };
    image.src = p.image;

    if (p.caption || p.kicker) {
      caption.hidden = false;
      captionKicker.textContent = p.kicker || '';
      captionText.textContent = p.caption || '';
    } else {
      caption.hidden = true;
    }

    document.querySelectorAll('.vs-dot').forEach((d, i) => d.classList.toggle('active', i === current));
    prev.disabled = current === 0;
    next.disabled = false;

    hint.textContent = current === TOTAL - 1
      ? 'NEXT → REVEAL THE ENDING'
      : 'SWIPE · USE ← → · TAP THE SIDES';
  }

  function goTo(index) {
    endScreen.classList.remove('visible');
    endScreen.setAttribute('aria-hidden', 'true');
    render(index, true);
  }

  function goNext() {
    if (current < TOTAL - 1) {
      goTo(current + 1);
    } else {
      endScreen.classList.add('visible');
      endScreen.setAttribute('aria-hidden', 'false');
    }
  }

  function goPrev() {
    if (current > 0) goTo(current - 1);
  }

  prev.addEventListener('click', goPrev);
  next.addEventListener('click', goNext);

  zoom.addEventListener('click', () => {
    frame.classList.toggle('zoomed');
    zoom.textContent = frame.classList.contains('zoomed') ? 'RESET VIEW' : 'LOOK CLOSER';
  });

  fullscreen.addEventListener('click', async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        fullscreen.textContent = 'EXIT FULLSCREEN';
      } else {
        await document.exitFullscreen();
        fullscreen.textContent = 'FULLSCREEN';
      }
    } catch (_) {
      fullscreen.textContent = 'FULLSCREEN';
    }
  });

  document.addEventListener('fullscreenchange', () => {
    fullscreen.textContent = document.fullscreenElement ? 'EXIT FULLSCREEN' : 'FULLSCREEN';
  });

  document.addEventListener('keydown', (event) => {
    if (!infoModal.hidden) {
      if (event.key === 'Escape') closeInfoModal();
      return;
    }
    if (event.key === 'ArrowRight' || event.key === 'PageDown') goNext();
    if (event.key === 'ArrowLeft' || event.key === 'PageUp') goPrev();
    if (event.key.toLowerCase() === 'f') fullscreen.click();
    if (event.key.toLowerCase() === 'z') zoom.click();
    if (event.key === 'Escape') endScreen.classList.remove('visible');
  });

  stage.addEventListener('click', (event) => {
    if (isDragging) return;
    const rect = stage.getBoundingClientRect();
    const x = event.clientX - rect.left;
    if (x < rect.width * .28) goPrev();
    else if (x > rect.width * .72) goNext();
  });

  stage.addEventListener('touchstart', (event) => {
    const t = event.changedTouches[0];
    touchStartX = t.clientX;
    touchStartY = t.clientY;
    isDragging = false;
  }, { passive: true });

  stage.addEventListener('touchmove', (event) => {
    const t = event.changedTouches[0];
    if (Math.abs(t.clientX - touchStartX) > 12) isDragging = true;
  }, { passive: true });

  stage.addEventListener('touchend', (event) => {
    const t = event.changedTouches[0];
    const dx = t.clientX - touchStartX;
    const dy = t.clientY - touchStartY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) goNext(); else goPrev();
    }
    setTimeout(() => { isDragging = false; }, 0);
  }, { passive: true });

  function openInfoModal() {
    infoModal.hidden = false;
    closeInfo.focus();
  }
  function closeInfoModal() {
    infoModal.hidden = true;
    infoButton.focus();
  }
  infoButton.addEventListener('click', openInfoModal);
  closeInfo.addEventListener('click', closeInfoModal);
  infoModal.querySelector('[data-close-info]').addEventListener('click', closeInfoModal);

  const params = new URLSearchParams(location.search);
  const requestedPage = parseInt(params.get('page'), 10);
  render(Number.isFinite(requestedPage) ? requestedPage - 1 : 0, false);
})();
