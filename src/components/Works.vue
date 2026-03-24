<script setup>
import { ref, onMounted } from "vue";

const isVisible = ref(false);

const works = [
  {
    title: "カタネガイ 音楽集 特設サイト",
    url: "https://katanegai-ost.xyz",
    thumbnail: "/assets/katanegai-ost.webp",
  },
  {
    title: "OuterMusicRoom Website",
    url: "https://outermusicroom.site/",
    thumbnail: "/assets/omr-site.webp",
  },
];

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

  const section = document.querySelector("#works");
  if (section) observer.observe(section);
});
</script>

<template>
  <section id="works" class="works-section">
    <div class="section-header">
      <h2 class="section-title">Works</h2>
      <p class="section-description">制作したウェブサイト・ツール</p>
    </div>

    <Transition name="fade-up">
      <div v-if="isVisible" class="works-grid">
        <a
          v-for="work in works"
          :key="work.title"
          :href="work.url"
          target="_blank"
          rel="noopener noreferrer"
          class="work-card"
        >
          <div class="work-thumbnail-wrapper">
            <img
              :src="work.thumbnail"
              :alt="work.title"
              class="work-thumbnail"
            />
          </div>
          <div class="work-info">
            <h3 class="work-title">{{ work.title }}</h3>
            <span class="work-link-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </span>
          </div>
        </a>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
.works-section {
  padding-bottom: var(--section-gap);
  position: relative;
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

.works-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 900px;
}

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

.work-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--lavender);
}

.work-thumbnail-wrapper {
  overflow: hidden;
  aspect-ratio: 16 / 9;
}

.work-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.work-card:hover .work-thumbnail {
  transform: scale(1.03);
}

.work-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
}

.work-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  font-family: "Inter", sans-serif;
}

.work-link-icon {
  color: var(--text-muted);
  transition: color 0.3s ease;
  flex-shrink: 0;
}

.work-card:hover .work-link-icon {
  color: var(--lavender-dark);
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
  .works-section {
    padding-bottom: var(--section-gap-sm);
  }

  .works-grid {
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }

  .section-header {
    margin-bottom: 3rem;
  }
}

.works-section::after {
  content: '';
  display: block;
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--lavender-dark), transparent);
  margin: 0 auto;
  margin-top: 3rem;
}
</style>
