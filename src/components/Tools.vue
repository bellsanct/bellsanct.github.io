<script setup>
import { ref, onMounted } from "vue";

const isVisible = ref(false);

const tools = [
  {
    title: "Minify/Clean",
    description: "HTML/CSS/JSのミニファイとフォーマット",
    link: "https://bellsanct-tools.vercel.app/MinifyTool",
  },
  {
    title: "文字数カウンター",
    description: "リアルタイム文字数カウント",
    link: "https://bellsanct-tools.vercel.app/CharCalc",
  },
  {
    title: "Markdownビュワー",
    description: "リアルタイムプレビュー",
    link: "https://bellsanct.github.io/markdown-editor/",
  },
  {
    title: "JSON⇔YAML変換",
    description: "相互変換ツール",
    link: "https://bellsanct-tools.vercel.app/JsonYaml",
  },
  {
    title: "JSON可視化",
    description: "JSONデータを視覚的に表示",
    link: "https://bellsanct-tools.vercel.app/JSONVisualization",
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

  const section = document.querySelector("#tools");
  if (section) observer.observe(section);
});
</script>

<template>
  <section id="tools" class="section">
    <!-- Decorative Elements -->
    <div class="section-decoration">
      <div class="decoration-square decoration-square-1"></div>
      <div class="decoration-square decoration-square-2"></div>
      <div class="decoration-square decoration-square-3"></div>
      <div class="decoration-dot decoration-dot-1"></div>
      <div class="decoration-dot decoration-dot-2"></div>
      <div class="decoration-dot decoration-dot-3"></div>
      <div class="decoration-line decoration-line-1"></div>
      <div class="decoration-halo decoration-halo-1"></div>
      <div class="decoration-halo decoration-halo-2"></div>
    </div>

    <div class="container">
      <Transition name="fade-up">
        <div v-if="isVisible">
          <div class="section-header">
            <h2 class="section-title">Development Tools</h2>
            <p class="section-description">気まぐれで作成したWebツール集</p>
          </div>

          <div class="tools-grid">
            <a
              v-for="(tool, index) in tools"
              :key="index"
              :href="tool.link"
              target="_blank"
              class="tool-card"
            >
              <h3 class="tool-title">{{ tool.title }}</h3>
              <p class="tool-description">{{ tool.description }}</p>
              <div class="tool-arrow">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </div>
            </a>
          </div>
        </div>
      </Transition>
    </div>
  </section>
</template>

<style scoped>
.section {
  padding: var(--section-gap) 0;
  position: relative;
  background: var(--bg-primary);
  overflow: hidden;
}

/* Decorative Elements */
.section-decoration {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.decoration-square {
  position: absolute;
  width: 60px;
  height: 60px;
  border: 1px solid var(--coral);
  opacity: 0.15;
  transform: rotate(45deg);
}

.decoration-square-1 {
  top: 25%;
  right: 10%;
  animation: slowRotate 25s linear infinite;
}

.decoration-square-2 {
  bottom: 20%;
  left: 8%;
  width: 40px;
  height: 40px;
  animation: slowRotate 20s linear infinite reverse;
}

.decoration-square-3 {
  top: 50%;
  left: 15%;
  width: 50px;
  height: 50px;
  border-color: var(--lavender);
  animation: slowRotate 28s linear infinite;
}

@keyframes slowRotate {
  from {
    transform: rotate(45deg);
  }
  to {
    transform: rotate(405deg);
  }
}

.decoration-dot {
  position: absolute;
  width: 5px;
  height: 5px;
  background: var(--rose);
  border-radius: 50%;
  opacity: 0.5;
}

.decoration-dot-1 {
  top: 30%;
  left: 5%;
  animation: pulse 3.5s ease-in-out infinite;
}

.decoration-dot-2 {
  bottom: 35%;
  right: 12%;
  animation: pulse 4s ease-in-out infinite;
  animation-delay: 1s;
}

.decoration-dot-3 {
  top: 65%;
  right: 8%;
  animation: pulse 3.8s ease-in-out infinite;
  animation-delay: 2s;
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
    var(--gold) 50%,
    transparent 100%
  );
  width: 1px;
  height: 100px;
  opacity: 0.3;
  top: 15%;
  right: 20%;
  animation: float 10s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.decoration-halo {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(
    circle at center,
    transparent 40%,
    var(--gold) 45%,
    transparent 50%
  );
  opacity: 0.25;
}

.decoration-halo-1 {
  width: 160px;
  height: 160px;
  top: 30%;
  left: 8%;
  animation: haloGlow 6.5s ease-in-out infinite;
}

.decoration-halo-2 {
  width: 130px;
  height: 130px;
  bottom: 20%;
  right: 15%;
  animation: haloGlow 7.5s ease-in-out infinite;
  animation-delay: 1.8s;
}

@keyframes haloGlow {
  0%,
  100% {
    opacity: 0.18;
    transform: scale(1);
  }
  50% {
    opacity: 0.35;
    transform: scale(1.12);
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
  color: var(--text-secondary);
  font-size: 1.125rem;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.tool-card {
  position: relative;
  padding: 2.5rem;
  background: var(--bg-accent);
  border: 1px solid var(--border-light);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.tool-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--lavender-light), var(--rose-light));
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 0;
}

.tool-card:hover {
  border-color: var(--lavender);
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
}

.tool-card:hover::before {
  opacity: 0.3;
}

.tool-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
  position: relative;
  z-index: 1;
  font-family: "Crimson Pro", serif;
}

.tool-card:hover .tool-title {
  color: var(--lavender-dark);
}

.tool-description {
  color: var(--text-secondary);
  line-height: 1.6;
  position: relative;
  z-index: 1;
  font-family: "Inter", sans-serif;
}

.tool-arrow {
  position: absolute;
  top: 2rem;
  right: 2rem;
  color: var(--lavender);
  opacity: 0.5;
  transition: all 0.3s ease;
}

.tool-card:hover .tool-arrow {
  opacity: 1;
  transform: translate(4px, -4px);
}

/* Transitions */
.fade-up-enter-active {
  transition: all 0.8s ease-out;
}

.fade-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

/* Responsive */
@media (max-width: 768px) {
  .section {
    padding: var(--section-gap-sm) 0;
  }

  .tools-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .tool-card {
    padding: 2rem;
  }
}
</style>
