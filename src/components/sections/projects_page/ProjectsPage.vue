<template>
  <section class="section s1">
    <div class="black-box">
      <button class="nav left" @click="prev">‹</button>

      <div class="carousel">
        <div
          class="track"
          :style="{ transform: `translateX(-${current * 100}%)` }"
        >
          <div class="slide" v-for="(item, index) in images" :key="index">
            <img :src="item.src" :alt="item.title" />

            <p class="caption">{{ item.title }}</p>
          </div>
        </div>
      </div>

      <button class="nav right" @click="next">›</button>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const images = [
  {
    src: "https://picsum.photos/id/1015/2000/1200",
    title: "Montanhas e céu limpo",
  },
  {
    src: "https://picsum.photos/id/1025/2000/1200",
    title: "Cachorro olhando pra câmera",
  },
  {
    src: "https://picsum.photos/id/1035/2000/1200",
    title: "Paisagem urbana",
  },
  {
    src: "https://picsum.photos/id/1045/2000/1200",
    title: "Estrada no meio do nada",
  },
  {
    src: "https://picsum.photos/id/1055/2000/1200",
    title: "Natureza e água",
  },
];

const current = ref(0);

const next = () => {
  current.value = (current.value + 1) % images.length;
};

const prev = () => {
  current.value = (current.value - 1 + images.length) % images.length;
};
</script>

<style scoped>
.section {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12vw;
  position: relative;
  overflow: hidden;
}

.s1 {
  background: #ffffff;
}

.black-box {
  width: 3500px;
  height: 1100px;
  background: #000;
  position: relative;
  overflow: hidden;
  border-radius: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
}

/* carrossel MENOR e centralizado */
.carousel {
  width: 75%;
  height: 75%;
  overflow: hidden;
  border-radius: 20px;
}

/* track deslizando */
.track {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.6s ease;
}

/* cada slide ocupa 100% */
.slide {
  min-width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

/* imagem */
.slide img {
  width: 100%;
  height: 85%;
  object-fit: cover;
  border-radius: 20px;
}

/* texto embaixo */
.caption {
  color: white;
  font-size: 26px;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin: 0;
  text-align: center;
}

/* botões */
.nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  font-size: 45px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
  z-index: 10;
}

.nav:hover {
  background: rgba(255, 255, 255, 0.35);
}

.left {
  left: 30px;
}

.right {
  right: 30px;
}
</style>
