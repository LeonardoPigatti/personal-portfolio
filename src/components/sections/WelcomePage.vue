<script setup>
import { watch } from 'vue'

const props = defineProps({
  active: {
    type: Boolean,
    required: true
  }
})

watch(
  () => props.active,
  (isActive) => {
    if (isActive) {
      console.log('Seção 1 ativa')
    }
  }
)
</script>

<template>
  <section class="section s1">
    <h1 :class="{ show: active }">Seção 1</h1>
  </section>
</template>

<style scoped>
.section {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

h1 {
  font-size: 64px;
  color: white;
  font-family: sans-serif;

  opacity: 0;
  transform: translateY(40px);
  transition: all 0.6s ease;
}

h1.show {
  opacity: 1;
  transform: translateY(0);
}

.s1 {
  background: #0f172a;
}
</style>
