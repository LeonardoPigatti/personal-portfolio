<template>
  <section class="section">

    <!-- VIDEO -->
    <video autoplay muted loop playsinline class="background-video">
      <source src="@/assets/videos/institutional-tech-culture.mp4" type="video/mp4" />
    </video>

    <!-- OVERLAY -->
    <div class="overlay"></div>

    <!-- SETA -->
    <div v-if="!showProjects" class="scroll-indicator" @click="revealProjects">
      
  <span>↓</span>

    </div>

    <!-- BLACK BOX -->
    <div v-if="showProjects" class="black-box">

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
          <div
            v-else
            class="slide"
            v-for="repo in repos"
            :key="repo.id"
          >
            <div class="slide-layout" :class="{ expanded }">

              <!-- IMAGEM -->
              <div class="image-area" @click="toggleExpanded">
                <img :src="repo.image" :alt="repo.name" />
              </div>

              <!-- TEXTO -->
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
const showProjects = ref(false)

const revealProjects = () => {
  showProjects.value = true

  setTimeout(() => {
    document.querySelector(".black-box")?.scrollIntoView({
      behavior: "smooth",
      block: "center"
    })
  }, 100)
}

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

/* SETA */
.scroll-indicator {
  position: absolute;
  bottom: 1200px;
  left: 50%;
  transform: translateX(-50%);

  border: none;
  cursor: pointer;
  font-size: 2.2rem;
  font-weight: 700;

  width: 55px;
  height: 55px;
  border-radius: 999px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: linear-gradient(
    160deg,
    #ffffff 0%,
    #f4f2f8 35%,
    #e6e1f0 65%,
    #d4cde3 100%
  );

  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);

  transition: 0.25s ease;
  animation: pulse 1.6s infinite;
}


.scroll-indicator span {
  background: linear-gradient(
    135deg,
    #1e2a78 0%,
    #2b1055 50%,
    #4a044e 100%
  );

  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}


.scroll-indicator:hover {
  transform: translateX(-50%) scale(1.07);
}


@keyframes pulse {
  0% {
    transform: translateX(-50%) translateY(0);
    opacity: 0.7;
  }
  50% {
    transform: translateX(-50%) translateY(8px);
    opacity: 1;
  }
  100% {
    transform: translateX(-50%) translateY(0);
    opacity: 0.7;
  }
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

animation: fadeSlideDown 1.6s cubic-bezier(0.12, 0.8, 0.25, 1) forwards;
transform: translateY(-30px);

}

@keyframes fadeSlideDown {
  from { 
    opacity: 0; 
    transform: translateY(-60px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
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
  gap: 50px;
  transition: 0.5s ease;
}

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

.slide-layout.expanded .image-area {
  width: 55%;
}

.text-area {
  width: 0;
  opacity: 0;
  overflow: hidden;
  transition: 0.5s ease;
  color: white;
}

.slide-layout.expanded .text-area {
  width: 45%;
  opacity: 1;
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
