<template>
  <div class="info-curriculum">
    <Transition name="fade" mode="out-in">
      <div :key="currentSection" class="section-content">
        <SectionRenderer
          :section="sections[currentSection]"
          :isVisible="isVisible"
          @open-course="$emit('open-course', $event)"
        />
      </div>
    </Transition>

    <div class="carousel-nav">
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
}

.section-content {
  padding: 20px;
}

.carousel-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  padding: 24px;
  border-top: 1px solid #f0f0f0;
}

.nav-btn {
  background: transparent;
  color: #666;
  border: 1px solid #e0e0e0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.nav-btn:hover {
  background: #f8f8f8;
  border-color: #ccc;
  color: #333;
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
  background: #e0e0e0;
  transition: all 0.3s ease;
  cursor: pointer;
}

.dot.active {
  width: 24px;
  border-radius: 4px;
  background: #333;
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