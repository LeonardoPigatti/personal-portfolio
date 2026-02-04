<template>
  <Transition name="modal">
    <div v-if="open" class="gallery-overlay" @click.self="$emit('close')">
      <div class="gallery-modal">
        <div class="gallery-header">
          <h2 class="gallery-title">{{ course?.title }}</h2>
          <button class="gallery-close" @click="$emit('close')">✕</button>
        </div>

        <div v-if="course?.certificates?.length" class="gallery-body">
          <button class="gallery-nav left" @click="prevCertificate">‹</button>

          <img
            :src="course.certificates[currentCertificate]"
            class="gallery-image"
            alt="Certificate"
          />

          <button class="gallery-nav right" @click="nextCertificate">›</button>
        </div>

        <div v-else class="gallery-empty">
          No certificates uploaded yet.
        </div>

        <div v-if="course?.certificates?.length > 1" class="gallery-thumbs">
          <img
            v-for="(img, i) in course.certificates"
            :key="i"
            :src="img"
            class="thumb"
            :class="{ active: i === currentCertificate }"
            @click="currentCertificate = i"
          />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch } from "vue"

const props = defineProps({
  open: Boolean,
  course: Object,
})

defineEmits(["close"])

const currentCertificate = ref(0)

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) currentCertificate.value = 0
  }
)

const nextCertificate = () => {
  const total = props.course.certificates.length
  currentCertificate.value = (currentCertificate.value + 1) % total
}

const prevCertificate = () => {
  const total = props.course.certificates.length
  currentCertificate.value = (currentCertificate.value - 1 + total) % total
}
</script>

<style scoped>
.gallery-overlay {
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 20, 0.65);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 30px;
}

.gallery-modal {
  width: min(1100px, 95vw);
  max-height: 90vh;
  background: rgba(255, 255, 255, 0.92);
  border-radius: 22px;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.gallery-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 22px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.gallery-title {
  font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #222;
  max-width: 90%;
}

.gallery-close {
  border: none;
  background: transparent;
  font-size: 1.4rem;
  cursor: pointer;
  color: #333;
  transition: 0.3s ease;
}

.gallery-close:hover {
  transform: scale(1.1);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.gallery-body {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
}

.gallery-image {
  width: 100%;
  max-width: 860px;
  max-height: 62vh;
  object-fit: contain;
  border-radius: 18px;
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.15);
}

.gallery-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  cursor: pointer;
  font-size: 2.2rem;
  font-weight: 700;
  width: 55px;
  height: 55px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  transition: 0.25s ease;
}

.gallery-nav:hover {
  transform: translateY(-50%) scale(1.07);
  background: white;
}

.gallery-nav.left {
  left: 18px;
}

.gallery-nav.right {
  right: 18px;
}

.gallery-thumbs {
  display: flex;
  gap: 12px;
  padding: 14px 18px 18px 18px;
  justify-content: center;
  overflow-x: auto;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.thumb {
  height: 70px;
  width: auto;
  border-radius: 12px;
  cursor: pointer;
  opacity: 0.55;
  transition: 0.25s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
}

.thumb:hover {
  opacity: 1;
  transform: scale(1.03);
}

.thumb.active {
  opacity: 1;
  outline: 2px solid rgba(118, 75, 162, 0.55);
}

.gallery-empty {
  padding: 50px 20px;
  text-align: center;
  font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  font-size: 1rem;
  color: #666;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.35s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.97);
}
</style>
