<template>
  <div class="info-curriculum">
    <div class="content-wrapper">
      <Transition name="fade" mode="out-in">
        <div :key="currentSection" class="section-content">
          <SectionRenderer
            :section="sections[currentSection]"
            :isVisible="isVisible"
            @open-course="$emit('open-course', $event)"
          />
        </div>
      </Transition>
    </div>
    <a
        href="/src\assets\curriculum\Leonardo_Pigatti_Full_Stack_Developer.pdf"
        download="Curriculo.pdf"
        class="download-btn"
        aria-label="Baixar PDF"
        title="Baixar PDF"
      >
        Get Full CV (PDF)
      </a>
    <div class="carousel-nav">
      <!-- BOTÃO PDF (pequeno à esquerda) -->
  

      <button @click="$emit('prev')" class="nav-btn" aria-label="Anterior">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <div class="dots">
        <span 
          v-for="(_, index) in sections" 
          :key="index"
          :class="['dot', { active: index === currentSection }]"
        ></span>
      </div>

      <button @click="$emit('next')" class="nav-btn" aria-label="Próximo">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import SectionRenderer from "./SectionRenderer.vue"

defineProps({
  sections: Array,
  currentSection: Number,
  isVisible: Boolean,
})

defineEmits(["next", "prev", "open-course"])
</script>

<style scoped>
.info-curriculum {
  height: 810px;
  width: 1000px;
  border-radius: 10px;
  background-color: white;
  display: flex;
  flex-direction: column;
}

.content-wrapper {
  flex: 1;
  overflow: hidden;
}

.section-content {
  padding: 20px;
  height: 100%;
}

.carousel-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  padding: 24px;
  background-color: white;
  border-radius: 0 0 10px 10px;
  flex-shrink: 0;
}

/* BOTÃO PDF PEQUENO À ESQUERDA */
.download-btn {
  margin-right: auto;
  margin-left: 40px;

  height: 38px;          /* maior */
  padding: 0 18px;       /* mais largo */
  border-radius: 14px;   /* retangular mas suave */

  display: inline-flex;
  align-items: center;
  justify-content: center;

  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.6px;

  text-decoration: none;
  color: white;

  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 200% 200%;
  animation: gradientShift 3s ease infinite;

  transition: all 0.2s ease;
}

.download-btn:hover {
  transform: translateY(-1px) scale(1.04);
  filter: brightness(1.05);
}

.download-btn:active {
  transform: scale(0.97);
}

.nav-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 200% 200%;

  color: white;
  border: none;

  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  animation: gradientShift 3s ease infinite;
  transition: all 0.2s ease;
}

.nav-btn:hover {
  transform: scale(1.08);
  filter: brightness(1.05);
}

.nav-btn:active {
  transform: scale(0.95);
}

.dots {
  display: flex;
  gap: 8px;
  align-items: center;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: black;
}

.dot.active {
  width: 24px;
  border-radius: 4px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 200% 200%;
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
