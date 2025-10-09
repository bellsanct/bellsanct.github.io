<script setup>
import { ref, onMounted, provide, watch } from "vue";
import Header from "./components/Header.vue";
import Profile from "./components/Profile.vue";
import FlyerGallery from "./components/FlyerGallery.vue";
import Tools from "./components/Tools.vue";
import Contact from "./components/Contact.vue";
import Footer from "./components/Footer.vue";

const isLoading = ref(true);
const heroVisible = ref(false);
const isDarkMode = ref(false);

// Load dark mode preference from localStorage
onMounted(() => {
  const savedMode = localStorage.getItem("darkMode");
  if (savedMode !== null) {
    isDarkMode.value = savedMode === "true";
  }
  applyDarkMode();

  setTimeout(() => {
    isLoading.value = false;
    setTimeout(() => {
      heroVisible.value = true;
    }, 100);
  }, 800);
});

// Watch for dark mode changes and save to localStorage
watch(isDarkMode, (newValue) => {
  localStorage.setItem("darkMode", newValue.toString());
  applyDarkMode();
});

const applyDarkMode = () => {
  if (isDarkMode.value) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
};

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
};

// Provide dark mode state to child components
provide("isDarkMode", isDarkMode);
provide("toggleDarkMode", toggleDarkMode);

const scrollToSection = (id) => {
  const element = document.querySelector(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<template>
  <div class="app">
    <!-- Loading -->
    <Transition name="fade">
      <div v-if="isLoading" class="loading-screen">
        <div class="loading-content">
          <div class="loader"></div>
          <p class="loading-text">Bell_staymen04</p>
        </div>
      </div>
    </Transition>

    <!-- Main Content -->
    <div class="main-content">
      <Header />

      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-background">
          <!-- Decorative Elements -->
          <div class="hero-decoration">
            <!-- Stars -->
            <div class="decoration-star decoration-star-1"></div>
            <div class="decoration-star decoration-star-2"></div>
            <div class="decoration-star decoration-star-3"></div>
            <div class="decoration-star decoration-star-4"></div>
            <div class="decoration-star decoration-star-5"></div>
            <div class="decoration-star decoration-star-6"></div>
            <div class="decoration-star decoration-star-7"></div>
            <div class="decoration-star decoration-star-8"></div>

            <!-- Sparkles -->
            <div class="decoration-sparkle decoration-sparkle-1"></div>
            <div class="decoration-sparkle decoration-sparkle-2"></div>
            <div class="decoration-sparkle decoration-sparkle-3"></div>
            <div class="decoration-sparkle decoration-sparkle-4"></div>
            <div class="decoration-sparkle decoration-sparkle-5"></div>
            <div class="decoration-sparkle decoration-sparkle-6"></div>

            <!-- Circles -->
            <div class="decoration-circle decoration-circle-1"></div>
            <div class="decoration-circle decoration-circle-2"></div>
            <div class="decoration-circle decoration-circle-3"></div>
            <div class="decoration-circle decoration-circle-4"></div>

            <!-- Lines -->
            <div class="decoration-line decoration-line-1"></div>
            <div class="decoration-line decoration-line-2"></div>
            <div class="decoration-line decoration-line-3"></div>
            <div class="decoration-line decoration-line-4"></div>
            <div class="decoration-line decoration-line-5"></div>

            <!-- Dots -->
            <div class="decoration-dot decoration-dot-1"></div>
            <div class="decoration-dot decoration-dot-2"></div>
            <div class="decoration-dot decoration-dot-3"></div>
            <div class="decoration-dot decoration-dot-4"></div>
            <div class="decoration-dot decoration-dot-5"></div>
            <div class="decoration-dot decoration-dot-6"></div>

            <!-- Floating Shapes -->
            <div class="decoration-shape decoration-shape-1"></div>
            <div class="decoration-shape decoration-shape-2"></div>
            <div class="decoration-shape decoration-shape-3"></div>
          </div>

          <img
            :src="isDarkMode ? '/assets/omr2-2.webp' : '/assets/omr3-2.webp'"
            alt="Hero Background"
            class="hero-bg-image"
          />
          <div class="hero-overlay"></div>
          <div class="hero-gradient"></div>
        </div>

        <div class="container hero-container">
          <Transition name="hero">
            <div v-if="heroVisible" class="hero-content">
              <h1 class="hero-title">
                <span class="title-line">Bell_staymen04</span>
              </h1>

              <p class="hero-description">
                音楽ゲーム系オールジャンルDJイベント<br
                  class="br-mobile"
                />OuterMusicRoomのオーガナイザー兼DJ
              </p>

              <div class="hero-actions">
                <button
                  @click="scrollToSection('#works')"
                  class="btn btn-primary"
                >
                  View Works
                </button>
                <button
                  @click="scrollToSection('#contact')"
                  class="btn btn-outline"
                >
                  Contact
                </button>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Scroll Indicator -->
        <div class="scroll-indicator">
          <div class="scroll-line"></div>
          <span class="scroll-text">Scroll</span>
        </div>
      </section>

      <Profile />
      <div id="works">
        <FlyerGallery />
      </div>
      <Tools />
      <Contact />
      <Footer />
    </div>
  </div>
</template>

<style scoped>
.app {
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
}

.main-content {
  position: relative;
  z-index: 1;
}

/* Loading Screen */
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--bg-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-content {
  text-align: center;
}

.loader {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(184, 176, 212, 0.2);
  border-top-color: var(--lavender);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1.5rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-text {
  color: var(--text-primary);
  font-size: 1.125rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  font-family: "Inter", sans-serif;
}

/* Hero Section */
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 60px; /* Start below fixed header */
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  background: linear-gradient(
    135deg,
    #f8f0f5 0%,
    #fef5f0 50%,
    #fdf0f8 100%
  );
  transition: background 0.3s ease;
}

[data-theme="dark"] .hero-background {
  background: linear-gradient(
    135deg,
    #261a2e 0%,
    #2a1f2e 50%,
    #2e1a26 100%
  );
}

.hero-bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
  filter: brightness(0.75) saturate(1.1) contrast(1.05);
  transition: opacity 0.5s ease;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(184, 176, 212, 0.25) 0%,
    rgba(240, 197, 216, 0.2) 50%,
    rgba(255, 245, 240, 0.3) 100%
  );
  transition: background 0.3s ease;
}

[data-theme="dark"] .hero-overlay {
  background: linear-gradient(
    135deg,
    rgba(88, 41, 51, 0.6) 0%,
    rgba(79, 60, 88, 0.5) 50%,
    rgba(31, 26, 39, 0.4) 100%
  );
}

.hero-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(255, 245, 240, 0) 0%,
    rgba(255, 245, 240, 0.2) 60%,
    rgba(255, 245, 240, 0.7) 90%,
    rgba(255, 245, 240, 0.95) 100%
  );
  transition: background 0.3s ease;
}

[data-theme="dark"] .hero-gradient {
  background: linear-gradient(
    to bottom,
    rgba(31, 26, 39, 0) 0%,
    rgba(31, 26, 39, 0.3) 60%,
    rgba(31, 26, 39, 0.8) 90%,
    rgba(31, 26, 39, 0.95) 100%
  );
}

/* Hero Decorations */
.hero-decoration {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.decoration-star {
  position: absolute;
  width: 8px;
  height: 8px;
  background: var(--gold);
  clip-path: polygon(
    50% 0%, 61% 35%, 98% 35%, 68% 57%,
    79% 91%, 50% 70%, 21% 91%, 32% 57%,
    2% 35%, 39% 35%
  );
  opacity: 0.7;
}

.decoration-star-1 {
  top: 12%;
  left: 8%;
  width: 10px;
  height: 10px;
  animation: twinkle 3s ease-in-out infinite, drift 15s ease-in-out infinite;
}

.decoration-star-2 {
  top: 22%;
  right: 12%;
  width: 12px;
  height: 12px;
  animation: twinkle 3.5s ease-in-out infinite, drift 18s ease-in-out infinite;
  animation-delay: 1s;
}

.decoration-star-3 {
  bottom: 28%;
  left: 6%;
  width: 9px;
  height: 9px;
  animation: twinkle 4s ease-in-out infinite, drift 16s ease-in-out infinite;
  animation-delay: 2s;
}

.decoration-star-4 {
  top: 38%;
  right: 6%;
  width: 7px;
  height: 7px;
  animation: twinkle 3.2s ease-in-out infinite, drift 14s ease-in-out infinite;
  animation-delay: 0.5s;
}

.decoration-star-5 {
  top: 50%;
  left: 15%;
  width: 11px;
  height: 11px;
  animation: twinkle 3.8s ease-in-out infinite, drift 17s ease-in-out infinite;
  animation-delay: 1.5s;
}

.decoration-star-6 {
  bottom: 15%;
  right: 20%;
  width: 8px;
  height: 8px;
  animation: twinkle 4.2s ease-in-out infinite, drift 19s ease-in-out infinite;
  animation-delay: 2.5s;
}

.decoration-star-7 {
  top: 65%;
  right: 8%;
  width: 6px;
  height: 6px;
  animation: twinkle 3.3s ease-in-out infinite, drift 13s ease-in-out infinite;
  animation-delay: 0.8s;
}

.decoration-star-8 {
  top: 18%;
  left: 25%;
  width: 9px;
  height: 9px;
  animation: twinkle 3.6s ease-in-out infinite, drift 20s ease-in-out infinite;
  animation-delay: 3s;
}

[data-theme="dark"] .decoration-star {
  background: var(--rose-light);
}

@keyframes twinkle {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1) rotate(0deg);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.4) rotate(90deg);
  }
}

@keyframes drift {
  0%, 100% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(10px, -10px);
  }
  50% {
    transform: translate(-5px, -20px);
  }
  75% {
    transform: translate(-10px, -5px);
  }
}

.decoration-sparkle {
  position: absolute;
  width: 14px;
  height: 14px;
  opacity: 0.6;
}

.decoration-sparkle::before,
.decoration-sparkle::after {
  content: '';
  position: absolute;
  background: var(--lavender-light);
}

.decoration-sparkle::before {
  width: 3px;
  height: 14px;
  left: 50%;
  transform: translateX(-50%);
}

.decoration-sparkle::after {
  width: 14px;
  height: 3px;
  top: 50%;
  transform: translateY(-50%);
}

.decoration-sparkle-1 {
  top: 18%;
  left: 18%;
  animation: sparkleFloat 5s ease-in-out infinite, sparkleRotate 10s linear infinite;
}

.decoration-sparkle-2 {
  top: 58%;
  right: 16%;
  width: 16px;
  height: 16px;
  animation: sparkleFloat 6s ease-in-out infinite, sparkleRotate 12s linear infinite;
  animation-delay: 1.5s;
}

.decoration-sparkle-3 {
  bottom: 22%;
  left: 13%;
  animation: sparkleFloat 5.5s ease-in-out infinite, sparkleRotate 11s linear infinite;
  animation-delay: 3s;
}

.decoration-sparkle-4 {
  top: 35%;
  left: 22%;
  width: 12px;
  height: 12px;
  animation: sparkleFloat 5.8s ease-in-out infinite, sparkleRotate 9s linear infinite;
  animation-delay: 2s;
}

.decoration-sparkle-5 {
  bottom: 40%;
  right: 10%;
  width: 15px;
  height: 15px;
  animation: sparkleFloat 6.2s ease-in-out infinite, sparkleRotate 13s linear infinite;
  animation-delay: 0.5s;
}

.decoration-sparkle-6 {
  top: 70%;
  left: 8%;
  animation: sparkleFloat 5.3s ease-in-out infinite, sparkleRotate 10.5s linear infinite;
  animation-delay: 4s;
}

[data-theme="dark"] .decoration-sparkle::before,
[data-theme="dark"] .decoration-sparkle::after {
  background: var(--coral-light);
}

@keyframes sparkleFloat {
  0%, 100% {
    opacity: 0.3;
    transform: translateY(0);
  }
  50% {
    opacity: 0.8;
    transform: translateY(-25px);
  }
}

@keyframes sparkleRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.decoration-circle {
  position: absolute;
  border: 3px solid var(--rose-light);
  border-radius: 50%;
  opacity: 0.25;
}

.decoration-circle-1 {
  width: 140px;
  height: 140px;
  top: 28%;
  right: 8%;
  animation: rotateCircle 20s linear infinite, pulse 4s ease-in-out infinite;
}

.decoration-circle-2 {
  width: 90px;
  height: 90px;
  bottom: 32%;
  left: 10%;
  animation: rotateCircle 15s linear infinite reverse, pulse 5s ease-in-out infinite;
  animation-delay: 2s;
}

.decoration-circle-3 {
  width: 110px;
  height: 110px;
  top: 15%;
  left: 30%;
  animation: rotateCircle 18s linear infinite, pulse 4.5s ease-in-out infinite;
  animation-delay: 1s;
}

.decoration-circle-4 {
  width: 70px;
  height: 70px;
  bottom: 18%;
  right: 25%;
  animation: rotateCircle 16s linear infinite reverse, pulse 5.5s ease-in-out infinite;
  animation-delay: 3s;
}

[data-theme="dark"] .decoration-circle {
  border-color: var(--lavender);
}

@keyframes rotateCircle {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.25;
    transform: scale(1);
  }
  50% {
    opacity: 0.4;
    transform: scale(1.1);
  }
}

.decoration-line {
  position: absolute;
  width: 2px;
  height: 150px;
  background: linear-gradient(
    180deg,
    transparent 0%,
    var(--lavender-light) 50%,
    transparent 100%
  );
  opacity: 0.35;
}

.decoration-line-1 {
  top: 22%;
  left: 4%;
  height: 160px;
  animation: floatLine 8s ease-in-out infinite;
}

.decoration-line-2 {
  top: 52%;
  right: 10%;
  height: 130px;
  animation: floatLine 9s ease-in-out infinite;
  animation-delay: 2s;
}

.decoration-line-3 {
  bottom: 18%;
  left: 16%;
  height: 140px;
  animation: floatLine 7s ease-in-out infinite;
  animation-delay: 1s;
}

.decoration-line-4 {
  top: 40%;
  right: 22%;
  height: 120px;
  animation: floatLine 8.5s ease-in-out infinite;
  animation-delay: 3s;
}

.decoration-line-5 {
  bottom: 35%;
  left: 28%;
  height: 110px;
  animation: floatLine 7.5s ease-in-out infinite;
  animation-delay: 0.5s;
}

[data-theme="dark"] .decoration-line {
  background: linear-gradient(
    180deg,
    transparent 0%,
    var(--rose) 50%,
    transparent 100%
  );
}

@keyframes floatLine {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.25;
  }
  50% {
    transform: translateY(-30px) rotate(5deg);
    opacity: 0.5;
  }
}

/* Dots */
.decoration-dot {
  position: absolute;
  width: 8px;
  height: 8px;
  background: var(--rose);
  border-radius: 50%;
  opacity: 0.5;
}

.decoration-dot-1 {
  top: 28%;
  left: 12%;
  animation: dotBounce 3s ease-in-out infinite;
}

.decoration-dot-2 {
  top: 45%;
  right: 14%;
  width: 10px;
  height: 10px;
  animation: dotBounce 3.5s ease-in-out infinite;
  animation-delay: 1s;
}

.decoration-dot-3 {
  bottom: 30%;
  left: 20%;
  width: 7px;
  height: 7px;
  animation: dotBounce 4s ease-in-out infinite;
  animation-delay: 2s;
}

.decoration-dot-4 {
  top: 60%;
  right: 20%;
  width: 9px;
  height: 9px;
  animation: dotBounce 3.8s ease-in-out infinite;
  animation-delay: 0.5s;
}

.decoration-dot-5 {
  bottom: 45%;
  left: 8%;
  animation: dotBounce 3.3s ease-in-out infinite;
  animation-delay: 1.5s;
}

.decoration-dot-6 {
  top: 75%;
  right: 12%;
  width: 6px;
  height: 6px;
  animation: dotBounce 4.2s ease-in-out infinite;
  animation-delay: 2.5s;
}

[data-theme="dark"] .decoration-dot {
  background: var(--coral);
}

@keyframes dotBounce {
  0%, 100% {
    transform: translateY(0) scale(1);
    opacity: 0.4;
  }
  50% {
    transform: translateY(-20px) scale(1.3);
    opacity: 0.8;
  }
}

/* Floating Shapes */
.decoration-shape {
  position: absolute;
  width: 40px;
  height: 40px;
  border: 2px solid var(--lavender);
  opacity: 0.2;
}

.decoration-shape-1 {
  top: 35%;
  left: 5%;
  transform: rotate(45deg);
  animation: floatShape 12s ease-in-out infinite;
}

.decoration-shape-2 {
  bottom: 25%;
  right: 15%;
  width: 50px;
  height: 50px;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  animation: floatShape 15s ease-in-out infinite, morphShape 8s ease-in-out infinite;
  animation-delay: 2s;
}

.decoration-shape-3 {
  top: 50%;
  right: 5%;
  width: 35px;
  height: 35px;
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  background: var(--rose-light);
  border: none;
  animation: floatShape 13s ease-in-out infinite;
  animation-delay: 1s;
}

[data-theme="dark"] .decoration-shape {
  border-color: var(--coral);
}

[data-theme="dark"] .decoration-shape-3 {
  background: var(--lavender-light);
}

@keyframes floatShape {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(15px, -15px) rotate(90deg);
  }
  50% {
    transform: translate(0, -30px) rotate(180deg);
  }
  75% {
    transform: translate(-15px, -15px) rotate(270deg);
  }
}

@keyframes morphShape {
  0%, 100% {
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  }
  50% {
    border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
  }
}

.hero-container {
  position: relative;
  z-index: 1;
  padding: 8rem 4rem;
  margin-top: 60px; /* Push content below header */
}

.hero-content {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

.hero-label {
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 2rem;
  letter-spacing: 0.05em;
  font-family: "Inter", sans-serif;
  box-shadow: var(--shadow-md);
}

.hero-title {
  font-size: clamp(3rem, 8vw, 5.5rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  color: white;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  font-family: "Crimson Pro", serif;
}

.title-line {
  display: inline-block;
  animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) backwards;
  animation-delay: 0.1s;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.hero-description {
  font-size: 1.25rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 3rem;
  font-weight: 400;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  animation: fadeIn 1s ease-out backwards;
  animation-delay: 0.3s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-actions {
  display: flex;
  gap: 1.25rem;
  justify-content: center;
  flex-wrap: wrap;
  animation: fadeIn 1s ease-out backwards;
  animation-delay: 0.5s;
}

.hero-actions .btn {
  background: rgba(255, 255, 255, 0.95);
  color: var(--text-primary);
  border-color: transparent;
  box-shadow: var(--shadow-md);
}

.hero-actions .btn:hover {
  background: rgba(255, 255, 255, 1);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

[data-theme="dark"] .hero-actions .btn {
  background: rgba(212, 192, 208, 0.95);
  color: var(--text-light);
}

[data-theme="dark"] .hero-actions .btn:hover {
  background: var(--purple-deep);
}

.hero-actions .btn-outline {
  background: transparent;
  color: white;
  border-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
}

.hero-actions .btn-outline:hover {
  background: rgba(255, 255, 255, 0.95);
  color: var(--text-primary);
  border-color: transparent;
}

[data-theme="dark"] .hero-actions .btn-outline {
  border-color: rgba(232, 213, 224, 0.8);
}

[data-theme="dark"] .hero-actions .btn-outline:hover {
  background: rgba(232, 213, 224, 0.95);
  color: var(--text-light);
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  animation: fadeIn 1s ease-out backwards;
  animation-delay: 0.7s;
}

.scroll-line {
  width: 2px;
  height: 60px;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(255, 255, 255, 0.8),
    transparent
  );
  animation: scrollLine 2s ease-in-out infinite;
}

@keyframes scrollLine {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
}

.scroll-text {
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  text-transform: uppercase;
  font-family: "Inter", sans-serif;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.hero-enter-active {
  transition: all 1s ease-out;
}

.hero-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

/* Responsive */
@media (max-width: 768px) {
  .hero-background {
    top: 55px; /* Adjusted for mobile header height */
  }

  .hero-container {
    padding: 6rem 2rem;
    margin-top: 55px;
  }

  .hero-title {
    font-size: clamp(2rem, 10vw, 3rem);
  }

  .hero-description {
    font-size: 1rem;
  }

  .hero-actions {
    flex-direction: column;
    width: 100%;
  }

  .hero-actions .btn {
    width: 100%;
    justify-content: center;
  }

  .scroll-indicator {
    display: none;
  }

  .br-mobile {
    display: none;
  }
}
</style>
