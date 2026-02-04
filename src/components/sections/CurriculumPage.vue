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

    <!-- TÍTULO -->
    <h1 class="leo" style="white-space: nowrap;" :class="{ show: isVisible }">
      {{ sections[currentSection].title }}
    </h1>

    <!-- TEXTO NORMAL (só aparece se existir) -->
    <p v-if="sections[currentSection].content" class="leo2">
      {{ sections[currentSection].content }}
    </p>

    <!-- EXPERIENCE (accordion) -->
    <div
      v-if="sections[currentSection].type === 'experience'"
      class="experience-accordion"
    >
      <div
        v-for="(exp, idx) in sections[currentSection].experiences"
        :key="idx"
        class="accordion-item"
      >
        <button class="accordion-header" @click="toggleExperience(idx)">
          <span
            class="accordion-title"
            :class="{ open: openExperience === idx }"
          >
            {{ exp.company }}
          </span>

          <span class="accordion-icon">
            {{ openExperience === idx ? '−' : '+' }}
          </span>
        </button>

        <Transition name="accordion">
          <div v-if="openExperience === idx" class="accordion-body">
            <div
              v-for="(pos, pIndex) in exp.positions"
              :key="pIndex"
              class="position-block"
            >
              <p class="accordion-role">{{ pos.role }}</p>

              <ul class="accordion-list">
                <li v-for="(b, i) in pos.bullets" :key="i">
                  {{ b }}
                </li>
              </ul>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <!-- EDUCATION -->
<div
  v-if="sections[currentSection].type === 'education'"
  class="education-block"
>
  <div
    v-for="(edu, i) in sections[currentSection].items"
    :key="i"
    class="education-item"
  >
    <p class="edu-degree">{{ edu.degree }}</p>
    <p class="edu-school">{{ edu.school }} | {{ edu.period }}</p>
  </div>
</div>

<!-- LANGUAGES -->
<div
  v-if="sections[currentSection].type === 'languages'"
  class="languages-block"
>
  <div
    v-for="(lang, i) in sections[currentSection].items"
    :key="i"
    class="language-item"
  >
    <p class="lang-name">{{ lang.language }}</p>
    <p class="lang-level">{{ lang.level }}</p>
  </div>
</div>




    <!-- SKILLS (só aparece se existir subtitle) -->
<!-- SEGUNDA SEÇÃO (Core Skills / Courses) -->
<div v-if="sections[currentSection].subtitle" class="second-section">
  <h1 class="leo" style="white-space: nowrap;" :class="{ show: isVisible }">
    {{ sections[currentSection].subtitle }}
  </h1>

  <!-- SUMMARY: CORE SKILLS -->
  <ul
  v-if="sections[currentSection].type === 'summary' || sections[currentSection].type === 'languages'"
  class="skills-list"
>
<li
  v-for="(skill, index) in sections[currentSection].subcontent"
  :key="index"
  class="skill-item"
>
  {{ skill }}

  <!-- Tooltip só no Summary -->
  <span
    v-if="sections[currentSection].type === 'summary' && sections[currentSection].tooltips?.[index]"
    class="tooltip"
  >
    {{ sections[currentSection].tooltips[index] }}
  </span>
</li>

  </ul>

  <!-- EDUCATION: COURSES -->
  <ul v-else-if="sections[currentSection].type === 'education'" class="courses-list">
    <li
      v-for="(course, index) in sections[currentSection].courses"
      :key="index"
      class="course-item"
      @click="openCourseGallery(course)"
    >
      {{ course.title }}
    </li>
  </ul>
</div>

  </div>
</Transition>

        </div>
      </div>
    </div>
    <!-- MODAL GALERIA CERTIFICADOS -->
<Transition name="modal">
  <div v-if="galleryOpen" class="gallery-overlay" @click.self="closeGallery">
    <div class="gallery-modal">

      <div class="gallery-header">
        <h2 class="gallery-title">{{ selectedCourse?.title }}</h2>
        <button class="gallery-close" @click="closeGallery">✕</button>
      </div>

      <div v-if="selectedCourse?.certificates?.length" class="gallery-body">

        <button class="gallery-nav left" @click="prevCertificate">‹</button>

        <img
          :src="selectedCourse.certificates[currentCertificate]"
          class="gallery-image"
          alt="Certificate"
        />

        <button class="gallery-nav right" @click="nextCertificate">›</button>

      </div>

      <div v-else class="gallery-empty">
        No certificates uploaded yet.
      </div>

      <!-- thumbnails -->
      <div
        v-if="selectedCourse?.certificates?.length > 1"
        class="gallery-thumbs"
      >
        <img
          v-for="(img, i) in selectedCourse.certificates"
          :key="i"
          :src="img"
          class="thumb"
          :class="{ active: i === currentCertificate }"
          @click="currentCertificate = i"
        />
      </div>
    </div>
  </div>
</Transition>

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

const galleryOpen = ref(false)
const selectedCourse = ref(null)
const currentCertificate = ref(0)

const openCourseGallery = (course) => {
  selectedCourse.value = course
  currentCertificate.value = 0
  galleryOpen.value = true
}

const closeGallery = () => {
  galleryOpen.value = false
  selectedCourse.value = null
  currentCertificate.value = 0
}

const nextCertificate = () => {
  const total = selectedCourse.value.certificates.length
  currentCertificate.value = (currentCertificate.value + 1) % total
}

const prevCertificate = () => {
  const total = selectedCourse.value.certificates.length
  currentCertificate.value =
    (currentCertificate.value - 1 + total) % total
}


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
    type: "summary",
    title: "Professional Summary",
    content:
      "Technology professional with nearly 3 years of experience in B2B products within the agribusiness sector, combining software development, quality assurance and strong proximity to Product, UX and Business teams. Hands on experience in agile environments (Scrum), working from requirements definition and backlog prioritization through delivery and solution validation. Hybrid and technical profile, with strong ability to translate business needs into clear and feasible requirements, support development teams, remove impediments and ensure value driven deliveries.",
    subtitle: "Core Skills",
    subcontent: [
      "Agile Methodologies (Scrum)",
      "Requirements Analysis",
      "Quality Assurance",
      "Software Development",
      "Cross-functional Collaboration",
      "Product Management",
      "Technical Documentation",
      "Stakeholder Communication",
    ],
    tooltips: [
      "Planned and organized weekly sprints and agile routines.",
      "Translated business needs into clear requirements and user stories.",
      "Implemented tests and validation flows to ensure quality.",
      "Built features and improvements with scalable frontend/backend patterns.",
      "Worked as a bridge between Engineering, Product, UX and stakeholders.",
      "Supported prioritization and value-driven delivery decisions.",
      "Created technical documentation to improve clarity and alignment.",
      "Kept constant communication with internal and external stakeholders.",
    ],
  },

  {
    type: "experience",
    title: "Professional Experience",
    experiences: [
      {
        company: "Yeb Inteligência de Mercado",
        positions: [
          {
            role: "Full Stack Developer | Jan/2023 – Nov/2025",
            bullets: [
              "Worked on the development of the B2B software Cotagri, participating in scope definition and requirements gathering together with the product team.",
              "Implemented features using Vue.js, Vuex, Vue Router, Node.js, GraphQL and TypeScript, ensuring scalability and maintainability.",
              "Planned and organized weekly sprints, supporting the team in technical prioritization and removal of impediments.",
              "Acted directly as an interface between engineering, product, UX and stakeholders, with frequent contact with enterprise clients such as Cerradinho Bioenergia and Raízen, ensuring technical deliveries aligned with real business needs.",
            ],
          },
          {
            role: "Quality Assurance Specialist | Jul/2024 – Nov/2025",
            bullets: [
              "Implemented and automated tests for the Cotagri and SGF systems, ensuring delivery quality and stability.",
              "Worked closely with product and development teams to create test plans aligned with business requirements.",
              "Acted in risk identification, requirements validation and prevention of production issues.",
              "Actively contributed to the continuous improvement of agile and quality processes.",
            ],
          },
        ],
      },

      {
        company: "CRM Soluções",
        positions: [
          {
            role: "Full Stack Developer | Jun/2021 – Oct/2021",
            bullets: [
              "Worked on cross-functional projects supporting product and engineering teams.",
              "Collaborated on requirement analysis, documentation and delivery validation.",
              "Contributed to process improvements and quality routines in agile environments.",
            ],
          },
        ],
      },
    ],
  },

{
  type: "education",
  title: "Education",
  content: "",
  subtitle: "Courses and Certifications",
courses: [
  {
    title: "Principles and Practices of Project Management – University of São Paulo (USP)",
certificates: [
  "/src/assets/certifications/certs-gp-usp/_1Introdução aos Princípios e Práticas da Gestão De Projetos Certificado de Especialização!_page-0001.jpg",
  "/src/assets/certifications/certs-gp-usp/Gestão de Riscos e de Mudanças em Projetos_page-0001.jpg",
  "/src/assets/certifications/certs-gp-usp/Iniciação e Planejamento de Projetos_page-0001.jpg",
  "/src/assets/certifications/certs-gp-usp/Orçamento e Cronograma de Projetos_page-0001.jpg",
  "/src/assets/certifications/certs-gp-usp/Projeto Aplicado - Introdução a Gestão de Projetos_page-0001.jpg",
],

  },
  {
    title: "Bug Bounty Hunting & Web Security Testing – Udemy",
    certificates: [
      "/src/assets/certifications/bug-bounty/bug-bounty.jpg",
    ],
  },
  {
    title: "Tech Lead: Key Skills and Strategies for Success – Udemy",
    certificates: [
      "/src/assets/certifications/tech-leader-udemy/tech-leader.jpg",
    ],
  },
  {
    title: "Cybersecurity Essentials - Cisco Networking Academy",
    certificates: [
      "/src/assets/certifications/cisco/cisco.jpg",
    ],
  },
  {
    title: "Specialization in Software Design and Architecture - University of Alberta (In Progress)",
    certificates: [],
  },
],

    tooltips: [],
  items: [
    {
      degree: "Bachelor’s Degree in Computer Engineering",
      school: "FHO – Fundação Hermínio Ometto",
      period: "2020 – 2026"
    },
    {
      degree: "Technical Degree in Information Technology",
      school: "ETEC – São Paulo State Technical School",
      period: "2017 – 2019"
    }
  ]
},
{
  type: "languages",
  title: "Languages",
  content: "",
  subtitle: "Technological Languages",
  subcontent: ["TESTE 1", "TESTE 2"],
  items: [
    { language: "Portuguese", level: "Native" },
    { language: "English", level: "Advanced (C1)" },
    { language: "Spanish", level: "Intermediate (B2)" }
  ]
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
  color: #333;
}

.accordion-title.open {
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

.accordion-role {
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #666;
  margin-bottom: 10px;
}

.accordion-list {
  margin: 0;
  padding-left: 20px;
}

.accordion-list li {
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-size: 1rem;
  line-height: 1.7;
  letter-spacing: 0.5px;
  color: #333;
  margin-bottom: 10px;
}

.position-block {
  margin-bottom: 22px;
}

.position-block:last-child {
  margin-bottom: 0;
}

.education-block {
  margin-top: 30px;
  padding: 0 30px;
}

.education-item {
  margin-bottom: 25px;
}

.edu-degree {
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: #222;
  margin-bottom: 6px;
}

.edu-school {
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  color: #666;
  letter-spacing: 1px;
}

.courses-list {
  list-style: disc;
  padding-left: 20px;
  margin: 20px 0 0 20px;
  text-align: left;
}

.course-item {
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-size: 1.05rem;
  line-height: 1.6;
  letter-spacing: 0.8px;
  padding: 8px 0;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  transition: 0.4s ease;
  text-transform: none; /* <- ESSENCIAL */
}

/* hover com gradiente */
.course-item:hover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 3s ease infinite;
}

/* ===== MODAL GALERIA ===== */

.gallery-overlay {
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 20, 0.65);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 30px;
}

.gallery-modal {
  width: min(1100px, 95vw);
  max-height: 90vh;
  background: rgba(255, 255, 255, 0.92);
  border-radius: 22px;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.gallery-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 22px;
  border-bottom: 1px solid rgba(0,0,0,0.08);
}

.gallery-title {
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #222;
  max-width: 90%;
}

.gallery-close {
  border: none;
  background: transparent;
  font-size: 1.4rem;
  cursor: pointer;
  color: #333;
  transition: 0.3s ease;
}

.gallery-close:hover {
  transform: scale(1.1);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.gallery-body {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
}

.gallery-image {
  width: 100%;
  max-width: 860px;
  max-height: 62vh;
  object-fit: contain;
  border-radius: 18px;
  box-shadow: 0 18px 60px rgba(0,0,0,0.15);
}

.gallery-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  cursor: pointer;
  font-size: 2.2rem;
  font-weight: 700;
  width: 55px;
  height: 55px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 12px 40px rgba(0,0,0,0.15);
  transition: 0.25s ease;
}

.gallery-nav:hover {
  transform: translateY(-50%) scale(1.07);
  background: white;
}

.gallery-nav.left {
  left: 18px;
}

.gallery-nav.right {
  right: 18px;
}

.gallery-thumbs {
  display: flex;
  gap: 12px;
  padding: 14px 18px 18px 18px;
  justify-content: center;
  overflow-x: auto;
  border-top: 1px solid rgba(0,0,0,0.08);
}

.thumb {
  height: 70px;
  width: auto;
  border-radius: 12px;
  cursor: pointer;
  opacity: 0.55;
  transition: 0.25s ease;
  box-shadow: 0 10px 30px rgba(0,0,0,0.12);
}

.thumb:hover {
  opacity: 1;
  transform: scale(1.03);
}

.thumb.active {
  opacity: 1;
  outline: 2px solid rgba(118, 75, 162, 0.55);
}

.gallery-empty {
  padding: 50px 20px;
  text-align: center;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-size: 1rem;
  color: #666;
}

/* animação modal */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.35s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.97);
}

.languages-block {
  margin-top: 30px;
  padding: 0 30px;
}

.language-item {
  margin-bottom: 22px;
}

.lang-name {
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-size: 1.05rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: #222;
  margin-bottom: 6px;
}

.lang-level {
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  color: #666;
  letter-spacing: 1px;
}






</style>