<template>
  <section class="section s1">
    <div class="content">
      <h1 :class="{ show: isVisible }">
        I design and build<br />
        <span class="gradient-text">digital experiences</span>
      </h1>
  
      <!-- Canvas para partículas conectadas -->
      <canvas ref="canvasRef" class="particle-canvas"></canvas>

      <!-- Partículas flutuantes no fundo -->
      <div class="particles">
        <span v-for="i in 20" :key="i" class="particle" :style="getParticleStyle(i)"></span>
      </div>

      <!-- Efeito de grade no fundo -->
      <div class="grid-bg"></div>

      <!-- Círculos decorativos -->
      <div class="decorative-circles">
        <div class="circle circle-1"></div>
        <div class="circle circle-2"></div>
        <div class="circle circle-3"></div>
      </div>

      <!-- Formas geométricas flutuantes -->
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
      </div>
    </div>
      <div class="lowpoly-wrapper">
  <GeometricCanvas />
</div>

  </section>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import GeometricCanvas from "/src/components/sections/GeometricCanvas.vue";

const props = defineProps({
  active: {
    type: Boolean,
    required: true
  }
})

const isVisible = ref(false)
const canvasRef = ref(null)
let animationId = null
let particles = []

class Particle {
  constructor(canvas) {
    this.canvas = canvas
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.size = Math.random() * 3 + 1
    this.speedX = Math.random() * 0.5 - 0.25
    this.speedY = Math.random() * 0.5 - 0.25
    this.opacity = Math.random() * 0.5 + 0.3
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY

    if (this.x > this.canvas.width) this.x = 0
    if (this.x < 0) this.x = this.canvas.width
    if (this.y > this.canvas.height) this.y = 0
    if (this.y < 0) this.y = this.canvas.height
  }

  draw(ctx) {
    ctx.fillStyle = `rgba(102, 126, 234, ${this.opacity})`
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

const initCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  // Criar partículas
  particles = []
  const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000))
  
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(canvas))
  }

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Atualizar e desenhar partículas
    particles.forEach(particle => {
      particle.update()
      particle.draw(ctx)
    })

    // Conectar partículas próximas
    particles.forEach((particleA, indexA) => {
      particles.slice(indexA + 1).forEach(particleB => {
        const dx = particleA.x - particleB.x
        const dy = particleA.y - particleB.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 120) {
          ctx.strokeStyle = `rgba(102, 126, 234, ${0.15 * (1 - distance / 120)})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(particleA.x, particleA.y)
          ctx.lineTo(particleB.x, particleB.y)
          ctx.stroke()
        }
      })
    })

    animationId = requestAnimationFrame(animate)
  }

  animate()
}

const handleResize = () => {
  if (canvasRef.value) {
    canvasRef.value.width = window.innerWidth
    canvasRef.value.height = window.innerHeight
  }
}

const getParticleStyle = (index) => {
  const randomX = Math.random() * 100
  const randomY = Math.random() * 100
  const randomDelay = Math.random() * 5
  const randomDuration = 10 + Math.random() * 10
  
  return {
    left: `${randomX}%`,
    top: `${randomY}%`,
    animationDelay: `${randomDelay}s`,
    animationDuration: `${randomDuration}s`
  }
}

watch(
  () => props.active,
  (isActive) => {
    if (isActive) {
      requestAnimationFrame(() => {
        isVisible.value = true
      })
    } else {
      isVisible.value = false
    }
  }
)

onMounted(() => {
  if (props.active) {
    requestAnimationFrame(() => {
      isVisible.value = true
    })
  }
  
  initCanvas()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.section {
  height: 100vh;
  display: flex;
  align-items: center;       
  justify-content: flex-start;
  padding: 0 10vw;
  position: relative;
  overflow: hidden;
}

.content {
  position: relative;
  z-index: 2;
}

/* Canvas para partículas conectadas */
.particle-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

/* Grade de fundo animada */
.grid-bg {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: gridMove 20s linear infinite;
  opacity: 0.5;
}

@keyframes gridMove {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(50px, 50px);
  }
}

/* Partículas flutuantes */
.particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  animation: float linear infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) translateX(50px);
    opacity: 0;
  }
}

/* Formas geométricas flutuantes */
.floating-shapes {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.shape {
  position: absolute;
  opacity: 0.1;
  animation: floatShape 20s ease-in-out infinite;
}

.shape-1 {
  width: 100px;
  height: 100px;
  border: 2px solid #667eea;
  border-radius: 20px;
  top: 20%;
  right: 15%;
  animation-delay: 0s;
  transform: rotate(45deg);
}

.shape-2 {
  width: 80px;
  height: 80px;
  border: 2px solid #764ba2;
  top: 60%;
  right: 25%;
  animation-delay: 3s;
}

.shape-3 {
  width: 120px;
  height: 120px;
  border: 2px solid #f093fb;
  border-radius: 50%;
  top: 15%;
  right: 35%;
  animation-delay: 6s;
}

.shape-4 {
  width: 60px;
  height: 60px;
  border: 2px solid #667eea;
  border-radius: 10px;
  top: 70%;
  right: 10%;
  animation-delay: 9s;
  transform: rotate(30deg);
}

@keyframes floatShape {
  0%, 100% {
    transform: translateY(0) translateX(0) rotate(0deg);
  }
  25% {
    transform: translateY(-30px) translateX(20px) rotate(90deg);
  }
  50% {
    transform: translateY(-60px) translateX(0) rotate(180deg);
  }
  75% {
    transform: translateY(-30px) translateX(-20px) rotate(270deg);
  }
}

/* Círculos decorativos com blur */
.decorative-circles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
  animation: pulse 8s ease-in-out infinite;
}

.circle-1 {
  width: 400px;
  height: 400px;
  background: #3b82f6;
  top: -200px;
  right: -100px;
  animation-delay: 0s;
}

.circle-2 {
  width: 350px;
  height: 350px;
  background: #8b5cf6;
  bottom: -150px;
  left: -100px;
  animation-delay: 2s;
}

.circle-3 {
  width: 300px;
  height: 300px;
  background: #ec4899;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 4s;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1) translate(0, 0);
    opacity: 0.15;
  }
  50% {
    transform: scale(1.2) translate(20px, 20px);
    opacity: 0.25;
  }
}

/* Título com efeito gradiente */
h1 {
  font-size: clamp(48px, 6vw, 72px);
  line-height: 1.1;
  color: white;
  font-family: sans-serif;
  font-weight: 600;
  opacity: 0;
  transform: translateX(-60px);
  transition: transform 1s ease, opacity 1s ease;
}

h1.show {
  opacity: 1;
  transform: translateX(0);
}

.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* Parágrafo */
p {
  margin-top: 24px;
  font-size: 18px;
  line-height: 1.6;
  color: #cbd5e1;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease;
  transition-delay: 0.3s;
}

p.show {
  opacity: 1;
  transform: translateY(0);
}

.s1 {
  background: #000000;
}

/* Responsivo */
@media (max-width: 768px) {
  .floating-shapes {
    display: none;
  }
}

.lowpoly-wrapper {
  position: absolute;
  top: 25%;          /* centraliza verticalmente */
  right:40vw;       /* distância do lado direito */
  transform: translateY(-50%); /* ajuste perfeito vertical */
  pointer-events: none; /* não interfere em cliques */
  z-index: 2;        /* acima do fundo mas abaixo do texto */
  
  width: 220px;      /* tamanho do LowPolyAnimation */
  height: 220px;
}

</style>