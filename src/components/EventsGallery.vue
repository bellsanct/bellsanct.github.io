<script setup>
import { ref, onMounted } from "vue";

const isVisible = ref(false);
const selectedFlyer = ref(null);

const flyers = [
  { src: "/assets/omr4-flyer.webp", title: "OuterMusicRoom #4", date: "2025.11.23", url: "https://outermusicroom.site/omr-4" },
  { src: "/assets/omr3-flyer.webp", title: "OuterMusicRoom #3", date: "2025.03.08", url: "https://outermusicroom.site/omr-3" },
  { src: "/assets/omr2-flyer.webp", title: "OuterMusicRoom #2", date: "2024.12.01", url: "https://outermusicroom.site/omr-2" },
  { src: "/assets/omr1-flyer.webp", title: "OuterMusicRoom #1", date: "2024.04.27", url: "https://outermusicroom.site/omr-1" },
  { src: "/assets/23.webp", title: "快創音楽室 #23", date: "2023.07.15" },
  { src: "/assets/22.webp", title: "快創音楽室 #22", date: "2023.02.18" },
  { src: "/assets/21.webp", title: "快創音楽室 #21", date: "2022.07.17" },
  { src: "/assets/20.webp", title: "快創音楽室 #20", date: "2021.07.23" },
  { src: "/assets/17.webp", title: "快創音楽室 #17", date: "2020.03.21" },
  { src: "/assets/16.webp", title: "快創音楽室 #16", date: "2019.11.23" },
  { src: "/assets/15.webp", title: "快創音楽室 #15", date: "2019.07.20" },
  { src: "/assets/14.webp", title: "快創音楽室 #14", date: "2019.04.20" },
  { src: "/assets/13.webp", title: "快創音楽室 #13", date: "2019.01.13" },
  { src: "/assets/12.webp", title: "快創音楽室 #12", date: "2018.09.23" },
  { src: "/assets/11.webp", title: "快創音楽室 #11", date: "2018.06.23" },
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
            <span class="flyer-date">{{ flyer.date }}</span>
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
          <p class="modal-title">{{ selectedFlyer.title }} <span class="modal-date">{{ selectedFlyer.date }}</span></p>
          <a :href="selectedFlyer.url" target="_blank" rel="noopener noreferrer" class="modal-link" @click.stop>イベントページを見る →</a>
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
  padding-left: 1rem;
  border-left: 3px solid var(--lavender-dark);
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
  border: 1px solid transparent;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.flyer-item:hover {
  border-color: rgba(155, 146, 192, 0.4);
  box-shadow: 0 0 20px rgba(155, 146, 192, 0.15);
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
  flex-direction: column;
  justify-content: flex-end;
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

.flyer-date {
  font-size: 0.75rem;
  color: var(--text-muted);
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

.modal-date {
  color: var(--text-muted);
  font-size: 0.8rem;
  margin-left: 0.5rem;
}

.modal-link {
  display: block;
  text-align: center;
  color: var(--lavender-light);
  font-size: 0.875rem;
  margin-top: 0.75rem;
  text-decoration: none;
  transition: color 0.3s ease;
}

.modal-link:hover {
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
    gap: 1rem;
  }
}

.events-section::after {
  content: '';
  display: block;
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--lavender-dark), transparent);
  margin: 0 auto;
  margin-top: 3rem;
}
</style>
