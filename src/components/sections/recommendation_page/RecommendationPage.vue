<template>
  <section class="section s1">
    <video autoplay muted loop class="background-video">
      <source :src="videoSrc" type="video/mp4" />
      Seu navegador não suporta vídeo.
    </video>

    <!-- Overlay roxa um pouco mais forte -->
    <div class="overlay"></div>

    <div class="content">
      dd
    </div>
  </section>
</template>

<script setup>
import videoFile from '@/assets/videos/institutional-tech-culture.mp4'
const videoSrc = videoFile
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
  z-index: -2;
}

/* Overlay roxa um pouco mais forte */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #764ba2;
  opacity: 0.22; /* mais forte, mas ainda sutil */
  z-index: -1;
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
