<template>
  <div class="slide" :class="{ 'slide--active': active }">

    <div class="slide-inner" :class="{ expanded }">

      <!-- IMAGE PANEL -->
      <div class="image-panel" @click="$emit('toggle')">
        <img :src="repo.image" :alt="repo.name" class="slide-img" />

        <!-- Overlay com hint de clique -->
        <div class="image-overlay">
          <div class="expand-hint">
            <span class="hint-icon">{{ expanded ? '←' : '→' }}</span>
            <span class="hint-text">{{ expanded ? 'Fechar' : 'Ver detalhes' }}</span>
          </div>
        </div>

        <!-- Tag de linguagem flutuante -->
        <div v-if="repo.language" class="lang-badge">
          <span class="lang-dot" />
          {{ repo.language }}
        </div>
      </div>

      <!-- INFO PANEL -->
      <div class="info-panel">
        <div class="info-inner">

          <!-- Header -->
          <div class="repo-header">
            <p class="repo-eyebrow">Projeto</p>
<h2 class="repo-name">{{ formatName(repo.name) }}</h2>
          </div>

          <!-- Divider -->
          <div class="divider" />

          <!-- Description -->
          <p class="repo-desc">
            {{ repo.description || "Sem descrição disponível para este repositório." }}
          </p>

          <!-- Stats -->
          <div class="stats-row">
            <div class="stat">
              <span class="stat-value">{{ repo.stargazers_count }}</span>
              <span class="stat-label">Stars</span>
            </div>
            <div class="stat">
              <span class="stat-value">{{ repo.forks_count }}</span>
              <span class="stat-label">Forks</span>
            </div>
            <div class="stat" v-if="repo.open_issues_count !== undefined">
              <span class="stat-value">{{ repo.open_issues_count }}</span>
              <span class="stat-label">Issues</span>
            </div>
          </div>

          <!-- CTA -->
          <a class="cta-link" :href="repo.html_url" target="_blank" rel="noopener">
            <span class="cta-text">Ver no GitHub</span>
            <span class="cta-arrow">↗</span>
          </a>

        </div>
      </div>

    </div>

    <!-- Caption bar (collapsed) -->
    <transition name="fade-up">
      <div v-if="!expanded" class="caption-bar">
        <span class="caption-name">{{ repo.name }}</span>
        <span v-if="repo.language" class="caption-lang">{{ repo.language }}</span>
      </div>
    </transition>

  </div>
</template>

<script setup>
defineProps({
  repo: Object,
  expanded: Boolean,
  active: Boolean,
})

defineEmits(["toggle"])

function formatName(name) {
  if (!name) return ''

  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('-')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

/* ── SLIDE ───────────────────────────────────────── */
.slide {
  min-width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-family: 'Syne', sans-serif;
}

.slide-inner {
  flex: 1;
  display: flex;
  gap: 3px;
  overflow: hidden;
  border-radius: 24px;
  transition: all 0.65s cubic-bezier(0.77, 0, 0.18, 1);
  margin-top: 10px;
}

/* ── IMAGE PANEL ─────────────────────────────────── */
.image-panel {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
  transition: width 0.65s cubic-bezier(0.77, 0, 0.18, 1);
  flex-shrink: 0;
}

.slide-inner.expanded .image-panel {
  width: 52%;
}

.slide-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.8s ease;
  filter: brightness(0.85) saturate(1.1);
}

.image-panel:hover .slide-img {
  transform: scale(1.03);
}

/* Overlay */
.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(0,0,0,0) 40%,
    rgba(0,0,0,0.55) 100%
  );
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 24px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-panel:hover .image-overlay {
  opacity: 1;
}

.expand-hint {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,0.12);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 100px;
  padding: 8px 16px;
  color: #fff;
  font-family: 'DM Mono', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.1em;
}

.hint-icon { font-size: 1rem; }

/* Language badge */
.lang-badge {
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(8, 8, 12, 0.75);
  backdrop-filter: blur(10px);
  border: 1px solid color-mix(in srgb, var(--color-accent) 30%, transparent);
  border-radius: 100px;
  padding: 8px 20px;
  font-family: 'DM Mono', monospace;
  font-size: 0.88rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 16px color-mix(in srgb, var(--color-accent) 15%, transparent);
}

.lang-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  box-shadow: 0 0 8px color-mix(in srgb, var(--color-accent) 80%, transparent);
  flex-shrink: 0;
}

/* ── INFO PANEL ──────────────────────────────────── */
.info-panel {
  width: 0;
  height: 100%;
  overflow: hidden;
  transition: width 0.65s cubic-bezier(0.77, 0, 0.18, 1);
  background: rgba(12, 12, 18, 0.95);
  flex-shrink: 0;
}

.slide-inner.expanded .info-panel {
  width: 48%;
}

.info-inner {
  padding: 52px 48px 44px;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  opacity: 0;
  transform: translateX(20px);
  transition: opacity 0.4s ease 0.35s, transform 0.4s ease 0.35s;
}

.slide-inner.expanded .info-inner {
  opacity: 1;
  transform: translateX(0);
}

/* Repo header */
.repo-eyebrow {
  font-family: 'DM Mono', monospace;
  font-size: 0.68rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
  margin: 0 0 14px;
}

.repo-name {
  font-size: clamp(1.6rem, 2.5vw, 2.4rem);
  font-weight: 800;
  line-height: 1.05;
  margin: 0;
  background: linear-gradient(135deg, #ffffff 0%, var(--color-secondary) 50%, var(--color-accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  word-break: break-word;
}

/* Divider */
.divider {
  height: 1px;
  background: linear-gradient(90deg, color-mix(in srgb, var(--color-primary) 50%, transparent), color-mix(in srgb, var(--color-accent) 30%, transparent), transparent);
  margin: 32px 0;
}

/* Description */
.repo-desc {
  font-size: 20px;
  line-height: 1.85;
  color: rgba(255,255,255,0.55);
  flex: 1;
  margin: 0 0 36px;
}

/* Stats */
.stats-row {
  display: flex;
  gap: 36px;
  margin-bottom: 40px;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}

.stat-icon { font-size: 1.1rem; }

.stat-value {
  font-size: 1.6rem;
  font-weight: 700;
  color: #fff;
  line-height: 1;
}

.stat-label {
  font-family: 'DM Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
}

/* CTA */
.cta-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  padding: 14px 28px;
  border-radius: 100px;
  border: 1px solid color-mix(in srgb, var(--color-accent) 25%, transparent);
  background: rgba(255,255,255,0.05);
  font-family: 'DM Mono', monospace;
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  transition: all 0.25s ease;
  align-self: flex-start;
}

.cta-text,
.cta-arrow {
  background: linear-gradient(135deg, #ffffff 0%, var(--color-secondary) 50%, var(--color-accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.cta-link:hover {
  background: linear-gradient(135deg, color-mix(in srgb, var(--color-primary) 20%, transparent), color-mix(in srgb, var(--color-accent) 15%, transparent));
  border-color: color-mix(in srgb, var(--color-accent) 50%, transparent);
  box-shadow: 0 0 28px color-mix(in srgb, var(--color-accent) 15%, transparent);
}

.cta-arrow {
  font-size: 1.1rem;
  transition: transform 0.2s ease;
  display: inline-block;
}

.cta-link:hover .cta-arrow {
  transform: translate(2px, -2px);
}

/* ── CAPTION BAR ─────────────────────────────────── */
.caption-bar {
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  margin-top: 16px;
}

.caption-name {
  font-size: 0.95rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: linear-gradient(135deg, #ffffff 0%, var(--color-secondary) 45%, var(--color-accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.caption-lang {
  font-family: 'DM Mono', monospace;
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 6px color-mix(in srgb, var(--color-accent) 50%, transparent));
}

/* ── TRANSITIONS ─────────────────────────────────── */
.fade-up-enter-active,
.fade-up-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>