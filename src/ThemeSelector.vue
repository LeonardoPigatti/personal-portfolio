<template>
  <div class="selector-wrapper" @mouseenter="open" @mouseleave="close">
    <!-- Bolhas de tema (aparecem acima) -->
    <transition-group name="bubble" tag="div" class="options-stack">
      <button
        v-for="(theme, idx) in themes"
        v-show="isOpen"
        :key="theme.id"
        class="bubble option-bubble"
        :style="[
          { background: theme.color, transitionDelay: isOpen ? `${idx * 60}ms` : `${(themes.length - idx) * 40}ms` },
          selectedTheme === theme.id ? { boxShadow: `0 0 0 3px white, 0 0 0 5px ${theme.color}` } : {}
        ]"
        :title="theme.label"
        @click="selectTheme(theme)"
      >
        <span class="bubble-label">{{ theme.label }}</span>
      </button>
    </transition-group>

    <!-- Bolha principal -->
    <button
      class="bubble main-bubble"
      :style="{ background: currentColor }"
      :class="{ 'is-open': isOpen }"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const themes = [
  { id: "aurora",  label: "Aurora",  color: "#7c3aed" },
  { id: "ocean",   label: "Ocean",   color: "#0ea5e9" },
  { id: "forest",  label: "Forest",  color: "#16a34a" },
];

const isOpen = ref(false);
const selectedTheme = ref("aurora");

const currentColor = computed(
  () => themes.find((t) => t.id === selectedTheme.value)?.color ?? "#7c3aed"
);

let closeTimer = null;

function open() {
  clearTimeout(closeTimer);
  isOpen.value = true;
}

function close() {
  closeTimer = setTimeout(() => {
    isOpen.value = false;
  }, 200);
}

function selectTheme(theme) {
  selectedTheme.value = theme.id;
  // Emite evento para o pai aplicar o tema
  emit("change", theme);
}

const emit = defineEmits(["change"]);
</script>

<style scoped>
/* ── Wrapper ── */
.selector-wrapper {
  position: fixed;
  left: 96px;
  bottom: 100px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

/* ── Stack de opções ── */
.options-stack {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  gap: 12px;
}

/* ── Bolha base ── */
.bubble {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition:
    transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.2s ease,
    opacity 0.2s ease;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.22);
}

/* ── Bolha principal ── */
.main-bubble {
  width: 60px;
  height: 60px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.28);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.4s ease, box-shadow 0.2s ease;
}

.main-bubble.is-open {
  transform: scale(0.88);
}

.main-bubble:hover:not(.is-open) {
  transform: scale(1.1);
}

/* ── Bolhas de opção ── */
.option-bubble:hover {
  transform: scale(1.18) translateX(6px);
}

/* ── Label tooltip ── */
.bubble-label {
  position: absolute;
  left: calc(100% + 10px);
  white-space: nowrap;
  background: rgba(15, 15, 15, 0.82);
  color: #fff;
  font-size: 12px;
  font-family: 'DM Sans', sans-serif;
  letter-spacing: 0.04em;
  padding: 4px 10px;
  border-radius: 6px;
  pointer-events: none;
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.option-bubble:hover .bubble-label {
  opacity: 1;
  transform: translateX(0);
}

/* ── Animação de entrada/saída ── */
.bubble-enter-active,
.bubble-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.bubble-enter-from {
  opacity: 0;
  transform: translateY(16px) scale(0.6);
}

.bubble-leave-to {
  opacity: 0;
  transform: translateY(16px) scale(0.6);
}

/* ── Mobile ── */
@media (max-width: 600px) {
  .selector-wrapper {
    left: 16px;
    bottom: 24px;
  }

  .bubble {
    width: 44px;
    height: 44px;
  }

  .main-bubble {
    width: 52px;
    height: 52px;
  }
}
</style>