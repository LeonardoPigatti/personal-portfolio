<template>
  <section class="section social">
    <div class="wrap">
      <!-- ===== header ===== -->
      <header class="header">
        <h1 class="title">Connect With Me</h1>
        <p class="subtitle">
          Stay updated and get in touch through my official social channels. 
          Follow, collaborate, or just say hi — I love connecting with professionals, creators, and curious minds alike.
        </p>
      </header>

      <!-- ===== grid of tiles ===== -->
<div class="grid">
  <!-- LinkedIn -->
  <a class="tile" href="#" @click.prevent="selectTile('linkedin')" @mouseenter="hoverTile = 'linkedin'" @mouseleave="hoverTile = null" aria-label="LinkedIn">
    <div class="tile-inner">
      <svg class="big-icon" viewBox="0 0 24 24" aria-hidden="true">
        <defs>
          <linearGradient id="grad-default" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#667eea" />
            <stop offset="50%" stop-color="#764ba2" />
            <stop offset="100%" stop-color="#f093fb" />
          </linearGradient>
        </defs>
        <path
          d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM0.5 23.5h4V7.5h-4v16ZM8.5 7.5h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1v9.9h-4v-8.8c0-2.1-.04-4.8-2.92-4.8-2.92 0-3.37 2.28-3.37 4.65v8.95h-4v-16Z"
          :fill="hoverTile === 'linkedin' || activeTile === 'linkedin' ? 'url(#grad-default)' : 'rgba(15,23,42,0.45)'"
        />
      </svg>
    </div>
  </a>

  <!-- Instagram -->
  <a class="tile" href="#" @click.prevent="selectTile('instagram')" @mouseenter="hoverTile = 'instagram'" @mouseleave="hoverTile = null" aria-label="Instagram">
    <div class="tile-inner">
      <svg class="big-icon" viewBox="0 0 24 24" aria-hidden="true">
        <defs>
          <linearGradient id="grad-default" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#667eea" />
            <stop offset="50%" stop-color="#764ba2" />
            <stop offset="100%" stop-color="#f093fb" />
          </linearGradient>
        </defs>
        <path
          d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.8-.9a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z"
          :fill="hoverTile === 'instagram' || activeTile === 'instagram' ? 'url(#grad-default)' : 'rgba(15,23,42,0.45)'"
        />
      </svg>
    </div>
  </a>

  <!-- WhatsApp -->
  <a class="tile" href="#" @click.prevent="selectTile('whatsapp')" @mouseenter="hoverTile = 'whatsapp'" @mouseleave="hoverTile = null" aria-label="WhatsApp">
    <div class="tile-inner">
      <svg class="big-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 2a10 10 0 0 0-8.9 14.6L2 22l5.6-1.5A10 10 0 1 0 12 2Zm0 2a8 8 0 0 1 6.9 12.1l-.3.5.9 3.3-3.4-.9-.5.3A8 8 0 1 1 12 4Zm4.2 9.3c-.2-.1-1.2-.6-1.4-.7-.2-.1-.4-.1-.5.1-.1.2-.6.7-.7.8-.1.1-.3.1-.5 0-.2-.1-.9-.3-1.7-1-.6-.5-1-1.1-1.1-1.3-.1-.2 0-.3.1-.4.1-.1.2-.3.3-.4.1-.1.1-.2.2-.3.1-.1 0-.3 0-.4 0-.1-.5-1.3-.7-1.8-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.2 1.6 2.4 3.8 3.3.5.2 1 .4 1.3.5.6.2 1.1.2 1.5.1.5-.1 1.2-.5 1.3-1 .2-.5.2-.9.1-1 0-.1-.2-.2-.4-.3Z"
          :fill="hoverTile === 'whatsapp' || activeTile === 'whatsapp' ? 'url(#grad-default)' : 'rgba(15,23,42,0.45)'"
        />
      </svg>
    </div>
  </a>

  <!-- YouTube -->
  <a class="tile" href="#" @click.prevent="selectTile('youtube')" @mouseenter="hoverTile = 'youtube'" @mouseleave="hoverTile = null" aria-label="YouTube">
    <div class="tile-inner">
      <svg class="big-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.7 3.5 12 3.5 12 3.5s-7.7 0-9.4.6A3 3 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.7.6 9.4.6 9.4.6s7.7 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8ZM9.8 15.5v-7l6.2 3.5-6.2 3.5Z"
          :fill="hoverTile === 'youtube' || activeTile === 'youtube' ? 'url(#grad-default)' : 'rgba(15,23,42,0.45)'"
        />
      </svg>
    </div>
  </a>

  <!-- Upwork -->
  <a class="tile" href="#" @click.prevent="selectTile('upwork')" @mouseenter="hoverTile = 'upwork'" @mouseleave="hoverTile = null" aria-label="Upwork">
    <div class="tile-inner">
      <svg class="big-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M17.5 7.5c-1.6 0-2.8 1-3.3 2.4-.8-1.2-1.5-2.6-2-4H9.5v6.5c0 1.2-.7 2-1.8 2s-1.8-.8-1.8-2V5.9H3v6.4c0 2.7 1.9 4.6 4.6 4.6s4.6-1.9 4.6-4.6v-.4c.5 1 1.1 1.9 1.8 2.7-.2.6-.6 1.1-1.2 1.1-.4 0-.8-.1-1.1-.4l-.8 2.3c.6.4 1.4.6 2.1.6 1.6 0 2.8-1 3.4-2.4.7.4 1.5.6 2.3.6 2.5 0 4.3-1.9 4.3-4.5s-1.8-4.4-4.5-4.4Zm0 6.5c-1 0-1.8-.8-1.8-2s.8-2 1.8-2 1.8.8 1.8 2-.8 2-1.8 2Z"
          :fill="hoverTile === 'upwork' || activeTile === 'upwork' ? 'url(#grad-default)' : 'rgba(15,23,42,0.45)'"
        />
      </svg>
    </div>
  </a>

  <!-- BeeCrowd -->
  <a class="tile" href="#" @click.prevent="selectTile('beecrowd')" @mouseenter="hoverTile = 'beecrowd'" @mouseleave="hoverTile = null" aria-label="beecrowd">
    <div class="tile-inner">
      <svg class="big-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 2c-3.5 0-6 2.3-6 5.5 0 2.3 1.3 4.1 3.2 5-.2.6-.6 1.7-1.2 2.8-.2.4.1.8.6.7 1.8-.5 3.1-1.2 3.8-1.7.5.1 1 .2 1.6.2 3.5 0 6-2.3 6-5.5S15.5 2 12 2Zm-2 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"
          :fill="hoverTile === 'beecrowd' || activeTile === 'beecrowd' ? 'url(#grad-default)' : 'rgba(15,23,42,0.45)'"
        />
      </svg>
    </div>
  </a>

  <!-- GitHub -->
  <a class="tile" href="#" @click.prevent="selectTile('github')" @mouseenter="hoverTile = 'github'" @mouseleave="hoverTile = null" aria-label="GitHub">
    <div class="tile-inner">
      <svg class="big-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 .5C5.73.5.75 5.6.75 12c0 5.2 3.44 9.6 8.2 11.16.6.12.82-.27.82-.6v-2.1c-3.34.75-4.04-1.66-4.04-1.66-.55-1.42-1.34-1.8-1.34-1.8-1.1-.77.08-.75.08-.75 1.22.1 1.86 1.27 1.86 1.27 1.08 1.9 2.84 1.35 3.54 1.03.1-.8.42-1.35.76-1.66-2.67-.31-5.48-1.37-5.48-6.1 0-1.35.47-2.45 1.24-3.32-.12-.31-.54-1.57.12-3.28 0 0 1-.33 3.3 1.27a11.2 11.2 0 0 1 3-.42c1.02 0 2.05.14 3 .42 2.3-1.6 3.3-1.27 3.3-1.27.66 1.7.24 2.97.12 3.28.77.87 1.24 1.97 1.24 3.32 0 4.74-2.82 5.78-5.5 6.08.43.38.82 1.12.82 2.26v3.35c0 .33.22.73.83.6 4.76-1.56 8.2-5.96 8.2-11.16C23.25 5.6 18.27.5 12 .5Z"
          :fill="hoverTile === 'github' || activeTile === 'github' ? 'url(#grad-default)' : 'rgba(15,23,42,0.45)'"
        />
      </svg>
    </div>
  </a>

  <!-- Email -->
  <a class="tile" href="#" @click.prevent="selectTile('email')" @mouseenter="hoverTile = 'email'" @mouseleave="hoverTile = null" aria-label="Email">
    <div class="tile-inner">
      <svg class="big-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 2v.5l-8 5-8-5V6h16Zm0 12H4V8.8l7.47 4.67a1 1 0 0 0 1.06 0L20 8.8V18Z"
          :fill="hoverTile === 'email' || activeTile === 'email' ? 'url(#grad-default)' : 'rgba(15,23,42,0.45)'"
        />
      </svg>
    </div>
  </a>
</div>


      <!-- Conteúdo explicativo -->
      <div v-if="activeTile" class="tile-content">
        <p>
          {{ tileDescriptions[activeTile] }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const hoverTile = ref(null)
const activeTile = ref(null)

const tileDescriptions = {
  linkedin: 'Acesse meu LinkedIn para ver meu perfil profissional e experiências.',
  instagram: 'Siga meu Instagram para ver projetos, fotos e bastidores.',
  github: 'Veja meus projetos de programação no GitHub.',
  email: 'Entre em contato via e-mail para mensagens diretas.'
}

function selectTile(id) {
  activeTile.value = activeTile.value === id ? null : id
}
</script>

<style scoped>
/* ===== mantém todo o seu CSS original ===== */
.social {
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 60px 10vw;
  background: #fefefe;
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

.wrap { 
  width: 100%; 
  max-width: 900px; 
  margin-top: 100px; /* empurra para baixo */
}
.header { margin-bottom: 32px; text-align: center;}
.title { font-size: 3.8rem; font-weight: 900; letter-spacing: -0.5px; background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; margin: 0; }
.subtitle { margin: 12px auto 0 auto; font-size: 1.55rem; line-height: 1.6; font-weight: 500; color: rgba(15, 23, 42, 0.75); max-width: 650px; }
.grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.tile { aspect-ratio: 1 / 1; display: flex; align-items: center; justify-content: center; text-decoration: none; border: 6px solid transparent; border-radius: 16px; padding: 2px; background: #d1d5db; transition: transform 0.2s ease, box-shadow 0.2s ease; }
.tile-inner { width: 100%; height: 100%; border-radius: 12px; background: #f6f7fb; display: flex; align-items: center; justify-content: center; }
.tile:hover, .tile:focus-visible { background: linear-gradient(#f6f7fb, #f6f7fb) padding-box, linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%) border-box; transform: translateY(-3px); box-shadow: 0 14px 40px rgba(0,0,0,0.14); }
.tile:active { transform: translateY(-1px) scale(0.97); }
.big-icon { width: 70%; height: 70%; }
.icon-path { transition: 0.25s ease; transform-origin: center; }
.tile:hover .icon-path, .tile.active .icon-path { transform: scale(1.05); }
/* Gradiente só quando hover/ativo via Vue (já no HTML acima) */

/* conteúdo explicativo */
.tile-content { margin-top: 16px; padding: 16px; background: #f0f4ff; border-radius: 12px; }

/* responsivo */
@media (max-width: 980px) { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 520px) { .title { font-size: 2.4rem; } .subtitle { font-size: 1.2rem; line-height: 1.5; } .grid { grid-template-columns: 1fr 1fr; gap: 14px; } }
</style>
