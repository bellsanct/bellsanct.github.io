<script setup>
import { ref, onMounted } from "vue";

const isVisible = ref(false);
const showTerminal = ref(false);

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
          setTimeout(() => (showTerminal.value = true), 300);
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
  <section id="profile" class="section">
    <!-- Decorative Elements -->
    <div class="section-decoration">
      <div class="decoration-line decoration-line-1"></div>
      <div class="decoration-line decoration-line-2"></div>
      <div class="decoration-line decoration-line-3"></div>
      <div class="decoration-circle decoration-circle-1"></div>
      <div class="decoration-circle decoration-circle-2"></div>
      <div class="decoration-circle decoration-circle-3"></div>
      <div class="decoration-dot decoration-dot-1"></div>
      <div class="decoration-dot decoration-dot-2"></div>
      <div class="decoration-dot decoration-dot-3"></div>
      <div class="decoration-dot decoration-dot-4"></div>
      <div class="decoration-halo decoration-halo-1"></div>
      <div class="decoration-halo decoration-halo-2"></div>
    </div>

    <div class="container">
      <Transition name="fade-up">
        <div v-if="isVisible" class="content">
          <div class="section-header">
            <div class="profile-icon-wrapper">
              <img
                src="/assets/icon.webp"
                alt="Bell_staymen04"
                class="profile-icon"
              />
            </div>
            <h2 class="section-title">$ whoami</h2>
          </div>

          <Transition name="terminal">
            <div v-if="showTerminal" class="terminal-block">
              <div class="terminal-header">
                <div class="terminal-dots">
                  <span class="dot dot-red"></span>
                  <span class="dot dot-yellow"></span>
                  <span class="dot dot-green"></span>
                </div>
                <div class="terminal-title">bell_staymen04.sh</div>
              </div>
              <div class="terminal-body">
                <!-- Profile -->
                <div class="terminal-line">
                  <span class="prompt">$</span>
                  <span class="command">cat</span>
                  <span class="arg">profile.txt</span>
                </div>
                <div class="output">
                  <p class="output-text">
                    音楽ゲーム系オールジャンルDJイベント<span class="highlight"
                      >OuterMusicRoom</span
                    >のオーガナイザー兼DJ。
                  </p>
                  <p class="output-text">
                    普段はWebサイトやWebアプリケーションの開発・運用保守をしたり、インターネット雑用をこなしています。
                  </p>
                  <p class="output-text">
                    最近はスパ銭通いが趣味になりつつあるが、じっとしていることが苦手なため長風呂できないことが悩み。
                  </p>
                </div>

                <!-- Links -->
                <div class="terminal-line terminal-line-spacing">
                  <span class="prompt">$</span>
                  <span class="command">cat</span>
                  <span class="arg">links/</span>
                </div>
                <div class="output">
                  <div class="link-list">
                    <a
                      href="https://twitter.com/Bell_staymen04"
                      target="_blank"
                      class="terminal-link"
                    >
                      <span class="link-icon">→</span>
                      <span>Twitter</span>
                    </a>
                    <a
                      href="https://outermusicroom.site/"
                      target="_blank"
                      class="terminal-link"
                    >
                      <span class="link-icon">→</span>
                      <span>OuterMusicRoom</span>
                    </a>
                    <a
                      href="https://github.com/bellsanct"
                      target="_blank"
                      class="terminal-link"
                    >
                      <span class="link-icon">→</span>
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </div>
  </section>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&display=swap");

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

.decoration-line {
  position: absolute;
  background: linear-gradient(
    180deg,
    transparent 0%,
    var(--lavender-light) 50%,
    transparent 100%
  );
  width: 1px;
  height: 200px;
  opacity: 0.3;
}

.decoration-line-1 {
  top: 10%;
  left: 8%;
  animation: float 8s ease-in-out infinite;
}

.decoration-line-2 {
  top: 60%;
  right: 12%;
  animation: float 10s ease-in-out infinite reverse;
}

.decoration-line-3 {
  bottom: 15%;
  left: 20%;
  height: 150px;
  animation: float 12s ease-in-out infinite;
  animation-delay: 1s;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-30px);
  }
}

.decoration-circle {
  position: absolute;
  border: 1px solid var(--lavender-light);
  border-radius: 50%;
  opacity: 0.2;
}

.decoration-circle-1 {
  width: 120px;
  height: 120px;
  top: 20%;
  right: 15%;
  animation: rotate 20s linear infinite;
}

.decoration-circle-2 {
  width: 80px;
  height: 80px;
  bottom: 30%;
  left: 10%;
  animation: rotate 15s linear infinite reverse;
}

.decoration-circle-3 {
  width: 100px;
  height: 100px;
  top: 50%;
  right: 5%;
  animation: rotate 18s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.decoration-dot {
  position: absolute;
  width: 6px;
  height: 6px;
  background: var(--rose);
  border-radius: 50%;
  opacity: 0.4;
}

.decoration-dot-1 {
  top: 25%;
  left: 15%;
  animation: pulse 3s ease-in-out infinite;
}

.decoration-dot-2 {
  top: 70%;
  right: 20%;
  animation: pulse 4s ease-in-out infinite;
  animation-delay: 1s;
}

.decoration-dot-3 {
  bottom: 40%;
  left: 5%;
  animation: pulse 3.5s ease-in-out infinite;
  animation-delay: 2s;
}

.decoration-dot-4 {
  top: 45%;
  right: 8%;
  animation: pulse 4.5s ease-in-out infinite;
  animation-delay: 0.5s;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.4;
  }
  50% {
    transform: scale(1.8);
    opacity: 0.8;
  }
}

.decoration-halo {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(
    circle at center,
    transparent 40%,
    var(--lavender-light) 45%,
    transparent 50%
  );
  opacity: 0.25;
}

.decoration-halo-1 {
  width: 150px;
  height: 150px;
  top: 35%;
  right: 18%;
  animation: haloGlow 6s ease-in-out infinite;
}

.decoration-halo-2 {
  width: 120px;
  height: 120px;
  bottom: 25%;
  left: 15%;
  animation: haloGlow 7s ease-in-out infinite;
  animation-delay: 1.5s;
}

@keyframes haloGlow {
  0%,
  100% {
    opacity: 0.15;
    transform: scale(1);
  }
  50% {
    opacity: 0.35;
    transform: scale(1.1);
  }
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  z-index: 1;
}

.profile-icon-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.profile-icon {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid var(--lavender);
  box-shadow: var(--shadow-lg);
  object-fit: cover;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.profile-icon:hover {
  transform: scale(1.05);
  border-color: var(--lavender-dark);
  box-shadow: 0 12px 40px rgba(184, 176, 212, 0.4);
}

[data-theme="dark"] .profile-icon {
  border-color: var(--lavender-light);
}

[data-theme="dark"] .profile-icon:hover {
  border-color: var(--lavender);
  box-shadow: 0 12px 40px rgba(155, 143, 168, 0.5);
}

.section-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 600;
  color: var(--text-primary);
  font-family: "Fira Code", monospace;
  letter-spacing: -0.02em;
}

/* Terminal Block */
.terminal-block {
  max-width: 900px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.98);
  border: 1px solid var(--border-medium);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 1;
}

[data-theme="dark"] .terminal-block {
  background: var(--bg-secondary);
  border-color: var(--border-medium);
}

.terminal-block:hover {
  box-shadow: 0 12px 40px rgba(45, 38, 64, 0.15);
  border-color: var(--lavender);
}

[data-theme="dark"] .terminal-block:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
}

/* Terminal Header */
.terminal-header {
  background: linear-gradient(
    135deg,
    var(--lavender-light) 0%,
    var(--rose-light) 100%
  );
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid var(--border-light);
}

.terminal-dots {
  display: flex;
  gap: 0.5rem;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  opacity: 0.8;
}

.dot-red {
  background: #ff6b7a;
}
.dot-yellow {
  background: #f4e5a8;
}
.dot-green {
  background: #b8d4b0;
}

.terminal-title {
  font-family: "Fira Code", monospace;
  font-size: 0.875rem;
  color: var(--text-primary);
  font-weight: 500;
}

/* Terminal Body */
.terminal-body {
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.5);
  font-family: "Fira Code", monospace;
}

[data-theme="dark"] .terminal-body {
  background: rgba(31, 26, 39, 0.5);
}

.terminal-line {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
  font-size: 0.9375rem;
}

.terminal-line-spacing {
  margin-top: 2rem;
}

.prompt {
  color: var(--lavender-dark);
  font-weight: 600;
}

.command {
  color: var(--coral);
  font-weight: 500;
}

.arg {
  color: var(--text-secondary);
}

/* Output Styles */
.output {
  margin-top: 0.75rem;
}

.output-text {
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 0.75rem;
  font-family: "Inter", sans-serif;
  font-size: 0.9375rem;
}

.output-text:last-child {
  margin-bottom: 0;
}

.highlight {
  color: var(--lavender-dark);
  font-weight: 600;
}

/* Code Block */
.code-block {
  margin: 0;
  padding: 1rem;
  background: rgba(45, 38, 64, 0.05);
  border-radius: 8px;
  font-family: "Fira Code", monospace;
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--text-primary);
  overflow-x: auto;
}

[data-theme="dark"] .code-block {
  background: rgba(0, 0, 0, 0.3);
}

.key {
  color: var(--lavender-dark);
  font-weight: 500;
}

.string {
  color: var(--coral);
}

/* Link List */
.link-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.terminal-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: rgba(184, 176, 212, 0.1);
  border: 1px solid var(--border-light);
  border-radius: 8px;
  color: var(--text-primary);
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 0.9375rem;
}

.terminal-link:hover {
  background: var(--lavender-light);
  border-color: var(--lavender);
  transform: translateX(4px);
}

[data-theme="dark"] .terminal-link {
  background: rgba(155, 143, 168, 0.15);
}

[data-theme="dark"] .terminal-link:hover {
  background: rgba(155, 143, 168, 0.3);
}

.link-icon {
  color: var(--lavender-dark);
  font-weight: 600;
}

/* Terminal Transition */
.terminal-enter-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.terminal-enter-from {
  opacity: 0;
  transform: translateY(20px);
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

  .section-header {
    margin-bottom: 3rem;
  }

  .terminal-block {
    margin: 0 1rem;
  }

  .terminal-body {
    padding: 1rem;
  }

  .code-block {
    font-size: 0.75rem;
  }

  .terminal-line-spacing {
    margin-top: 1.5rem;
  }
}
</style>
