<template>
  <div>
    <div v-show="!isChatOpen" class="avatar" @click="openChat">
      <img :src="src" :alt="alt" />
    </div>

    <div v-show="isChatOpen" class="chat-container">
      <div class="chat-header">
        <div class="chat-header-info">
          <span class="chat-name">{{ chatName }}</span>
        </div>
        <button class="close-btn" @click="closeChat">✕</button>
      </div>

      <div ref="chatBodyRef" class="chat-body">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          class="chat-message"
          :class="msg.from === 'bot' ? 'received' : 'sent'"
        >
          <p>{{ msg.text }}</p>
        </div>

        <div v-if="currentOptions.length" class="options-area">
          <button
            v-for="(opt, idx) in currentOptions"
            :key="idx"
            class="option-btn"
            @click="chooseOption(opt)"
          >
            {{ opt.label }}
          </button>
        </div>
      </div>

      <div class="chat-footer">
        <input
          v-model="userText"
          type="text"
          :placeholder="t().chat.placeholder"
          class="chat-input"
          @keydown.enter="sendTypedMessage"
        />
        <button class="send-btn" @click="sendTypedMessage">➤</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { nextTick, ref, computed, watch } from "vue";
import { useLang } from "@/useLang";

const { t, selectedLang } = useLang();

defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: "Avatar" },
  chatName: { type: String, default: "Assistente" },
});

const isChatOpen = ref(false);
const userText = ref("");
const chatBodyRef = ref(null);

const links = {
  linkedin:  "https://www.linkedin.com/in/leonardo-pigatti-6bb369206/",
  instagram: "https://www.instagram.com/leonardopigatti.tech?igsh=dHQ4OXhyczgyYmkx&utm_source=qr",
  whatsapp:  "https://wa.me/19998946859",
  youtube:   "https://www.youtube.com/",
  upwork:    "https://www.upwork.com/",
  beecrowd:  "https://judge.beecrowd.com/pt/profile/1210654",
  github:    "https://github.com/LeonardoPigatti",
  email:     "mailto:leonardopigatti@yahoo.com.br",
};

const dialogTree = computed(() => t().chat.dialogTree(links));

const currentNode = ref("start");

const currentOptions = computed(() => {
  const node = dialogTree.value[currentNode.value];
  return node?.options || [];
});

const messages = ref([]);

function initMessages() {
  messages.value = [
    { from: "bot", text: t().chat.greeting },
    { from: "bot", text: dialogTree.value.start.text },
  ];
  currentNode.value = "start";
}

// Reinicia o chat quando o idioma muda
watch(selectedLang, () => {
  initMessages();
});

initMessages();

function openChat() {
  isChatOpen.value = true;
  scrollToBottom();
}

function closeChat() {
  isChatOpen.value = false;
}

function botSay(text) {
  messages.value.push({ from: "bot", text });
  scrollToBottom();
}

function userSay(text) {
  messages.value.push({ from: "user", text });
  scrollToBottom();
}

async function scrollToBottom() {
  await nextTick();
  if (!chatBodyRef.value) return;
  chatBodyRef.value.scrollTop = chatBodyRef.value.scrollHeight;
}

function chooseOption(opt) {
  if (opt.action === "link") {
    userSay(opt.label);
    window.open(opt.url, "_blank", "noopener,noreferrer");
    setTimeout(() => botSay(t().chat.linkOpened), 350);
    return;
  }

  userSay(opt.label);
  currentNode.value = opt.next;
  const nextNode = dialogTree.value[opt.next];
  if (nextNode?.text) {
    setTimeout(() => botSay(nextNode.text), 350);
  }
}

function sendTypedMessage() {
  const text = userText.value.trim();
  if (!text) return;

  userSay(text);
  userText.value = "";

  const matchedNode = matchKeywords(text);

  setTimeout(() => {
    if (matchedNode && dialogTree.value[matchedNode]) {
      currentNode.value = matchedNode;
      botSay(dialogTree.value[matchedNode].text);
    } else {
      botSay(t().chat.noMatch);
    }
  }, 350);
}

function matchKeywords(text) {
  const lower = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const keywords = t().chat.keywordMap;
  for (const entry of keywords) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry.node;
    }
  }
  return null;
}
</script>

<style scoped>
.avatar {
  position: fixed;
  bottom: 80px;
  right: 80px;
  width: 165px;
  height: 165px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.35);
  cursor: pointer;
  transition: transform 0.2s ease;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar:hover { transform: scale(1.03); }

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: linear-gradient(135deg, color-mix(in srgb, var(--color-primary) 45%, transparent) 0%, color-mix(in srgb, var(--color-secondary) 45%, transparent) 50%, color-mix(in srgb, var(--color-accent) 45%, transparent) 100%);
  background-size: 200% 200%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.avatar:hover::after {
  opacity: 1;
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.chat-container {
  position: fixed;
  bottom: 80px;
  right: 80px;
  width: 840px;
  height: min(1240px, 85vh);
  background: white;
  border-radius: 28px;
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.25);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}

.chat-header {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  color: white;
  padding: 26px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-name { font-weight: 800; font-size: 28px; letter-spacing: 0.2px; }

.close-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 34px;
  cursor: pointer;
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.2s;
}

.close-btn:hover { background: rgba(255, 255, 255, 0.2); }

.chat-body {
  flex: 1;
  padding: 26px;
  overflow-y: auto;
  background: #f5f5f5;
}

.chat-message { margin-bottom: 18px; max-width: 82%; }

.chat-message p {
  padding: 18px 22px;
  border-radius: 22px;
  margin: 0;
  font-size: 22px;
  line-height: 1.45;
}

.chat-message.received p {
  background: white;
  color: #333;
  border-bottom-left-radius: 6px;
}

.chat-message.sent { margin-left: auto; }

.chat-message.sent p {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  color: white;
  border-bottom-right-radius: 6px;
}

.options-area { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 18px; }

.option-btn {
  background: white;
  border: 2px solid #ddd;
  border-radius: 999px;
  padding: 16px 20px;
  font-size: 20px;
  cursor: pointer;
  transition: transform 0.15s ease, border 0.15s ease;
}

.option-btn:hover { transform: translateY(-2px); border-color: var(--color-primary); }

.chat-footer {
  padding: 22px;
  background: white;
  border-top: 2px solid #e0e0e0;
  display: flex;
  gap: 12px;
}

.chat-input {
  flex: 1;
  padding: 18px 22px;
  border: 2px solid #ddd;
  border-radius: 999px;
  font-size: 22px;
  outline: none;
}

.chat-input:focus { border-color: var(--color-primary); }

.send-btn {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  border: none;
  color: white;
  font-size: 26px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}

.send-btn:hover  { transform: scale(1.06); }
.send-btn:active { transform: scale(0.95); }

.chat-body::-webkit-scrollbar { width: 14px; }
.chat-body::-webkit-scrollbar-thumb { background: #c9c9c9; border-radius: 6px; }
.chat-body::-webkit-scrollbar-thumb:hover { background: #999; }

@media (max-width: 1100px) {
  .chat-container { width: 92vw; right: 20px; left: 20px; }
}

@media (max-width: 600px) {
  .chat-container { right: 12px; left: 12px; width: auto; height: 75vh; bottom: 12px; border-radius: 20px; }
  .avatar { right: 16px; bottom: 16px; width: 110px; height: 110px; }
  .chat-name { font-size: 20px; }
  .chat-message p { font-size: 18px; }
  .option-btn { font-size: 16px; padding: 12px 16px; }
  .chat-input { font-size: 18px; padding: 14px 16px; }
  .send-btn { width: 56px; height: 56px; font-size: 20px; }
}
</style>