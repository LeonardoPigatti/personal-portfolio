<template>
  <div class="hero">
    <div class="left-side">
      <div class="profile-wrap" @click="flipImage">
        <img 
          :src="currentImage" 
          alt="Profile" 
          class="profile-image"
          :class="{ flipping: isFlipping }"
        />
      </div>
    </div>
    <div class="hero-title">
      <h1 :class="{ show: isVisible }">
        <span style="color: black;" class="line name nowrap">Leonardo Vinicius Pigatti</span><br />
        <span class="line l1 nowrap">
          <span class="gradient-text hoverable">Creative Technologist</span>
        </span><br />
        <span class="line l2 nowrap">
          <span class="gradient-text hoverable">UX Designer</span>
        </span><br />
        <span class="line l3 nowrap">
          <span class="gradient-text hoverable">Builder</span>
        </span>
      </h1>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  isVisible: Boolean,
})

const images = [
  '/src/assets/tc.jpg',
  '/src/assets/fp.jpg' // adicione o caminho da segunda imagem aqui
]

const currentImageIndex = ref(0)
const isFlipping = ref(false)

const currentImage = computed(() => images[currentImageIndex.value])

const flipImage = () => {
  if (isFlipping.value) return // evita cliques durante a animação
  
  isFlipping.value = true
  
  // troca a imagem no meio da animação (quando está de lado)
  setTimeout(() => {
    currentImageIndex.value = (currentImageIndex.value + 1) % images.length
  }, 300) // metade da duração da animação
  
  // remove a classe após a animação
  setTimeout(() => {
    isFlipping.value = false
  }, 600)
}
</script>

<style scoped>
.hero {
  display: flex;
  align-items: center;
  gap: 4rem;
}

.left-side {
  flex: 0 0 clamp(320px, 40vw, 660px);
  transform: translateY(80px);
}

.profile-image {
  width: 100%;
  height: auto;
  border-radius: 12px;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
  cursor: pointer;
}

.profile-image:hover:not(.flipping) {
  transform: scale(1.07);
}

.profile-image.flipping {
  animation: flipHorizontal 0.6s ease-in-out;
}

@keyframes flipHorizontal {
  0% {
    transform: rotateY(0deg) scale(1);
  }
  50% {
    transform: rotateY(90deg) scale(1.05);
  }
  100% {
    transform: rotateY(0deg) scale(1);
  }
}

.hero-title {
  flex: 1;
}

h1 {
  font-size: clamp(48px, 6vw, 72px);
  line-height: 1.1;
  font-family: sans-serif;
  font-weight: 600;
  margin: 0;
}

.nowrap {
  white-space: nowrap;
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

.line {
  display: inline-block;
  opacity: 0;
  transform: translateX(-60px);
}

h1.show .line {
  animation: slideInLeft 0.75s ease forwards;
}

h1.show .name {
  animation-delay: 0s;
}

h1.show .l1 {
  animation-delay: 0.45s;
}

h1.show .l2 {
  animation-delay: 0.9s;
}

h1.show .l3 {
  animation-delay: 1.35s;
}

@keyframes slideInLeft {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.hoverable {
  display: inline-block;
  transition: transform 0.25s ease;
  cursor: default;
}

.hoverable:hover {
  transform: scale(1.1);
}

.profile-wrap {
  position: relative;
  width: 100%;
  border-radius: 12px;
  perspective: 1000px; /* importante para o efeito 3D */
}

.profile-wrap::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
  transform: translate(-18px, -18px);
  z-index: -1;
  filter: blur(0px);
  opacity: 0.9;
}
</style>