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
          { background: theme.previewColor, transitionDelay: isOpen ? `${idx * 60}ms` : `${(themes.length - idx) * 40}ms` },
          selectedTheme === theme.id ? { boxShadow: `0 0 0 3px white, 0 0 0 5px ${theme.previewColor}` } : {}
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

// ─── Definição das paletas ────────────────────────────────────────────────────
const themes = [
  {
    id: "aurora",
    label: "Aurora",
    previewColor: "#7c3aed",
    vars: {
      "--bg-primary":       "#000000",
      "--color-primary":    "#667eea",
      "--color-secondary":  "#764ba2",
      "--color-accent":     "#f093fb",
      "--color-extra":      "#7c3aed",
      "--color-extra2":     "#a855f7",
      "--circle-1":         "#3b82f6",
      "--circle-2":         "#8b5cf6",
      "--circle-3":         "#ec4899",
      "--text-tag":         "rgba(255,255,255,0.65)",
      "--text-bio":         "rgba(226,232,240,0.8)",
    },
  },
  {
    id: "sunset",
    label: "Sunset",
    previewColor: "#ff6b35",
    vars: {
      "--bg-primary":       "#0d0608",
      "--color-primary":    "#ff6b35",
      "--color-secondary":  "#e84393",
      "--color-accent":     "#f7c59f",
      "--color-extra":      "#e84393",
      "--color-extra2":     "#ff6b35",
      "--circle-1":         "#ff6b35",
      "--circle-2":         "#e84393",
      "--circle-3":         "#f7c59f",
      "--text-tag":         "rgba(255,220,200,0.75)",
      "--text-bio":         "rgba(255,235,220,0.85)",
    },
  },
  {
    id: "hacker",
    label: "Hacker",
    previewColor: "#00ff41",
    vars: {
      "--bg-primary":       "#000000",
      "--color-primary":    "#00ff41",
      "--color-secondary":  "#00cc33",
      "--color-accent":     "#39ff14",
      "--color-extra":      "#00cc33",
      "--color-extra2":     "#00ff41",
      "--circle-1":         "#00ff41",
      "--circle-2":         "#00cc33",
      "--circle-3":         "#003b00",
      "--text-tag":         "rgba(0,255,65,0.7)",
      "--text-bio":         "rgba(180,255,200,0.85)",
    },
  },
];

// ─── Estado ───────────────────────────────────────────────────────────────────
const isOpen = ref(false);
const selectedTheme = ref("aurora");

const currentColor = computed(
  () => themes.find((t) => t.id === selectedTheme.value)?.previewColor ?? "#7c3aed"
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

// ─── Aplica o tema via CSS variables no :root ─────────────────────────────────
function applyTheme(theme) {
  const root = document.documentElement;
  Object.entries(theme.vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

function selectTheme(theme) {
  selectedTheme.value = theme.id;
  applyTheme(theme);
  emit("change", theme);
}

// Aplica o tema inicial ao montar
import { onMounted } from "vue";
onMounted(() => {
  const initial = themes.find((t) => t.id === selectedTheme.value);
  if (initial) applyTheme(initial);
});

const emit = defineEmits(["change"]);
</script>

<style scoped>
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

.options-stack {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  gap: 12px;
}

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

.option-bubble:hover {
  transform: scale(1.18) translateX(6px);
}

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