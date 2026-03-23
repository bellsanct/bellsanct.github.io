<script setup>
import { ref, onMounted } from "vue";

const isVisible = ref(false);

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

  const section = document.querySelector("#profile");
  if (section) observer.observe(section);
});
</script>

<template>
  <section id="profile" class="profile-section">
    <Transition name="fade-up">
      <div v-if="isVisible" class="profile-card">
        <div class="profile-avatar-wrapper">
          <img src="/assets/icon.webp" alt="Bell_staymen04" class="profile-avatar" />
        </div>
        <div class="profile-body">
          <h2 class="profile-name">Bell_staymen04</h2>
          <p class="profile-role">DJ / Organizer</p>
          <div class="profile-bio">
            <p>音楽ゲーム系オールジャンルDJイベント<a href="https://outermusicroom.site/" target="_blank" rel="noopener noreferrer" class="highlight-link">OuterMusicRoom</a>のオーガナイザー兼DJ。</p>
            <p>普段はWebサイトやWebアプリケーションの開発・運用保守をしたり、インターネット雑用をこなしています。</p>
            <p>最近はスパ銭通いが趣味になりつつあるが、じっとしていることが苦手なため長風呂できないことが悩み。</p>
          </div>
          <div class="profile-links">
            <a href="https://twitter.com/Bell_staymen04" target="_blank" rel="noopener noreferrer" class="profile-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Twitter
            </a>
            <a href="https://outermusicroom.site/" target="_blank" rel="noopener noreferrer" class="profile-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              OuterMusicRoom
            </a>
            <a href="https://github.com/bellsanct" target="_blank" rel="noopener noreferrer" class="profile-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
.profile-section {
  padding-bottom: var(--section-gap);
}

.profile-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: 16px;
  padding: 2.5rem;
  display: flex;
  gap: 2.5rem;
  align-items: flex-start;
  box-shadow:
    0 4px 16px rgba(0, 0, 0, 0.3),
    0 0 40px rgba(155, 146, 192, 0.05);
}

.profile-avatar-wrapper {
  flex-shrink: 0;
}

.profile-avatar {
  width: 140px;
  height: 140px;
  border-radius: 16px;
  object-fit: cover;
  border: 2px solid var(--border-medium);
}

.profile-body {
  flex: 1;
}

.profile-name {
  font-family: "Crimson Pro", serif;
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.profile-role {
  font-size: 1rem;
  color: var(--lavender);
  font-weight: 500;
  margin-bottom: 1.5rem;
}

.profile-bio {
  margin-bottom: 1.5rem;
}

.profile-bio p {
  font-size: 0.9375rem;
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.profile-bio p:last-child {
  margin-bottom: 0;
}

.highlight-link {
  color: var(--lavender);
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.3s ease;
}

.highlight-link:hover {
  color: var(--lavender-light);
}

.profile-links {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.profile-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.3s ease;
}

.profile-link:hover {
  color: var(--lavender);
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
  .profile-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 2rem 1.5rem;
    gap: 1.5rem;
  }

  .profile-avatar {
    width: 120px;
    height: 120px;
  }

  .profile-links {
    justify-content: center;
  }
}
</style>
