<template>
  <div class="carousel-wrapper">

    <!-- Ambient glow background -->
    <div class="ambient-glow" :style="glowStyle" />

    <!-- Counter -->
    <div class="slide-counter">
      <span class="counter-current">{{ String(current + 1).padStart(2, '0') }}</span>
      <span class="counter-sep"> / </span>
      <span class="counter-total">{{ String(repos.length).padStart(2, '0') }}</span>
    </div>

    <!-- Progress bar -->
    <div class="progress-track">
      <div
        class="progress-fill"
        :style="{ width: repos.length ? `${((current + 1) / repos.length) * 100}%` : '0%' }"
      />
    </div>

    <!-- Main carousel -->
    <div class="carousel" ref="carouselRef">
      <div
        class="track"
        :style="{ transform: `translateX(-${current * 100}%)` }"
      >
        <div v-if="loading" class="slide slide--loading">
          <div class="loading-ring" />
          <p class="loading-label">Buscando repositórios</p>
        </div>

        <div v-else-if="error" class="slide slide--loading">
          <p class="loading-label">{{ error }}</p>
        </div>

        <ProjectSlide
          v-else
          v-for="(repo, i) in repos"
          :key="repo.id"
          :repo="repo"
          :expanded="expanded"
          :active="i === current"
          @toggle="toggleExpanded"
        />
      </div>
    </div>

    <!-- Navigation -->
    <button class="nav nav--prev" @click="prev" :disabled="loading">
      <span class="nav-arrow">←</span>
      <span class="nav-label">Anterior</span>
    </button>

    <button class="nav nav--next" @click="next" :disabled="loading">
      <span class="nav-label">Próximo</span>
      <span class="nav-arrow">→</span>
    </button>

    <!-- Dot indicators -->
    <div class="dots" v-if="!loading">
      <button
        v-for="(_, i) in repos"
        :key="i"
        class="dot"
        :class="{ 'dot--active': i === current }"
        @click="goTo(i)"
      />
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue"
import ProjectSlide from "@/components/sections/recommendation_page/ProjectSlide.vue"
import { projects as staticProjects } from "@/data/Projects.js"

const repos = ref([])
const loading = ref(true)
const error = ref(null)
const current = ref(0)
const expanded = ref(false)

// Paleta de cores para glow ambiente por slide
const glowColors = [
  "118, 75, 162",
  "102, 126, 234",
  "240, 147, 251",
  "67, 206, 162",
  "238, 156, 167",
  "85, 98, 212",
]

const glowStyle = computed(() => {
  const color = glowColors[current.value % glowColors.length]
  return {
    background: `radial-gradient(ellipse 60% 50% at 50% 50%, rgba(${color}, 0.18) 0%, transparent 70%)`,
  }
})

const next = () => {
  if (!repos.value.length) return
  current.value = (current.value + 1) % repos.value.length
}

const prev = () => {
  if (!repos.value.length) return
  current.value = (current.value - 1 + repos.value.length) % repos.value.length
}

const goTo = (i) => {
  current.value = i
}

const toggleExpanded = () => {
  expanded.value = !expanded.value
}

watch(current, () => {
  expanded.value = false
})

onMounted(async () => {
  try {
    // Busca todos os repos públicos do usuário na API do GitHub
    const res = await fetch("https://api.github.com/users/LeonardoPigatti/repos?per_page=100")

    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)

    const apiData = await res.json()

    // Cria um Map para lookup rápido por nome
    const apiMap = new Map(apiData.map(repo => [repo.name, repo]))

    // Monta a lista final na ordem definida em projects.js
    // Apenas projetos que existem tanto no arquivo estático quanto na API são exibidos
    const merged = staticProjects.reduce((acc, staticProject) => {
      const apiRepo = apiMap.get(staticProject.repoName)

      if (!apiRepo) {
        // Repo não encontrado na API (pode ser privado ou nome errado) — ignora
        console.warn(`[ProjectCarousel] Repo "${staticProject.repoName}" não encontrado na API do GitHub.`)
        return acc
      }

      acc.push({
        // Todos os campos da API (id, stars, forks, linguagem, url, etc.)
        ...apiRepo,
        // Sobrescreve apenas imagem e descrição com os dados estáticos
        image: staticProject.image,
        description: staticProject.description,
      })

      return acc
    }, [])

    repos.value = merged
  } catch (err) {
    console.error("[ProjectCarousel]", err)
    error.value = "Não foi possível carregar os projetos."
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

/* ── WRAPPER ─────────────────────────────────────── */
.carousel-wrapper {
  position: relative;
  width: 92%;
  max-width: 1520px;
  height: 82vh;
  min-height: 580px;

  background: rgba(8, 8, 12, 0.85);
  backdrop-filter: blur(24px) saturate(1.4);
  border-radius: 36px;
  border: 1px solid rgba(255, 255, 255, 0.07);

  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow:
    0 0 0 1px rgba(255,255,255,0.04),
    0 60px 160px rgba(0, 0, 0, 0.7),
    inset 0 1px 0 rgba(255,255,255,0.06);

  overflow: hidden;
  font-family: 'Syne', sans-serif;

  animation: revealBox 1.2s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes revealBox {
  from { opacity: 0; transform: translateY(40px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0)   scale(1);    }
}

/* ── AMBIENT GLOW ────────────────────────────────── */
.ambient-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  transition: background 1s ease;
  z-index: 0;
}

/* ── COUNTER ─────────────────────────────────────── */
.slide-counter {
  position: absolute;
  top: 36px;
  left: 48px;
  font-family: 'DM Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  z-index: 10;
  display: flex;
  align-items: baseline;
  gap: 2px;
}

.counter-current {
  font-size: 1.5rem;
  font-weight: 500;
  color: #fff;
  line-height: 1;
}

.counter-sep,
.counter-total {
  color: rgba(255,255,255,0.3);
  font-size: 0.8rem;
}

/* ── PROGRESS BAR ────────────────────────────────── */
.progress-track {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: rgba(255,255,255,0.06);
  z-index: 10;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 12px color-mix(in srgb, var(--color-accent) 60%, transparent);
}

/* ── CAROUSEL ────────────────────────────────────── */
.carousel {
  position: relative;
  z-index: 1;
  width: calc(100% - 200px);
  height: calc(100% - 100px);
  overflow: hidden;
  border-radius: 24px;
}

.track {
  display: flex;
  height: 100%;
  transition: transform 0.7s cubic-bezier(0.77, 0, 0.18, 1);
}

/* ── LOADING / ERROR ─────────────────────────────── */
.slide--loading {
  min-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.loading-ring {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.1);
  border-top-color: var(--color-accent);
  animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

.loading-label {
  font-family: 'DM Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.35);
}

/* ── NAV BUTTONS ─────────────────────────────────── */
.nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;

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
}

.nav:hover:not(:disabled) {
  transform: translateY(-50%) scale(1.07);
}

.nav:disabled {
  opacity: 0.3;
  cursor: default;
}

.nav-label { display: none; }

.nav-arrow {
  background: linear-gradient(
    135deg,
    #1e2a78 0%,
    var(--color-secondary) 50%,
    var(--color-accent) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
}

.nav--prev { left: 24px; }
.nav--next { right: 24px; }

/* ── DOTS ────────────────────────────────────────── */
.dots {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,0.2);
  cursor: pointer;
  padding: 0;
  transition: all 0.3s ease;
}

.dot--active {
  width: 24px;
  border-radius: 3px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  box-shadow: 0 0 10px color-mix(in srgb, var(--color-accent) 50%, transparent);
}
</style>