<template>
  <div>
    <!-- Avatar -->
    <div v-show="!isChatOpen" class="avatar" @click="openChat">
      <img :src="src" :alt="alt" />
    </div>

    <!-- Chat -->
    <div v-show="isChatOpen" class="chat-container">
      <!-- Header -->
      <div class="chat-header">
        <div class="chat-header-info">
          <span class="chat-name">{{ chatName }}</span>
        </div>
        <button class="close-btn" @click="closeChat">✕</button>
      </div>

      <!-- Body -->
      <div ref="chatBodyRef" class="chat-body">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          class="chat-message"
          :class="msg.from === 'bot' ? 'received' : 'sent'"
        >
          <p>{{ msg.text }}</p>
        </div>

        <!-- Opções -->
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

      <!-- Footer -->
      <div class="chat-footer">
        <input
          v-model="userText"
          type="text"
          placeholder="Digite uma mensagem..."
          class="chat-input"
          @keydown.enter="sendTypedMessage"
        />
        <button class="send-btn" @click="sendTypedMessage">➤</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { nextTick, ref, computed } from "vue";

defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: "Avatar" },
  chatName: { type: String, default: "Assistente" },
});

const isChatOpen = ref(false);
const userText = ref("");
const chatBodyRef = ref(null);

const messages = ref([
  { from: "bot", text: "Oi! 👋 Eu sou o assistente do portfólio. Como posso te ajudar hoje?" },
]);

/**
 * ARVORE DE DIALOGO
 * Cada nó tem:
 * - text: mensagem do bot
 * - options: respostas do usuário
 * Cada opção aponta para outro nó
 */
const dialogTree = {
  start: {
    text: "Legal! Me diz: o que você quer ver primeiro?",
    options: [
      { label: "📌 Projetos", next: "projects" },
      { label: "👤 Sobre você", next: "about" },
      { label: "🧠 Habilidades", next: "skills" },
      { label: "📩 Contato", next: "contact" },
      { label: "🎯 Objetivos", next: "goals" },
    ],
  },

  // ========== PROJETOS ==========
  projects: {
    text: "Boa! Você quer ver projetos por qual tipo?",
    options: [
      { label: "💻 Front-end", next: "projects_front" },
      { label: "⚙️ Back-end", next: "projects_back" },
      { label: "📱 Mobile", next: "projects_mobile" },
      { label: "🎨 Design/UI", next: "projects_ui" },
      { label: "⬅️ Voltar", next: "start" },
    ],
  },

  projects_front: {
    text: "Show! Quer ver um projeto mais focado em quê?",
    options: [
      { label: "🧩 Componentes (Vue/React)", next: "front_components" },
      { label: "🛒 Landing / E-commerce", next: "front_ecommerce" },
      { label: "📊 Dashboard", next: "front_dashboard" },
      { label: "⬅️ Voltar", next: "projects" },
    ],
  },

  front_components: {
    text: "Eu tenho componentes bem polidos: chat widget, cards, menus e animações. Quer ver qual?",
    options: [
      { label: "💬 Chat Widget (esse aqui)", next: "front_chatwidget" },
      { label: "🧱 Cards e grids", next: "front_cards" },
      { label: "🧭 Menus e navbar", next: "front_navbar" },
      { label: "⬅️ Voltar", next: "projects_front" },
    ],
  },

  front_chatwidget: {
    text: "Esse chat é um dos meus favoritos 😄 Quer que ele seja mais simples ou mais avançado?",
    options: [
      { label: "⚡ Simples (só mensagens)", next: "chat_simple" },
      { label: "🤖 Avançado (opções + IA)", next: "chat_advanced" },
      { label: "⬅️ Voltar", next: "front_components" },
    ],
  },

  chat_simple: {
    text: "Perfeito. O simples é leve e direto. Quer que tenha histórico salvo?",
    options: [
      { label: "💾 Sim, salvar no navegador", next: "chat_storage_yes" },
      { label: "🧹 Não, só sessão", next: "chat_storage_no" },
      { label: "⬅️ Voltar", next: "front_chatwidget" },
    ],
  },

  chat_advanced: {
    text: "Boa escolha 😈 O avançado pode ter botões, fluxos e integração com API. Qual você prefere?",
    options: [
      { label: "🧠 Fluxo com botões (tipo menu)", next: "chat_flow_buttons" },
      { label: "🔌 Integrar com IA depois", next: "chat_integrate_ai" },
      { label: "⬅️ Voltar", next: "front_chatwidget" },
    ],
  },

  chat_storage_yes: {
    text: "Aí sim! Dá pra salvar no localStorage e recuperar tudo ao abrir. Quer também resetar conversa?",
    options: [
      { label: "🧼 Sim, botão de reset", next: "chat_reset_yes" },
      { label: "🚫 Não precisa", next: "chat_reset_no" },
      { label: "⬅️ Voltar", next: "chat_simple" },
    ],
  },

  chat_storage_no: {
    text: "Tranquilo. Sem salvar fica mais limpo e leve. Quer um efeito de typing do bot?",
    options: [
      { label: "⌨️ Sim, digitando...", next: "chat_typing_yes" },
      { label: "⚡ Não, direto", next: "chat_typing_no" },
      { label: "⬅️ Voltar", next: "chat_simple" },
    ],
  },

  chat_reset_yes: {
    text: "Fechado. Isso deixa o chat bem mais profissional. Quer que o botão apareça no header?",
    options: [
      { label: "✅ Sim", next: "end_good" },
      { label: "📌 Melhor no footer", next: "end_good" },
      { label: "⬅️ Voltar", next: "chat_storage_yes" },
    ],
  },

  chat_reset_no: {
    text: "Ok! Menos elementos, mais minimalista. Quer que o chat abra com uma mensagem diferente?",
    options: [
      { label: "👋 Mensagem padrão", next: "end_good" },
      { label: "🎯 Mensagem contextual (ex: projetos)", next: "end_good" },
      { label: "⬅️ Voltar", next: "chat_storage_yes" },
    ],
  },

  chat_typing_yes: {
    text: "Boa! Isso dá um charme real. Quer que seja rápido ou mais humano?",
    options: [
      { label: "⚡ Rápido", next: "end_good" },
      { label: "🙂 Humano", next: "end_good" },
      { label: "⬅️ Voltar", next: "chat_storage_no" },
    ],
  },

  chat_typing_no: {
    text: "Ok, direto ao ponto. Quer que o chat tenha sons (tipo WhatsApp)?",
    options: [
      { label: "🔊 Sim", next: "end_good" },
      { label: "🤫 Não", next: "end_good" },
      { label: "⬅️ Voltar", next: "chat_storage_no" },
    ],
  },

  front_cards: {
    text: "Cards e grids eu faço bem clean e responsivo. Quer estilo mais moderno ou minimalista?",
    options: [
      { label: "✨ Moderno", next: "end_good" },
      { label: "🧊 Minimalista", next: "end_good" },
      { label: "⬅️ Voltar", next: "front_components" },
    ],
  },

  front_navbar: {
    text: "Navbars podem ter animação, blur, sticky, etc. Você prefere qual?",
    options: [
      { label: "🧊 Glassmorphism", next: "end_good" },
      { label: "📌 Sticky", next: "end_good" },
      { label: "⬅️ Voltar", next: "front_components" },
    ],
  },

  front_ecommerce: {
    text: "Tenho projetos tipo landing e e-commerce. Quer ver o foco principal?",
    options: [
      { label: "🛍️ Catálogo e filtros", next: "end_good" },
      { label: "💳 Checkout", next: "end_good" },
      { label: "⬅️ Voltar", next: "projects_front" },
    ],
  },

  front_dashboard: {
    text: "Dashboards ficam muito bons pra portfólio. Quer ver um com gráficos ou com tabelas?",
    options: [
      { label: "📈 Gráficos", next: "end_good" },
      { label: "📋 Tabelas", next: "end_good" },
      { label: "⬅️ Voltar", next: "projects_front" },
    ],
  },

  projects_back: {
    text: "Back-end! Você quer ver projetos com qual foco?",
    options: [
      { label: "🔐 Autenticação", next: "end_good" },
      { label: "🗄️ CRUD com banco", next: "end_good" },
      { label: "🚀 APIs REST", next: "end_good" },
      { label: "⬅️ Voltar", next: "projects" },
    ],
  },

  projects_mobile: {
    text: "Mobile! Você prefere qual stack?",
    options: [
      { label: "📱 React Native", next: "end_good" },
      { label: "🦋 Flutter", next: "end_good" },
      { label: "⬅️ Voltar", next: "projects" },
    ],
  },

  projects_ui: {
    text: "UI/Design! Quer ver mais o quê?",
    options: [
      { label: "🎨 Protótipos", next: "end_good" },
      { label: "🧠 Design System", next: "end_good" },
      { label: "⬅️ Voltar", next: "projects" },
    ],
  },

  // ========== SOBRE ==========
  about: {
    text: "Quer saber sobre qual parte?",
    options: [
      { label: "📍 De onde você é", next: "about_location" },
      { label: "🎓 Formação", next: "about_education" },
      { label: "🧩 Como você trabalha", next: "about_workstyle" },
      { label: "⬅️ Voltar", next: "start" },
    ],
  },

  about_location: {
    text: "Sou do Brasil 🇧🇷 e trabalho com projetos web. Quer saber se eu trabalho remoto?",
    options: [
      { label: "🌍 Sim", next: "about_remote" },
      { label: "🏢 Prefiro presencial", next: "about_presential" },
      { label: "⬅️ Voltar", next: "about" },
    ],
  },

  about_remote: {
    text: "Sim! Eu trabalho muito bem remoto. Quer que eu te passe meu LinkedIn?",
    options: [
      { label: "🔗 Sim", next: "end_contact" },
      { label: "⬅️ Voltar", next: "about_location" },
    ],
  },

  about_presential: {
    text: "Também dá! Depende da cidade e proposta. Quer ir para contato?",
    options: [
      { label: "📩 Sim", next: "contact" },
      { label: "⬅️ Voltar", next: "about_location" },
    ],
  },

  about_education: {
    text: "Eu aprendo muito na prática e estudo bastante por conta. Quer saber minhas tecnologias principais?",
    options: [
      { label: "🧠 Sim", next: "skills" },
      { label: "⬅️ Voltar", next: "about" },
    ],
  },

  about_workstyle: {
    text: "Meu estilo é: código limpo, UI bonita e foco em performance. Quer ver minhas habilidades?",
    options: [
      { label: "🔥 Sim", next: "skills" },
      { label: "⬅️ Voltar", next: "about" },
    ],
  },

  // ========== SKILLS ==========
  skills: {
    text: "Minhas skills principais estão mais em qual área?",
    options: [
      { label: "🎨 Front-end", next: "skills_front" },
      { label: "⚙️ Back-end", next: "skills_back" },
      { label: "🧩 Fullstack", next: "skills_full" },
      { label: "⬅️ Voltar", next: "start" },
    ],
  },

  skills_front: {
    text: "Front-end: Vue, React, Tailwind, animações e UI. Quer ver exemplos ou projetos?",
    options: [
      { label: "📌 Exemplos rápidos", next: "end_good" },
      { label: "🧪 Projetos", next: "projects" },
      { label: "⬅️ Voltar", next: "skills" },
    ],
  },

  skills_back: {
    text: "Back-end: APIs, autenticação, banco de dados. Quer que eu explique meu estilo de API?",
    options: [
      { label: "📦 Sim", next: "end_good" },
      { label: "⬅️ Voltar", next: "skills" },
    ],
  },

  skills_full: {
    text: "Fullstack: eu consigo montar o projeto inteiro. Você quer um exemplo completo?",
    options: [
      { label: "🚀 Sim", next: "end_good" },
      { label: "⬅️ Voltar", next: "skills" },
    ],
  },

  // ========== CONTATO ==========
  contact: {
    text: "Fechado! Como você prefere entrar em contato?",
    options: [
      { label: "📧 Email", next: "contact_email" },
      { label: "💼 LinkedIn", next: "contact_linkedin" },
      { label: "📱 WhatsApp", next: "contact_whatsapp" },
      { label: "⬅️ Voltar", next: "start" },
    ],
  },

  contact_email: {
    text: "Perfeito. Quer que eu abra um formulário de email no site?",
    options: [
      { label: "✅ Sim", next: "end_contact" },
      { label: "🚫 Não, só mostrar o email", next: "end_contact" },
      { label: "⬅️ Voltar", next: "contact" },
    ],
  },

  contact_linkedin: {
    text: "Boa! LinkedIn é o canal mais forte pra vagas. Quer um botão direto?",
    options: [
      { label: "🔗 Sim", next: "end_contact" },
      { label: "⬅️ Voltar", next: "contact" },
    ],
  },

  contact_whatsapp: {
    text: "Ok! WhatsApp é rápido. Quer abrir em nova aba ou modal?",
    options: [
      { label: "🧾 Modal", next: "end_contact" },
      { label: "🌍 Nova aba", next: "end_contact" },
      { label: "⬅️ Voltar", next: "contact" },
    ],
  },

  // ========== OBJETIVOS ==========
  goals: {
    text: "Você quer saber meus objetivos profissionais?",
    options: [
      { label: "🎯 Sim", next: "goals_yes" },
      { label: "⬅️ Voltar", next: "start" },
    ],
  },

  goals_yes: {
    text: "Meu objetivo é crescer como dev e construir produtos bonitos e úteis. Você quer ver projetos ou contato?",
    options: [
      { label: "📌 Projetos", next: "projects" },
      { label: "📩 Contato", next: "contact" },
      { label: "⬅️ Voltar", next: "goals" },
    ],
  },

  // ========== FINAIS ==========
  end_good: {
    text: "Boa! 😄 Se quiser, posso te mostrar mais ou você pode ir direto pro contato.",
    options: [
      { label: "📩 Ir para contato", next: "contact" },
      { label: "📌 Ver projetos", next: "projects" },
      { label: "⬅️ Voltar ao início", next: "start" },
    ],
  },

  end_contact: {
    text: "Fechado! 📩 Se quiser, posso deixar um botão pronto no site pra você me chamar.",
    options: [
      { label: "⬅️ Voltar ao início", next: "start" },
      { label: "📌 Ver projetos", next: "projects" },
    ],
  },
};

const currentNode = ref("start");

const currentOptions = computed(() => {
  const node = dialogTree[currentNode.value];
  return node?.options || [];
});

function openChat() {
  isChatOpen.value = true;
  if (messages.value.length === 1) {
    botSay(dialogTree.start.text);
  }
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
  userSay(opt.label);
  currentNode.value = opt.next;

  const nextNode = dialogTree[opt.next];
  if (nextNode?.text) {
    // Pequeno delay pra parecer mais natural
    setTimeout(() => botSay(nextNode.text), 350);
  }
}

function sendTypedMessage() {
  const text = userText.value.trim();
  if (!text) return;

  userSay(text);
  userText.value = "";

  // Resposta simples se usuário digitar livre
  setTimeout(() => {
    botSay(
      "Boa! 😄 Se você quiser, pode usar os botões abaixo pra navegar pelo portfólio."
    );
  }, 350);
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
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
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
  content: "";
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
  width: 420px;
  height: 620px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
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

.chat-name {
  font-weight: 700;
  font-size: 16px;
}

.close-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 22px;
  cursor: pointer;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  transition: background 0.2s;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* ===== CHAT BODY ===== */
.chat-body {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  background: #f5f5f5;
}

.chat-message {
  margin-bottom: 12px;
  max-width: 80%;
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

/* ===== OPÇÕES ===== */
.options-area {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.option-btn {
  background: white;
  border: 1px solid #ddd;
  border-radius: 999px;
  padding: 10px 14px;
  font-size: 13px;
  cursor: pointer;
  transition: transform 0.15s ease, border 0.15s ease;
}

.option-btn:hover {
  transform: translateY(-1px);
  border-color: #667eea;
}

/* ===== CHAT FOOTER ===== */
.chat-footer {
  padding: 14px;
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
}

.chat-input:focus {
  border-color: #667eea;
}

.send-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Scrollbar */
.chat-body::-webkit-scrollbar {
  width: 10px;
}
.chat-body::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 3px;
}
.chat-body::-webkit-scrollbar-thumb:hover {
  background: #999;
}

/* RESPONSIVO */
@media (max-width: 600px) {
  .chat-container {
    right: 12px;
    left: 12px;
    width: auto;
    height: 70vh;
    bottom: 12px;
  }

  .avatar {
    right: 16px;
    bottom: 16px;
    width: 90px;
    height: 90px;
  }
}
</style>
