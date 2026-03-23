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
  <section id="tools" class="tools-section">
    <div class="section-header">
      <h2 class="section-title">Development Tools</h2>
      <p class="section-description">気まぐれで作成したWebツール集</p>
    </div>

    <Transition name="fade-up">
      <div v-if="isVisible" class="tools-grid">
        <a
          v-for="(tool, index) in tools"
          :key="index"
          :href="tool.link"
          target="_blank"
          rel="noopener noreferrer"
          class="tool-card"
        >
          <div class="tool-info">
            <h3 class="tool-name">{{ tool.title }}</h3>
            <p class="tool-description">{{ tool.description }}</p>
          </div>
          <div class="tool-arrow">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </div>
        </a>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
.tools-section {
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

.tools-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

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
  flex-shrink: 0;
}

.tool-card:hover .tool-arrow {
  color: var(--lavender);
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
  .section-title {
    font-size: 1.75rem;
  }

  .tool-card {
    padding: 1.5rem;
  }
}

.tools-section::after {
  content: '';
  display: block;
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--lavender-dark), transparent);
  margin: 0 auto;
  margin-top: 3rem;
}
</style>
