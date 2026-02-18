<template>
  <section class="section social">
    <div class="wrap">
      <header class="header">
        <h1 class="title">Redes Sociais</h1>
        <p class="subtitle">Conecte-se comigo por meio dos canais oficiais abaixo.</p>
      </header>

      <div class="grid">
        <!-- LinkedIn -->
        <a
          class="tile"
          href="https://www.linkedin.com"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <div class="tile-inner">
            <svg class="big-icon" viewBox="0 0 24 24" aria-hidden="true">
              <defs>
                <linearGradient id="grad-linkedin" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#667eea" />
                  <stop offset="50%" stop-color="#764ba2" />
                  <stop offset="100%" stop-color="#f093fb" />
                </linearGradient>
              </defs>

              <path
                class="icon-path icon-linkedin"
                d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM0.5 23.5h4V7.5h-4v16ZM8.5 7.5h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1v9.9h-4v-8.8c0-2.1-.04-4.8-2.92-4.8-2.92 0-3.37 2.28-3.37 4.65v8.95h-4v-16Z"
              />
            </svg>
          </div>
        </a>

        <!-- Instagram -->
        <a
          class="tile"
          href="https://www.instagram.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
        >
          <div class="tile-inner">
            <svg class="big-icon" viewBox="0 0 24 24" aria-hidden="true">
              <defs>
                <linearGradient id="grad-instagram" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#667eea" />
                  <stop offset="50%" stop-color="#764ba2" />
                  <stop offset="100%" stop-color="#f093fb" />
                </linearGradient>
              </defs>

              <path
                class="icon-path icon-instagram"
                d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.8-.9a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z"
              />
            </svg>
          </div>
        </a>

        <!-- GitHub -->
        <a class="tile" href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">
          <div class="tile-inner">
            <svg class="big-icon" viewBox="0 0 24 24" aria-hidden="true">
              <defs>
                <linearGradient id="grad-github" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#667eea" />
                  <stop offset="50%" stop-color="#764ba2" />
                  <stop offset="100%" stop-color="#f093fb" />
                </linearGradient>
              </defs>

              <path
                class="icon-path icon-github"
                d="M12 .5C5.73.5.75 5.6.75 12c0 5.2 3.44 9.6 8.2 11.16.6.12.82-.27.82-.6v-2.1c-3.34.75-4.04-1.66-4.04-1.66-.55-1.42-1.34-1.8-1.34-1.8-1.1-.77.08-.75.08-.75 1.22.1 1.86 1.27 1.86 1.27 1.08 1.9 2.84 1.35 3.54 1.03.1-.8.42-1.35.76-1.66-2.67-.31-5.48-1.37-5.48-6.1 0-1.35.47-2.45 1.24-3.32-.12-.31-.54-1.57.12-3.28 0 0 1-.33 3.3 1.27a11.2 11.2 0 0 1 3-.42c1.02 0 2.05.14 3 .42 2.3-1.6 3.3-1.27 3.3-1.27.66 1.7.24 2.97.12 3.28.77.87 1.24 1.97 1.24 3.32 0 4.74-2.82 5.78-5.5 6.08.43.38.82 1.12.82 2.26v3.35c0 .33.22.73.83.6 4.76-1.56 8.2-5.96 8.2-11.16C23.25 5.6 18.27.5 12 .5Z"
              />
            </svg>
          </div>
        </a>

        <!-- Email -->
        <a class="tile" href="mailto:seuemail@gmail.com" aria-label="Email">
          <div class="tile-inner">
            <svg class="big-icon" viewBox="0 0 24 24" aria-hidden="true">
              <defs>
                <linearGradient id="grad-email" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#667eea" />
                  <stop offset="50%" stop-color="#764ba2" />
                  <stop offset="100%" stop-color="#f093fb" />
                </linearGradient>
              </defs>

              <path
                class="icon-path icon-email"
                d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 2v.5l-8 5-8-5V6h16Zm0 12H4V8.8l7.47 4.67a1 1 0 0 0 1.06 0L20 8.8V18Z"
              />
            </svg>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  active: Boolean
})
</script>

<style scoped>
/* ===== base ===== */
.social {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 70px 10vw;
  background: #fefefe;

  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto,
    Helvetica, Arial, sans-serif;
}

.wrap {
  width: 100%;
  max-width: 900px;
}

.header {
  margin-bottom: 28px;
}

.title {
  margin: 0;
  font-size: 6rem;
  font-weight: 900;
  letter-spacing: -0.6px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  margin: 10px 0 0 0;
  font-size: 2.52rem;
  font-weight: 500;
  color: rgba(15, 23, 42, 0.65);
  white-space: nowrap;
}

/* ===== grid ===== */
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

/* ===== tile (borda gradiente REAL) ===== */
.tile {
  aspect-ratio: 1 / 1;

  display: flex;
  align-items: center;
  justify-content: center;

  text-decoration: none;

  /* IMPORTANTE: a borda precisa ser transparente */
  border: 6px solid transparent;

  border-radius: 16px;

  /* isso vira a "espessura" do gradiente */
  padding: 2px;

  /* estado normal = cinza */
  background: #d1d5db;

  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

/* conteúdo interno (fundo sólido) */
.tile-inner {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: #f6f7fb;

  display: flex;
  align-items: center;
  justify-content: center;
}

/* hover = gradiente na borda */
.tile:hover {
  background:
    linear-gradient(#f6f7fb, #f6f7fb) padding-box,
    linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%) border-box;

  background-size: 100% 100%, 200% 200%;
  animation: gradientShift 3s ease infinite;

  transform: translateY(-4px);
  box-shadow: 0 16px 45px rgba(0, 0, 0, 0.14);
}

/* focus (teclado) */
.tile:focus,
.tile:focus-visible {
  outline: none;

  background:
    linear-gradient(#f6f7fb, #f6f7fb) padding-box,
    linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%) border-box;

  background-size: 100% 100%, 200% 200%;
  animation: gradientShift 3s ease infinite;

  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.25);
}

/* clique */
.tile:active {
  transform: translateY(-1px) scale(0.98);
}

/* animação do gradiente */
@keyframes gradientShift {
  0% {
    background-position: 0% 50%, 0% 50%;
  }
  50% {
    background-position: 0% 50%, 100% 50%;
  }
  100% {
    background-position: 0% 50%, 0% 50%;
  }
}

/* ===== SVG ===== */
.big-icon {
  width: 70%;
  height: 70%;
}

.icon-path {
  fill: rgba(15, 23, 42, 0.35);
  transition: 0.25s ease;
  transform-origin: center;
}

.tile:hover .icon-path {
  transform: scale(1.03);
}

/* ===== aplica o gradiente certo em cada hover ===== */
.tile:hover .icon-linkedin {
  fill: url(#grad-linkedin);
}

.tile:hover .icon-instagram {
  fill: url(#grad-instagram);
}

.tile:hover .icon-github {
  fill: url(#grad-github);
}

.tile:hover .icon-email {
  fill: url(#grad-email);
}

/* ===== responsivo ===== */
@media (max-width: 980px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 520px) {
  .title {
    font-size: 2rem;
  }

  .grid {
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }
}
</style>
