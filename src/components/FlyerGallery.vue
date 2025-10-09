<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const flyers = [
  "/assets/11.webp",
  "/assets/12.webp",
  "/assets/13.webp",
  "/assets/14.webp",
  "/assets/15.webp",
  "/assets/16.webp",
  "/assets/17.webp",
  "/assets/20.webp",
  "/assets/21.webp",
  "/assets/22.webp",
  "/assets/23.webp",
  "/assets/o1.webp",
  "/assets/o2.webp",
  "/assets/o3.webp",
  "/assets/rockon.webp",
];

// Duplicate flyers for seamless loop
const duplicatedFlyers = [...flyers, ...flyers, ...flyers];

const isPaused = ref(false);
const selectedFlyer = ref(null);

const handleFlyerClick = (flyer) => {
  selectedFlyer.value = flyer;
};

const closeModal = () => {
  selectedFlyer.value = null;
};
</script>

<template>
  <section class="flyer-gallery-section">
    <!-- Decorative Elements -->
    <div class="section-decoration">
      <div class="decoration-dot decoration-dot-1"></div>
      <div class="decoration-dot decoration-dot-2"></div>
      <div class="decoration-dot decoration-dot-3"></div>
      <div class="decoration-dot decoration-dot-4"></div>
      <div class="decoration-dot decoration-dot-5"></div>
      <div class="decoration-line decoration-line-1"></div>
      <div class="decoration-line decoration-line-2"></div>
      <div class="decoration-circle decoration-circle-1"></div>
      <div class="decoration-halo decoration-halo-1"></div>
      <div class="decoration-halo decoration-halo-2"></div>
    </div>

    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Works</h2>
        <p class="section-description">主催したイベント一覧</p>
      </div>
    </div>

    <!-- First Row: Right to Left -->
    <div
      class="flyer-gallery-wrapper"
      @mouseenter="isPaused = true"
      @mouseleave="isPaused = false"
    >
      <div class="flyer-gallery-track" :class="{ paused: isPaused }">
        <div
          v-for="(flyer, index) in duplicatedFlyers"
          :key="`flyer-row1-${index}`"
          class="flyer-item"
          @click="handleFlyerClick(flyer)"
        >
          <img
            :src="flyer"
            :alt="`Event Flyer ${index + 1}`"
            class="flyer-image"
          />
        </div>
      </div>
    </div>

    <!-- Second Row: Left to Right -->
    <!--
    <div
      class="flyer-gallery-wrapper flyer-gallery-wrapper-reverse"
      @mouseenter="isPaused = true"
      @mouseleave="isPaused = false"
    >
      <div
        class="flyer-gallery-track flyer-gallery-track-reverse"
        :class="{ paused: isPaused }"
      >
        <div
          v-for="(flyer, index) in duplicatedFlyers"
          :key="`flyer-row2-${index}`"
          class="flyer-item"
          @click="handleFlyerClick(flyer)"
        >
          <img
            :src="flyer"
            :alt="`Event Flyer ${index + 1}`"
            class="flyer-image"
          />
        </div>
      </div>
    </div>
    -->

    <!-- Modal for enlarged view -->
    <Transition name="modal">
      <div v-if="selectedFlyer" class="flyer-modal" @click="closeModal">
        <div class="modal-content" @click.stop>
          <button class="modal-close" @click="closeModal">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <img :src="selectedFlyer" alt="Selected Flyer" class="modal-image" />
        </div>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
.flyer-gallery-section {
  padding: var(--section-gap) 0;
  background: var(--bg-secondary);
  overflow: hidden;
  position: relative;
}

/* Decorative Elements */
.section-decoration {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.decoration-dot {
  position: absolute;
  width: 5px;
  height: 5px;
  background: var(--lavender-dark);
  border-radius: 50%;
  opacity: 0.5;
}

.decoration-dot-1 {
  top: 15%;
  left: 5%;
  animation: pulse 3s ease-in-out infinite;
}

.decoration-dot-2 {
  top: 40%;
  right: 8%;
  animation: pulse 4s ease-in-out infinite;
  animation-delay: 1s;
}

.decoration-dot-3 {
  bottom: 25%;
  left: 12%;
  animation: pulse 3.5s ease-in-out infinite;
  animation-delay: 2s;
}

.decoration-dot-4 {
  top: 60%;
  right: 15%;
  animation: pulse 3.8s ease-in-out infinite;
  animation-delay: 0.5s;
}

.decoration-dot-5 {
  bottom: 35%;
  right: 5%;
  animation: pulse 4.2s ease-in-out infinite;
  animation-delay: 1.5s;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(2);
    opacity: 0.9;
  }
}

.decoration-line {
  position: absolute;
  background: linear-gradient(
    180deg,
    transparent 0%,
    var(--rose-light) 50%,
    transparent 100%
  );
  width: 1px;
  height: 120px;
  opacity: 0.4;
}

.decoration-line-1 {
  top: 20%;
  left: 18%;
  animation: float 9s ease-in-out infinite;
}

.decoration-line-2 {
  bottom: 20%;
  right: 25%;
  animation: float 11s ease-in-out infinite reverse;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-25px);
  }
}

.decoration-circle {
  position: absolute;
  border: 1px solid var(--lavender-light);
  border-radius: 50%;
  opacity: 0.25;
}

.decoration-circle-1 {
  width: 90px;
  height: 90px;
  bottom: 15%;
  left: 8%;
  animation: rotate 22s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.decoration-halo {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(
    circle at center,
    transparent 40%,
    var(--rose-light) 45%,
    transparent 50%
  );
  opacity: 0.3;
}

.decoration-halo-1 {
  width: 180px;
  height: 180px;
  top: 20%;
  right: 10%;
  animation: haloGlow 7s ease-in-out infinite;
}

.decoration-halo-2 {
  width: 140px;
  height: 140px;
  bottom: 30%;
  left: 12%;
  animation: haloGlow 8s ease-in-out infinite;
  animation-delay: 2s;
}

@keyframes haloGlow {
  0%,
  100% {
    opacity: 0.2;
    transform: scale(1);
  }
  50% {
    opacity: 0.4;
    transform: scale(1.15);
  }
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  z-index: 1;
}

.section-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-family: "Crimson Pro", serif;
}

.section-description {
  font-size: 1.125rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.flyer-gallery-wrapper {
  width: 100%;
  overflow: hidden;
  position: relative;
  padding: 1rem 0;
}

.flyer-gallery-wrapper-reverse {
  margin-top: 1rem;
}

.flyer-gallery-track {
  display: flex;
  gap: 1rem;
  animation: scroll 60s linear infinite;
  width: max-content;
}

.flyer-gallery-track-reverse {
  animation: scrollReverse 60s linear infinite;
}

.flyer-gallery-track.paused {
  animation-play-state: paused;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-100% / 3));
  }
}

@keyframes scrollReverse {
  0% {
    transform: translateX(calc(-100% / 3));
  }
  100% {
    transform: translateX(0);
  }
}

.flyer-item {
  flex-shrink: 0;
  width: 150px;
  height: 212px;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid var(--border-light);
}

[data-theme="dark"] .flyer-item {
  background: var(--bg-secondary);
  border-color: var(--border-medium);
}

.flyer-item:hover {
  transform: translateY(-8px) scale(1.05);
  box-shadow: var(--shadow-lg);
}

.flyer-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Modal Styles */
.flyer-modal {
  position: fixed;
  inset: 0;
  background: rgba(45, 38, 64, 0.95);
  backdrop-filter: blur(10px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.modal-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  background: rgba(255, 255, 255, 0.98);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  border: 1px solid var(--border-light);
}

[data-theme="dark"] .modal-content {
  background: var(--bg-secondary);
  border-color: var(--border-medium);
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.98);
  border: 1px solid var(--border-light);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
  z-index: 10;
  color: var(--text-primary);
}

[data-theme="dark"] .modal-close {
  background: var(--bg-accent);
  border-color: var(--border-medium);
  color: var(--text-primary);
}

.modal-close:hover {
  background: var(--lavender);
  color: white;
  transform: rotate(90deg);
  border-color: var(--lavender);
}

.modal-image {
  max-width: 100%;
  max-height: 90vh;
  display: block;
  object-fit: contain;
}

/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.9);
}

/* Responsive */
@media (max-width: 768px) {
  .flyer-item {
    width: 120px;
    height: 170px;
  }

  .flyer-gallery-track {
    gap: 0.75rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .section-description {
    font-size: 1rem;
  }

  .flyer-gallery-wrapper {
    padding: 0.75rem 0;
  }

  .flyer-gallery-wrapper-reverse {
    margin-top: 0.75rem;
  }
}
</style>
