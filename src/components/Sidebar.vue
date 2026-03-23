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
