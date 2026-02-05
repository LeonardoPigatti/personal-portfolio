<template>
  <div class="info-curriculum">
    <div class="carousel-nav">
      <button @click="$emit('prev')" class="nav-btn">←</button>

      <span class="section-indicator">
        {{ currentSection + 1 }} / {{ sections.length }}
      </span>

      <button @click="$emit('next')" class="nav-btn">→</button>
    </div>

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
  gap: 20px;
  margin-bottom: 20px;
}

.nav-btn {
  background: #333;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  transition: background 0.3s;
}

.nav-btn:hover {
  background: #555;
}

.section-indicator {
  font-size: 14px;
  color: #666;
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
