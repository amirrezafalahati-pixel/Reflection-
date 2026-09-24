/* =========================================================
   REFLECTION — VISUAL STORY / VERTICAL READER
   ========================================================= */

const TOTAL = 12;

/*
  IMPORTANT:
  The filenames below must match GitHub EXACTLY.
  Example:
  visual-story/pages/page-01.jpg
  visual-story/pages/page-02.jpg
  ...
  visual-story/pages/page-12.jpg
  or .png — both are supported.

  GitHub Pages is case-sensitive.
*/

const pages = Array.from({ length: TOTAL }, (_, index) => {
  const number = index + 1;
  const padded = String(number).padStart(2, "0");

  return {
    number,
    base: `visual-story/pages/page-${padded}`,
    image: `visual-story/pages/page-${padded}.jpg`
  };
});

const reader = document.getElementById("storyReader");
const progressFill = document.getElementById("progressFill");
const topButton = document.getElementById("topButton");

function createFrame(page) {
  const frame = document.createElement("article");
  frame.className = "story-frame";
  frame.dataset.page = page.number;

  const head = document.createElement("div");
  head.className = "story-frame-head";
  head.innerHTML = `
    <span class="frame-title">BEYOND WHAT WE SEE</span>
    <span class="story-frame-number">FRAME ${String(page.number).padStart(2, "0")} / ${TOTAL}</span>
  `;

  const wrap = document.createElement("div");
  wrap.className = "story-image-wrap";

  const image = document.createElement("img");
  image.className = "story-image";
  image.src = page.image;
  image.alt = `Beyond What We See — frame ${page.number}`;
  image.loading = page.number === 1 ? "eager" : "lazy";
  image.decoding = "async";
  image.draggable = false;

  let triedPng = false;

  image.addEventListener("error", () => {
    /*
      The current archive contains both JPG and PNG frames.
      Try the alternate extension automatically before reporting
      a missing frame. This also makes future image replacement easier.
    */
    if (!triedPng && image.src.toLowerCase().endsWith(".jpg")) {
      triedPng = true;
      image.src = `${page.base}.png`;
      return;
    }

    wrap.classList.add("is-error");
    wrap.innerHTML = `
      <div class="story-error">
        <strong>FRAME ${String(page.number).padStart(2, "0")} NOT FOUND</strong>
        <div>The image could not be loaded as JPG or PNG.</div>
        <code>${page.base}.jpg</code>
      </div>
    `;
  });

  wrap.appendChild(image);

  /*
    Optional caption:
    Add a caption here later without changing the image itself.
    For now we keep the visual story clean.
  */

  frame.append(head, wrap);
  return frame;
}

function render() {
  const fragment = document.createDocumentFragment();

  pages.forEach(page => {
    fragment.appendChild(createFrame(page));
  });

  reader.appendChild(fragment);
}

function updateProgress() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

  const progress = scrollHeight <= 0
    ? 0
    : Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));

  /*
    Desktop uses height; mobile uses width.
  */
  if (window.matchMedia("(max-width: 700px)").matches) {
    progressFill.style.width = `${progress}%`;
    progressFill.style.height = "100%";
  } else {
    progressFill.style.height = `${progress}%`;
    progressFill.style.width = "100%";
  }
}

function observeFrames() {
  const frames = document.querySelectorAll(".story-frame");

  if (!("IntersectionObserver" in window)) {
    frames.forEach(frame => frame.classList.add("is-visible"));
    return;
  }

  // First observer: reveal each frame once as it enters the reading flow.
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.08
    }
  );

  // Second observer: gently focuses the frame closest to the reader's
  // visual center. This gives the page a cinematic rhythm without
  // turning the story into a slideshow.
  const focusObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle("is-active", entry.isIntersecting);
      });
    },
    {
      root: null,
      /* A narrower center band makes the current image become clear
         while the previous/next frames naturally recede. */
      rootMargin: "-34% 0px -34% 0px",
      threshold: 0.12
    }
  );

  frames.forEach(frame => {
    revealObserver.observe(frame);
    focusObserver.observe(frame);
  });
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

/* Click an image to see it larger without leaving the story */
function setupLightbox() {
  const lightbox = document.createElement("div");
  lightbox.className = "image-lightbox";
  lightbox.setAttribute("aria-hidden", "true");

  const image = document.createElement("img");
  image.alt = "";

  const close = document.createElement("button");
  close.className = "lightbox-close";
  close.type = "button";
  close.setAttribute("aria-label", "Close image");
  close.textContent = "×";

  lightbox.append(image, close);
  document.body.appendChild(lightbox);

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    image.src = "";
  }

  document.querySelectorAll(".story-image").forEach(source => {
    source.addEventListener("click", () => {
      image.src = source.src;
      image.alt = source.alt;
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
    });
  });

  close.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", event => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeLightbox();
  });
}

/* Initial render */
render();
observeFrames();
setupLightbox();

window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);

topButton.addEventListener("click", scrollToTop);

updateProgress();
