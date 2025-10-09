<script setup>
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-main">
          <div class="footer-brand">
            <h3 class="brand-name">Bell_staymen04</h3>
            <p class="brand-tagline">
              Creating Digital Experiences & Music Events
            </p>
          </div>

          <div class="footer-links">
            <div class="link-group">
              <h4 class="link-title">Navigate</h4>
              <a href="#profile" class="footer-link">About</a>
              <a href="#works" class="footer-link">Works</a>
              <a href="#tools" class="footer-link">Tools</a>
              <a href="#contact" class="footer-link">Contact</a>
            </div>

            <div class="link-group">
              <h4 class="link-title">Connect</h4>
              <a
                href="https://twitter.com/Bell_staymen04"
                target="_blank"
                class="footer-link"
                >Twitter</a
              >
              <a
                href="https://github.com/bellsanct"
                target="_blank"
                class="footer-link"
                >GitHub</a
              >
              <a
                href="https://outermusicroom.site/"
                target="_blank"
                class="footer-link"
                >OuterMusicRoom</a
              >
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p class="copyright">
            © {{ currentYear }} Bell_staymen04. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--bg-dark);
  color: var(--text-light);
  padding: 4rem 0 2rem;
  margin-top: 0;
}

[data-theme="dark"] .footer {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.footer-content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.footer-main {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 4rem;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.brand-name {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--purple-deep);
  font-family: "Crimson Pro", serif;
}

[data-theme="dark"] .brand-name {
  color: var(--purple-deep);
}

.brand-tagline {
  color: var(--text-secondary);
  line-height: 1.6;
  opacity: 0.9;
}

[data-theme="dark"] .brand-tagline {
  color: var(--text-secondary);
  opacity: 1;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.link-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.link-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--lavender-dark);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
  font-family: "Inter", sans-serif;
}

[data-theme="dark"] .link-title {
  color: var(--lavender-light);
}

.footer-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.9375rem;
  transition: color 0.3s ease;
  font-family: "Inter", sans-serif;
}

[data-theme="dark"] .footer-link {
  color: var(--text-secondary);
}

.footer-link:hover {
  color: var(--lavender);
}

[data-theme="dark"] .footer-link:hover {
  color: var(--lavender-light);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid var(--border-light);
  color: var(--text-muted);
  font-size: 0.875rem;
  font-family: "Inter", sans-serif;
}

[data-theme="dark"] .footer-bottom {
  border-top-color: var(--border-medium);
  color: var(--text-muted);
}

.copyright,
.tech {
  margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .footer {
    padding: 3rem 0 1.5rem;
    margin-top: var(--section-gap-sm);
  }

  .footer-main {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer-links {
    grid-template-columns: 1fr;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>
