<template>
  <div>
    <!-- Avatar - só aparece quando chat está fechado -->
    <div 
      v-show="!isChatOpen" 
      class="avatar"
      @click="openChat"
    >
      <img :src="src" :alt="alt" />
    </div>

    <!-- Chat Box - só aparece quando está aberto -->
    <div v-show="isChatOpen" class="chat-container">
      <!-- Header do Chat -->
      <div class="chat-header">
        <div class="chat-header-info">
          <img :src="src" :alt="alt" class="chat-avatar" />
          <span class="chat-name">{{ chatName }}</span>
        </div>
        <button class="close-btn" @click="closeChat">✕</button>
      </div>

      <!-- Corpo do Chat -->
      <div class="chat-body">
        <div class="chat-message received">
          <p>Olá! Como posso ajudar?</p>
        </div>
        <!-- Adicione mais mensagens aqui se quiser -->
      </div>

      <!-- Footer do Chat (input) -->
      <div class="chat-footer">
        <input 
          type="text" 
          placeholder="Digite uma mensagem..."
          class="chat-input"
        />
        <button class="send-btn">➤</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: 'Avatar' },
  chatName: { type: String, default: 'Chat' }
})

const isChatOpen = ref(false)

function openChat() {
  isChatOpen.value = true
}

function closeChat() {
  isChatOpen.value = false
}
</script>

<style scoped>
/* ===== AVATAR ===== */
.avatar {
  position: fixed;
  bottom: 80px;
  right: 80px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
  cursor: pointer;
  transition: transform 0.2s ease;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
}

.avatar:hover img {
  opacity: 0;
}

.avatar::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 200% 200%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.avatar:hover::after {
  opacity: 1;
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* ===== CHAT CONTAINER ===== */
.chat-container {
  position: fixed;
  bottom: 80px;
  right: 80px;
  width: 350px;
  height: 500px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* ===== CHAT HEADER ===== */
.chat-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-header-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.chat-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid white;
}

.chat-name {
  font-weight: 600;
  font-size: 16px;
}

.close-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.2s;
}

.close-btn:hover {
  background: rgba(255,255,255,0.2);
}

/* ===== CHAT BODY ===== */
.chat-body {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: #f5f5f5;
}

.chat-message {
  margin-bottom: 12px;
  max-width: 70%;
}

.chat-message p {
  padding: 10px 14px;
  border-radius: 16px;
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
}

.chat-message.received p {
  background: white;
  color: #333;
  border-bottom-left-radius: 4px;
}

.chat-message.sent {
  margin-left: auto;
}

.chat-message.sent p {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-bottom-right-radius: 4px;
}

/* ===== CHAT FOOTER ===== */
.chat-footer {
  padding: 16px;
  background: white;
  border-top: 1px solid #e0e0e0;
  display: flex;
  gap: 8px;
}

.chat-input {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 14px;
  outline: none;
  transition: border 0.2s;
}

.chat-input:focus {
  border-color: #667eea;
}

.send-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}

.send-btn:hover {
  transform: scale(1.1);
}

.send-btn:active {
  transform: scale(0.95);
}

/* Scrollbar customizada */
.chat-body::-webkit-scrollbar {
  width: 6px;
}

.chat-body::-webkit-scrollbar-track {
  background: transparent;
}

.chat-body::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 3px;
}

.chat-body::-webkit-scrollbar-thumb:hover {
  background: #999;
}
</style>