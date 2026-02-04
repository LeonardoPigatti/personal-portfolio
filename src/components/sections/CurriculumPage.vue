<template>
  <section class="section s1">

    <div class="content">
      <S1Hero :isVisible="isVisible" />

      <div class="curriculum-wrapper">
        <CurriculumCarousel
          :sections="sections"
          :currentSection="currentSection"
          :isVisible="isVisible"
          @next="nextSection"
          @prev="previousSection"
          @open-course="openCourseGallery"
        />
      </div>
    </div>

    <CertificatesGalleryModal
      :open="galleryOpen"
      :course="selectedCourse"
      @close="closeGallery"
    />
  </section>
</template>

<script setup>
import { ref, watch, onMounted } from "vue"

import S1Hero from "/src/components/sections/S1Hero.vue"
import CurriculumCarousel from "/src/components/sections/CurriculumCarousel.vue"
import CertificatesGalleryModal from "/src/components/sections/CertificatesGalleryModal.vue"

import { cvSections } from "@/data/cvSections"

const props = defineProps({
  active: {
    type: Boolean,
    required: true,
  },
})

const isVisible = ref(false)

watch(
  () => props.active,
  (isActive) => {
    isVisible.value = !!isActive
  }
)

onMounted(() => {
  if (props.active) isVisible.value = true
})

// ===== Carrossel =====
const sections = cvSections
const currentSection = ref(0)

const nextSection = () => {
  currentSection.value = (currentSection.value + 1) % sections.length
}

const previousSection = () => {
  currentSection.value = (currentSection.value - 1 + sections.length) % sections.length
}

// ===== Modal certificados =====
const galleryOpen = ref(false)
const selectedCourse = ref(null)

const openCourseGallery = (course) => {
  selectedCourse.value = course
  galleryOpen.value = true
}

const closeGallery = () => {
  galleryOpen.value = false
  selectedCourse.value = null
}
</script>

<style scoped>
.section.s1 {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 14rem;
  background: #ffffff;
}

.content {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  max-width: 1200px;
  gap: 4rem;
  position: relative;
  z-index: 2;
}

.curriculum-wrapper {
  flex: 1;
}

@media (max-width: 768px) {
  .content {
    flex-direction: column;
    gap: 2rem;
  }
}
</style>
