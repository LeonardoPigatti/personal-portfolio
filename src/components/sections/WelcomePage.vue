<template>
  <section class="section s1">
    <div class="content">
      <h1 :class="{ show: isVisible }">
        I design and build<br />
        digital experiences
      </h1>
    </div>
  </section>
</template>



<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  active: {
    type: Boolean,
    required: true
  }
})

const isVisible = ref(false)

watch(
  () => props.active,
  (isActive) => {
    if (isActive) {
      requestAnimationFrame(() => {
        isVisible.value = true
      })
    } else {
      isVisible.value = false
    }
  }
)

onMounted(() => {
  if (props.active) {
    requestAnimationFrame(() => {
      isVisible.value = true
    })
  }
})


</script>

<style scoped>
.section {
  height: 100vh;
  display: flex;
  align-items: center;       
  justify-content: flex-start;
  padding: 0 10vw;           
}

.content {
  max-width: 600px;
}

h1 {
  font-size: clamp(48px, 6vw, 72px);
  line-height: 1.1;
  color: white;
  font-family: sans-serif;
  font-weight: 600;

  opacity: 0;
  transform: translateX(-60px);
  transition: transform 10s ease, opacity 10s ease;
}

.show {
  opacity: 1;
  transform: translateX(0);
}

p {
  margin-top: 24px;
  font-size: 18px;
  line-height: 1.6;
  color: #cbd5e1;

  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease;
  transition-delay: 0.15s;
}

.s1 {
  background: #000000;
}

</style>
