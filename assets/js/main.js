// ハンバーガーメニューの動作
document.querySelector(".hamburger").addEventListener("click", function () {
  this.classList.toggle("active");
  document.querySelector(".nav-links").classList.toggle("active");
});

// スクロール時のヘッダー挙動
window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    document.querySelector("header").style.background = "var(--header-bg)";
    document.querySelector("header").style.boxShadow =
      "0 2px 10px rgba(0, 0, 0, 0.3)";
  } else {
    document.querySelector("header").style.background = "var(--header-bg)";
    document.querySelector("header").style.boxShadow = "none";
  }
});

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    if (this.getAttribute("href").length === 1) return;

    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (!targetElement) return;

    const headerHeight = document.querySelector("header").offsetHeight;

    window.scrollTo({
      top: targetElement.offsetTop - headerHeight,
      behavior: "smooth",
    });

    // モバイルメニューを閉じる
    document.querySelector(".hamburger").classList.remove("active");
    document.querySelector(".nav-links").classList.remove("active");
  });
});

// イベントスライダーのアニメーション
document.addEventListener("DOMContentLoaded", function () {
  // 左から右へのスライダー
  const sliderLtr = document.querySelector(
    ".events-slider-ltr .events-slider-track"
  );
  // 右から左へのスライダー
  const sliderRtl = document.querySelector(
    ".events-slider-rtl .events-slider-track"
  );

  // 無限スクロールのためのクローン作成（左から右へのスライダー）
  const ltrItems = sliderLtr.querySelectorAll(".event-item");
  ltrItems.forEach((item) => {
    const clone = item.cloneNode(true);
    sliderLtr.appendChild(clone);
  });

  // 無限スクロールのためのクローン作成（右から左へのスライダー）
  const rtlItems = sliderRtl.querySelectorAll(".event-item");
  rtlItems.forEach((item) => {
    const clone = item.cloneNode(true);
    sliderRtl.appendChild(clone);
  });

  // CSSアニメーションを適用
  sliderLtr.style.animation = "slideLeft 30s linear infinite";
  sliderRtl.style.animation = "slideRight 30s linear infinite";

  // スライダーの一時停止と再開
  const sliders = document.querySelectorAll(".events-slider-track");
  sliders.forEach((slider) => {
    slider.addEventListener("mouseenter", function () {
      this.style.animationPlayState = "paused";
    });

    slider.addEventListener("mouseleave", function () {
      this.style.animationPlayState = "running";
    });
  });

  // ヘッダーの高さを取得してCSSカスタムプロパティに設定
  const headerHeight = document.querySelector("header").offsetHeight;
  document.documentElement.style.setProperty(
    "--header-height",
    headerHeight + "px"
  );
});
