<template>
  <nav class="navbar">
    <div class="dropdown" @mouseleave="open = false">

      <button class="lang-btn" @mouseover="open = true" :class="{ active: open }">
        <img :src="flags[selectedLang]" :alt="selectedLang" class="flag-img" />
        {{ selectedLang }}
      </button>

      <div v-if="open" class="dropdown-menu">
        <button
          v-for="lang in languages"
          :key="lang"
          class="dropdown-item"
          :class="{ active: selectedLang === lang }"
          @click="selectLang(lang)"
        >
          <img :src="flags[lang]" :alt="lang" class="flag-img" />
          {{ lang }}
        </button>
      </div>

    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const languages = ['EUA', 'Brasil', 'Italia']
const flags = {
  EUA:    'https://flagcdn.com/w40/us.png',
  Brasil: 'https://flagcdn.com/w40/br.png',
  Italia: 'https://flagcdn.com/w40/it.png',
}
const selectedLang = ref('EUA')
const open = ref(false)

function selectLang(lang) {
  selectedLang.value = lang
  open.value = false
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 40px;
  right: 48px;
  z-index: 1000;
}

.dropdown {
  position: relative;
}

.lang-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 18px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  background: linear-gradient(135deg, #0a0a0a, #1a0a1a, #0a0a0a);
  backdrop-filter: blur(18px);
  box-shadow: 0 0 50px rgba(168, 85, 247, 0.06);
  color: rgba(255, 255, 255, 0.72);
  font-size: 18px;
  font-weight: 650;
  cursor: pointer;
  transition: 0.25s ease;
}

.lang-btn:hover,
.lang-btn.active {
  color: rgba(255, 255, 255, 0.92);
  transform: translateY(-1px);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 8px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  background: linear-gradient(135deg, #0a0a0a, #1a0a1a, #0a0a0a);
  backdrop-filter: blur(18px);
  box-shadow: 0 0 50px rgba(168, 85, 247, 0.06);
  z-index: 1000;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 18px;
  border-radius: 999px;
  border: 1px solid transparent;
  background: transparent;
  color: rgba(255, 255, 255, 0.72);
  font-size: 18px;
  font-weight: 650;
  white-space: nowrap;
  cursor: pointer;
  transition: 0.25s ease;
}

.dropdown-item:hover {
  background: rgba(168, 85, 247, 0.10);
  color: rgba(255, 255, 255, 0.95);
  transform: translateY(-1px);
}

.dropdown-item.active {
  background: rgba(168, 85, 247, 0.15);
  border-color: rgba(168, 85, 247, 0.18);
  color: rgba(255, 255, 255, 0.95);
}

.flag-img {
  width: 24px;
  height: 16px;
  object-fit: cover;
  border-radius: 3px;
}

@media (max-width: 768px) {
  .lang-btn,
  .dropdown-item {
    padding: 13px 16px;
    font-size: 16px;
  }
  .flag-img {
    width: 20px;
    height: 14px;
  }
}
</style>