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
    note: "این جلد پیش از آغاز روایت، مسئلهٔ اصلی را پیش می‌کشد: میان آنچه دیده می‌شود و آنچه حقیقت دارد، همیشه فاصله‌ای هست. «فراتر از آنچه می‌بینیم» در اینجا بیشتر از یک عنوان است؛ دعوتی است به دوباره‌دیدن."
  },
  {
    number: 2,
    base: "visual-story/pages/page-02",
    image: "visual-story/pages/page-02.jpg",
    note: "این صفحه عمداً چند لایه را کنار هم می‌نشاند: سخنِ تورینگ دربارهٔ شنیدنِ دقیق، تصویرهای گوناگون و متنی که از متفاوت بودنِ نگاه‌ها می‌گوید. پیش از حل کردن مسئله، شاید نخست باید یاد بگیریم چه چیزهایی را معمولاً از دست می‌دهیم."
  },
  {
    number: 3,
    base: "visual-story/pages/page-03",
    image: "visual-story/pages/page-03.jpg",
    note: "چهار چهره در کنار هم قرار گرفته‌اند، نه برای ساختن یک پاسخ یکسان، بلکه برای نشان دادن چهار مسیر نگاه به یک مسئله: منطق، جست‌وجو، معنا و نقادی. خودِ ترکیب این چهار نگاه، بخشی از مسئله‌ای است که قرار است دنبال شود."
  },
  {
    number: 4,
    base: "visual-story/pages/page-04",
    image: "visual-story/pages/page-04.jpg",
    note: "چهار نفر دور یک میز و یک دستگاه نشسته‌اند؛ گویی مسئله دیگر متعلق به یک نفر نیست. وقتی مشاهده، پرسش و تفسیر کنار هم قرار می‌گیرند، آنچه از دستگاه دریافت می‌شود تنها نیمی از ماجراست؛ نیمهٔ دیگر، شیوهٔ خواندن آن است."
  },
  {
    number: 5,
    base: "visual-story/pages/page-05",
    image: "visual-story/pages/page-05.png",
    note: "در مرکز قاب، دستگاه تنها چیزی است که پاسخ می‌دهد؛ اما هنوز معلوم نیست پاسخ به چه پرسشی است. این مکث مهم است: هر اندازه‌گیری، پیش از آن‌که چیزی را نشان دهد، به ما می‌گوید چه چیزی را برای دیدن انتخاب کرده‌ایم."
  },
  {
    number: 6,
    base: "visual-story/pages/page-06",
    image: "visual-story/pages/page-06.png",
    note: "خروجی‌ها یکی پس از دیگری با انتظار سازگار نیستند. شمس دقیقاً همین نقطه را نشانه می‌گیرد: اگر نتیجه با انتظار نمی‌خواند، آیا باید نتیجه را خطا دانست، یا نخست باید خودِ انتظار را دوباره بررسی کرد؟"
  },
  {
    number: 7,
    base: "visual-story/pages/page-07",
    image: "visual-story/pages/page-07.png",
    note: "گفت‌وگو از «پیدا کردن پاسخ» به «پرسیدنِ درست» می‌رسد. شاید بعضی مسئله‌ها به این دلیل حل نمی‌شوند که پاسخ دشوار است؛ شاید چون صورت مسئله از ابتدا بر پایهٔ یک پیش‌فرض نادرست ساخته شده است."
  },
  {
    number: 8,
    base: "visual-story/pages/page-08",
    image: "visual-story/pages/page-08.jpg",
    note: "در این قاب، شک به خودِ نتیجه محدود نمی‌ماند؛ پای واقعیتِ فرض‌شده هم به میان می‌آید. وقتی داده با انتظار سازگار نیست، یک ذهن نقاد فقط نمی‌پرسد «کجا خطا کردیم؟»؛ می‌پرسد «کدام فرض را بی‌آن‌که بفهمیم، درست گرفته بودیم؟»"
  },
  {
    number: 9,
    base: "visual-story/pages/page-09",
    image: "visual-story/pages/page-09.png",
    note: "آزمایش قرار است خطا را آشکار کند، اما گفت‌وگو یک گام جلوتر می‌رود: شاید چیزی که باید کنار گذاشته شود، فقط یک نتیجهٔ شخصی نباشد؛ شاید شیوه‌ای باشد که با آن نتیجه را از ابتدا تفسیر کرده‌ایم. دیدنِ خطا، گاهی نیازمند فاصله گرفتن از خودِ نگاه است."
  },
  {
    number: 10,
    base: "visual-story/pages/page-10",
    image: "visual-story/pages/page-10.png",
    note: "اینجا نگاه از دستگاه به ناظر برمی‌گردد. جملهٔ شمس دربارهٔ «تیر پران» درست در همین نقطه معنا پیدا می‌کند: ممکن است چیزی را ببینیم که آشکار است و در عین حال، چیزی را نبینیم که مسیرِ واقعی مسئله را تعیین می‌کند."
  },
  {
    number: 11,
    base: "visual-story/pages/page-11",
    image: "visual-story/pages/page-11.png",
    note: "وقتی نمایشگر دیگر با حروف آشنا سخن نمی‌گوید، مسئله شکل تازه‌ای پیدا می‌کند: آیا دستگاه خراب شده، یا ما هنوز زبانِ آن را نمی‌شناسیم؟ گاهی ناآشنا بودنِ یک نشانه، نشانهٔ بی‌معنایی نیست؛ نشانهٔ محدود بودنِ شیوهٔ خواندن ماست."
  },
  {
    number: 12,
    base: "visual-story/pages/page-12",
    image: "visual-story/pages/page-12.jpg",
    note: "مولانا مسئله را از «خواندنِ نشانه» به «پرده‌ای که زبان می‌سازد» می‌برد. در کنار دستگاهی که هنوز پاسخ می‌دهد، پرسشی شکل می‌گیرد که اندازه‌گیری به‌تنهایی به آن پاسخ نمی‌دهد: اگر معنا پشت زبان پنهان شده باشد، چه چیزی قرار است آن را آشکار کند؟"
  },
  {
    number: 13,
    base: "visual-story/pages/page-13",
    image: "visual-story/pages/page-13.jpg",
    note: "در پایان، همه به یک پرسش مشترک می‌رسند: «رمز چیست؟» اما تصویر پاسخ قطعی نمی‌دهد. شاید ارزش این پایان دقیقاً در همین ناتمام‌ماندن باشد؛ اینکه به‌جای بستن مسئله، ما را وادار کند دوباره بپرسیم چه چیزی را دیدیم، چه چیزی را اندازه گرفتیم و چه چیزی را هنوز ندیده‌ایم."
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
