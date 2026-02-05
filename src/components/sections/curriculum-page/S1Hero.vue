<template>
  <div class="hero">
    <div class="left-side">
      <div class="profile-wrap">
  <img src="/src/assets/tc.jpg" alt="Profile" class="profile-image" />
</div>
    </div>

    <div class="hero-title">
      <h1 :class="{ show: isVisible }">
        <span style="color: black;" class="line name nowrap">Leonardo Vinicius Pigatti</span><br />

<span class="line l1 nowrap">
  <span class="gradient-text hoverable">Creative Technologist</span>
</span><br />

<span class="line l2 nowrap">
  <span class="gradient-text hoverable">UX Designer</span>
</span><br />

<span class="line l3 nowrap">
  <span class="gradient-text hoverable">Builder</span>
</span>

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
  flex: 0 0 clamp(320px, 40vw, 660px); /* era 620px, agora 680px */
    transform: translateY(80px); /* 40px para baixo */

}

.profile-image {
  width: 100%;
  height: auto;
  border-radius: 12px;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
  cursor: pointer;
}

.profile-image:hover {
  transform: scale(1.07);
}

.hero-title {
  flex: 1;
}

h1 {
  font-size: clamp(48px, 6vw, 72px);
  line-height: 1.1;
  font-family: sans-serif;
  font-weight: 600;
  margin: 0;
}

/* impede quebra de linha */
.nowrap {
  white-space: nowrap;
}

/* gradiente */
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

/* animação esquerda -> direita */
.line {
  display: inline-block;
  opacity: 0;
  transform: translateX(-60px);
}

/* só anima quando show */
h1.show .line {
  animation: slideInLeft 0.75s ease forwards;
}

h1.show .name {
  animation-delay: 0s;
}

h1.show .l1 {
  animation-delay: 0.45s;
}

h1.show .l2 {
  animation-delay: 0.9s;
}

h1.show .l3 {
  animation-delay: 1.35s;
}

@keyframes slideInLeft {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.hoverable {
  display: inline-block;
  transition: transform 0.25s ease;
  cursor: default;
}

.hoverable:hover {
  transform: scale(1.1);
}

.profile-wrap {
  position: relative;
  width: 100%;
  border-radius: 12px;
  /* remove o overflow: hidden daqui */
}

.profile-image {
  width: 100%;
  height: auto;
  border-radius: 12px;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
  cursor: pointer;
  overflow: hidden; /* adiciona aqui */
}


.profile-wrap::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
  transform: translate(-18px, -18px);
  z-index: -1;
  filter: blur(0px);
  opacity: 0.9;
}






</style>
