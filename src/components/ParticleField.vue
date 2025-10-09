<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref(null)
let animationId = null

onMounted(() => {
  if (!canvas.value) return

  const ctx = canvas.value.getContext('2d')
  const width = canvas.value.width = window.innerWidth
  const height = canvas.value.height = window.innerHeight

  class Particle3D {
    constructor() {
      this.x = Math.random() * width
      this.y = Math.random() * height
      this.z = Math.random() * 1000
      this.vx = (Math.random() - 0.5) * 0.5
      this.vy = (Math.random() - 0.5) * 0.5
      this.vz = Math.random() * 2 + 1
      this.color = Math.random() > 0.5 ? 'rgba(167, 139, 250' : 'rgba(96, 165, 250'
    }

    update() {
      this.x += this.vx
      this.y += this.vy
      this.z -= this.vz

      if (this.z <= 0) {
        this.z = 1000
        this.x = Math.random() * width
        this.y = Math.random() * height
      }

      if (this.x < 0) this.x = width
      if (this.x > width) this.x = 0
      if (this.y < 0) this.y = height
      if (this.y > height) this.y = 0
    }

    draw() {
      const scale = 1000 / this.z
      const x2d = (this.x - width / 2) * scale + width / 2
      const y2d = (this.y - height / 2) * scale + height / 2
      const size = (1000 - this.z) / 1000 * 3

      const opacity = (1000 - this.z) / 1000 * 0.5

      ctx.beginPath()
      ctx.arc(x2d, y2d, size, 0, Math.PI * 2)
      ctx.fillStyle = `${this.color}, ${opacity})`
      ctx.fill()

      // Draw connection lines
      ctx.shadowBlur = 8
      ctx.shadowColor = `${this.color}, ${opacity * 0.5})`
      ctx.fill()
      ctx.shadowBlur = 0
    }
  }

  const particles = Array.from({ length: 80 }, () => new Particle3D())

  const animate = () => {
    ctx.fillStyle = 'rgba(10, 14, 26, 0.1)'
    ctx.fillRect(0, 0, width, height)

    particles.forEach(particle => {
      particle.update()
      particle.draw()
    })

    animationId = requestAnimationFrame(animate)
  }

  animate()

  const handleResize = () => {
    canvas.value.width = window.innerWidth
    canvas.value.height = window.innerHeight
  }

  window.addEventListener('resize', handleResize)

  onUnmounted(() => {
    if (animationId) cancelAnimationFrame(animationId)
    window.removeEventListener('resize', handleResize)
  })
})
</script>

<template>
  <canvas ref="canvas" class="particle-canvas"></canvas>
</template>

<style scoped>
.particle-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  opacity: 0.8;
  mix-blend-mode: screen;
}
</style>
