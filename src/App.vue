<template>
  <div class="viewport">
    <!-- Navbar Componentizada -->
    <Navbar 
      :sections="sections" 
      :currentIndex="currentIndex"
      :backgroundColor="currentIndex % 2 === 0 ? 'white' : 'black'"
      :textColor="currentIndex % 2 === 0 ? 'black' : 'white'"
      @updateIndex="goTo"
    />

   <div
  class="container"
      :style="{ transform: translateY }"
>
      <WelcomePage :active="currentIndex === 0" />
      <CurriculumPage :active="currentIndex === 1" />
      <RecommendationPage :active="currentIndex === 2" />
      <ProjectsPage :active="currentIndex === 3" /> <!-- NOVA SEÇÃO -->
      <SocialMedia :active="currentIndex === 4" /> <!-- NOVA SEÇÃO -->
    </div>

    <!-- Avatar com Chat integrado -->
    <Avatar 
      src="/src/assets/tc.jpg" 
      chatName="Thiago"
    />

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Navbar from './Navbar.vue'
import Avatar from './Avatar.vue'
import WelcomePage from '@/components/sections/welcome_page/WelcomePage.vue'
import CurriculumPage from '@/components/sections/curriculum-page/CurriculumPage.vue'
import RecommendationPage from '@/components/sections/recommendation_page/RecommendationPage.vue'
import ProjectsPage from '@/components/sections/projects_page/ProjectsPage.vue'
import SocialMedia from '@/components/sections/social-media-page/SocialMedia.vue'



const currentIndex = ref(0)
const totalSections = 5
const sections = ['WELCOME', 'CURRICULUM', 'RECOMMENDATIONS', 'FOURTH', 'SOCIAL']

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
  height: 300vh;
  transition: transform 0.8s ease;
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
</style>