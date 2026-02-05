<template>
  <div>
    <h1 class="leo" style="white-space: nowrap;" :class="{ show: isVisible }">
      {{ section.title }}
    </h1>

    <p v-if="section.content" class="leo2">
      {{ section.content }}
    </p>

    <ExperienceAccordion
      v-if="section.type === 'experience'"
      :experiences="section.experiences"
    />

    <div v-if="section.type === 'education'" class="education-block">
      <div v-for="(edu, i) in section.items" :key="i" class="education-item">
        <p class="edu-degree">{{ edu.degree }}</p>
        <p class="edu-school">{{ edu.school }} | {{ edu.period }}</p>
      </div>
    </div>

    <div v-if="section.type === 'languages'" class="languages-block">
      <div v-for="(lang, i) in section.items" :key="i" class="language-item">
        <p class="lang-name">{{ lang.language }}</p>
        <p class="lang-level">{{ lang.level }}</p>
      </div>
    </div>

    <div v-if="section.subtitle" class="second-section">
      <h1 class="leo" style="white-space: nowrap;" :class="{ show: isVisible }">
        {{ section.subtitle }}
      </h1>

      <!-- SUMMARY -->
      <ul v-if="section.type === 'summary'" class="skills-list">
        <li
          v-for="(skill, index) in section.subcontent"
          :key="index"
          class="skill-item"
        >
          {{ skill }}

          <span v-if="section.tooltips?.[index]" class="tooltip">
            {{ section.tooltips[index] }}
          </span>
        </li>
      </ul>

      <!-- EDUCATION: COURSES -->
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

defineEmits(["open-course"])
</script>

<style scoped>
.leo {
  color: black;
  display: flex;
  justify-content: center;
  text-transform: uppercase;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

.leo2 {
  color: #333;
  text-align: center;
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
  margin-left: 40px;
}

/* skills */
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

.tooltip {
  position: absolute;
  left: 62%;
  top: 50%;
  transform: translateY(-50%) translateX(-10px);
  white-space: nowrap;
  padding: 6px 12px;
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
  animation: gradientShift 3s ease infinite;
}

.skill-item:hover .tooltip {
  opacity: 1;
  transform: translateY(-50%) translateX(0);
}

/* courses */
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

/* education */
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

/* languages */
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

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
</style>
