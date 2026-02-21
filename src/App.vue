<template>
  <div>
    <!-- Tudo que usa position: fixed fica FORA do viewport -->
    <div class="LangSelector-fixed">
      <LangSelector />
    </div>

    <ThemeSelector />

    <Avatar src="/src/assets/tc.jpg" chatName="Leonardo - ChatBot" />

    <!-- Viewport isolado apenas para o scroll por seções -->
    <div class="viewport">
      <Navbar 
        :sections="sections" 
        :currentIndex="currentIndex"
        :backgroundColor="currentIndex % 2 === 0 ? 'white' : 'black'"
        :textColor="currentIndex % 2 === 0 ? 'black' : 'white'"
        @updateIndex="goTo"
      />

      <div class="container" :style="{ transform: translateY }">
        <WelcomePage :active="currentIndex === 0" />
        <CurriculumPage :active="currentIndex === 1" />
        <RecommendationPage :active="currentIndex === 2" />

        <!-- Última seção: position relative para o Footer se ancorar -->
        <div class="last-section">
          <SocialMedia :active="currentIndex === 3" />
          <Footer />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Navbar from './Navbar.vue'
import ThemeSelector from './ThemeSelector.vue'
import LangSelector from './LangSelector.vue'
import Avatar from './Avatar.vue'
import Footer from './Footer.vue'
import WelcomePage from '@/components/sections/welcome_page/WelcomePage.vue'
import CurriculumPage from '@/components/sections/curriculum-page/CurriculumPage.vue'
import RecommendationPage from '@/components/sections/recommendation_page/RecommendationPage.vue'
import SocialMedia from '@/components/sections/social-media-page/SocialMedia.vue'

const currentIndex = ref(0)
const totalSections = 4
const sections = ['BOAS-VINDAS', 'SOBRE MIM', 'PROJETOS', 'CONECTE-SE']

let isAnimating = false
const ANIMATION_TIME = 800

const translateY = computed(() => `translateY(-${currentIndex.value * 100}vh)`)

function goNext() {
  if (isAnimating || currentIndex.value >= totalSections - 1) return
  isAnimating = true
  currentIndex.value++
  setTimeout(() => (isAnimating = false), ANIMATION_TIME)
}

function goPrev() {
  if (isAnimating || currentIndex.value <= 0) return
  isAnimating = true
  currentIndex.value--
  setTimeout(() => (isAnimating = false), ANIMATION_TIME)
}

function goTo(index) {
  if (isAnimating || index === currentIndex.value) return
  isAnimating = true
  currentIndex.value = index
  setTimeout(() => (isAnimating = false), ANIMATION_TIME)
}

function onWheel(event) {
  event.preventDefault()
  event.deltaY > 0 ? goNext() : goPrev()
}

function onKeydown(event) {
  if (event.key === 'ArrowDown') { event.preventDefault(); goNext() }
  if (event.key === 'ArrowUp') { event.preventDefault(); goPrev() }
}

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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.viewport {
  height: 100vh;
  overflow: hidden;
}

.container {
  height: 400vh; /* 4 × 100vh */
  transition: transform 0.8s ease;
}

/* Última seção com position relative para o Footer se ancorar no bottom */
.last-section {
  position: relative;
  height: 100vh;
}

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

.s2 { background: #1e293b; }
.s3 { background: #334155; }

.LangSelector-fixed {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 1000;
  width: 60px;
  height: 60px;
}
</style>