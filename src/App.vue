<template>
  <div class="viewport">
    <div
      class="container"
      :style="{ transform: translateY }"
    >
      <WelcomePage :active="currentIndex === 0" />

      
        <CurriculumPage :active="currentIndex === 1" />
      

      <section class="section s3">
        <h1>Seção 3</h1>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import WelcomePage from '@/components/sections/welcome_page/WelcomePage.vue'
import CurriculumPage from '@/components/sections/curriculum-page/CurriculumPage.vue'

/**
 * ESTADO
 * currentIndex controla qual "página/seção" está ativa
 */
const currentIndex = ref(0)
const totalSections = 3

/**
 * CONTROLE DE ANIMAÇÃO
 * evita múltiplos scrolls durante a transição
 */
let isAnimating = false
const ANIMATION_TIME = 800 // ms (igual ao CSS)

/**
 * MOVIMENTO DO CONTAINER
 * cada seção ocupa 100vh
 */
const translateY = computed(() => {
  return `translateY(-${currentIndex.value * 100}vh)`
})

/**
 * NAVEGAÇÃO
 */
function goNext() {
  if (isAnimating) return
  if (currentIndex.value >= totalSections - 1) return

  isAnimating = true
  currentIndex.value++

  setTimeout(() => {
    isAnimating = false
  }, ANIMATION_TIME)
}

function goPrev() {
  if (isAnimating) return
  if (currentIndex.value <= 0) return

  isAnimating = true
  currentIndex.value--

  setTimeout(() => {
    isAnimating = false
  }, ANIMATION_TIME)
}

/**
 * INTERCEPTAÇÃO DO SCROLL
 */
function onWheel(event) {
  event.preventDefault()

  if (event.deltaY > 0) {
    goNext()
  } else {
    goPrev()
  }
}

function onKeydown(event) {
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    goNext()
  }

  if (event.key === 'ArrowUp') {
    event.preventDefault()
    goPrev()
  }
}

/**
 * CICLO DE VIDA
 */
onMounted(() => {
  window.addEventListener('wheel', onWheel, { passive: false })
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('wheel', onWheel)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<style>
/* RESET */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* VIEWPORT FIXO */
.viewport {
  height: 100vh;
  overflow: hidden;
}

/* CONTAINER QUE SE MOVE */
.container {
  height: 300vh; /* 3 seções */
  transition: transform 0.8s ease;
}

/* SEÇÕES */
.section {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.section h1 {
  font-size: 64px;
  color: white;
  font-family: sans-serif;
}

/* CORES SÓ PRA VISUALIZAR */
.s2 { background: #1e293b; }
.s3 { background: #334155; }
</style>
