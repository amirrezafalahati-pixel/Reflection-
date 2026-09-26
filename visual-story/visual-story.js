/* =========================================================
   REFLECTION — VISUAL STORY / VERTICAL READER
   ========================================================= */

const TOTAL = 13;

/*
  IMPORTANT:
  The filenames below must match GitHub EXACTLY.
  Example:
  visual-story/pages/page-01.jpg
  visual-story/pages/page-02.jpg
  ...
  visual-story/pages/page-13.jpg
  or .png — both are supported.

  GitHub Pages is case-sensitive.
*/

const pages = Array.from({ length: TOTAL }, (_, index) => {
  const number = index + 1;
  const padded = String(number).padStart(2, "0");

  return {
    number,
    base: `visual-story/pages/page-${padded}`,
    image: `visual-story/pages/page-${padded}.jpg`,
    note: [
      "آغاز داستان با یک سکوت است؛ چهار نگاه متفاوت، پیش از آنکه پاسخی داشته باشند، باید مسئله را ببینند.",
      "نخستین نتیجه با انتظار جور درنمی‌آید. خطا اینجا پایان راه نیست؛ نشانه‌ای است برای بازگشت و بررسی دوباره.",
      "چهار زاویه کنار هم قرار می‌گیرند: منطق، جست‌وجوی معنا، تجربه و نقدِ خودِ پرسش.",
      "ماشین در مرکز است، اما مسئله فقط رمزگشایی نیست؛ پرسش این است که چه چیزی را واقعاً می‌توان سنجید؟",
      "اندازه‌گیری اطلاعات می‌دهد، اما اطلاعات به‌تنهایی معنا را تضمین نمی‌کند.",
      "وقتی فرض اولیه دوباره بررسی می‌شود، مسیر حل مسئله هم تغییر می‌کند.",
      "اختلاف دیدگاه‌ها مانع کار نیست؛ اگر درست شنیده شوند، خودِ روشِ فکر کردن را اصلاح می‌کنند.",
      "یک نتیجه درست لزوماً به معنای یک تفسیر درست نیست؛ باید خودِ فرض را هم زیر سؤال برد.",
      "نقد از بیرون آسان‌تر است؛ لحظه مهم‌تر وقتی است که مشاهده‌گر، روش خودش را هم وارد بررسی کند.",
      "شاید بخشی از واقعیت همیشه بیرون از قاب بماند؛ دیدنِ آنچه دیده نشده، مرحله بعدی مشاهده است.",
      "دستگاه چیزی را نشان می‌دهد، اما هنوز معلوم نیست این نشانه دقیقاً چه معنایی دارد.",
      "پرسش از پاسخ مهم‌تر می‌شود؛ آنچه پنهان است شاید در زبان، در ذهن، یا در خودِ روشِ جست‌وجو باشد.",
      "تصویر تمام می‌شود، اما مسئله حل نشده باقی می‌ماند: رمز چیست، و چه کسی در حال رمزگشاییِ چه کسی است؟"
    ][index]
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

  const caption = document.createElement("p");
  caption.className = "story-frame-caption";
  caption.textContent = page.note;
  caption.hidden = true;

  frame.append(head, wrap, caption);
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
  const frames = [...document.querySelectorAll(".story-frame")];
  if (!frames.length) return;

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { root:null, rootMargin:"0px 0px -8% 0px", threshold:0.08 });
    frames.forEach(frame => revealObserver.observe(frame));
  } else {
    frames.forEach(frame => frame.classList.add("is-visible"));
  }

  const hud = document.getElementById("hudCurrent");
  let activeIndex = 0;
  let ticking = false;

  function setActive(index) {
    index = Math.max(0, Math.min(frames.length - 1, index));
    frames.forEach((frame, i) => frame.classList.toggle("is-active", i === index));
    activeIndex = index;
    if (hud) hud.textContent = `FRAME ${String(index + 1).padStart(2,"0")} / ${String(frames.length).padStart(2,"0")}`;
  }

  function measureFocus() {
    const center = window.innerHeight * 0.50;
    let best = 0;
    let distance = Infinity;
    frames.forEach((frame, i) => {
      const rect = frame.getBoundingClientRect();
      const frameCenter = rect.top + rect.height * 0.5;
      const d = Math.abs(frameCenter - center);
      if (d < distance) { distance = d; best = i; }
    });
    setActive(best);
    ticking = false;
  }

  function requestFocus() {
    if (!ticking) { ticking = true; requestAnimationFrame(measureFocus); }
  }

  window.addEventListener("scroll", requestFocus, { passive:true });
  window.addEventListener("resize", requestFocus);
  setActive(0);

  const prev = document.getElementById("prevFrame");
  const next = document.getElementById("nextFrame");
  if (prev) prev.addEventListener("click", () => frames[Math.max(0, activeIndex-1)].scrollIntoView({behavior:"smooth",block:"center"}));
  if (next) next.addEventListener("click", () => frames[Math.min(frames.length-1, activeIndex+1)].scrollIntoView({behavior:"smooth",block:"center"}));
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


function setupNotesToggle() {
  const toggle = document.getElementById("notesToggle");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const enabled = document.body.classList.toggle("notes-open");
    toggle.setAttribute("aria-pressed", String(enabled));
    toggle.setAttribute("aria-label", enabled ? "Hide reading notes" : "Show reading notes");
    document.querySelectorAll(".story-frame-caption").forEach(caption => {
      caption.hidden = !enabled;
    });
  });
}

function scrollToEnd() {
  const ending = document.getElementById("storyEnding");
  if (ending) {
    ending.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/* Initial render */
render();
observeFrames();
setupLightbox();
setupNotesToggle();

window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);

topButton.addEventListener("click", scrollToTop);

const endButton = document.getElementById("endButton");
if (endButton) endButton.addEventListener("click", scrollToEnd);

// Home / End make the reader feel natural on desktop without changing the visual UI.
document.addEventListener("keydown", event => {
  if (event.target && ["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName)) return;
  if (event.key === "Home") { event.preventDefault(); scrollToTop(); }
  if (event.key === "End") { event.preventDefault(); scrollToEnd(); }
});

updateProgress();
