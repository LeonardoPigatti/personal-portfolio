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

// ========== LINKS ==========
const links = {
  linkedin:  "https://www.linkedin.com/in/leonardo-pigatti-6bb369206/",
  instagram: "https://www.instagram.com/leonardopigatti.tech?igsh=dHQ4OXhyczgyYmkx&utm_source=qr",
  whatsapp:  "https://wa.me/19998946859",
  youtube:   "hthttps://www.youtube.com/",
  upwork:    "https://www.upwork.com/",
  beecrowd:  "https://judge.beecrowd.com/pt/profile/1210654",
  github:    "https://github.com/LeonardoPigatti",
  email:     "mailto:leonardopigatti@yahoo.com.br",
};

const dialogTree = {
  start: {
    text: "Por onde você prefere começar?",
    options: [
      { label: "📁 Projetos", next: "projects" },
      { label: "👤 Sobre o profissional", next: "about" },
      { label: "🛠️ Competências", next: "skills" },
      { label: "📩 Contato", next: "contact" },
      { label: "🎯 Objetivos profissionais", next: "goals" },
    ],
  },

  // ========== PROJETOS ==========
  projects: {
    text: "Os projetos estão organizados por área de atuação. Qual segmento é de seu interesse?",
    options: [
      { label: "💻 Front-end", next: "projects_front" },
      { label: "⚙️ Back-end", next: "projects_back" },
      { label: "📱 Mobile", next: "projects_mobile" },
      { label: "🎨 Design de interfaces", next: "projects_ui" },
      { label: "⬅️ Voltar", next: "start" },
    ],
  },

  projects_front: {
    text: "Os projetos de front-end abrangem diferentes entregas. Qual especificamente lhe interessa?",
    options: [
      { label: "🧩 Componentes reutilizáveis", next: "front_components" },
      { label: "🛒 Landing pages e e-commerce", next: "front_ecommerce" },
      { label: "📊 Dashboards e painéis", next: "front_dashboard" },
      { label: "⬅️ Voltar", next: "projects" },
    ],
  },

  front_components: {
    text: "O portfólio conta com componentes desenvolvidos com foco em reusabilidade e qualidade visual — entre eles este próprio chat. Qual você gostaria de explorar?",
    options: [
      { label: "💬 Chat widget interativo", next: "front_chatwidget" },
      { label: "🧱 Cards e layouts de grade", next: "front_cards" },
      { label: "🧭 Navegação e menus", next: "front_navbar" },
      { label: "⬅️ Voltar", next: "projects_front" },
    ],
  },

  front_chatwidget: {
    text: "Este componente foi desenvolvido em Vue 3 com árvore de diálogo estruturada. Qual abordagem lhe interessa avaliar?",
    options: [
      { label: "⚡ Versão simplificada", next: "chat_simple" },
      { label: "🤖 Versão com integração a IA", next: "chat_advanced" },
      { label: "⬅️ Voltar", next: "front_components" },
    ],
  },

  chat_simple: {
    text: "A versão simplificada prioriza leveza e clareza. Deseja que inclua persistência de histórico?",
    options: [
      { label: "💾 Sim, com armazenamento local", next: "chat_storage_yes" },
      { label: "🧹 Não, apenas por sessão", next: "chat_storage_no" },
      { label: "⬅️ Voltar", next: "front_chatwidget" },
    ],
  },

  chat_advanced: {
    text: "A versão avançada suporta fluxos guiados por botões e integração com APIs de linguagem natural. Qual abordagem prefere?",
    options: [
      { label: "🧠 Fluxo estruturado com opções", next: "chat_flow_buttons" },
      { label: "🔌 Integração com LLM via API", next: "chat_integrate_ai" },
      { label: "⬅️ Voltar", next: "front_chatwidget" },
    ],
  },

  chat_flow_buttons: {
    text: "Esta é exatamente a abordagem utilizada neste chat — uma árvore de diálogo com navegação por botões, sem dependência de serviços externos. Deseja conhecer outros projetos ou entrar em contato?",
    options: [
      { label: "📁 Ver outros projetos", next: "projects" },
      { label: "📩 Entrar em contato", next: "contact" },
      { label: "⬅️ Voltar", next: "chat_advanced" },
    ],
  },

  chat_integrate_ai: {
    text: "A integração com modelos de linguagem permite respostas dinâmicas via OpenAI, Claude ou APIs similares. É uma evolução natural deste componente. Gostaria de discutir essa possibilidade?",
    options: [
      { label: "📩 Entrar em contato", next: "contact" },
      { label: "📁 Ver outros projetos", next: "projects" },
      { label: "⬅️ Voltar", next: "chat_advanced" },
    ],
  },

  chat_storage_yes: {
    text: "Com localStorage, o histórico é preservado entre sessões. Deseja também incluir a opção de redefinir a conversa?",
    options: [
      { label: "✅ Sim, com botão de reset", next: "chat_reset_yes" },
      { label: "🚫 Não é necessário", next: "chat_reset_no" },
      { label: "⬅️ Voltar", next: "chat_simple" },
    ],
  },

  chat_storage_no: {
    text: "Sem persistência, o componente fica mais leve e com menos dependências. Deseja incluir um indicador visual de digitação?",
    options: [
      { label: "⌨️ Sim, indicador de digitação", next: "chat_typing_yes" },
      { label: "⚡ Não, resposta imediata", next: "chat_typing_no" },
      { label: "⬅️ Voltar", next: "chat_simple" },
    ],
  },

  chat_reset_yes: {
    text: "A opção de reset melhora a experiência em demonstrações. Onde prefere posicioná-la?",
    options: [
      { label: "✅ No cabeçalho", next: "end_good" },
      { label: "📌 No rodapé", next: "end_good" },
      { label: "⬅️ Voltar", next: "chat_storage_yes" },
    ],
  },

  chat_reset_no: {
    text: "Sem o reset, a interface se mantém mais limpa. Deseja personalizar a mensagem de abertura do chat?",
    options: [
      { label: "👋 Manter mensagem padrão", next: "end_good" },
      { label: "🎯 Mensagem contextualizada", next: "end_good" },
      { label: "⬅️ Voltar", next: "chat_storage_yes" },
    ],
  },

  chat_typing_yes: {
    text: "O indicador de digitação contribui para uma experiência mais natural. Qual velocidade prefere?",
    options: [
      { label: "⚡ Ágil", next: "end_good" },
      { label: "🙂 Cadência humana", next: "end_good" },
      { label: "⬅️ Voltar", next: "chat_storage_no" },
    ],
  },

  chat_typing_no: {
    text: "Respostas imediatas são ideais em contextos de alta eficiência. Deseja adicionar notificações sonoras?",
    options: [
      { label: "🔊 Sim", next: "end_good" },
      { label: "🤫 Não", next: "end_good" },
      { label: "⬅️ Voltar", next: "chat_storage_no" },
    ],
  },

  front_cards: {
    text: "Os componentes de card e grade foram desenvolvidos com foco em responsividade e consistência visual. Qual estilo melhor se alinha ao seu projeto?",
    options: [
      { label: "✨ Moderno", next: "end_good" },
      { label: "🧊 Minimalista", next: "end_good" },
      { label: "⬅️ Voltar", next: "front_components" },
    ],
  },

  front_navbar: {
    text: "As implementações de navegação incluem variações com glassmorphism, comportamento sticky e animações de transição. Qual desperta mais interesse?",
    options: [
      { label: "🧊 Glassmorphism", next: "end_good" },
      { label: "📌 Sticky com scroll", next: "end_good" },
      { label: "⬅️ Voltar", next: "front_components" },
    ],
  },

  front_ecommerce: {
    text: "Os projetos de e-commerce e landing page cobrem desde a apresentação do produto até o fluxo de conversão. Qual etapa prefere analisar?",
    options: [
      { label: "🛍️ Catálogo e filtros", next: "end_good" },
      { label: "💳 Checkout e pagamento", next: "end_good" },
      { label: "⬅️ Voltar", next: "projects_front" },
    ],
  },

  front_dashboard: {
    text: "Os painéis desenvolvidos combinam visualização de dados com usabilidade. Qual formato é mais relevante para sua avaliação?",
    options: [
      { label: "📈 Gráficos e indicadores", next: "end_good" },
      { label: "📋 Tabelas e relatórios", next: "end_good" },
      { label: "⬅️ Voltar", next: "projects_front" },
    ],
  },

  projects_back: {
    text: "Os projetos de back-end contemplam diferentes camadas de uma aplicação. Qual área é de seu interesse?",
    options: [
      { label: "🔐 Autenticação e autorização", next: "end_good" },
      { label: "🗄️ Modelagem e persistência de dados", next: "end_good" },
      { label: "🚀 APIs RESTful", next: "end_good" },
      { label: "🧩 Perfil Beecrowd", action: "link", url: links.beecrowd },
      { label: "⬅️ Voltar", next: "projects" },
    ],
  },

  projects_mobile: {
    text: "O desenvolvimento mobile foi realizado com foco em performance e experiência nativa. Qual plataforma prefere avaliar?",
    options: [
      { label: "📱 React Native", next: "end_good" },
      { label: "🦋 Flutter", next: "end_good" },
      { label: "⬅️ Voltar", next: "projects" },
    ],
  },

  projects_ui: {
    text: "O trabalho de design cobre desde a concepção de protótipos até a estruturação de sistemas de design. O que prefere conhecer?",
    options: [
      { label: "🎨 Prototipagem e fluxos", next: "end_good" },
      { label: "🧩 Design system", next: "end_good" },
      { label: "⬅️ Voltar", next: "projects" },
    ],
  },

  // ========== SOBRE ==========
  about: {
    text: "Sobre qual aspecto da trajetória profissional você gostaria de saber mais?",
    options: [
      { label: "📍 Localização e disponibilidade", next: "about_location" },
      { label: "🎓 Formação e capacitação", next: "about_education" },
      { label: "🧩 Metodologia de trabalho", next: "about_workstyle" },
      { label: "⬅️ Voltar", next: "start" },
    ],
  },

  about_location: {
    text: "Atuo com base no Brasil e tenho disponibilidade para projetos remotos, bem como para oportunidades presenciais a depender da localidade e da proposta. Deseja saber mais sobre disponibilidade?",
    options: [
      { label: "🌍 Trabalho remoto", next: "about_remote" },
      { label: "🏢 Trabalho presencial", next: "about_presential" },
      { label: "⬅️ Voltar", next: "about" },
    ],
  },

  about_remote: {
    text: "Tenho experiência consolidada em rotinas de trabalho remoto, incluindo colaboração assíncrona e uso de ferramentas de gestão distribuída. Posso encaminhar meu perfil no LinkedIn caso seja de seu interesse.",
    options: [
      { label: "🔗 Acessar LinkedIn", action: "link", url: links.linkedin },
      { label: "⬅️ Voltar", next: "about_location" },
    ],
  },

  about_presential: {
    text: "Estou aberto a oportunidades presenciais mediante análise da proposta e localidade. Para discutirmos os detalhes, podemos entrar em contato diretamente.",
    options: [
      { label: "📩 Ir para contato", next: "contact" },
      { label: "⬅️ Voltar", next: "about_location" },
    ],
  },

  about_education: {
    text: "Minha formação é predominantemente prática, complementada por cursos especializados e aprendizado contínuo por meio de projetos reais. Gostaria de conhecer as tecnologias que domino?",
    options: [
      { label: "🛠️ Ver competências", next: "skills" },
      { label: "⬅️ Voltar", next: "about" },
    ],
  },

  about_workstyle: {
    text: "Trabalho com foco em código sustentável, interfaces cuidadosas e entregas que equilibram velocidade e qualidade. Valorizo comunicação clara, revisão de código e documentação adequada. Deseja ver minhas competências técnicas?",
    options: [
      { label: "🛠️ Ver competências", next: "skills" },
      { label: "⬅️ Voltar", next: "about" },
    ],
  },

  // ========== SKILLS ==========
  skills: {
    text: "As competências estão distribuídas entre diferentes camadas do desenvolvimento. Qual área é mais relevante para sua avaliação?",
    options: [
      { label: "🎨 Front-end", next: "skills_front" },
      { label: "⚙️ Back-end", next: "skills_back" },
      { label: "🧩 Fullstack", next: "skills_full" },
      { label: "⬅️ Voltar", next: "start" },
    ],
  },

  skills_front: {
    text: "No front-end, tenho domínio de Vue.js, React, Tailwind CSS, animações com CSS e JavaScript, e boas práticas de acessibilidade e performance. Deseja ver exemplos aplicados ou projetos completos?",
    options: [
      { label: "📌 Exemplos de componentes", next: "end_good" },
      { label: "📁 Projetos completos", next: "projects" },
      { label: "💻 Ver GitHub", action: "link", url: links.github },
      { label: "⬅️ Voltar", next: "skills" },
    ],
  },

  skills_back: {
    text: "No back-end, tenho experiência com desenvolvimento de APIs RESTful, autenticação segura e modelagem de banco de dados relacional e não relacional. Gostaria de detalhes sobre minha abordagem técnica?",
    options: [
      { label: "📦 Sim, quero saber mais", next: "end_good" },
      { label: "⬅️ Voltar", next: "skills" },
    ],
  },

  skills_full: {
    text: "Tenho capacidade de conduzir o ciclo completo de desenvolvimento de uma aplicação — do planejamento da arquitetura à entrega em produção. Gostaria de ver um exemplo de projeto fullstack?",
    options: [
      { label: "🚀 Sim", next: "end_good" },
      { label: "⬅️ Voltar", next: "skills" },
    ],
  },

  // ========== CONTATO ==========
  contact: {
    text: "Estou disponível para contato pelos seguintes canais. Qual prefere utilizar?",
    options: [
      { label: "📧 E-mail", next: "contact_email" },
      { label: "💼 LinkedIn", next: "contact_linkedin" },
      { label: "📱 WhatsApp", next: "contact_whatsapp" },
      { label: "💼 Upwork", next: "contact_upwork" },
      { label: "⬅️ Voltar", next: "start" },
    ],
  },

  contact_email: {
    text: "Pode entrar em contato diretamente pelo e-mail leonardopigatti@yahoo.com.br. Clique abaixo para abrir o cliente de e-mail.",
    options: [
      { label: "📧 Abrir e-mail", action: "link", url: links.email },
      { label: "⬅️ Voltar", next: "contact" },
    ],
  },

  contact_linkedin: {
    text: "O LinkedIn é o canal mais indicado para oportunidades profissionais. Clique abaixo para acessar o perfil diretamente.",
    options: [
      { label: "🔗 Acessar LinkedIn", action: "link", url: links.linkedin },
      { label: "⬅️ Voltar", next: "contact" },
    ],
  },

  contact_whatsapp: {
    text: "O WhatsApp permite uma comunicação mais ágil. Clique abaixo para iniciar uma conversa.",
    options: [
      { label: "📱 Abrir WhatsApp", action: "link", url: links.whatsapp },
      { label: "⬅️ Voltar", next: "contact" },
    ],
  },

  contact_upwork: {
    text: "Para projetos freelance, meu perfil no Upwork concentra avaliações e histórico de entregas.",
    options: [
      { label: "🔗 Acessar Upwork", action: "link", url: links.upwork },
      { label: "⬅️ Voltar", next: "contact" },
    ],
  },

  // ========== OBJETIVOS ==========
  goals: {
    text: "Gostaria de conhecer os objetivos profissionais?",
    options: [
      { label: "🎯 Sim", next: "goals_yes" },
      { label: "⬅️ Voltar", next: "start" },
    ],
  },

  goals_yes: {
    text: "Busco integrar equipes onde excelência técnica e cuidado com o produto caminham juntos. Meu interesse está em posições que estimulem o desenvolvimento de soluções robustas, bem arquitetadas e com impacto real para o negócio — seja em front-end especializado, desenvolvimento fullstack ou na liderança técnica de projetos. Estou aberto tanto a vínculos CLT quanto a colaborações por projeto. Gostaria de analisar meu trabalho ou prefere entrar em contato diretamente?",
    options: [
      { label: "📁 Ver projetos", next: "projects" },
      { label: "📩 Entrar em contato", next: "contact" },
      { label: "⬅️ Voltar", next: "goals" },
    ],
  },

  // ========== FINAIS ==========
  end_good: {
    text: "Fico à disposição caso tenha dúvidas adicionais. Podemos continuar explorando o portfólio ou iniciar uma conversa diretamente.",
    options: [
      { label: "📩 Entrar em contato", next: "contact" },
      { label: "📁 Ver mais projetos", next: "projects" },
      { label: "⬅️ Voltar ao início", next: "start" },
    ],
  },

  end_contact: {
    text: "Agradeço o interesse. Retornarei o contato com brevidade. Caso prefira explorar meu código diretamente, os repositórios estão disponíveis no GitHub.",
    options: [
      { label: "💻 Acessar GitHub", action: "link", url: links.github },
      { label: "⬅️ Voltar ao início", next: "start" },
      { label: "📁 Ver projetos", next: "projects" },
    ],
  },
};

// Mensagens iniciais — sem duplicação
const messages = ref([
  { from: "bot", text: "Olá. Sou o assistente virtual deste portfólio. Como posso orientá-lo?" },
  { from: "bot", text: dialogTree.start.text },
]);

// Mapa de palavras-chave → nó da árvore
const keywordMap = [
  { keywords: ["projeto", "projetos", "trabalho", "trabalhos", "portfolio", "portfólio"], node: "projects" },
  { keywords: ["front", "frontend", "front-end", "vue", "react", "css", "html", "tailwind", "componente"], node: "projects_front" },
  { keywords: ["back", "backend", "back-end", "api", "node", "banco", "database", "sql"], node: "projects_back" },
  { keywords: ["mobile", "app", "flutter", "react native"], node: "projects_mobile" },
  { keywords: ["design", "ui", "ux", "figma", "prototipo", "protótipo"], node: "projects_ui" },
  { keywords: ["skill", "skills", "habilidade", "habilidades", "competencia", "competência", "tecnologia", "stack"], node: "skills" },
  { keywords: ["sobre", "quem", "trajetoria", "trajetória", "formacao", "formação", "experiencia", "experiência"], node: "about" },
  { keywords: ["contato", "email", "linkedin", "whatsapp", "falar", "contratar", "vaga", "oportunidade"], node: "contact" },
  { keywords: ["objetivo", "objetivos", "meta", "metas", "futuro", "plano", "interesse"], node: "goals" },
  { keywords: ["dashboard", "grafico", "gráfico", "tabela", "painel", "dados"], node: "front_dashboard" },
  { keywords: ["chat", "widget", "chatbot", "assistente"], node: "front_chatwidget" },
  { keywords: ["ia", "inteligencia", "inteligência", "artificial", "gpt", "claude", "openai", "llm"], node: "chat_integrate_ai" },
];

function matchKeywords(text) {
  const lower = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  for (const entry of keywordMap) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry.node;
    }
  }
  return null;
}

const currentNode = ref("start");

const currentOptions = computed(() => {
  const node = dialogTree[currentNode.value];
  return node?.options || [];
});

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
  // Opções com link externo abrem em nova aba e confirmam no chat
  if (opt.action === "link") {
    userSay(opt.label);
    window.open(opt.url, "_blank", "noopener,noreferrer");
    setTimeout(() => botSay("O link foi aberto em uma nova aba. Fico à disposição caso precise de mais informações."), 350);
    return;
  }

  userSay(opt.label);
  currentNode.value = opt.next;
  const nextNode = dialogTree[opt.next];
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
    if (matchedNode && dialogTree[matchedNode]) {
      currentNode.value = matchedNode;
      botSay(dialogTree[matchedNode].text);
    } else {
      botSay(
        "Não foi possível identificar sua solicitação com precisão. Utilize os botões de navegação ou escreva termos como \"projetos\", \"competências\", \"contato\" ou \"objetivos\"."
      );
    }
  }, 350);
}
</script>

<style scoped>
/* ===== AVATAR ===== */
.avatar {
  position: fixed;
  bottom: 80px;
  right: 80px;

  width: 165px;
  height: 165px;

  border-radius: 50%;
  overflow: hidden;
  border: 3px solid white;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.35);
  cursor: pointer;
  transition: transform 0.2s ease;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar:hover {
  transform: scale(1.03);
}

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
  background: linear-gradient(135deg, rgba(102,126,234,0.45) 0%, rgba(118,75,162,0.45) 50%, rgba(240,147,251,0.45) 100%);
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
  to { transform: translateY(0); opacity: 1; }
}

/* ===== CHAT HEADER ===== */
.chat-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 26px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-name {
  font-weight: 800;
  font-size: 28px;
  letter-spacing: 0.2px;
}

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

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* ===== CHAT BODY ===== */
.chat-body {
  flex: 1;
  padding: 26px;
  overflow-y: auto;
  background: #f5f5f5;
}

.chat-message {
  margin-bottom: 18px;
  max-width: 82%;
}

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

.chat-message.sent {
  margin-left: auto;
}

.chat-message.sent p {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-bottom-right-radius: 6px;
}

/* ===== OPÇÕES ===== */
.options-area {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 18px;
}

.option-btn {
  background: white;
  border: 2px solid #ddd;
  border-radius: 999px;
  padding: 16px 20px;
  font-size: 20px;
  cursor: pointer;
  transition: transform 0.15s ease, border 0.15s ease;
}

.option-btn:hover {
  transform: translateY(-2px);
  border-color: #667eea;
}

/* ===== CHAT FOOTER ===== */
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

.chat-input:focus {
  border-color: #667eea;
}

.send-btn {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  font-size: 26px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}

.send-btn:hover {
  transform: scale(1.06);
}

.send-btn:active {
  transform: scale(0.95);
}

/* ===== Scrollbar ===== */
.chat-body::-webkit-scrollbar {
  width: 14px;
}

.chat-body::-webkit-scrollbar-thumb {
  background: #c9c9c9;
  border-radius: 6px;
}

.chat-body::-webkit-scrollbar-thumb:hover {
  background: #999;
}

/* ===== RESPONSIVO ===== */
@media (max-width: 1100px) {
  .chat-container {
    width: 92vw;
    right: 20px;
    left: 20px;
  }
}

@media (max-width: 600px) {
  .chat-container {
    right: 12px;
    left: 12px;
    width: auto;
    height: 75vh;
    bottom: 12px;
    border-radius: 20px;
  }

  .avatar {
    right: 16px;
    bottom: 16px;
    width: 110px;
    height: 110px;
  }

  .chat-name { font-size: 20px; }
  .chat-message p { font-size: 18px; }
  .option-btn { font-size: 16px; padding: 12px 16px; }
  .chat-input { font-size: 18px; padding: 14px 16px; }
  .send-btn { width: 56px; height: 56px; font-size: 20px; }
}
</style>