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
  background: #ffffff;
  font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

/* caixa principal */
.black-box {
  width: 3500px;
  height: 1100px;

  /* em vez de preto chapado */
  background: #0f0f12;

  position: relative;
  overflow: hidden;
  border-radius: 28px;

  display: flex;
  align-items: center;
  justify-content: center;

  /* mais elegante */
  box-shadow: 0 40px 120px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

/* carrossel */
.carousel {
  width: 78%;
  height: 78%;
  overflow: hidden;
  border-radius: 22px;
}

/* track */
.track {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.6s ease;
}

/* slide */
.slide {
  min-width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
}

/* caption embaixo */
.caption {
  margin: 0;
  text-align: center;

  font-size: 1.1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;

  /* mesmo tom do seu texto */
  color: rgba(255, 255, 255, 0.85);
}

/* layout imagem + texto */
.slide-layout {
  width: 100%;
  height: 85%;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;

  transition: 0.5s ease;
}

/* imagem */
.image-area {
  width: 100%;
  height: 100%;

  cursor: pointer;
  border-radius: 22px;
  overflow: hidden;

  transition: 0.5s ease;
  position: relative;
}

/* overlay sutil com o gradient */
.image-area::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.08) 0%,
    rgba(118, 75, 162, 0.06) 50%,
    rgba(240, 147, 251, 0.05) 100%
  );
  opacity: 0;
  transition: 0.4s ease;
}

.image-area:hover::after {
  opacity: 1;
}

.image-area img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 22px;
}

/* texto direita */
.text-area {
  width: 0;
  opacity: 0;
  overflow: hidden;
  transition: 0.5s ease;
  color: rgba(255, 255, 255, 0.9);
}

/* expandido */
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

/* titulo do repo */
.text-area h2 {
  margin: 0 0 18px 0;

  font-size: 2.4rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.5px;

  /* gradient igual seu tooltip */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 3s ease infinite;
}

/* descrição */
.desc {
  font-size: 1.15rem;
  line-height: 1.6;
  letter-spacing: 1px;
  font-weight: 500;

  margin: 0 0 22px 0;
  color: rgba(255, 255, 255, 0.78);
  text-transform: none;
}

/* meta infos */
.meta p {
  font-size: 1.05rem;
  line-height: 1.6;
  letter-spacing: 1px;
  font-weight: 600;

  margin: 10px 0;
  color: rgba(255, 255, 255, 0.72);
  text-transform: uppercase;
}

/* link */
.repo-link {
  display: inline-block;
  margin-top: 28px;

  font-size: 1.05rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.5px;

  text-decoration: none;

  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 3s ease infinite;

  transition: 0.2s ease;
}

.repo-link:hover {
  filter: brightness(1.2);
}

/* botões */
.nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  width: 72px;
  height: 72px;
  border-radius: 50%;
  border: none;

  cursor: pointer;
  font-size: 48px;

  color: rgba(255, 255, 255, 0.9);

  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);

  display: flex;
  align-items: center;
  justify-content: center;

  transition: 0.25s ease;
  z-index: 10;
}

.nav:hover {
  background: rgba(255, 255, 255, 0.14);
}

.left {
  left: 30px;
}

.right {
  right: 30px;
}

/* loading */
.loading-text {
  color: rgba(255, 255, 255, 0.85);
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 1.2px;
  text-transform: uppercase;
}

@keyframes gradientShift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}
</style>

