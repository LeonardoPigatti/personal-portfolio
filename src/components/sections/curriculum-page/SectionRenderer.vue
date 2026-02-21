<template>
  <div>

    <!-- ─── Title ─── -->
    <h1 class="section-title" :class="{ show: isVisible }">
      {{ section.title }}
    </h1>

    <!-- ─── Main content ─── -->
    <p v-if="section.content" class="section-content">
      {{ section.content.split('. ')[0] }}.
      <br><br>
      {{ section.content.split('. ').slice(1).join('. ') }}
    </p>

    <!-- ─── Experience ─── -->
    <ExperienceAccordion
      v-if="section.type === 'experience'"
      :experiences="section.experiences"
    />

    <!-- ─── Education: degree list ─── -->
    <div v-if="section.type === 'education'" class="education-block">
      <div
        v-for="(edu, i) in section.items"
        :key="i"
        class="education-item"
      >
        <p class="edu-degree">{{ edu.degree }}</p>
        <p class="edu-school">{{ edu.school }} | {{ edu.period }}</p>
      </div>
    </div>

    <!-- ─── Languages: spoken languages ─── -->
    <div v-if="section.type === 'languages'" class="languages-block">
      <div
        v-for="(lang, i) in section.items"
        :key="i"
        class="language-item"
      >
        <p class="lang-name">{{ lang.language }}</p>
        <p class="lang-level">{{ lang.level }}</p>
      </div>
    </div>

    <!-- ─── Second section (subtitle + subcontent / courses) ─── -->
    <div v-if="section.subtitle" class="second-section">

      <h1 class="section-title" :class="{ show: isVisible }">
        {{ section.subtitle }}
      </h1>

      <!-- Skills / tech stack list with optional tooltip -->
      <ul v-if="section.subcontent?.length" class="skills-list">
        <li
          v-for="(skill, index) in section.subcontent"
          :key="index"
          class="skill-item"
        >
          <span class="skill-text">
            {{ skill }}
            <span
              v-if="section.tooltips?.[index]"
              class="tooltip"
              :class="{ 'tooltip--always': section.type === 'languages' }"
              :style="section.type === 'languages'
                ? {
                    animationDelay: `${index * 1.2}s`,
                    animationDuration: `${section.subcontent.length * 1.2}s`,
                  }
                : {}"
            >
              {{ section.tooltips[index] }}
            </span>
          </span>
        </li>
      </ul>

      <!-- Courses list (education only) -->
      <ul v-else-if="section.type === 'education'" class="courses-list">
        <li
          v-for="(course, index) in section.courses"
          :key="index"
          class="course-item"
          @click="$emit('open-course', course)"
        >
          {{ course.title }}
        </li>
      </ul>

    </div>
  </div>
</template>

<script setup>
import ExperienceAccordion from '@/components/sections/curriculum-page/ExperienceAccordion.vue'

defineProps({
  section: Object,
  isVisible: Boolean,
})

defineEmits(['open-course'])
</script>

<style scoped>

/* ─── Shared ─────────────────────────────────────── */

.section-title {
  color: black;
  display: flex;
  justify-content: center;
  text-transform: uppercase;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-size: 56px;
  white-space: nowrap;
}

.section-content {
  color: #333;
  text-align: justify;
  text-transform: uppercase;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-size: 1.1rem;
  line-height: 1.6;
  letter-spacing: 1.5px;
  margin-top: 20px;
  padding: 0 15px;
  font-weight: 500;
}

.second-section {
  margin-top: 40px;
}

/* ─── Skills ─────────────────────────────────────── */

.skills-list {
  list-style: disc;
  padding-left: 20px;
  margin: 20px 0 0 20px;
  text-align: left;
  max-width: 600px;
}

.skill-item {
  position: relative;
  cursor: pointer;
  padding: 8px 0;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-size: 1.1rem;
  line-height: 1.6;
  letter-spacing: 1.5px;
  font-weight: 500;
  color: #333;
  text-transform: uppercase;
}

.skill-text {
  position: relative;
  display: inline-block;
  color: black;
}

/* ─── Tooltip (hover, outros tipos) ─────────────── */

.tooltip {
  position: absolute;
  left: calc(100% + 10px);
  top: 50%;
  transform: translateY(-50%) translateX(-6px);
  white-space: nowrap;
  font-size: 0.9rem;
  font-weight: 500;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.8s ease, transform 0.8s ease;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.skill-item:hover .tooltip {
  opacity: 1;
  transform: translateY(-50%) translateX(0);
}

/* ─── Tooltip sempre visível com spotlight sequencial ── */

.tooltip--always {
  opacity: 1;
  transform: translateY(-50%) translateX(0);
  /* começa preto */
  -webkit-text-fill-color: #333;
  background: none;
  -webkit-background-clip: unset;
  background-clip: unset;
  animation: spotlightPass linear infinite;
  /* duration e delay vêm do :style inline */
}

@keyframes spotlightPass {
  /* fora da janela de destaque: preto */
  0%   {
    -webkit-text-fill-color: #333;
    background: none;
    -webkit-background-clip: unset;
    background-clip: unset;
  }
  /* entrando no gradiente */
  10%  {
    -webkit-text-fill-color: transparent;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    background-clip: text;
  }
  /* saindo do gradiente */
  26%  {
    -webkit-text-fill-color: transparent;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    background-clip: text;
  }
  /* volta ao preto */
  36%  {
    -webkit-text-fill-color: #333;
    background: none;
    -webkit-background-clip: unset;
    background-clip: unset;
  }
  100% {
    -webkit-text-fill-color: #333;
    background: none;
    -webkit-background-clip: unset;
    background-clip: unset;
  }
}

/* ─── Courses ────────────────────────────────────── */

.courses-list {
  list-style: disc;
  padding-left: 20px;
  margin: 20px 0 0 20px;
  text-align: left;
}

.course-item {
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-size: 1.05rem;
  line-height: 1.6;
  letter-spacing: 0.8px;
  padding: 8px 0;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  transition: 0.4s ease;
  text-transform: none;
}

.course-item:hover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 3s ease infinite;
}

/* ─── Education ──────────────────────────────────── */

.education-block {
  margin-top: 30px;
  padding: 0 30px;
}

.education-item {
  margin-bottom: 25px;
}

.edu-degree {
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: #222;
  margin-bottom: 6px;
}

.edu-school {
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  color: #666;
  letter-spacing: 1px;
}

/* ─── Languages ──────────────────────────────────── */

.languages-block {
  margin-top: 30px;
  padding: 0 30px;
}

.language-item {
  margin-bottom: 22px;
}

.lang-name {
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-size: 1.05rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: #222;
  margin-bottom: 6px;
}

.lang-level {
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  color: #666;
  letter-spacing: 1px;
}

/* ─── Animations ─────────────────────────────────── */

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50%       { background-position: 100% 50%; }
}

</style>