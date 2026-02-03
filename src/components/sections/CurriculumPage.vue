<template>
  <section class="section s1">
    <div class="content">
      <div class="left-side">
        <img src="/src\assets\tc.jpg" alt="Description" class="profile-image" />
      </div>
      
      <div class="right-side">
        <h1 style="white-space: nowrap;" :class="{ show: isVisible }">
          Leonardo Vinicius Pigatti<br />
          <span class="gradient-text">Creative Technologist</span>
        </h1>
      </div>

     <div class="right-side">
    <div class="info-curriculum">
      <!-- Navegação -->
      <div class="carousel-nav">
        <button 
          @click="previousSection"
          class="nav-btn"
        >
          ←
        </button>
        <span class="section-indicator">{{ currentSection + 1 }} / {{ sections.length }}</span>
        <button 
          @click="nextSection"
          class="nav-btn"
        >
          →
        </button>
      </div>

      <!-- Conteúdo do carrossel -->
      <Transition name="fade" mode="out-in">
        <div :key="currentSection">
          <h1 class="leo" style="white-space: nowrap;" :class="{ show: isVisible }">
            {{ sections[currentSection].title }}
          </h1>
          <p>{{ sections[currentSection].content }}</p>
        </div>
      </Transition>
    </div>
  </div>
    </div>
  </section>
</template>

<script setup>

import { ref, watch, onMounted, onUnmounted } from 'vue'

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

// Carrossel
const currentSection = ref(0)

const sections = [
  {
    title: 'Professional Summary',
    content: 'Technology professional with nearly 3 years of experience in B2B products within the agribusiness sector, combining software development, quality assurance and strong proximity to Product, UX and Business teams. Hands on experience in agile environments (Scrum), working from requirements definition and backlog prioritization through delivery and solution validation. Hybrid and technical profile, with strong ability to translate business needs into clear and feasible requirements, support development teams, remove impediments and ensure value driven deliveries.'
  },
  {
    title: 'Core Skills',
    content: 'sdsffffdsafsdfdsfds.'
  },
  {
    title: 'Core Skills',
    content: 'aaaa.'
  }
]

const nextSection = () => {
  currentSection.value = (currentSection.value + 1) % sections.length
}

const previousSection = () => {
  currentSection.value = (currentSection.value - 1 + sections.length) % sections.length
}

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
.section.s1 {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Mudado de center para flex-start */
  padding-left: 14rem; /* Adiciona espaçamento da borda */
}

.content {
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Alinha o conteúdo à esquerda */
  width: 100%;
  max-width: 1200px;
  gap: 4rem;
}

.left-side {
  flex: 0 0 400px; /* Tamanho fixo para a imagem */
}

.hero-image {
  width: 100%;
  height: auto;
  border-radius: 12px;
  object-fit: cover;
}

.right-side {
  flex: 1;
}

h1 {
  font-size: 4rem;
  font-weight: 700;
  line-height: 1.2;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}

h1.show {
  opacity: 1;
  transform: translateY(0);
}

.gradient-text {
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@media (max-width: 768px) {
  .content {
    flex-direction: column;
    gap: 2rem;
  }
  
  .left-side {
    flex: 0 0 auto;
  }
  
  h1 {
    font-size: 2.5rem;
  }
}

--


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
  background: linear-gradient(135deg, #0f172a 0%, #020617 100%);
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

.s1 {
  background: #ccc2c2;
}

.info-curriculum{
  height: 810px;
  width: 1050px;
  border-radius: 10px;
  background-color: white;
}

.leo{
  color: red ;
}

.carousel-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.nav-btn {
  background: #333;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  transition: background 0.3s;
}

.nav-btn:hover {
  background: #555;
}

.section-indicator {
  font-size: 14px;
  color: #666;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Responsivo */
@media (max-width: 768px) {
  .floating-shapes {
    display: none;
  }
}
</style>