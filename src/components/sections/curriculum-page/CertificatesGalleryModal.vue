<template>
  <Transition name="modal">
    <div v-if="open" class="gallery-overlay" @click.self="emit('close')">
      <div class="gallery-modal">
        <div class="gallery-header">
          <h2 class="gallery-title">{{ course?.title }}</h2>

          <div class="gallery-actions">
            <button
              v-if="course?.certificates?.length"
              class="gallery-download"
              @click="downloadCurrent"
            >
              ⬇ Save This Certificate
            </button>

            <button
              v-if="course?.verifyUrl"
              class="gallery-download secondary"
              @click="openVerifyLink"
              title="Open credential verification"
            >
              🔎 Verify Credential
            </button>

            <button
              class="gallery-download secondary"
              :disabled="!canDownloadZip"
              @click="downloadAllAsZip"
              :title="
                canDownloadZip
                  ? 'Download all certificates as .zip'
                  : 'Only available quando houver 2+ certificados'
              "
            >
              📦 Save All Certificates
            </button>
          </div>

          <button class="gallery-close" @click="emit('close')">✕</button>
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

        <div v-else class="gallery-empty">No certificates uploaded yet.</div>

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
import { ref, watch, computed } from "vue"
import JSZip from "jszip"

const props = defineProps({
  open: Boolean,
  course: Object,
})

const emit = defineEmits(["close"])

const currentCertificate = ref(0)

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) currentCertificate.value = 0
  }
)

const canDownloadZip = computed(() => {
  return (props.course?.certificates?.length || 0) > 1
})

const nextCertificate = () => {
  const total = props.course?.certificates?.length || 0
  if (!total) return
  currentCertificate.value = (currentCertificate.value + 1) % total
}

const prevCertificate = () => {
  const total = props.course?.certificates?.length || 0
  if (!total) return
  currentCertificate.value = (currentCertificate.value - 1 + total) % total
}

const openVerifyLink = () => {
  if (!props.course?.verifyUrl) return
  window.open(props.course.verifyUrl, "_blank", "noopener,noreferrer")
}

const getSafeTitle = () => {
  return (props.course?.title || "certificates")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "_")
}

const getExtensionFromUrl = (url) => {
  const clean = url.split("?")[0]
  const ext = clean.split(".").pop()?.toLowerCase()

  if (["jpg", "jpeg", "png", "webp"].includes(ext)) return ext
  return "jpg"
}

const downloadBlob = (blob, filename) => {
  const blobUrl = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = blobUrl
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(blobUrl)
}

const downloadCurrent = async () => {
  if (!props.course?.certificates?.length) return

  const url = props.course.certificates[currentCertificate.value]
  const title = getSafeTitle()
  const index = String(currentCertificate.value + 1).padStart(2, "0")
  const ext = getExtensionFromUrl(url)
  const filename = `${title}_${index}.${ext}`

  try {
    const res = await fetch(url)
    const blob = await res.blob()
    downloadBlob(blob, filename)
  } catch (err) {
    // fallback quando fetch é bloqueado por CORS
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.target = "_blank"
    document.body.appendChild(a)
    a.click()
    a.remove()
  }
}

const downloadAllAsZip = async () => {
  if (!canDownloadZip.value) return

  const title = getSafeTitle()
  const zip = new JSZip()
  const urls = props.course.certificates

  let successCount = 0

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i]

    try {
      const res = await fetch(url)

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
      }

      const blob = await res.blob()
      const ext = getExtensionFromUrl(url)
      const index = String(i + 1).padStart(2, "0")
      const filename = `${title}_${index}.${ext}`

      zip.file(filename, blob)
      successCount++
    } catch (err) {
      console.warn(`Could not fetch certificate #${i + 1}:`, url, err)
    }
  }

  if (successCount === 0) {
    alert("Could not generate ZIP. All certificates are blocked (CORS).")
    return
  }

  const zipBlob = await zip.generateAsync({ type: "blob" })
  downloadBlob(zipBlob, `${title}.zip`)
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
  background: rgba(255, 255, 255, 0.95);
  border-radius: 14px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.gallery-header {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 18px 22px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  position: relative;
}

.gallery-title {
  font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  font-size: 1.3rem;
  font-weight: 800;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #222;
  max-width: 90%;
  margin: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 3s ease infinite;
}

.tile {
  aspect-ratio: 1 / 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-decoration: none;

  background: #f6f7fb;

  border: 1px solid #d1d5db;
  border-radius: 16px;

  padding: 1px; /* ESSENCIAL pra borda gradiente aparecer */

  transition: transform 0.18s ease, box-shadow 0.18s ease;
}


/* hover com borda gradiente */
.tile:hover {
  border: 1px solid transparent;

  background:
    linear-gradient(#f6f7fb, #f6f7fb) padding-box,
    linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%) border-box;

  background-size: 100% 100%, 200% 200%;
  animation: gradientShift 3s ease infinite;
}


/* animação do gradiente */
@keyframes gradientShift {
  0% { background-position: 0% 50%, 0% 50%; }
  50% { background-position: 0% 50%, 100% 50%; }
  100% { background-position: 0% 50%, 0% 50%; }
}


.gallery-close {
  border: none;
  background: transparent;
  font-size: 1.4rem;
  cursor: pointer;
  color: #333;
  transition: 0.3s ease;
  position: absolute;
  top: 18px;
  right: 22px;
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
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: 0.25s ease;
}

.gallery-nav:hover {
  transform: translateY(-50%) scale(1.07);
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
  border: 6px solid transparent;
  background: linear-gradient(white, white) padding-box,
    linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%) border-box;
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

.gallery-actions {
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  display: flex;
  margin-top: 10px;
}

.gallery-download {
  border: none;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.9rem;
  color: white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  transition: 0.25s ease;
}

.gallery-download:hover {
  transform: translateY(-1px) scale(1.03);
}

.gallery-download.secondary {
  background: rgba(0, 0, 0, 0.08);
  color: #222;
  box-shadow: none;
  border-radius: 10px;
}

.gallery-download:disabled {
  opacity: 0.35;
  cursor: not-allowed;
  transform: none !important;
}
</style>
