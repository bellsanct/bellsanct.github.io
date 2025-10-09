<script setup>
import { ref, onMounted } from 'vue'

const isVisible = ref(false)

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

  const section = document.querySelector('#contact')
  if (section) observer.observe(section)
})
</script>

<template>
  <section id="contact" class="section">
    <!-- Decorative Elements -->
    <div class="section-decoration">
      <div class="decoration-triangle decoration-triangle-1"></div>
      <div class="decoration-triangle decoration-triangle-2"></div>
      <div class="decoration-triangle decoration-triangle-3"></div>
      <div class="decoration-circle decoration-circle-1"></div>
      <div class="decoration-dot decoration-dot-1"></div>
      <div class="decoration-dot decoration-dot-2"></div>
      <div class="decoration-dot decoration-dot-3"></div>
      <div class="decoration-halo decoration-halo-1"></div>
      <div class="decoration-halo decoration-halo-2"></div>
    </div>

    <div class="container">
      <Transition name="fade-up">
        <div v-if="isVisible" class="content">
          <div class="contact-header">
            <h2 class="section-title">Get In Touch</h2>
            <p class="section-description">
              プロジェクトのご相談、イベント出演依頼、その他お問い合わせは<br class="hide-mobile">
              TwitterのDMにてお気軽にご連絡ください。
            </p>
          </div>

          <div class="contact-actions">
            <a href="https://twitter.com/Bell_staymen04" target="_blank" class="contact-btn primary">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
              <span>Twitter DMで連絡する</span>
            </a>
            <a href="https://github.com/bellsanct" target="_blank" class="contact-btn secondary">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span>GitHub</span>
            </a>
          </div>

          <div class="contact-info">
            <p>@Bell_staymen04</p>
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
  background: var(--bg-accent);
  overflow: hidden;
}

/* Decorative Elements */
.section-decoration {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.decoration-triangle {
  position: absolute;
  width: 0;
  height: 0;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  border-bottom: 50px solid var(--lavender-light);
  opacity: 0.15;
}

.decoration-triangle-1 {
  top: 15%;
  left: 10%;
  animation: float 10s ease-in-out infinite;
}

.decoration-triangle-2 {
  bottom: 20%;
  right: 15%;
  transform: rotate(180deg);
  animation: float 12s ease-in-out infinite reverse;
}

.decoration-triangle-3 {
  top: 50%;
  right: 8%;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  border-bottom: 40px solid var(--rose-light);
  transform: rotate(90deg);
  animation: float 11s ease-in-out infinite;
  animation-delay: 1s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(90deg);
  }
  50% {
    transform: translateY(-20px) rotate(90deg);
  }
}

.decoration-circle {
  position: absolute;
  border: 1px solid var(--lavender-light);
  border-radius: 50%;
  opacity: 0.2;
  width: 70px;
  height: 70px;
  bottom: 30%;
  left: 12%;
  animation: rotate 20s linear infinite;
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
  width: 5px;
  height: 5px;
  background: var(--coral);
  border-radius: 50%;
  opacity: 0.5;
}

.decoration-dot-1 {
  top: 25%;
  left: 20%;
  animation: pulse 3.5s ease-in-out infinite;
}

.decoration-dot-2 {
  bottom: 40%;
  right: 25%;
  animation: pulse 4s ease-in-out infinite;
  animation-delay: 1s;
}

.decoration-dot-3 {
  top: 60%;
  left: 8%;
  animation: pulse 3.8s ease-in-out infinite;
  animation-delay: 2s;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(2);
    opacity: 0.9;
  }
}

.decoration-halo {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(
    circle at center,
    transparent 40%,
    var(--coral-light) 45%,
    transparent 50%
  );
  opacity: 0.28;
}

.decoration-halo-1 {
  width: 170px;
  height: 170px;
  top: 25%;
  right: 12%;
  animation: haloGlow 6.8s ease-in-out infinite;
}

.decoration-halo-2 {
  width: 135px;
  height: 135px;
  bottom: 28%;
  left: 10%;
  animation: haloGlow 7.2s ease-in-out infinite;
  animation-delay: 2.2s;
}

@keyframes haloGlow {
  0%, 100% {
    opacity: 0.2;
    transform: scale(1);
  }
  50% {
    opacity: 0.38;
    transform: scale(1.13);
  }
}

.content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
}

.contact-header {
  margin-bottom: 3rem;
}

.section-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  font-family: 'Crimson Pro', serif;
}

.section-description {
  color: var(--text-secondary);
  font-size: 1.125rem;
  line-height: 1.85;
  font-weight: 400;
  letter-spacing: 0.01em;
}

.hide-mobile {
  display: inline;
}

.contact-actions {
  display: flex;
  gap: 1.25rem;
  justify-content: center;
  flex-wrap: wrap;
}

.contact-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.125rem 2.25rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: 'Inter', sans-serif;
}

.contact-btn.primary {
  background: var(--lavender);
  color: white;
  box-shadow: var(--shadow-md);
}

.contact-btn.primary:hover {
  background: var(--lavender-dark);
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.contact-btn.secondary {
  background: rgba(255, 255, 255, 0.98);
  border: 2px solid var(--border-medium);
  color: var(--text-primary);
}

[data-theme="dark"] .contact-btn.secondary {
  background: var(--bg-secondary);
  border-color: var(--border-medium);
  color: var(--text-primary);
}

.contact-btn.secondary:hover {
  border-color: var(--lavender);
  color: var(--lavender-dark);
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

[data-theme="dark"] .contact-btn.secondary:hover {
  background: var(--bg-accent);
  color: var(--lavender);
}

.contact-info {
  margin-top: 3rem;
  color: var(--text-muted);
  font-size: 0.9375rem;
  font-family: 'Inter', sans-serif;
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

  .hide-mobile {
    display: none;
  }

  .contact-actions {
    flex-direction: column;
  }

  .contact-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
