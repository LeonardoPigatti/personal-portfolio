<template>
  <section class="section s1">
    <div class="content">
      <div class="left-side">
        <img src="/src\assets\tc.jpg" alt="Description" class="profile-image" />
      </div>
      
      <div class="right-side">
        <h1 style="white-space: nowrap; color: black;" :class="{ show: isVisible }">
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
            <div :key="currentSection" class="section-content">
              <h1 class="leo" style="white-space: nowrap;" :class="{ show: isVisible }">
                {{ sections[currentSection].title }}
              </h1>
              <p class="leo2">{{ sections[currentSection].content }}</p>

              <!-- ACCORDION de Experience -->
<div 
  v-if="sections[currentSection].title === 'Professional Experience'" 
  class="experience-accordion"
>
  <div 
    v-for="(exp, idx) in sections[currentSection].experiences" 
    :key="idx"
    class="accordion-item"
  >
    <button 
      class="accordion-header"
      @click="toggleExperience(idx)"
    >
      <span class="accordion-title">{{ exp.company }}</span>
      <span class="accordion-icon">
        {{ openExperience === idx ? '−' : '+' }}
      </span>
    </button>

    <Transition name="accordion">
      <div 
        v-if="openExperience === idx" 
        class="accordion-body"
      >
        <p class="accordion-text">
          {{ exp.text }}
        </p>
      </div>
    </Transition>
  </div>
</div>

              
              <!-- Segunda seção aparece embaixo se existir -->
              <div v-if="sections[currentSection].subtitle" class="second-section">
                <h1 class="leo" style="white-space: nowrap;" :class="{ show: isVisible }">
                  {{ sections[currentSection].subtitle }}
                </h1>
                <ul class="skills-list">
  <li 
    v-for="(skill, index) in sections[currentSection].subcontent" 
    :key="index"
    class="skill-item"
  >
    {{ skill }}
    <span class="tooltip">
      {{ sections[currentSection].tooltips[index] }}
    </span>
  </li>
</ul>
              </div>
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

const openExperience = ref(null)

const toggleExperience = (index) => {
  openExperience.value = openExperience.value === index ? null : index
}

const sections = [
  {
    title: 'Professional Summary',
    content: 'Technology professional with nearly 3 years of experience in B2B products within the agribusiness sector, combining software development, quality assurance and strong proximity to Product, UX and Business teams. Hands on experience in agile environments (Scrum), working from requirements definition and backlog prioritization through delivery and solution validation. Hybrid and technical profile, with strong ability to translate business needs into clear and feasible requirements, support development teams, remove impediments and ensure value driven deliveries.',
    subtitle: 'Core Skills',
    subcontent: [
      'Agile Methodologies (Scrum)',
      'Requirements Analysis',
      'Quality Assurance',
      'Software Development',
      'Cross-functional Collaboration',
      'Product Management',
      'Technical Documentation',
      'Stakeholder Communication'
    ],
    tooltips: [
  'Usei Scrum para organizar sprints e reuniões diárias.',
  'Analisei requisitos para transformar em histórias de usuário.',
  'Fiz testes manuais e automatizados para garantir qualidade.',
  'Fiz testes manuais e automatizados para garantir qualidade.',
  'Fiz testes manuais e automatizados para garantir qualidade.',
  'Fiz testes manuais e automatizados para garantir qualidade.',
  'Fiz testes manuais e automatizados para garantir qualidade.',
  'Fiz testes manuais e automatizados para garantir qualidade.',
  // ...
]
  },
 {
  title: 'Professional Experience',
  content: '',
  experiences: [
    {
      company: 'Yeb Inteligência de Mercado',
      text: 'Atuei no desenvolvimento e validação de soluções B2B no agronegócio, colaborando com Produto, UX e stakeholders para transformar requisitos em entregas de valor.'
    },
    {
      company: 'CRM Soluções',
      text: 'Trabalhei com análise de requisitos, documentação e suporte ao time técnico, garantindo qualidade, alinhamento e consistência nas entregas.'
    }
  ]
},

  {
    title: 'Education',
    content: 'Your educational background...'
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
  justify-content: flex-start;
  padding-left: 14rem;
  background: #ffffff;
}

.content {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  max-width: 1200px;
  gap: 4rem;
}

.left-side {
  flex: 0 0 400px;
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

.info-curriculum {
  height: 810px;
  width: 1050px;
  border-radius: 10px;
  background-color: white;
}

.section-content {
  padding: 20px;
}

.second-section {
  margin-top: 40px;
  margin-left: 40px;
}

.leo {
  color: black;
  display: flex;
  justify-content: center;
  text-transform: uppercase;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

.leo2 {
  color: #333;
  text-align: center;
  text-transform: uppercase;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-size: 1.1rem;
  line-height: 1.6;
  letter-spacing: 1.5px;
  margin-top: 20px;
  padding: 0 15px;
  font-weight: 500;
}

.skills-list {
  list-style: disc; /* coloca as bolinhas */
  padding-left: 20px; /* espaço da bolinha até o texto */
  padding: 0;
  margin: 20px 0 0 0; /* tira centralização e margens extras */
  max-width: 600px;
  margin-left: 20px; /* empurra a lista inteira pra direita */
  text-align: left; /* alinhamento à esquerda */
}

.skill-item {
  position: relative; /* necessário para o tooltip */
  cursor: pointer;
  padding: 8px 0;
}

.tooltip {
  position: absolute;
  left: 62%;
  top: 50%;
  transform: translateY(-50%) translateX(-10px);
  white-space: nowrap;
  background: #fff;
  padding: 6px 12px;
  font-size: 0.9rem;
  font-weight: 500;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.8s ease, transform 0.8s ease; /* mais devagar */

  /* gradient text */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 3s ease infinite;
}

.skill-item:hover .tooltip {
  opacity: 1;
  transform: translateY(-50%) translateX(0);
}




.skills-list li {
  color: #333;
  text-transform: uppercase;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-size: 1.1rem;
  line-height: 1.6;
  letter-spacing: 1.5px;
  padding: 8px 0;
  font-weight: 500;
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
  
  .floating-shapes {
    display: none;
  }
}

.experience-accordion {
  margin-top: 40px;
  padding: 0 40px;
}

.accordion-item {
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 12px;
  margin-bottom: 18px;
  overflow: hidden;
}

.accordion-header {
  width: 100%;
  background: white;
  border: none;
  padding: 18px 20px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
}

.accordion-title {
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  letter-spacing: 1px;
  text-transform: uppercase;

  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 3s ease infinite;
}

.accordion-icon {
  font-size: 1.4rem;
  font-weight: 700;
  color: #333;
}

.accordion-body {
  padding: 16px 20px 20px 20px;
  background: white;
}

.accordion-text {
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-size: 1rem;
  line-height: 1.7;
  letter-spacing: 1px;
  color: #333;
}

/* animação do accordion */
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.6s ease;
}

.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

</style>