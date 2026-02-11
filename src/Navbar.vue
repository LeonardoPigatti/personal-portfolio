<template>
  <nav class="navbar" :style="{ backgroundColor: backgroundColor, color: textColor }">
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
  sections: Array,
  currentIndex: Number,
  backgroundColor: String, // nova prop para controlar cor
  textColor: String // nova prop para controlar cor
})
</script>

<style>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  gap: 40px;
  transition: background-color 0.3s ease;

  /* Estilo mais elegante */
  font-family: 'Georgia', serif; /* itálico e clássico */
  font-style: italic;
  font-weight: 500;
  letter-spacing: 0.5px; /* espaço sutil entre letras */
}

.navbar button {
  background: transparent;
  border: none;
  font-family: 'Georgia', serif;
  font-style: italic;
  font-weight: 500;
  font-size: clamp(16px, 1.5vw, 20px);
  cursor: pointer;
  padding: 10px 15px;
  transition: all 0.25s ease; /* já existente */
  color: inherit;
}


/* Hover: gradiente animado no texto, sem mudar o fundo */
.navbar button:hover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 3s ease infinite;
  transform: scale(1.4); /* aumenta 10% */

}

/* Botão ativo: mantém gradiente */
.navbar button.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 3s ease infinite;
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


</style>
