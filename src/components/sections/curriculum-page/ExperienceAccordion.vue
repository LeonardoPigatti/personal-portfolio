<template>
  <div class="experience-accordion">
    <div
      v-for="(exp, idx) in experiences"
      :key="idx"
      class="accordion-item"
    >
      <button class="accordion-header" @click="toggleExperience(idx)">
        <span class="accordion-title" :class="{ open: openExperience === idx }">
          {{ exp.company }}
        </span>

        <span class="accordion-icon">
          {{ openExperience === idx ? "−" : "+" }}
        </span>
      </button>

      <Transition name="accordion">
        <div v-if="openExperience === idx" class="accordion-body">
          <div
            v-for="(pos, pIndex) in exp.positions"
            :key="pIndex"
            class="position-block"
          >
            <p class="accordion-role">{{ pos.role }}</p>

            <ul class="accordion-list">
              <li v-for="(b, i) in pos.bullets" :key="i">
                {{ b }}
              </li>
            </ul>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"

defineProps({
  experiences: Array,
})

const openExperience = ref(null)

const toggleExperience = (index) => {
  openExperience.value = openExperience.value === index ? null : index
}
</script>

<style scoped>
.experience-accordion {
  margin-top: 40px;
  padding: 0 40px;
}

.accordion-item {
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  margin-bottom: 18px;
  overflow: hidden;
}

.accordion-header {
  width: 100%;
  background: white;
  border: none;
  padding: 18px 20px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
}

.accordion-title {
  font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #333;
}

.accordion-title.open {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 3s ease infinite;
}

.accordion-icon {
  font-size: 1.4rem;
  font-weight: 700;
  color: #333;
}

.accordion-body {
  padding: 16px 20px 20px 20px;
  background: white;
}

.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.6s ease;
}

.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.accordion-role {
  font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #666;
  margin-bottom: 10px;
}

.accordion-list {
  margin: 0;
  padding-left: 20px;
}

.accordion-list li {
  font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  font-size: 1rem;
  line-height: 1.7;
  letter-spacing: 0.5px;
  color: #333;
  margin-bottom: 10px;
}

.position-block {
  margin-bottom: 22px;
}

.position-block:last-child {
  margin-bottom: 0;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
</style>
