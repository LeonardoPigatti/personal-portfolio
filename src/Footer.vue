<template>
  <footer class="footer">
    <canvas ref="canvasRef" class="footer-dust" />

    <div class="footer-line" />

    <div class="footer-inner">
      <div class="footer-brand">
        <span class="footer-name">Leonardo Vinicius Pigatti</span>
      </div>

      <p class="footer-phrase">
        Construindo interfaces que <em>importam</em>.
      </p>

      <p class="footer-copy">
        © {{ year }} — Todos os direitos reservados.
      </p>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const year = new Date().getFullYear()
const canvasRef = ref(null)
let animFrame = null

onMounted(() => {
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')

  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight

  const colors = ['#667eea', '#764ba2', '#f093fb']

  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 0.5,
    color: colors[Math.floor(Math.random() * colors.length)],
    speedX: (Math.random() - 0.5) * 0.4,
    speedY: (Math.random() - 0.5) * 0.4,
    opacity: Math.random() * 0.5 + 0.1,
  }))

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    particles.forEach(p => {
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, '0')
      ctx.fill()
      p.x += p.speedX
      p.y += p.speedY
      if (p.x < 0) p.x = canvas.width
      if (p.x > canvas.width) p.x = 0
      if (p.y < 0) p.y = canvas.height
      if (p.y > canvas.height) p.y = 0
    })
    animFrame = requestAnimationFrame(draw)
  }

  draw()
})

onUnmounted(() => cancelAnimationFrame(animFrame))
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Lato:wght@300;400&display=swap');

.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #0a0a0a;
  padding: 24px 0;
  z-index: 10;
  overflow: hidden;
}

.footer::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  background-size: 180px;
  opacity: 0.35;
  pointer-events: none;
}

/* Canvas de partículas */
.footer-dust {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.footer-line {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #ffffff55, transparent);
  z-index: 1;
}

.footer-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  position: relative;
  z-index: 1;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.footer-name {
  font-family: 'Syne', sans-serif;
  font-weight: 700;
  font-size: 18px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.footer-phrase {
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  font-size: 16px;
  color: #888;
  letter-spacing: 0.04em;
  text-align: center;
}

.footer-phrase em {
  font-style: normal;
  padding-bottom: 1px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 3s ease infinite;
}

.footer-copy {
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  font-size: 16px;
  color: #ffffff;
  letter-spacing: 0.06em;
}
</style>