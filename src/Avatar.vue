<template>
  <div class="avatar">
    <img :src="src" :alt="alt" />
  </div>
</template>

<script setup>
defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: 'Avatar' }
})
</script>

<style scoped>
.avatar {
  position: fixed;
  bottom: 80px;
  right: 80px;      /* canto inferior direito */
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
  cursor: pointer;
  transition: transform 0.2s ease;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
}

/* efeito de hover */
.avatar:hover img {
  opacity: 0; /* esconde a imagem para mostrar o gradiente */
}

.avatar::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 200% 200%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.avatar:hover::after {
  opacity: 1;
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>
