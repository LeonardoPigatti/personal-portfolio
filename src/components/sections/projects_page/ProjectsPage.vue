<template>
  <section class="section s1">
    <div class="black-box">
      <button class="nav left" @click="prev">‹</button>

      <div class="carousel">
        <div
          class="track"
          :style="{ transform: `translateX(-${current * 100}%)` }"
        >
          <!-- LOADING -->
          <div v-if="loading" class="slide">
            <p class="loading-text">Carregando projetos do GitHub...</p>
          </div>

          <!-- SLIDES -->
          <div v-else class="slide" v-for="(repo, index) in repos" :key="repo.id">
            <div class="slide-layout" :class="{ expanded: expanded }">
              <!-- IMAGEM -->
              <div class="image-area" @click="toggleExpanded">
                <img :src="repo.image" :alt="repo.name" />
              </div>

              <!-- TEXTO DIREITA -->
              <div class="text-area">
                <h2>{{ repo.name }}</h2>

                <p class="desc">
                  {{ repo.description || "Sem descrição ainda." }}
                </p>

                <div class="meta">
                  <p><b>Linguagem:</b> {{ repo.language || "Não definida" }}</p>
                  <p><b>Stars:</b> ⭐ {{ repo.stargazers_count }}</p>
                  <p><b>Forks:</b> 🍴 {{ repo.forks_count }}</p>
                </div>

                <a class="repo-link" :href="repo.html_url" target="_blank">
                  Ver no GitHub →
                </a>
              </div>
            </div>

            <!-- NOME EMBAIXO -->
            <p class="caption">{{ repo.name }}</p>
          </div>
        </div>
      </div>

      <button class="nav right" @click="next">›</button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

const repos = ref([]);
const loading = ref(true);

const current = ref(0);
const expanded = ref(false);

const next = () => {
  if (!repos.value.length) return;
  current.value = (current.value + 1) % repos.value.length;
};

const prev = () => {
  if (!repos.value.length) return;
  current.value = (current.value - 1 + repos.value.length) % repos.value.length;
};

const toggleExpanded = () => {
  expanded.value = !expanded.value;
};

watch(current, () => {
  expanded.value = false;
});

onMounted(async () => {
  try {
    const res = await fetch("https://api.github.com/users/LeonardoPigatti/repos");
    const data = await res.json();

    // ordena por stars (mais legais primeiro)
    const sorted = data.sort((a, b) => b.stargazers_count - a.stargazers_count);

    // adiciona imagens fake por enquanto
    repos.value = sorted.map((repo, index) => ({
      ...repo,
      image: `https://picsum.photos/seed/${repo.name}/2000/1200`,
    }));
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
});
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

.carousel {
  width: 75%;
  height: 75%;
  overflow: hidden;
  border-radius: 20px;
}

.track {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.6s ease;
}

.slide {
  min-width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

/* texto carregando */
.loading-text {
  color: white;
  font-size: 28px;
  font-weight: 600;
  opacity: 0.9;
}

/* caption embaixo */
.caption {
  color: white;
  font-size: 26px;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin: 0;
  text-align: center;
}

/* layout do slide (imagem + texto) */
.slide-layout {
  width: 100%;
  height: 85%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  transition: 0.5s ease;
}

/* área da imagem */
.image-area {
  width: 100%;
  height: 100%;
  transition: 0.5s ease;
  cursor: pointer;
  border-radius: 20px;
  overflow: hidden;
}

.image-area img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
}

/* texto direita */
.text-area {
  width: 0;
  opacity: 0;
  overflow: hidden;
  transition: 0.5s ease;
  color: white;
}

/* QUANDO EXPANDIDO */
.slide-layout.expanded {
  justify-content: flex-start;
}

.slide-layout.expanded .image-area {
  width: 55%;
  height: 100%;
}

.slide-layout.expanded .text-area {
  width: 45%;
  opacity: 1;
  padding-right: 10px;
}

/* texto */
.text-area h2 {
  font-size: 40px;
  margin: 0 0 20px 0;
  font-weight: 800;
}

.desc {
  font-size: 22px;
  line-height: 1.6;
  margin: 0 0 25px 0;
  opacity: 0.9;
}

.meta p {
  font-size: 20px;
  margin: 10px 0;
  opacity: 0.9;
}

.repo-link {
  display: inline-block;
  margin-top: 30px;
  font-size: 22px;
  font-weight: 700;
  color: white;
  text-decoration: none;
  opacity: 0.9;
  transition: 0.2s;
}

.repo-link:hover {
  opacity: 1;
  text-decoration: underline;
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
