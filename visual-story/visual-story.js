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

const pages = [
  {
    number: 1,
    base: "visual-story/pages/page-01",
    image: "visual-story/pages/page-01.jpg",
    note: "پیش از آغاز روایت، عنوان یک هشدار است: دیدن، همیشه به معنای فهمیدن نیست."
  },
  {
    number: 2,
    base: "visual-story/pages/page-02",
    image: "visual-story/pages/page-02.jpg",
    note: "این صفحه کنار هم گذاشتنِ نگاه‌های متفاوت را پیشنهاد می‌کند؛ شاید نخستین قدمِ فهمیدن، دقیق‌تر دیدن باشد."
  },
  {
    number: 3,
    base: "visual-story/pages/page-03",
    image: "visual-story/pages/page-03.jpg",
    note: "چهار چهره، چهار شیوهٔ نزدیک‌شدن به یک مسئله‌اند: منطق، جست‌وجو، معنا و نقادی؛ هیچ‌کدام به‌تنهایی تمام تصویر نیستند."
  },
  {
    number: 4,
    base: "visual-story/pages/page-04",
    image: "visual-story/pages/page-04.jpg",
    note: "وقتی مسئله میان چند نگاه تقسیم می‌شود، پاسخ دیگر فقط از دستگاه نمی‌آید؛ از گفت‌وگو هم ساخته می‌شود."
  },
  {
    number: 5,
    base: "visual-story/pages/page-05",
    image: "visual-story/pages/page-05.jpg",
    note: "دستگاه اندازه می‌گیرد؛ اما اندازه‌گیری همیشه بخشی از واقعیت را انتخاب می‌کند، نه تمام آن را."
  },
  {
    number: 6,
    base: "visual-story/pages/page-06",
    image: "visual-story/pages/page-06.jpg",
    note: "وقتی نتیجه با انتظار نمی‌خواند، خطا تنها یک پاسخِ اشتباه نیست؛ فرصتی است برای بازبینیِ خودِ انتظار."
  },
  {
    number: 7,
    base: "visual-story/pages/page-07",
    image: "visual-story/pages/page-07.jpg",
    note: "پیش از اصلاح پاسخ، باید پرسید: آیا مسئله را از ابتدا درست صورت‌بندی کرده‌ایم؟"
  },
  {
    number: 8,
    base: "visual-story/pages/page-08",
    image: "visual-story/pages/page-08.jpg",
    note: "ذهن نقاد فقط نتیجه را نمی‌آزماید؛ پیش‌فرضی را هم که نتیجه بر آن بنا شده، به پرسش می‌کشد."
  },
  {
    number: 9,
    base: "visual-story/pages/page-09",
    image: "visual-story/pages/page-09.jpg",
    note: "بازآزماییِ یک نتیجه، تنها تکرار آزمایش نیست؛ فاصله‌گرفتن از برداشتی است که به آن عادت کرده‌ایم."
  },
  {
    number: 10,
    base: "visual-story/pages/page-10",
    image: "visual-story/pages/page-10.jpg",
    note: "در اینجا ناظر هم وارد معما می‌شود؛ گاهی آنچه مسیر پاسخ را تغییر می‌دهد، خودِ زاویهٔ نگاه ماست."
  },
  {
    number: 11,
    base: "visual-story/pages/page-11",
    image: "visual-story/pages/page-11.jpg",
    note: "ناشناخته‌بودنِ یک نشانه، دلیلِ بی‌معنا بودنش نیست؛ شاید هنوز زبانِ خواندنش را پیدا نکرده‌ایم."
  },
  {
    number: 12,
    base: "visual-story/pages/page-12",
    image: "visual-story/pages/page-12.jpg",
    note: "پرسش از نشانه فراتر می‌رود: اگر زبان پرده‌ای بر معنا باشد، برای دیدنِ پشت آن به چه چیزی نیاز داریم؟"
  },
  {
    number: 13,
    base: "visual-story/pages/page-13",
    image: "visual-story/pages/page-13.jpg",
    note: "داستان با پاسخ تمام نمی‌شود؛ با یک پرسش می‌ماند: از آنچه دیدیم، چه چیز هنوز از نگاه ما پنهان است؟"
  }
];

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
  const cacheVersion = "v6";
  const jpgSrc = `${page.base}.jpg?${cacheVersion}`;
  const pngSrc = `${page.base}.png?${cacheVersion}`;
  image.src = jpgSrc;
  image.alt = `Beyond What We See — frame ${page.number}`;
  image.loading = page.number <= 2 ? "eager" : "lazy";
  image.decoding = "async";
  image.draggable = false;

  let triedPng = false;

  image.addEventListener("error", () => {
    // JPG is the canonical archive format; PNG remains a safety fallback.
    if (!triedPng) {
      triedPng = true;
      image.src = pngSrc;
      return;
    }

    wrap.classList.add("is-error");
    wrap.innerHTML = `
      <div class="story-error">
        <strong>FRAME ${String(page.number).padStart(2, "0")} NOT FOUND</strong>
        <div>The image could not be loaded from the archive.</div>
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
