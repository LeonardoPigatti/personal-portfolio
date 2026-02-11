<template>
  <section class="section s1">
    <video autoplay muted loop class="background-video">
      <source :src="videoSrc" type="video/mp4" />
      Seu navegador não suporta vídeo.
    </video>

    <!-- Overlay roxa -->
    <div class="overlay"></div>

    <!-- Div cinza central para recomendações -->
    <div class="middle-gray">
      <div class="testimonial">
        <p class="text">"{{ testimonials[currentIndex].message }}"</p>
        <p class="author">- {{ testimonials[currentIndex].author }}</p>
        <p class="role">{{ testimonials[currentIndex].role }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import videoFile from '@/assets/videos/institutional-tech-culture.mp4'

const videoSrc = videoFile

// Lista de recomendações
const testimonials = [
  {
    message: `Leonardo demonstrou grande competência como Quality Assurance Specialist durante seu tempo na Yeb Inteligência de Mercado. Ele tinha um olhar apurado para detalhes e realizava testes rigorosos que asseguravam a alta qualidade dos nossos projetos. Sempre proativo e colaborativo, Leonardo também contribuía para a melhoria contínua dos processos, garantindo entregas consistentes e sem falhas. Recomendo Leonardo para qualquer posição que exija dedicação, precisão e trabalho em equipe`,
    author: 'William Hideki Nishijima Yohei',
    role: 'AI Engineer | Full-Stack Developer | Bachelor’s in Computer Science'
  },
  // Aqui você pode adicionar outras recomendações
]

// Controle do índice atual
const currentIndex = ref(0)

// Função para trocar de recomendação a cada 8 segundos
onMounted(() => {
  setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % testimonials.length
  }, 8000)
})
</script>

<style scoped>
.section {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -3;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #764ba2;
  opacity: 0.22;
  z-index: -2;
}

.middle-gray {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60%;
  max-width: 800px;
  min-height: 200px;
  background-color: rgba(128, 128, 128, 0.5);
  transform: translate(-50%, -50%);
  z-index: -1;
  border-radius: 10px;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: opacity 0.5s ease;
}

.testimonial .text {
  font-size: 1rem;
  margin-bottom: 1rem;
  color: #fff;
}

.testimonial .author {
  font-weight: bold;
  color: #fff;
  margin-bottom: 0.5rem;
}

.testimonial .role {
  font-style: italic;
  color: #eee;
}

.content {
  position: relative;
  z-index: 1;
  color: white;
  text-align: center;
  padding-top: 40vh;
  font-size: 2rem;
}
</style>
