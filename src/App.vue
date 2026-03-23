<script setup>
import { onMounted } from "vue";
import Sidebar from "./components/Sidebar.vue";
import Profile from "./components/Profile.vue";
import EventsGallery from "./components/EventsGallery.vue";
import Works from "./components/Works.vue";
import Tools from "./components/Tools.vue";
import Contact from "./components/Contact.vue";
</script>

<template>
  <div class="app-layout">
    <Sidebar />
    <main class="main-content">
      <Profile />
      <EventsGallery />
      <Works />
      <Tools />
      <Contact />
      <footer class="site-footer">
        <p>&copy; {{ new Date().getFullYear() }} Bell_staymen04. All rights reserved.</p>
      </footer>
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  margin-left: var(--sidebar-width);
  padding: 4rem 4rem 2rem;
  max-width: calc(100% - var(--sidebar-width));
}

.site-footer {
  padding: 3rem 0 2rem;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.875rem;
  border-top: 1px solid var(--border-light);
  margin-top: var(--section-gap);
}

/* Mobile */
@media (max-width: 768px) {
  .app-layout {
    flex-direction: column;
  }

  .main-content {
    margin-left: 0;
    max-width: 100%;
    padding: 6rem 1.5rem 2rem;
  }
}
</style>
