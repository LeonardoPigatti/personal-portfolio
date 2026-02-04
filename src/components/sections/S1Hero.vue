<template>
  <div class="hero">
    <div class="left-side">
      <img src="/src/assets/tc.jpg" alt="Profile" class="profile-image" />
    </div>

    <div class="hero-title">
      <h1 style="white-space: nowrap; color: black;" :class="{ show: isVisible }">
        Leonardo Vinicius Pigatti<br />
        <span class="gradient-text">Creative Technologist</span>
      </h1>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isVisible: Boolean,
})
</script>

<style scoped>
.hero {
  display: flex;
  align-items: center;
  gap: 4rem;
}

.left-side {
  flex: 0 0 clamp(320px, 40vw, 620px);
}


.profile-image {
  width: 100%;
  height: auto;
  border-radius: 12px;
  object-fit: cover;
}

.hero-title {
  flex: 1;
}

h1 {
  font-size: clamp(48px, 6vw, 72px);
  line-height: 1.1;
  font-family: sans-serif;
  font-weight: 600;
  opacity: 0;
  transform: translateX(-60px);
  transition: transform 1s ease, opacity 1s ease;
}

h1.show {
  opacity: 1;
  transform: translateX(0);
}

.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}
</style>
