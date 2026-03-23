# サイトデザイン大幅リニューアル v2 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** bellsanct.github.io をダークパープルベース + サイドナビ型レイアウトに全面刷新する

**Architecture:** 既存の Vue 3 + Vite 6 + Tailwind CSS 3 構成を維持。App.vue をサイドバー+メインコンテンツの2カラムレイアウトに再構築。Header.vue → Sidebar.vue に置き換え。Profile.vue をカード型に刷新。EventsGallery.vue をグリッドレイアウトに変更。ダークテーマ固定（テーマ切り替え廃止）。

**Tech Stack:** Vue 3, Vite 6, Tailwind CSS 3, GitHub Actions

---

### Task 1: グローバルスタイルをダークパープルベースに変更

**Files:**
- Modify: `src/style.css`

**Step 1: CSS変数をダークパープルベースに書き換え**

`:root` のカラー変数を以下に置き換える。ダークモード用の `[data-theme="dark"]` セクションは削除する。

```css
:root {
  /* Base - Dark Purple */
  --bg-primary: #1A1428;
  --bg-secondary: #2D2640;
  --bg-tertiary: #3A3050;
  --bg-accent: #3A3050;
  --bg-dark: #130E1E;

  /* Accent Colors */
  --lavender: #B8B0D4;
  --lavender-dark: #9B92C0;
  --lavender-light: #D4CEE8;
  --rose: #F0C5D8;
  --rose-dark: #E5B5CC;
  --rose-light: #F8E5ED;
  --gold: #F4E5A8;
  --gold-dark: #E8D48F;
  --coral: #E8808A;
  --coral-light: #F0A0A0;
  --purple-deep: #2D2640;
  --purple-darker: #1A1428;

  /* Text - Light on Dark */
  --text-primary: #F0EBF5;
  --text-secondary: #A89BC0;
  --text-muted: #7D7390;
  --text-light: #F0EBF5;

  /* Borders & Shadows */
  --border-light: rgba(184, 176, 212, 0.15);
  --border-medium: rgba(184, 176, 212, 0.25);
  --border-dark: rgba(184, 176, 212, 0.1);
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.5);

  /* Layout */
  --sidebar-width: 300px;
  --section-gap: 6rem;
  --section-gap-sm: 3rem;
}
```

**Step 2: body / html のベーススタイルを更新**

```css
html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
}
```

**Step 3: `[data-theme="dark"]` のすべてのルールを削除**

style.css 内の `[data-theme="dark"]` プレフィックスがついたルールをすべて削除する。

**Step 4: スクロールバーとセレクションをダーク対応に更新**

```css
::-webkit-scrollbar-track {
  background: var(--bg-secondary);
}

::-webkit-scrollbar-thumb {
  background-color: var(--lavender-dark);
}

::selection {
  background: var(--lavender-dark);
  color: var(--text-primary);
}
```

**Step 5: .container のmax-widthを調整**

サイドバーレイアウトではコンテナ幅を調整する:

```css
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
}
```

**Step 6: .card, .btn クラスをダーク対応に更新**

```css
.card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: 12px;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
  border-color: var(--border-medium);
}
```

**Step 7: コミット**

```bash
git add src/style.css
git commit -m "style: overhaul global styles to dark purple base"
```

---

### Task 2: App.vue をサイドバー+メインコンテンツレイアウトに再構築

**Files:**
- Modify: `src/App.vue`
- Delete import: Header, Footer components
- Add import: Sidebar (Task 3で作成)

**Step 1: script セクションを簡素化**

ダークモード関連のロジック（isDarkMode, toggleDarkMode, applyDarkMode, provide, watch）とローディング画面（isLoading）、ヒーロー（heroVisible）のロジックをすべて削除する。

scrollToSection だけ残す:

```js
<script setup>
import { onMounted } from "vue";
import Sidebar from "./components/Sidebar.vue";
import Profile from "./components/Profile.vue";
import EventsGallery from "./components/EventsGallery.vue";
import Works from "./components/Works.vue";
import Tools from "./components/Tools.vue";
import Contact from "./components/Contact.vue";
</script>
```

**Step 2: テンプレートを2カラムレイアウトに置き換え**

ローディング画面、ヒーローセクション、Header、Footerをすべて削除し、以下に置き換え:

```html
<template>
  <div class="app-layout">
    <Sidebar />
    <main class="main-content">
      <Profile />
      <EventsGallery />
      <Works />
      <Tools />
      <Contact />
      <footer class="site-footer">
        <p>&copy; {{ new Date().getFullYear() }} Bell_staymen04. All rights reserved.</p>
      </footer>
    </main>
  </div>
</template>
```

**Step 3: scoped CSSを全面書き換え**

ヒーロー、ローディング画面、装飾アニメーションのCSSをすべて削除し、以下に置き換え:

```css
<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  margin-left: var(--sidebar-width);
  padding: 4rem 4rem 2rem;
  max-width: calc(100% - var(--sidebar-width));
}

.site-footer {
  padding: 3rem 0 2rem;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.875rem;
  border-top: 1px solid var(--border-light);
  margin-top: var(--section-gap);
}

/* Mobile */
@media (max-width: 768px) {
  .app-layout {
    flex-direction: column;
  }

  .main-content {
    margin-left: 0;
    max-width: 100%;
    padding: 6rem 1.5rem 2rem;
  }
}
</style>
```

**Step 4: コミット**

```bash
git add src/App.vue
git commit -m "refactor: restructure App.vue to sidebar + main content layout"
```

注意: この時点ではSidebar.vueがまだないのでビルドは通らない。Task 3で作成する。

---

### Task 3: Sidebar.vue を新規作成

**Files:**
- Create: `src/components/Sidebar.vue`
- Delete: `src/components/Header.vue` (Sidebar完成後)

**Step 1: Sidebar.vue を作成**

```vue
<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const activeSection = ref("profile");
const mobileMenuOpen = ref(false);

const sections = [
  { id: "profile", label: "About" },
  { id: "events", label: "Events" },
  { id: "works", label: "Works" },
  { id: "tools", label: "Tools" },
  { id: "contact", label: "Contact" },
];

const socialLinks = [
  { name: "Twitter", url: "https://twitter.com/Bell_staymen04", icon: "twitter" },
  { name: "GitHub", url: "https://github.com/bellsanct", icon: "github" },
  { name: "OMR", url: "https://outermusicroom.site/", icon: "link" },
];

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const scrollToSection = (id) => {
  const element = document.querySelector(`#${id}`);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
    mobileMenuOpen.value = false;
  }
};

const handleScroll = () => {
  const scrollY = window.scrollY + 200;
  for (let i = sections.length - 1; i >= 0; i--) {
    const el = document.querySelector(`#${sections[i].id}`);
    if (el && el.offsetTop <= scrollY) {
      activeSection.value = sections[i].id;
      break;
    }
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <!-- Mobile Header -->
  <header class="mobile-header">
    <span class="mobile-logo">Bell_staymen04</span>
    <button class="hamburger" :class="{ active: mobileMenuOpen }" @click="toggleMobileMenu" aria-label="メニュー">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </header>

  <!-- Mobile Menu Overlay -->
  <Transition name="menu-fade">
    <div v-if="mobileMenuOpen" class="mobile-menu-overlay" @click="mobileMenuOpen = false">
      <nav class="mobile-menu" @click.stop>
        <a
          v-for="section in sections"
          :key="section.id"
          href="#"
          class="mobile-nav-link"
          @click.prevent="scrollToSection(section.id)"
        >
          {{ section.label }}
        </a>
      </nav>
    </div>
  </Transition>

  <!-- Desktop Sidebar -->
  <aside class="sidebar">
    <div class="sidebar-content">
      <div class="sidebar-header">
        <h1 class="sidebar-name">Bell_staymen04</h1>
        <p class="sidebar-title">DJ / Organizer</p>
        <p class="sidebar-subtitle">OuterMusicRoom</p>
      </div>

      <nav class="sidebar-nav">
        <a
          v-for="section in sections"
          :key="section.id"
          href="#"
          class="nav-link"
          :class="{ active: activeSection === section.id }"
          @click.prevent="scrollToSection(section.id)"
        >
          <span class="nav-indicator"></span>
          <span class="nav-text">{{ section.label }}</span>
        </a>
      </nav>

      <div class="sidebar-social">
        <a
          v-for="link in socialLinks"
          :key="link.name"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="social-link"
          :aria-label="link.name"
        >
          <!-- Twitter -->
          <svg v-if="link.icon === 'twitter'" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          <!-- GitHub -->
          <svg v-if="link.icon === 'github'" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <!-- External Link -->
          <svg v-if="link.icon === 'link'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
      </div>
    </div>
  </aside>
</template>

<style scoped>
/* Desktop Sidebar */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: var(--sidebar-width);
  height: 100vh;
  background: var(--bg-secondary);
  border-right: 1px solid var(--border-light);
  display: flex;
  flex-direction: column;
  z-index: 100;
  padding: 3rem 2rem;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.sidebar-header {
  margin-bottom: 4rem;
}

.sidebar-name {
  font-family: "Crimson Pro", serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.sidebar-title {
  font-size: 1rem;
  font-weight: 500;
  color: var(--lavender);
  margin-bottom: 0.25rem;
}

.sidebar-subtitle {
  font-size: 0.875rem;
  color: var(--text-muted);
}

/* Navigation */
.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;
  text-decoration: none;
  color: var(--text-muted);
  font-size: 0.8125rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: all 0.3s ease;
}

.nav-indicator {
  display: inline-block;
  width: 2rem;
  height: 1px;
  background: var(--text-muted);
  transition: all 0.3s ease;
}

.nav-link:hover,
.nav-link.active {
  color: var(--text-primary);
}

.nav-link:hover .nav-indicator,
.nav-link.active .nav-indicator {
  width: 4rem;
  background: var(--text-primary);
}

/* Social Links */
.sidebar-social {
  margin-top: auto;
  display: flex;
  gap: 1.25rem;
}

.social-link {
  color: var(--text-muted);
  transition: color 0.3s ease;
}

.social-link:hover {
  color: var(--lavender);
}

/* Mobile Header */
.mobile-header {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  padding: 1rem 1.5rem;
  background: rgba(26, 20, 40, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-light);
  justify-content: space-between;
  align-items: center;
}

.mobile-logo {
  font-family: "Crimson Pro", serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
}

.hamburger {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--text-primary);
  transition: all 0.3s ease;
}

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* Mobile Menu Overlay */
.mobile-menu-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(26, 20, 40, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  z-index: 150;
  justify-content: center;
  align-items: center;
}

.mobile-menu {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  text-align: center;
}

.mobile-nav-link {
  font-family: "Crimson Pro", serif;
  font-size: 2rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.3s ease;
}

.mobile-nav-link:hover {
  color: var(--text-primary);
}

/* Transitions */
.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 0.3s ease;
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .sidebar {
    display: none;
  }

  .mobile-header {
    display: flex;
  }

  .mobile-menu-overlay {
    display: flex;
  }
}
</style>
```

**Step 2: Header.vue を削除**

```bash
git rm src/components/Header.vue
```

**Step 3: Footer.vue を削除**

```bash
git rm src/components/Footer.vue
```

**Step 4: コミット**

```bash
git add src/components/Sidebar.vue
git commit -m "feat: add Sidebar component, remove Header and Footer"
```

---

### Task 4: Profile.vue をカード型に刷新

**Files:**
- Modify: `src/components/Profile.vue`

**Step 1: 全体を書き換え**

ターミナル風UIを廃止し、カード型のプロフィールに置き換える:

```vue
<script setup>
import { ref, onMounted } from "vue";

const isVisible = ref(false);

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
        }
      });
    },
    { threshold: 0.1 }
  );

  const section = document.querySelector("#profile");
  if (section) observer.observe(section);
});
</script>

<template>
  <section id="profile" class="profile-section">
    <Transition name="fade-up">
      <div v-if="isVisible" class="profile-card">
        <div class="profile-avatar-wrapper">
          <img src="/assets/icon.webp" alt="Bell_staymen04" class="profile-avatar" />
        </div>
        <div class="profile-body">
          <h2 class="profile-name">Bell_staymen04</h2>
          <p class="profile-role">DJ / Organizer</p>
          <div class="profile-bio">
            <p>音楽ゲーム系オールジャンルDJイベント<a href="https://outermusicroom.site/" target="_blank" rel="noopener noreferrer" class="highlight-link">OuterMusicRoom</a>のオーガナイザー兼DJ。</p>
            <p>普段はWebサイトやWebアプリケーションの開発・運用保守をしたり、インターネット雑用をこなしています。</p>
            <p>最近はスパ銭通いが趣味になりつつあるが、じっとしていることが苦手なため長風呂できないことが悩み。</p>
          </div>
          <div class="profile-links">
            <a href="https://twitter.com/Bell_staymen04" target="_blank" rel="noopener noreferrer" class="profile-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Twitter
            </a>
            <a href="https://outermusicroom.site/" target="_blank" rel="noopener noreferrer" class="profile-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              OuterMusicRoom
            </a>
            <a href="https://github.com/bellsanct" target="_blank" rel="noopener noreferrer" class="profile-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
.profile-section {
  padding-bottom: var(--section-gap);
}

.profile-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: 16px;
  padding: 2.5rem;
  display: flex;
  gap: 2.5rem;
  align-items: flex-start;
}

.profile-avatar-wrapper {
  flex-shrink: 0;
}

.profile-avatar {
  width: 140px;
  height: 140px;
  border-radius: 16px;
  object-fit: cover;
  border: 2px solid var(--border-medium);
}

.profile-body {
  flex: 1;
}

.profile-name {
  font-family: "Crimson Pro", serif;
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.profile-role {
  font-size: 1rem;
  color: var(--lavender);
  font-weight: 500;
  margin-bottom: 1.5rem;
}

.profile-bio {
  margin-bottom: 1.5rem;
}

.profile-bio p {
  font-size: 0.9375rem;
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.profile-bio p:last-child {
  margin-bottom: 0;
}

.highlight-link {
  color: var(--lavender);
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.3s ease;
}

.highlight-link:hover {
  color: var(--lavender-light);
}

.profile-links {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.profile-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.3s ease;
}

.profile-link:hover {
  color: var(--lavender);
}

/* Transition */
.fade-up-enter-active {
  transition: all 0.8s ease-out;
}

.fade-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

/* Responsive */
@media (max-width: 768px) {
  .profile-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 2rem 1.5rem;
    gap: 1.5rem;
  }

  .profile-avatar {
    width: 120px;
    height: 120px;
  }

  .profile-links {
    justify-content: center;
  }
}
</style>
```

**Step 2: コミット**

```bash
git add src/components/Profile.vue
git commit -m "feat: redesign Profile to card-based layout"
```

---

### Task 5: EventsGallery.vue をグリッドレイアウトに変更

**Files:**
- Modify: `src/components/EventsGallery.vue`

**Step 1: 全体を書き換え**

カルーセルからグリッドレイアウトに変更。ホバーでイベント名オーバーレイ:

```vue
<script setup>
import { ref, onMounted } from "vue";

const isVisible = ref(false);
const selectedFlyer = ref(null);

const flyers = [
  { src: "/assets/23.webp", title: "OuterMusicRoom vol.13" },
  { src: "/assets/22.webp", title: "OuterMusicRoom vol.12" },
  { src: "/assets/21.webp", title: "OuterMusicRoom vol.11" },
  { src: "/assets/20.webp", title: "OuterMusicRoom vol.10" },
  { src: "/assets/17.webp", title: "OuterMusicRoom vol.9" },
  { src: "/assets/16.webp", title: "OuterMusicRoom vol.8" },
  { src: "/assets/15.webp", title: "OuterMusicRoom vol.7" },
  { src: "/assets/14.webp", title: "OuterMusicRoom vol.6" },
  { src: "/assets/13.webp", title: "OuterMusicRoom vol.5" },
  { src: "/assets/12.webp", title: "OuterMusicRoom vol.4" },
  { src: "/assets/11.webp", title: "OuterMusicRoom vol.3" },
];

const openModal = (flyer) => {
  selectedFlyer.value = flyer;
};

const closeModal = () => {
  selectedFlyer.value = null;
};

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
        }
      });
    },
    { threshold: 0.05 }
  );

  const section = document.querySelector("#events");
  if (section) observer.observe(section);
});
</script>

<template>
  <section id="events" class="events-section">
    <div class="section-header">
      <h2 class="section-title">Events</h2>
      <p class="section-description">主催したイベント一覧</p>
    </div>

    <Transition name="fade-up">
      <div v-if="isVisible" class="events-grid">
        <div
          v-for="(flyer, index) in flyers"
          :key="index"
          class="flyer-item"
          @click="openModal(flyer)"
        >
          <img :src="flyer.src" :alt="flyer.title" class="flyer-image" loading="lazy" />
          <div class="flyer-overlay">
            <span class="flyer-title">{{ flyer.title }}</span>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Modal -->
    <Transition name="modal">
      <div v-if="selectedFlyer" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <button class="modal-close" @click="closeModal" aria-label="閉じる">&times;</button>
          <img :src="selectedFlyer.src" :alt="selectedFlyer.title" class="modal-image" />
          <p class="modal-title">{{ selectedFlyer.title }}</p>
        </div>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
.events-section {
  padding-bottom: var(--section-gap);
}

.section-header {
  margin-bottom: 3rem;
}

.section-title {
  font-family: "Crimson Pro", serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.section-description {
  font-size: 1rem;
  color: var(--text-secondary);
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.flyer-item {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 7 / 10;
}

.flyer-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.flyer-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(26, 20, 40, 0.9) 0%, transparent 50%);
  display: flex;
  align-items: flex-end;
  padding: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.flyer-item:hover .flyer-image {
  transform: scale(1.05);
}

.flyer-item:hover .flyer-overlay {
  opacity: 1;
}

.flyer-title {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--text-primary);
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 500;
  padding: 2rem;
}

.modal-content {
  position: relative;
  max-width: 500px;
  max-height: 85vh;
}

.modal-image {
  width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 8px;
}

.modal-title {
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin-top: 1rem;
}

.modal-close {
  position: absolute;
  top: -2.5rem;
  right: 0;
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 2rem;
  cursor: pointer;
  transition: color 0.3s ease;
  line-height: 1;
}

.modal-close:hover {
  color: var(--text-primary);
}

/* Transitions */
.fade-up-enter-active {
  transition: all 0.8s ease-out;
}

.fade-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 1024px) {
  .events-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .events-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
}
</style>
```

注意: フライヤーのタイトルは仮のもの。ユーザーに正式なタイトルを確認する必要がある。画像パスは既存の `/assets/11.webp` 〜 `/assets/23.webp` を使用（`22.jpg` は除外、webpのみ使用）。

**Step 2: コミット**

```bash
git add src/components/EventsGallery.vue
git commit -m "feat: redesign EventsGallery to grid layout with hover overlay"
```

---

### Task 6: Works.vue をダークテーマ対応に更新

**Files:**
- Modify: `src/components/Works.vue`

**Step 1: CSSのダークテーマ対応**

`[data-theme="dark"]` ルールを削除し、カードのベーススタイルをダーク対応に変更:

```css
.work-card {
  display: block;
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

`[data-theme="dark"] .work-card` ルールを削除する。

**Step 2: セクション見出しのスタイルを他セクションと統一**

section-header のスタイルを左揃えに変更:

```css
.section-header {
  margin-bottom: 3rem;
}

.section-title {
  font-family: "Crimson Pro", serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.section-description {
  font-size: 1rem;
  color: var(--text-secondary);
}
```

text-align: center を削除する。

**Step 3: section のパディングを統一**

```css
.works-section {
  padding-bottom: var(--section-gap);
  position: relative;
}
```

`padding: var(--section-gap) 0` を `padding-bottom: var(--section-gap)` に変更。background 指定も削除。

**Step 4: コミット**

```bash
git add src/components/Works.vue
git commit -m "style: update Works component for dark theme"
```

---

### Task 7: Tools.vue をダークテーマ対応に更新

**Files:**
- Modify: `src/components/Tools.vue`

**Step 1: 装飾要素（decoration）を削除**

テンプレート内の `.tools-decoration` 要素とそのCSS（circle, dot, line, halo, 関連keyframes）をすべて削除する。

**Step 2: CSSをダーク対応に更新**

`[data-theme="dark"]` ルールを削除。カードスタイルを更新:

```css
.tool-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: 12px;
  padding: 1.75rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.tool-card:hover {
  border-color: var(--lavender);
  background: var(--bg-tertiary);
  transform: translateY(-2px);
}

.tool-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.tool-description {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.tool-arrow {
  color: var(--text-muted);
  transition: all 0.3s ease;
}

.tool-card:hover .tool-arrow {
  color: var(--lavender);
  transform: translateX(4px);
}
```

**Step 3: セクション見出しのスタイルを統一**

他セクションと同じ左揃えスタイルに変更（center → 左揃え）。

**Step 4: コミット**

```bash
git add src/components/Tools.vue
git commit -m "style: update Tools component for dark theme, remove decorations"
```

---

### Task 8: Contact.vue をダークテーマ対応に更新

**Files:**
- Modify: `src/components/Contact.vue`

**Step 1: 装飾要素を削除**

テンプレート内の `.contact-decoration` 要素とそのCSS（triangle, circle, dot, halo, 関連keyframes）をすべて削除する。

**Step 2: CSSをダーク対応に更新**

`[data-theme="dark"]` ルールを削除。bg-accent 背景を削除し、シンプルなセクションスタイルに:

```css
.contact-section {
  padding-bottom: var(--section-gap);
}

.contact-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: 16px;
  padding: 3rem;
  text-align: center;
}

.contact-title {
  font-family: "Crimson Pro", serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.contact-description {
  font-size: 1rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.8;
}
```

ボタンスタイル:

```css
.btn-primary {
  background: var(--lavender-dark);
  color: var(--bg-primary);
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: var(--lavender);
  transform: translateY(-2px);
}

.btn-secondary {
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border-medium);
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  border-color: var(--lavender);
  color: var(--text-primary);
  transform: translateY(-2px);
}
```

**Step 3: コミット**

```bash
git add src/components/Contact.vue
git commit -m "style: update Contact component for dark theme, remove decorations"
```

---

### Task 9: 不要ファイルのクリーンアップ

**Files:**
- Delete: `src/components/Events.vue` (EventsGalleryと重複するタブ型コンポーネント。使用されていない)
- Delete: `src/components/ParticleField.vue` (未使用)
- Modify: `src/style.css` - 残っている `[data-theme="dark"]` ルールの最終確認・削除
- Modify: `tailwind.config.js` - 未使用のcyberpunkテーマ設定を削除

**Step 1: 未使用コンポーネントを削除**

```bash
git rm src/components/Events.vue
git rm src/components/ParticleField.vue
```

**Step 2: tailwind.config.js をクリーンアップ**

未使用のneonカラーやcyberフォント定義を削除し、必要最低限の設定に:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**Step 3: コミット**

```bash
git add -A
git commit -m "chore: remove unused components and clean up config"
```

---

### Task 10: ビルド確認 & Playwright ビジュアルレビュー

**Step 1: ビルド確認**

```bash
npm run build
```

エラーがなければ成功。

**Step 2: dev サーバーで表示確認**

```bash
npm run dev
```

**Step 3: Playwright でスクリーンショット取得**

以下の画面をキャプチャしてPM（私）に報告:
- デスクトップ (960px): サイドバー + Profile + Events グリッド + Works + Contact
- モバイル (375px): モバイルヘッダー + 各セクション
- モバイルメニュー展開時

**Step 4: 問題があれば修正してコミット**

```bash
git add -A
git commit -m "fix: address visual review feedback"
```
