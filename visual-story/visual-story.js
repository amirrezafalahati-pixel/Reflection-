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
    note: "«فراتر از آنچه می‌بینیم» از همین‌جا آغاز می‌شود: دیدن، پایانِ جست‌وجو نیست؛ آغازِ آن است."
  },
  {
    number: 2,
    base: "visual-story/pages/page-02",
    image: "visual-story/pages/page-02.jpg",
    note: "هر چیزی که می‌بینیم، از زاویه‌ای دیده می‌شود؛ و گاهی آنچه از دست می‌رود، مهم‌تر از آن چیزی است که در قاب مانده است."
  },
  {
    number: 3,
    base: "visual-story/pages/page-03",
    image: "visual-story/pages/page-03.jpg",
    note: "چهار نگاه، یک مسئله؛ حقیقت شاید نه در یکی از آن‌ها، بلکه در گفت‌وگوی میان آن‌ها آشکار شود."
  },
  {
    number: 4,
    base: "visual-story/pages/page-04",
    image: "visual-story/pages/page-04.jpg",
    note: "وقتی مسئله مشترک می‌شود، پاسخ دیگر فقط حاصلِ اندازه‌گیری نیست؛ حاصلِ شیوهٔ تفسیر آن نیز هست."
  },
  {
    number: 5,
    base: "visual-story/pages/page-05",
    image: "visual-story/pages/page-05.jpg",
    note: "دستگاه پاسخ می‌دهد؛ اما پاسخ، بدون پرسشِ درست، هنوز معنا ندارد."
  },
  {
    number: 6,
    base: "visual-story/pages/page-06",
    image: "visual-story/pages/page-06.png",
    note: "وقتی نتیجه با انتظار نمی‌خواند، نخستین پرسش شاید دربارهٔ نتیجه نباشد؛ دربارهٔ انتظاری باشد که از پیش ساخته‌ایم."
  },
  {
    number: 7,
    base: "visual-story/pages/page-07",
    image: "visual-story/pages/page-07.png",
    note: "پیش از اصلاح پاسخ، گاهی باید خودِ پرسش را اصلاح کرد؛ چون مسئلهٔ نادرست، پاسخ درست هم نمی‌سازد."
  },
  {
    number: 8,
    base: "visual-story/pages/page-08",
    image: "visual-story/pages/page-08.jpg",
    note: "شک، فقط تردید در نتیجه نیست؛ گاهی جرئتِ دوباره پرسیدنِ چیزی است که بدیهی گرفته‌ایم."
  },
  {
    number: 9,
    base: "visual-story/pages/page-09",
    image: "visual-story/pages/page-09.jpg",
    note: "کم‌کردنِ خطا کافی نیست؛ باید دید چه چیزی را از ابتدا در تعریفِ مسئله نادیده گرفته‌ایم."
  },
  {
    number: 10,
    base: "visual-story/pages/page-10",
    image: "visual-story/pages/page-10.png",
    note: "آنچه آشکار است، همیشه مهم‌ترین چیز نیست؛ نگاه نقادانه گاهی به دنبالِ غایبِ قاب می‌گردد."
  },
  {
    number: 11,
    base: "visual-story/pages/page-11",
    image: "visual-story/pages/page-11.png",
    note: "ناآشنا بودنِ یک نشانه، دلیلِ بی‌معنا بودنش نیست؛ شاید هنوز زبانِ خواندنش را پیدا نکرده‌ایم."
  },
  {
    number: 12,
    base: "visual-story/pages/page-12",
    image: "visual-story/pages/page-12.jpg",
    note: "همهٔ معنا در اندازه‌گیری نمی‌گنجد؛ بعضی پرسش‌ها درست از جایی آغاز می‌شوند که اندازه‌گیری پایان می‌گیرد."
  },
  {
    number: 13,
    base: "visual-story/pages/page-13",
    image: "visual-story/pages/page-13.jpg",
    note: "پاسخ شاید پایانِ راه نباشد؛ گاهی پرسشِ درست، چیزی است که باید با خودمان از این تصویر بیرون ببریم."
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
  image.src = `${page.image}?v=6`;
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
      image.src = `${page.base}.png?v=6`;
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
