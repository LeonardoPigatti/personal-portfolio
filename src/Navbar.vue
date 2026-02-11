<template>
  <nav class="navbar">
    <button 
      v-for="(section, index) in sections" 
      :key="index"
      :class="{ active: currentIndex === index }"
      @click="$emit('updateIndex', index)"
    >
      {{ section }}
    </button>
  </nav>
</template>

<script setup>
defineProps({
  sections: {
    type: Array,
    required: true
  },
  currentIndex: {
    type: Number,
    required: true
  }
})
</script>

<style>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: rgba(30, 41, 59, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  gap: 20px;
}

.navbar button {
  background: transparent;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  padding: 10px 15px;
  transition: all 0.3s ease;
}

.navbar button.active,
.navbar button:hover {
  background: white;
  color: #1e293b;
  border-radius: 5px;
}
</style>
