<script setup>
import { ref, onMounted, inject } from 'vue'

const mobileMenuOpen = ref(false)
const scrolled = ref(false)
const isDarkMode = inject('isDarkMode')
const toggleDarkMode = inject('toggleDarkMode')

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

const scrollToSection = (sectionId) => {
  closeMobileMenu()
  const element = document.querySelector(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  window.addEventListener('scroll', () => {
    scrolled.value = window.scrollY > 50
  })
})
</script>

<template>
  <header :class="['header', { 'scrolled': scrolled }]">
    <div class="container header-container">
      <a @click.prevent="scrollToSection('#app')" href="#" class="logo">
        Bell_staymen04
      </a>

      <!-- Desktop Nav -->
      <nav class="nav desktop-nav">
        <a @click.prevent="scrollToSection('#profile')" href="#profile" class="nav-link">About</a>
        <a @click.prevent="scrollToSection('#works')" href="#works" class="nav-link">Works</a>
        <a @click.prevent="scrollToSection('#tools')" href="#tools" class="nav-link">Tools</a>
        <a @click.prevent="scrollToSection('#contact')" href="#contact" class="nav-link">Contact</a>

        <!-- Dark Mode Toggle -->
        <button @click="toggleDarkMode" class="theme-toggle" :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'">
          <svg v-if="!isDarkMode" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
          <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </button>
      </nav>

      <div class="nav-actions">
        <!-- Dark Mode Toggle (Mobile) -->
        <button @click="toggleDarkMode" class="theme-toggle mobile-theme-toggle" :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'">
          <svg v-if="!isDarkMode" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
          <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </button>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMobileMenu"
          :class="['mobile-menu-btn', { 'open': mobileMenuOpen }]"
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition name="mobile-menu">
      <nav v-if="mobileMenuOpen" class="mobile-nav">
        <a @click.prevent="scrollToSection('#profile')" href="#profile" class="mobile-link">About</a>
        <a @click.prevent="scrollToSection('#works')" href="#works" class="mobile-link">Works</a>
        <a @click.prevent="scrollToSection('#tools')" href="#tools" class="mobile-link">Tools</a>
        <a @click.prevent="scrollToSection('#contact')" href="#contact" class="mobile-link">Contact</a>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0.75rem 0;
  background: rgba(255, 245, 240, 0.95);
  backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
}

[data-theme='dark'] .header {
  background: rgba(31, 26, 39, 0.95);
}

.header.scrolled {
  padding: 0.625rem 0;
  box-shadow: var(--shadow-md);
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
  text-decoration: none;
  letter-spacing: -0.01em;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  font-family: 'Crimson Pro', serif;
}

.logo:hover {
  color: var(--lavender-dark);
}

.desktop-nav {
  display: flex;
  gap: 2rem;
  margin-left: auto;
}

.nav-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  position: relative;
  padding: 0.25rem 0;
  font-family: 'Inter', sans-serif;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: var(--lavender);
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 2px;
}

.nav-link:hover {
  color: var(--lavender-dark);
}

.nav-link:hover::after {
  width: 100%;
}

/* Theme Toggle */
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background: transparent;
  border: 1px solid var(--border-light);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.theme-toggle svg {
  width: 18px;
  height: 18px;
}

.theme-toggle:hover {
  background: var(--lavender-light);
  border-color: var(--lavender);
  color: var(--lavender-dark);
  transform: scale(1.05);
}

.theme-toggle svg {
  transition: transform 0.3s ease;
}

.theme-toggle:hover svg {
  transform: rotate(20deg);
}

.mobile-theme-toggle {
  display: none;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Mobile Menu Button */
.mobile-menu-btn {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.375rem;
}

.mobile-menu-btn span {
  width: 25px;
  height: 2px;
  background: var(--text-primary);
  transition: all 0.3s ease;
  border-radius: 2px;
}

.mobile-menu-btn.open span:nth-child(1) {
  transform: rotate(45deg) translate(7px, 7px);
}

.mobile-menu-btn.open span:nth-child(2) {
  opacity: 0;
}

.mobile-menu-btn.open span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
}

/* Mobile Nav */
.mobile-nav {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: rgba(255, 245, 240, 0.98);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-light);
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

[data-theme='dark'] .mobile-nav {
  background: rgba(31, 26, 39, 0.98);
}

.mobile-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  transition: color 0.3s ease;
  font-family: 'Inter', sans-serif;
}

.mobile-link:hover {
  color: var(--lavender-dark);
}

/* Mobile Menu Transition */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Responsive */
@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }

  .mobile-theme-toggle {
    display: flex;
  }

  .mobile-menu-btn {
    display: flex;
  }
}
</style>
