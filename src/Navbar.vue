<template>
  <nav class="navbar">
    <div class="nav-inner">
      <button
        v-for="(section, index) in sections"
        :key="index"
        :class="{ active: currentIndex === index }"
        @click="$emit('updateIndex', index)"
      >
        <span class="label">{{ section }}</span>
        <span class="underline"></span>
      </button>
    </div>
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

<style scoped>
/* NAVBAR */
.navbar {
  position: fixed;
  top: 22px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;

  width: fit-content;
  max-width: calc(100vw - 24px);

  padding: 12px 14px;
  border-radius: 999px;

  /* Gradiente sutil: preto com toque roxo */
  background: linear-gradient(135deg, #0a0a0a 0%, #1a0a1a 50%, #0a0a0a 100%);
  
  border: 1px solid rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);

  box-shadow:
    0 0 0 1px rgba(168, 85, 247, 0.05),
    0 0 50px rgba(168, 85, 247, 0.06);

  transition: 0.3s ease;
}


/* Container */
.nav-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  overflow-x: auto;
  scrollbar-width: none;
}

.nav-inner::-webkit-scrollbar {
  display: none;
}

/* Botões */
.navbar button {
  position: relative;
  background: black;
  border: none;
  cursor: pointer;

  padding: 14px 18px;
  border-radius: 999px;

  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
  font-weight: 650;
  font-size: 18px;
  letter-spacing: 0.02em;

  color: rgba(255, 255, 255, 0.72);
  transition: 0.25s ease;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

/* Hover elegante */
.navbar button:hover {
  background: rgba(255, 255, 255, 0.045);
  color: rgba(255, 255, 255, 0.92);
  transform: translateY(-1px);
}

/* Label */
.label {
  line-height: 1;
}

/* Underline */
.underline {
  width: 0%;
  height: 2px;
  border-radius: 999px;

  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  opacity: 0;

  transition: 0.35s ease;
}

/* Ativo */
.navbar button.active {
  background: rgba(168, 85, 247, 0.10);
  border: 1px solid rgba(168, 85, 247, 0.18);
  color: rgba(255, 255, 255, 0.95);

  box-shadow:
    0 0 18px rgba(168, 85, 247, 0.10),
    inset 0 0 0 1px rgba(255, 255, 255, 0.03);
}

/* Texto ativo com gradiente */
.navbar button.active .label {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 3s ease infinite;
}

/* underline ativo */
.navbar button.active .underline {
  width: 70%;
  opacity: 1;
}

/* underline hover */
.navbar button:hover .underline {
  width: 40%;
  opacity: 0.6;
}

/* Animação do gradiente */
@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .navbar {
    top: 16px;
    padding: 14px 16px;
  }

  .navbar button {
    font-size: 18px;
    padding: 13px 16px;
  }
}
</style>
