<template>
  <section class="section s1">
    <!-- Vídeo de fundo -->
    <video autoplay muted loop class="background-video">
      <source :src="videoSrc" type="video/mp4" />
      Seu navegador não suporta vídeo.
    </video>

    <!-- Overlay roxa -->
    <div class="overlay"></div>

    <!-- Conteúdo central -->
    <div class="content-wrapper">
      <!-- Frase de destaque -->
      <h2 class="highlight-text">
        O que nossos clientes e colegas dizem sobre nós
      </h2>

      <!-- Cards de depoimentos -->
      <div class="cards-container">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="testimonial-card"
        >
          <div class="avatar">
            <span v-if="!testimonial.photo">{{ getInitials(testimonial.author) }}</span>
            <img v-else :src="testimonial.photo" alt="Foto do autor" />
          </div>
          <div class="card-content">
            <p class="card-text">"{{ testimonial.shortMessage }}"</p>
            <p class="card-author">{{ testimonial.author }}</p>
            <p class="card-role">{{ testimonial.role }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import videoFile from '@/assets/videos/institutional-tech-culture.mp4'

const videoSrc = videoFile

const testimonials = [
  {
    author: 'William Hideki Nishijima Yohei',
    role: 'AI Engineer | Full-Stack Developer',
    shortMessage: 'Leonardo é extremamente detalhista e garante alta qualidade em tudo que faz.',
    photo: null // coloque link de foto se tiver, ou null para iniciais
  },
  {
    author: 'Maria Silva',
    role: 'Product Manager',
    shortMessage: 'Trabalhar com Leonardo foi incrível; sempre proativo e colaborativo.',
    photo: null
  },
  {
    author: 'Carlos Oliveira',
    role: 'UX Designer',
    shortMessage: 'Recomendo Leonardo para qualquer projeto que exija dedicação e precisão.',
    photo: null
  }
]

const getInitials = (name) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
}
</script>

<style scoped>
.section {
  position: relative;
  width: 100%;
  min-height: 100vh;
  padding: 4rem 2rem;
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
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  opacity: 0.3;
  z-index: -2;
}

.content-wrapper {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.highlight-text {
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 3rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}

.testimonial-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border-radius: 1rem;
  padding: 2rem;
  max-width: 300px;
  flex: 1 1 250px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.testimonial-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #764ba2;
  color: #fff;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  margin: 0 auto 1rem auto;
  overflow: hidden;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-content {
  color: #fff;
}

.card-text {
  font-size: 1rem;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.card-author {
  font-weight: bold;
  margin-bottom: 0.3rem;
}

.card-role {
  font-style: italic;
  font-size: 0.85rem;
  color: #ddd;
}
</style>
