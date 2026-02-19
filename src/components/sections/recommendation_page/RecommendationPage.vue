<template>
  <section class="section s1">
    <!-- Vídeo -->
    <video autoplay muted loop playsinline class="background-video">
      <source src="@/assets/videos/institutional-tech-culture.mp4" type="video/mp4" />
    </video>

    <!-- Overlay -->
    <div class="overlay"></div>

    <!-- Conteúdo -->
    <div class="black-box">
      <button class="nav left" @click="prev">‹</button>

      <div class="carousel">
        <div
          class="track"
          :style="{ transform: `translateX(-${current * 100}%)` }"
        >
          <div v-if="loading" class="slide">
            <p class="loading-text">Carregando projetos do GitHub...</p>
          </div>

          <div
            v-else
            class="slide"
            v-for="repo in repos"
            :key="repo.id"
          >
            <div class="slide-layout" :class="{ expanded }">
              <div class="image-area" @click="toggleExpanded">
                <img :src="repo.image" :alt="repo.name" />
              </div>

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

                <a
                  class="repo-link"
                  :href="repo.html_url"
                  target="_blank"
                >
                  Ver no GitHub →
                </a>
              </div>
            </div>

            <p v-if="!expanded" class="caption">{{ repo.name }}</p>
          </div>
        </div>
      </div>

      <button class="nav right" @click="next">›</button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from "vue"

const repos = ref([])
const loading = ref(true)
const current = ref(0)
const expanded = ref(false)

const next = () => {
  if (!repos.value.length) return
  current.value = (current.value + 1) % repos.value.length
}

const prev = () => {
  if (!repos.value.length) return
  current.value =
    (current.value - 1 + repos.value.length) % repos.value.length
}

const toggleExpanded = () => {
  expanded.value = !expanded.value
}

watch(current, () => {
  expanded.value = false
})

onMounted(async () => {
  try {
    const res = await fetch(
      "https://api.github.com/users/LeonardoPigatti/repos"
    )
    const data = await res.json()

    const sorted = data
      .filter(r => !r.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)

    repos.value = sorted.map(repo => ({
      ...repo,
      image: `https://picsum.photos/seed/${repo.name}/1600/900`
    }))
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.section {
  position: relative;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* VIDEO */
.background-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -3;
  filter: brightness(0.55) contrast(1.1) saturate(1.15);
}

/* OVERLAY */
.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  opacity: 0.3;
  z-index: -2;
}

/* BLACK BOX */
.black-box {
  position: relative;
  z-index: 2;
  width: 85%;
  max-width: 1400px;
  height: 75vh;

  background: rgba(15, 15, 18, 0.92);
  backdrop-filter: blur(14px);
  border-radius: 28px;

  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: 0 40px 120px rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

/* CAROUSEL */
.carousel {
  width: 85%;
  height: 80%;
  overflow: hidden;
  border-radius: 22px;
}

.track {
  display: flex;
  height: 100%;
  transition: transform 0.6s ease;
}

.slide {
  min-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.slide-layout {
  width: 100%;
  height: 85%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
  transition: 0.5s ease;
}

/* IMAGE */
.image-area {
  width: 100%;
  height: 100%;
  border-radius: 22px;
  overflow: hidden;
  cursor: pointer;
}

.image-area img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* EXPANDED */
.slide-layout.expanded {
  justify-content: flex-start;
}

.slide-layout.expanded .image-area {
  width: 55%;
}

.slide-layout.expanded .text-area {
  width: 45%;
  opacity: 1;
}

/* TEXT */
.text-area {
  width: 0;
  opacity: 0;
  overflow: hidden;
  transition: 0.5s ease;
  color: white;
}

.text-area h2 {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.desc {
  margin-bottom: 20px;
  color: rgba(255, 255, 255, 0.8);
}

.meta p {
  margin: 8px 0;
  font-size: 0.95rem;
}

.repo-link {
  display: inline-block;
  margin-top: 20px;
  font-weight: 700;
  text-decoration: none;
  background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.caption {
  font-weight: 700;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.8);
}

/* NAV */
.nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  font-size: 36px;
  cursor: pointer;
  color: white;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
}

.left { left: 20px; }
.right { right: 20px; }

.loading-text {
  color: white;
  font-weight: 600;
}
</style>
