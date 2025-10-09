<script setup>
import { ref, onMounted } from 'vue'

const isVisible = ref(false)
const activeEvent = ref('omr')

const eventSeries = {
  omr: {
    title: 'OuterMusicRoom',
    subtitle: '音楽ゲーム系オールジャンルDJイベント',
    description: 'BEMANI、VOCALOID、東方Project、アニソンなど、幅広いジャンルの音楽を取り扱うDJイベント。2022年から継続開催中。',
    link: 'https://outermusicroom.site/',
    feature: '/assets/omr3-2.webp',
    images: [
      { src: '/assets/o3.webp', title: 'OMR #3', year: '2024' },
      { src: '/assets/o2.webp', title: 'OMR #2', year: '2023' },
      { src: '/assets/o1.webp', title: 'OMR #1', year: '2022' }
    ],
    color: 'rgba(167, 139, 250, 0.2)'
  },
  kaion: {
    title: '快創音楽室',
    subtitle: '音楽ゲーム系DJイベント',
    description: '2020年から2021年にかけて開催された音楽ゲーム系DJイベントシリーズ。多数のDJが参加し、様々な音楽ゲーム楽曲を披露。',
    link: 'https://bellsanct.github.io/kaion/',
    feature: '/assets/kaion.webp',
    images: [
      { src: '/assets/23.webp', title: '快創音楽室 #23', year: '2021' },
      { src: '/assets/22.webp', title: '快創音楽室 #22', year: '2021' },
      { src: '/assets/21.webp', title: '快創音楽室 #21', year: '2021' },
      { src: '/assets/20.webp', title: '快創音楽室 #20', year: '2021' },
      { src: '/assets/17.webp', title: '快創音楽室 #17', year: '2021' },
      { src: '/assets/16.webp', title: '快創音楽室 #16', year: '2021' },
      { src: '/assets/15.webp', title: '快創音楽室 #15', year: '2020' },
      { src: '/assets/14.webp', title: '快創音楽室 #14', year: '2020' },
      { src: '/assets/13.webp', title: '快創音楽室 #13', year: '2020' },
      { src: '/assets/12.webp', title: '快創音楽室 #12', year: '2020' },
      { src: '/assets/11.webp', title: '快創音楽室 #11', year: '2020' }
    ],
    color: 'rgba(96, 165, 250, 0.2)'
  },
  rockon: {
    title: 'ROCKON_TOHOKU',
    subtitle: '東北地方のDJイベント',
    description: '2020年に開催された東北地方を盛り上げるDJイベント。地域の音楽文化の発展に貢献。',
    link: 'https://twipla.jp/events/387211',
    images: [
      { src: '/assets/rockon.webp', title: 'ROCKON_TOHOKU', year: '2020' }
    ],
    color: 'rgba(192, 132, 252, 0.2)'
  }
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
        }
      })
    },
    { threshold: 0.1 }
  )

  const section = document.querySelector('#events')
  if (section) observer.observe(section)
})
</script>

<template>
  <section id="events" class="events-section">
    <div class="container">
      <Transition name="fade-up">
        <div v-if="isVisible">
          <!-- Section Header -->
          <div class="section-header">
            <span class="section-label glass-intense">Event Archive</span>
            <h2 class="section-title">Works</h2>
          </div>

          <!-- Event Tabs -->
          <div class="event-tabs">
            <button
              v-for="(series, key) in eventSeries"
              :key="key"
              :class="['tab-btn', { active: activeEvent === key }]"
              @click="activeEvent = key"
            >
              <span class="tab-text">{{ series.title }}</span>
              <span class="tab-count">{{ series.images.length }}</span>
            </button>
          </div>

          <!-- Event Content -->
          <div class="event-content">
            <TransitionGroup name="slide-fade">
              <div
                v-for="(series, key) in eventSeries"
                v-show="activeEvent === key"
                :key="key"
                class="event-series"
              >
                <!-- Series Info -->
                <div class="series-info">
                  <div class="info-main">
                    <h3 class="series-title">{{ series.title }}</h3>
                    <p class="series-subtitle">{{ series.subtitle }}</p>
                    <p class="series-description">{{ series.description }}</p>
                    <a :href="series.link" target="_blank" class="series-link">
                      <span>詳細を見る</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </a>
                  </div>

                  <!-- Feature Image for OMR -->
                  <div v-if="series.feature" class="feature-image">
                    <img :src="series.feature" :alt="series.title" />
                    <div class="feature-glow" :style="{ background: series.color }"></div>
                  </div>
                </div>

                <!-- Image Gallery -->
                <div :class="['image-gallery', `gallery-${key}`]">
                  <a
                    v-for="(image, index) in series.images"
                    :key="index"
                    :href="series.link"
                    target="_blank"
                    class="gallery-item"
                    :style="{ animationDelay: `${index * 0.1}s` }"
                  >
                    <div class="image-wrapper">
                      <img :src="image.src" :alt="image.title" />
                    </div>
                  </a>
                </div>
              </div>
            </TransitionGroup>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Decorative Background -->
    <div class="deco-bg">
      <div class="deco-shape shape-1"></div>
      <div class="deco-shape shape-2"></div>
      <div class="deco-shape shape-3"></div>
    </div>
  </section>
</template>

<style scoped>
.events-section {
  padding: var(--section-gap) 0;
  position: relative;
  overflow: hidden;
  border-top: 1px solid var(--border);
}

.events-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--primary) 50%,
    transparent 100%
  );
  opacity: 0.5;
}

/* Section Header */
.section-header {
  margin-bottom: 5rem;
  text-align: center;
}

.section-label {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: rgba(167, 139, 250, 0.2);
  backdrop-filter: blur(10px);
  border: 2px solid var(--border-bright);
  border-radius: 6px;
  color: var(--primary);
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 20px var(--glow);
  text-transform: uppercase;
}

.section-title {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Event Tabs */
.event-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 4rem;
  flex-wrap: wrap;
  justify-content: center;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: var(--bg-card);
  border: 2px solid var(--border);
  border-radius: 4px;
  color: var(--text-secondary);
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(12px) saturate(150%);
  position: relative;
  overflow: hidden;
  clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
}

.tab-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  opacity: 0;
  transition: opacity 0.4s ease;
}

.tab-btn.active {
  border-color: var(--border-intense);
  color: var(--text-primary);
  background: rgba(167, 139, 250, 0.3);
  transform: translateY(-4px);
  box-shadow: 0 12px 48px var(--glow-intense);
}

.tab-btn.active::before {
  opacity: 0.2;
}

.tab-btn:hover:not(.active) {
  border-color: var(--border-bright);
  transform: translateY(-2px);
}

.tab-text {
  position: relative;
  z-index: 1;
}

.tab-count {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  padding: 0 0.5rem;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  color: #000000;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 800;
  clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%);
  box-shadow: 0 0 20px var(--glow);
}

.tab-btn.active .tab-count {
  background: var(--primary);
  color: #000000;
}

/* Event Content */
.event-content {
  position: relative;
  min-height: 600px;
}

.event-series {
  animation: fadeIn 0.6s ease-out;
}

/* Series Info */
.series-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;
  align-items: center;
}

.info-main {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.series-title {
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.series-subtitle {
  color: var(--primary);
  font-size: 1.125rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.series-description {
  color: var(--text-secondary);
  font-size: 1.0625rem;
  line-height: 1.85;
  font-weight: 400;
  letter-spacing: 0.01em;
}

.series-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  color: #000000;
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.01em;
  border-radius: 10px;
  text-decoration: none;
  width: fit-content;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 8px 28px rgba(167, 139, 250, 0.45),
              0 0 0 1px rgba(255, 255, 255, 0.1) inset;
}

.series-link:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 16px 48px rgba(167, 139, 250, 0.6),
              0 0 0 1px rgba(255, 255, 255, 0.2) inset;
}

.series-link svg {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.series-link:hover svg {
  transform: translate(3px, -3px);
}

/* Feature Image */
.feature-image {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background: var(--bg-card);
  border: 4px solid var(--border-bright);
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  transform: perspective(1200px) rotateY(-8deg) rotateX(2deg);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  clip-path: polygon(
    0 0,
    calc(100% - 24px) 0,
    100% 24px,
    100% 100%,
    24px 100%,
    0 calc(100% - 24px)
  );
}

.feature-image::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 24px;
  height: 24px;
  background: var(--primary);
  opacity: 0.5;
  clip-path: polygon(100% 0, 100% 100%, 0 0);
}

.feature-image:hover {
  transform: perspective(1200px) rotateY(0deg) rotateX(0deg) scale(1.02);
  border-color: var(--border-intense);
  box-shadow: 0 32px 120px var(--glow-intense),
              0 0 0 2px var(--primary) inset;
}

.feature-image:hover::after {
  opacity: 1;
}

.feature-image img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 12px;
}

.feature-glow {
  position: absolute;
  inset: -50%;
  opacity: 0.4;
  z-index: -1;
  filter: blur(60px);
  animation: pulse 4s ease-in-out infinite;
}

/* Image Gallery */
.image-gallery {
  display: grid;
  gap: 1.5rem;
}

.gallery-omr {
  grid-template-columns: repeat(3, 1fr);
}

.gallery-kaion {
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

.gallery-rockon {
  grid-template-columns: 1fr;
  max-width: 600px;
  margin: 0 auto;
}

.gallery-item {
  text-decoration: none;
  display: block;
  animation: scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.image-wrapper {
  position: relative;
  aspect-ratio: 5/7;
  border-radius: 4px;
  overflow: hidden;
  background: var(--bg-card);
  border: 3px solid var(--border);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  clip-path: polygon(
    0 0,
    calc(100% - 16px) 0,
    100% 16px,
    100% 100%,
    16px 100%,
    0 calc(100% - 16px)
  );
}

.image-wrapper::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 16px;
  height: 16px;
  background: var(--primary);
  opacity: 0;
  clip-path: polygon(100% 0, 100% 100%, 0 0);
  transition: opacity 0.4s ease;
}

.gallery-item:hover .image-wrapper {
  transform: translateY(-16px) scale(1.02);
  border-color: var(--border-intense);
  box-shadow: 0 32px 120px var(--glow-intense),
              0 0 0 2px var(--primary) inset;
}

.gallery-item:hover .image-wrapper::after {
  opacity: 1;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.6s ease;
  filter: brightness(0.95);
}

.gallery-item:hover .image-wrapper img {
  transform: scale(1.05);
  filter: brightness(1.1);
}

/* Decorative Background */
.deco-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;
}

.deco-shape {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, var(--glow) 0%, transparent 70%);
  opacity: 0.05;
}

.shape-1 {
  width: 600px;
  height: 600px;
  top: 10%;
  left: -10%;
  animation: float 12s ease-in-out infinite;
}

.shape-2 {
  width: 400px;
  height: 400px;
  top: 50%;
  right: -5%;
  animation: float 10s ease-in-out infinite reverse;
}

.shape-3 {
  width: 500px;
  height: 500px;
  bottom: 10%;
  left: 50%;
  animation: float 15s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  33% {
    transform: translate(30px, -30px) rotate(5deg);
  }
  66% {
    transform: translate(-20px, 20px) rotate(-5deg);
  }
}

/* Transitions */
.fade-up-enter-active {
  transition: all 0.8s ease-out;
}

.fade-up-enter-from {
  opacity: 0;
  transform: translateY(40px);
}

.slide-fade-enter-active {
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.slide-fade-leave-active {
  transition: all 0.4s ease;
  position: absolute;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Responsive */
@media (max-width: 1024px) {
  .series-info {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .feature-image {
    max-width: 500px;
    margin: 0 auto;
    transform: perspective(1000px) rotateY(0deg);
  }

  .gallery-omr,
  .gallery-kaion {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .events-section {
    padding: 6rem 0;
  }

  .section-header {
    margin-bottom: 3rem;
  }

  .event-tabs {
    flex-direction: column;
  }

  .tab-btn {
    width: 100%;
    justify-content: space-between;
  }

  .series-info {
    gap: 2rem;
    margin-bottom: 3rem;
  }

  .gallery-omr,
  .gallery-kaion {
    grid-template-columns: 1fr;
  }

  .image-gallery {
    gap: 1rem;
  }
}
</style>
