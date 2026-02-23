// src/useLang.js
import { ref } from 'vue'

const selectedLang = ref('EUA')

const translations = {
  EUA: {
    tag: 'UX Designer & Developer',
    title: 'I design and build',
    downloadCV: 'Get Full CV (PDF)',
    sections: ['WELCOME', 'ABOUT ME', 'PROJECTS', 'CONNECT'],
    phrases: ['digital experiences', 'amazing websites', 'interactive apps', 'creative designs'],
    bio: 'Focused on crafting clean interfaces, smooth experiences and products that feel fast and premium.',
    role1: 'Creative Technologist',
    role2: 'UX Designer',
    role3: 'Builder',
    footer: {
      phrase: ['Building interfaces that ', 'matter', '.'],
      rights: 'All rights reserved.',
    },
    social: {
      title: 'Connect With Me',
      subtitle: 'Stay updated and get in touch through my official social channels. Follow, collaborate, or just say hi — I love connecting with professionals, creators, and curious minds alike.',
      clickHere: 'Click here to access.',
      tileDescriptions: {
        linkedin: [
          'On my LinkedIn, you will find a complete overview of my professional journey.',
          'It includes my work history, positions held, specific skills, and relevant certifications.',
          'You can also check recommendations from colleagues and managers, my professional interests, and networking connections.',
          'This platform is ideal for those who want to understand my background, analyze my experience in specific projects and areas, or explore collaboration, partnership, and recruitment opportunities.',
        ],
        instagram: [
          'On my Instagram, you will have access to visual and dynamic content, including photos, videos, and stories about my projects.',
          'I showcase creative processes, behind-the-scenes of my work, everyday moments, and inspirations that influence my activities.',
          'I also share tips, news, and insights that may be useful for other professionals or people interested in my field.',
          'It is a space to follow my experiences and achievements in a light and visual way.',
        ],
        whatsapp: [
          'WhatsApp is the most direct and fastest way to reach me.',
          'You can send instant messages, clarify doubts, schedule meetings, or request specific information about projects or services.',
          'This channel is designed for immediate personal and professional communication, allowing quick and objective interactions.',
          'Ideal for matters that require fast responses or real-time negotiations.',
        ],
        youtube: [
          'On my YouTube channel, you will find a variety of detailed videos about my areas of expertise.',
          'I include step-by-step tutorials, project demonstrations, analyses, reviews, and educational content for tech professionals or enthusiasts.',
          'Each video is designed to teach, inspire, or provide practical insights, helping you better understand my work, applied methodologies, and solutions I develop.',
          'I also share videos of events, talks, and experiences I consider relevant for learning and networking.',
        ],
        upwork: [
          'On my Upwork profile, you can explore my freelance services in detail.',
          'It includes a complete history of completed projects, including descriptions, timelines, technologies used, and client feedback.',
          'You will see my main skills, certifications, and areas of expertise, as well as information about availability and work style.',
          'This space is ideal for clients who want to hire quality services and see concrete examples of deliverables already completed.',
        ],
        beecrowd: [
          'On Beecrowd (formerly URI Online Judge), you will find an extensive collection of programming challenges I have solved over time.',
          'Each solution demonstrates my logical reasoning, problem analysis capabilities, and application of efficient algorithms.',
          'The solutions include explanations, optimizations, and different approaches to various problems, showcasing my coding ability, mathematical logic, and development of precise solutions.',
          'It is an excellent space for those who want to evaluate my technical performance and practical experience in competitive programming.',
        ],
        github: [
          'On my GitHub, you will have full access to my public programming projects.',
          'Each repository contains source code, documentation, usage instructions, and implementation examples.',
          'You can explore my contributions to open-source projects, see how I organize my code, and analyze different languages, frameworks, and technologies I use.',
          'This space is for those who want to know my technical capabilities, programming style, development methodology, and concrete projects I have built or collaborated on.',
        ],
        email: [
          'Through my email, you can reach out for formal conversations, job proposals, detailed questions, collaborations, or any communication that requires written records.',
          'It is the official channel for handling professional matters, sending documents, scheduling meetings, or discussing projects in a structured way.',
          'Email allows you to detail requests, provide complete information, and maintain communication history — ideal for more formal and well-organized interactions.',
        ],
      },
    },
    chat: {
      greeting: 'Hello. I am the virtual assistant of this portfolio. How can I help you?',
      placeholder: 'Type a message...',
      linkOpened: 'The link was opened in a new tab. Feel free to ask if you need more information.',
      noMatch: 'I could not identify your request precisely. Use the navigation buttons or type terms like "projects", "skills", "contact" or "goals".',
      keywordMap: [
        { keywords: ['project', 'projects', 'work', 'portfolio'], node: 'projects' },
        { keywords: ['front', 'frontend', 'front-end', 'vue', 'react', 'css', 'html', 'tailwind', 'component'], node: 'projects_front' },
        { keywords: ['back', 'backend', 'back-end', 'api', 'node', 'database', 'sql'], node: 'projects_back' },
        { keywords: ['mobile', 'app', 'flutter', 'react native'], node: 'projects_mobile' },
        { keywords: ['design', 'ui', 'ux', 'figma', 'prototype'], node: 'projects_ui' },
        { keywords: ['skill', 'skills', 'ability', 'technology', 'stack', 'competence'], node: 'skills' },
        { keywords: ['about', 'who', 'trajectory', 'education', 'experience', 'background'], node: 'about' },
        { keywords: ['contact', 'email', 'linkedin', 'whatsapp', 'hire', 'job', 'opportunity'], node: 'contact' },
        { keywords: ['goal', 'goals', 'objective', 'future', 'plan', 'interest'], node: 'goals' },
        { keywords: ['dashboard', 'chart', 'table', 'panel', 'data'], node: 'front_dashboard' },
        { keywords: ['chat', 'widget', 'chatbot', 'assistant'], node: 'front_chatwidget' },
        { keywords: ['ai', 'artificial', 'intelligence', 'gpt', 'claude', 'openai', 'llm'], node: 'chat_integrate_ai' },
      ],
      dialogTree: (links) => ({
        start: {
          text: 'Where would you like to start?',
          options: [
            { label: '📁 Projects', next: 'projects' },
            { label: '👤 About the professional', next: 'about' },
            { label: '🛠️ Skills', next: 'skills' },
            { label: '📩 Contact', next: 'contact' },
            { label: '🎯 Professional goals', next: 'goals' },
          ],
        },
        projects: {
          text: 'Projects are organized by area. Which segment interests you?',
          options: [
            { label: '💻 Front-end', next: 'projects_front' },
            { label: '⚙️ Back-end', next: 'projects_back' },
            { label: '📱 Mobile', next: 'projects_mobile' },
            { label: '🎨 UI Design', next: 'projects_ui' },
            { label: '⬅️ Back', next: 'start' },
          ],
        },
        projects_front: {
          text: 'Front-end projects cover different deliverables. Which one interests you specifically?',
          options: [
            { label: '🧩 Reusable components', next: 'front_components' },
            { label: '🛒 Landing pages & e-commerce', next: 'front_ecommerce' },
            { label: '📊 Dashboards & panels', next: 'front_dashboard' },
            { label: '⬅️ Back', next: 'projects' },
          ],
        },
        front_components: {
          text: 'The portfolio includes components built with reusability and visual quality in mind — including this very chat. Which would you like to explore?',
          options: [
            { label: '💬 Interactive chat widget', next: 'front_chatwidget' },
            { label: '🧱 Cards and grid layouts', next: 'front_cards' },
            { label: '🧭 Navigation and menus', next: 'front_navbar' },
            { label: '⬅️ Back', next: 'projects_front' },
          ],
        },
        front_chatwidget: {
          text: 'This component was built in Vue 3 with a structured dialog tree. Which approach interests you?',
          options: [
            { label: '⚡ Simplified version', next: 'chat_simple' },
            { label: '🤖 AI-integrated version', next: 'chat_advanced' },
            { label: '⬅️ Back', next: 'front_components' },
          ],
        },
        chat_simple: {
          text: 'The simplified version prioritizes lightness and clarity. Would you like it to include history persistence?',
          options: [
            { label: '💾 Yes, with local storage', next: 'chat_storage_yes' },
            { label: '🧹 No, session only', next: 'chat_storage_no' },
            { label: '⬅️ Back', next: 'front_chatwidget' },
          ],
        },
        chat_advanced: {
          text: 'The advanced version supports guided button flows and natural language API integration. Which approach do you prefer?',
          options: [
            { label: '🧠 Structured flow with options', next: 'chat_flow_buttons' },
            { label: '🔌 LLM integration via API', next: 'chat_integrate_ai' },
            { label: '⬅️ Back', next: 'front_chatwidget' },
          ],
        },
        chat_flow_buttons: {
          text: 'This is exactly the approach used in this chat — a dialog tree with button navigation, no external service dependency. Would you like to see other projects or get in touch?',
          options: [
            { label: '📁 See other projects', next: 'projects' },
            { label: '📩 Get in touch', next: 'contact' },
            { label: '⬅️ Back', next: 'chat_advanced' },
          ],
        },
        chat_integrate_ai: {
          text: 'LLM integration enables dynamic responses via OpenAI, Claude, or similar APIs. It is a natural evolution of this component. Would you like to discuss this possibility?',
          options: [
            { label: '📩 Get in touch', next: 'contact' },
            { label: '📁 See other projects', next: 'projects' },
            { label: '⬅️ Back', next: 'chat_advanced' },
          ],
        },
        chat_storage_yes: {
          text: 'With localStorage, history is preserved across sessions. Would you also like a reset option?',
          options: [
            { label: '✅ Yes, with reset button', next: 'chat_reset_yes' },
            { label: '🚫 Not needed', next: 'chat_reset_no' },
            { label: '⬅️ Back', next: 'chat_simple' },
          ],
        },
        chat_storage_no: {
          text: 'Without persistence, the component stays lighter with fewer dependencies. Would you like a typing indicator?',
          options: [
            { label: '⌨️ Yes, typing indicator', next: 'chat_typing_yes' },
            { label: '⚡ No, instant response', next: 'chat_typing_no' },
            { label: '⬅️ Back', next: 'chat_simple' },
          ],
        },
        chat_reset_yes: {
          text: 'The reset option improves the experience in demos. Where would you prefer to place it?',
          options: [
            { label: '✅ In the header', next: 'end_good' },
            { label: '📌 In the footer', next: 'end_good' },
            { label: '⬅️ Back', next: 'chat_storage_yes' },
          ],
        },
        chat_reset_no: {
          text: 'Without reset, the interface stays cleaner. Would you like to customize the opening message?',
          options: [
            { label: '👋 Keep default message', next: 'end_good' },
            { label: '🎯 Contextualized message', next: 'end_good' },
            { label: '⬅️ Back', next: 'chat_storage_yes' },
          ],
        },
        chat_typing_yes: {
          text: 'A typing indicator contributes to a more natural experience. Which speed do you prefer?',
          options: [
            { label: '⚡ Fast', next: 'end_good' },
            { label: '🙂 Human cadence', next: 'end_good' },
            { label: '⬅️ Back', next: 'chat_storage_no' },
          ],
        },
        chat_typing_no: {
          text: 'Instant responses are ideal in high-efficiency contexts. Would you like to add sound notifications?',
          options: [
            { label: '🔊 Yes', next: 'end_good' },
            { label: '🤫 No', next: 'end_good' },
            { label: '⬅️ Back', next: 'chat_storage_no' },
          ],
        },
        front_cards: {
          text: 'Card and grid components were built with responsiveness and visual consistency in mind. Which style best fits your project?',
          options: [
            { label: '✨ Modern', next: 'end_good' },
            { label: '🧊 Minimalist', next: 'end_good' },
            { label: '⬅️ Back', next: 'front_components' },
          ],
        },
        front_navbar: {
          text: 'Navigation implementations include glassmorphism variants, sticky behavior, and transition animations. Which one interests you most?',
          options: [
            { label: '🧊 Glassmorphism', next: 'end_good' },
            { label: '📌 Sticky with scroll', next: 'end_good' },
            { label: '⬅️ Back', next: 'front_components' },
          ],
        },
        front_ecommerce: {
          text: 'E-commerce and landing page projects cover everything from product presentation to conversion flow. Which stage would you like to analyze?',
          options: [
            { label: '🛍️ Catalog and filters', next: 'end_good' },
            { label: '💳 Checkout and payment', next: 'end_good' },
            { label: '⬅️ Back', next: 'projects_front' },
          ],
        },
        front_dashboard: {
          text: 'The dashboards developed combine data visualization with usability. Which format is most relevant for your evaluation?',
          options: [
            { label: '📈 Charts and KPIs', next: 'end_good' },
            { label: '📋 Tables and reports', next: 'end_good' },
            { label: '⬅️ Back', next: 'projects_front' },
          ],
        },
        projects_back: {
          text: 'Back-end projects cover different application layers. Which area interests you?',
          options: [
            { label: '🔐 Authentication and authorization', next: 'end_good' },
            { label: '🗄️ Data modeling and persistence', next: 'end_good' },
            { label: '🚀 RESTful APIs', next: 'end_good' },
            { label: '🧩 Beecrowd profile', action: 'link', url: links.beecrowd },
            { label: '⬅️ Back', next: 'projects' },
          ],
        },
        projects_mobile: {
          text: 'Mobile development was done with a focus on performance and native experience. Which platform would you like to evaluate?',
          options: [
            { label: '📱 React Native', next: 'end_good' },
            { label: '🦋 Flutter', next: 'end_good' },
            { label: '⬅️ Back', next: 'projects' },
          ],
        },
        projects_ui: {
          text: 'The design work covers everything from prototyping to design system structuring. What would you like to explore?',
          options: [
            { label: '🎨 Prototyping and flows', next: 'end_good' },
            { label: '🧩 Design system', next: 'end_good' },
            { label: '⬅️ Back', next: 'projects' },
          ],
        },
        about: {
          text: 'Which aspect of the professional journey would you like to know more about?',
          options: [
            { label: '📍 Location and availability', next: 'about_location' },
            { label: '🎓 Education and training', next: 'about_education' },
            { label: '🧩 Work methodology', next: 'about_workstyle' },
            { label: '⬅️ Back', next: 'start' },
          ],
        },
        about_location: {
          text: 'I am based in Brazil and available for remote projects, as well as in-person opportunities depending on location and proposal. Would you like to know more about availability?',
          options: [
            { label: '🌍 Remote work', next: 'about_remote' },
            { label: '🏢 On-site work', next: 'about_presential' },
            { label: '⬅️ Back', next: 'about' },
          ],
        },
        about_remote: {
          text: 'I have solid experience with remote work routines, including async collaboration and distributed management tools. I can share my LinkedIn profile if you are interested.',
          options: [
            { label: '🔗 Access LinkedIn', action: 'link', url: links.linkedin },
            { label: '⬅️ Back', next: 'about_location' },
          ],
        },
        about_presential: {
          text: 'I am open to in-person opportunities depending on the proposal and location. Let us get in touch to discuss the details.',
          options: [
            { label: '📩 Go to contact', next: 'contact' },
            { label: '⬅️ Back', next: 'about_location' },
          ],
        },
        about_education: {
          text: 'My background is predominantly practical, complemented by specialized courses and continuous learning through real projects. Would you like to see the technologies I master?',
          options: [
            { label: '🛠️ See skills', next: 'skills' },
            { label: '⬅️ Back', next: 'about' },
          ],
        },
        about_workstyle: {
          text: 'I work with a focus on sustainable code, thoughtful interfaces, and deliveries that balance speed and quality. I value clear communication, code review, and proper documentation. Would you like to see my technical skills?',
          options: [
            { label: '🛠️ See skills', next: 'skills' },
            { label: '⬅️ Back', next: 'about' },
          ],
        },
        skills: {
          text: 'Skills are distributed across different development layers. Which area is most relevant to your evaluation?',
          options: [
            { label: '🎨 Front-end', next: 'skills_front' },
            { label: '⚙️ Back-end', next: 'skills_back' },
            { label: '🧩 Fullstack', next: 'skills_full' },
            { label: '⬅️ Back', next: 'start' },
          ],
        },
        skills_front: {
          text: 'On the front-end, I have strong command of Vue.js, React, Tailwind CSS, CSS and JavaScript animations, and best practices for accessibility and performance. Would you like to see applied examples or complete projects?',
          options: [
            { label: '📌 Component examples', next: 'end_good' },
            { label: '📁 Full projects', next: 'projects' },
            { label: '💻 View GitHub', action: 'link', url: links.github },
            { label: '⬅️ Back', next: 'skills' },
          ],
        },
        skills_back: {
          text: 'On the back-end, I have experience building RESTful APIs, secure authentication, and relational and non-relational database modeling. Would you like details on my technical approach?',
          options: [
            { label: '📦 Yes, tell me more', next: 'end_good' },
            { label: '⬅️ Back', next: 'skills' },
          ],
        },
        skills_full: {
          text: 'I can manage the full development cycle of an application — from architecture planning to production deployment. Would you like to see a fullstack project example?',
          options: [
            { label: '🚀 Yes', next: 'end_good' },
            { label: '⬅️ Back', next: 'skills' },
          ],
        },
        contact: {
          text: 'I am available through the following channels. Which do you prefer?',
          options: [
            { label: '📧 Email', next: 'contact_email' },
            { label: '💼 LinkedIn', next: 'contact_linkedin' },
            { label: '📱 WhatsApp', next: 'contact_whatsapp' },
            { label: '💼 Upwork', next: 'contact_upwork' },
            { label: '⬅️ Back', next: 'start' },
          ],
        },
        contact_email: {
          text: 'You can reach me directly at leonardopigatti@yahoo.com.br. Click below to open your email client.',
          options: [
            { label: '📧 Open email', action: 'link', url: links.email },
            { label: '⬅️ Back', next: 'contact' },
          ],
        },
        contact_linkedin: {
          text: 'LinkedIn is the most recommended channel for professional opportunities. Click below to access my profile directly.',
          options: [
            { label: '🔗 Access LinkedIn', action: 'link', url: links.linkedin },
            { label: '⬅️ Back', next: 'contact' },
          ],
        },
        contact_whatsapp: {
          text: 'WhatsApp allows faster communication. Click below to start a conversation.',
          options: [
            { label: '📱 Open WhatsApp', action: 'link', url: links.whatsapp },
            { label: '⬅️ Back', next: 'contact' },
          ],
        },
        contact_upwork: {
          text: 'For freelance projects, my Upwork profile contains reviews and delivery history.',
          options: [
            { label: '🔗 Access Upwork', action: 'link', url: links.upwork },
            { label: '⬅️ Back', next: 'contact' },
          ],
        },
        goals: {
          text: 'Would you like to know about my professional goals?',
          options: [
            { label: '🎯 Yes', next: 'goals_yes' },
            { label: '⬅️ Back', next: 'start' },
          ],
        },
        goals_yes: {
          text: 'I seek to join teams where technical excellence and product care go hand in hand. My interest lies in positions that encourage robust, well-architected solutions with real business impact — whether in specialized front-end, fullstack development, or technical leadership. I am open to both permanent positions and project-based collaborations. Would you like to review my work or get in touch directly?',
          options: [
            { label: '📁 View projects', next: 'projects' },
            { label: '📩 Get in touch', next: 'contact' },
            { label: '⬅️ Back', next: 'goals' },
          ],
        },
        end_good: {
          text: 'I am available if you have further questions. We can continue exploring the portfolio or start a conversation directly.',
          options: [
            { label: '📩 Get in touch', next: 'contact' },
            { label: '📁 See more projects', next: 'projects' },
            { label: '⬅️ Back to start', next: 'start' },
          ],
        },
        end_contact: {
          text: 'Thank you for your interest. I will get back to you shortly. If you prefer to explore my code directly, repositories are available on GitHub.',
          options: [
            { label: '💻 Access GitHub', action: 'link', url: links.github },
            { label: '⬅️ Back to start', next: 'start' },
            { label: '📁 View projects', next: 'projects' },
          ],
        },
      }),
    },
  },

  Brasil: {
    tag: 'Designer & Desenvolvedor UX',
    downloadCV: 'Baixar CV Completo (PDF)',
    title: 'Eu projeto e construo',
    sections: ['BOAS-VINDAS', 'SOBRE MIM', 'PROJETOS', 'CONECTE-SE'],
    phrases: ['experiências digitais', 'sites incríveis', 'apps interativos', 'designs criativos'],
    bio: 'Focado em criar interfaces limpas, experiências fluidas e produtos que parecem rápidos e premium.',
    role1: 'Tecnólogo Criativo',
    role2: 'Designer UX',
    role3: 'Criador',
    footer: {
      phrase: ['Construindo interfaces que ', 'importam', '.'],
      rights: 'Todos os direitos reservados.',
    },
    social: {
      title: 'Conecte-se Comigo',
      subtitle: 'Fique atualizado e entre em contato através dos meus canais sociais oficiais. Siga, colabore ou apenas diga olá — adoro me conectar com profissionais, criadores e mentes curiosas.',
      clickHere: 'Clique aqui para acessar.',
      tileDescriptions: {
        linkedin: [
          'No meu LinkedIn, você encontrará uma visão completa do meu percurso profissional.',
          'Inclui meu histórico de empregos, cargos ocupados, habilidades específicas e certificações relevantes.',
          'Também é possível conferir recomendações de colegas e gestores, meus interesses profissionais e conexões de networking.',
          'Esta plataforma é ideal para quem quer entender minha trajetória, analisar minha experiência em projetos e áreas específicas, ou para oportunidades de colaboração, parcerias e recrutamento profissional.',
        ],
        instagram: [
          'No meu Instagram, você terá acesso a um conteúdo visual e dinâmico, incluindo fotos, vídeos e stories sobre meus projetos.',
          'Mostro processos criativos, bastidores do meu trabalho, momentos do dia a dia e inspirações que influenciam minhas atividades.',
          'Além disso, compartilho dicas, novidades e insights que podem ser úteis para outros profissionais ou pessoas interessadas no meu campo de atuação.',
          'É um espaço para acompanhar de forma leve e visual minhas experiências e realizações.',
        ],
        whatsapp: [
          'O WhatsApp é a forma mais direta e rápida de entrar em contato comigo.',
          'Você pode enviar mensagens instantâneas, esclarecer dúvidas, combinar reuniões ou solicitar informações específicas sobre projetos ou serviços.',
          'Este canal é voltado para comunicação pessoal e profissional de forma imediata, permitindo interações rápidas e objetivas.',
          'Ideal para assuntos que exigem respostas ágeis ou negociações em tempo real.',
        ],
        youtube: [
          'No meu canal do YouTube, você encontrará uma variedade de vídeos detalhados sobre minhas áreas de atuação.',
          'Incluo tutoriais passo a passo, demonstrações de projetos, análises, reviews e conteúdos educativos voltados para profissionais ou entusiastas da tecnologia e criatividade.',
          'Cada vídeo é pensado para ensinar, inspirar ou fornecer insights práticos, permitindo que você compreenda melhor meu trabalho, metodologias aplicadas e soluções que desenvolvo.',
          'Também compartilho vídeos de eventos, palestras e experiências que considero relevantes para aprendizado e networking.',
        ],
        upwork: [
          'No meu perfil do Upwork, você poderá explorar detalhadamente meus serviços de freelancer.',
          'Está listado o histórico completo de projetos realizados, incluindo descrições, prazos, tecnologias utilizadas e feedback de clientes.',
          'Você verá minhas principais habilidades, certificações e áreas de especialização, além de informações sobre disponibilidade e forma de trabalho.',
          'Este espaço é ideal para clientes que desejam contratar serviços de qualidade e conhecer exemplos concretos de entregas já realizadas.',
        ],
        beecrowd: [
          'No Beecrowd (antigo URI Online Judge), você encontrará uma coleção extensa de desafios de programação que resolvi ao longo do tempo.',
          'Cada solução demonstra meu raciocínio lógico, capacidade de análise de problemas e aplicação de algoritmos eficientes.',
          'As resoluções incluem explicações, otimizações e abordagens diferentes para problemas variados, mostrando minha habilidade em codificação, lógica matemática e desenvolvimento de soluções precisas.',
          'É um excelente espaço para quem deseja avaliar meu desempenho técnico e minha experiência prática em programação competitiva.',
        ],
        github: [
          'No meu GitHub, você terá acesso completo aos meus projetos públicos de programação.',
          'Cada repositório contém códigos-fonte, documentação, instruções de uso e exemplos de implementação.',
          'Você poderá explorar minhas contribuições para projetos open-source, ver a organização do meu código e analisar diferentes linguagens, frameworks e tecnologias que utilizo.',
          'Este espaço é voltado para quem deseja conhecer minha capacidade técnica, estilo de programação, metodologia de desenvolvimento e projetos concretos que desenvolvi ou colaborei.',
        ],
        email: [
          'Através do meu e-mail, você pode entrar em contato para conversas formais, propostas de trabalho, dúvidas detalhadas, colaborações ou qualquer comunicação que exija registro escrito.',
          'É o canal oficial para tratar de assuntos profissionais, enviar documentos, agendar reuniões ou discutir projetos de maneira estruturada.',
          'O e-mail permite detalhar solicitações, fornecer informações completas e manter histórico de comunicação, sendo ideal para interações mais formais e bem organizadas.',
        ],
      },
    },
    chat: {
      greeting: 'Olá. Sou o assistente virtual deste portfólio. Como posso orientá-lo?',
      placeholder: 'Digite uma mensagem...',
      linkOpened: 'O link foi aberto em uma nova aba. Fico à disposição caso precise de mais informações.',
      noMatch: 'Não foi possível identificar sua solicitação com precisão. Utilize os botões de navegação ou escreva termos como "projetos", "competências", "contato" ou "objetivos".',
      keywordMap: [
        { keywords: ['projeto', 'projetos', 'trabalho', 'trabalhos', 'portfolio', 'portfólio'], node: 'projects' },
        { keywords: ['front', 'frontend', 'front-end', 'vue', 'react', 'css', 'html', 'tailwind', 'componente'], node: 'projects_front' },
        { keywords: ['back', 'backend', 'back-end', 'api', 'node', 'banco', 'database', 'sql'], node: 'projects_back' },
        { keywords: ['mobile', 'app', 'flutter', 'react native'], node: 'projects_mobile' },
        { keywords: ['design', 'ui', 'ux', 'figma', 'prototipo', 'protótipo'], node: 'projects_ui' },
        { keywords: ['skill', 'skills', 'habilidade', 'habilidades', 'competencia', 'competência', 'tecnologia', 'stack'], node: 'skills' },
        { keywords: ['sobre', 'quem', 'trajetoria', 'trajetória', 'formacao', 'formação', 'experiencia', 'experiência'], node: 'about' },
        { keywords: ['contato', 'email', 'linkedin', 'whatsapp', 'falar', 'contratar', 'vaga', 'oportunidade'], node: 'contact' },
        { keywords: ['objetivo', 'objetivos', 'meta', 'metas', 'futuro', 'plano', 'interesse'], node: 'goals' },
        { keywords: ['dashboard', 'grafico', 'gráfico', 'tabela', 'painel', 'dados'], node: 'front_dashboard' },
        { keywords: ['chat', 'widget', 'chatbot', 'assistente'], node: 'front_chatwidget' },
        { keywords: ['ia', 'inteligencia', 'inteligência', 'artificial', 'gpt', 'claude', 'openai', 'llm'], node: 'chat_integrate_ai' },
      ],
      dialogTree: (links) => ({
        start: {
          text: 'Por onde você prefere começar?',
          options: [
            { label: '📁 Projetos', next: 'projects' },
            { label: '👤 Sobre o profissional', next: 'about' },
            { label: '🛠️ Competências', next: 'skills' },
            { label: '📩 Contato', next: 'contact' },
            { label: '🎯 Objetivos profissionais', next: 'goals' },
          ],
        },
        projects: {
          text: 'Os projetos estão organizados por área de atuação. Qual segmento é de seu interesse?',
          options: [
            { label: '💻 Front-end', next: 'projects_front' },
            { label: '⚙️ Back-end', next: 'projects_back' },
            { label: '📱 Mobile', next: 'projects_mobile' },
            { label: '🎨 Design de interfaces', next: 'projects_ui' },
            { label: '⬅️ Voltar', next: 'start' },
          ],
        },
        projects_front: {
          text: 'Os projetos de front-end abrangem diferentes entregas. Qual especificamente lhe interessa?',
          options: [
            { label: '🧩 Componentes reutilizáveis', next: 'front_components' },
            { label: '🛒 Landing pages e e-commerce', next: 'front_ecommerce' },
            { label: '📊 Dashboards e painéis', next: 'front_dashboard' },
            { label: '⬅️ Voltar', next: 'projects' },
          ],
        },
        front_components: {
          text: 'O portfólio conta com componentes desenvolvidos com foco em reusabilidade e qualidade visual — entre eles este próprio chat. Qual você gostaria de explorar?',
          options: [
            { label: '💬 Chat widget interativo', next: 'front_chatwidget' },
            { label: '🧱 Cards e layouts de grade', next: 'front_cards' },
            { label: '🧭 Navegação e menus', next: 'front_navbar' },
            { label: '⬅️ Voltar', next: 'projects_front' },
          ],
        },
        front_chatwidget: {
          text: 'Este componente foi desenvolvido em Vue 3 com árvore de diálogo estruturada. Qual abordagem lhe interessa avaliar?',
          options: [
            { label: '⚡ Versão simplificada', next: 'chat_simple' },
            { label: '🤖 Versão com integração a IA', next: 'chat_advanced' },
            { label: '⬅️ Voltar', next: 'front_components' },
          ],
        },
        chat_simple: {
          text: 'A versão simplificada prioriza leveza e clareza. Deseja que inclua persistência de histórico?',
          options: [
            { label: '💾 Sim, com armazenamento local', next: 'chat_storage_yes' },
            { label: '🧹 Não, apenas por sessão', next: 'chat_storage_no' },
            { label: '⬅️ Voltar', next: 'front_chatwidget' },
          ],
        },
        chat_advanced: {
          text: 'A versão avançada suporta fluxos guiados por botões e integração com APIs de linguagem natural. Qual abordagem prefere?',
          options: [
            { label: '🧠 Fluxo estruturado com opções', next: 'chat_flow_buttons' },
            { label: '🔌 Integração com LLM via API', next: 'chat_integrate_ai' },
            { label: '⬅️ Voltar', next: 'front_chatwidget' },
          ],
        },
        chat_flow_buttons: {
          text: 'Esta é exatamente a abordagem utilizada neste chat — uma árvore de diálogo com navegação por botões, sem dependência de serviços externos. Deseja conhecer outros projetos ou entrar em contato?',
          options: [
            { label: '📁 Ver outros projetos', next: 'projects' },
            { label: '📩 Entrar em contato', next: 'contact' },
            { label: '⬅️ Voltar', next: 'chat_advanced' },
          ],
        },
        chat_integrate_ai: {
          text: 'A integração com modelos de linguagem permite respostas dinâmicas via OpenAI, Claude ou APIs similares. É uma evolução natural deste componente. Gostaria de discutir essa possibilidade?',
          options: [
            { label: '📩 Entrar em contato', next: 'contact' },
            { label: '📁 Ver outros projetos', next: 'projects' },
            { label: '⬅️ Voltar', next: 'chat_advanced' },
          ],
        },
        chat_storage_yes: {
          text: 'Com localStorage, o histórico é preservado entre sessões. Deseja também incluir a opção de redefinir a conversa?',
          options: [
            { label: '✅ Sim, com botão de reset', next: 'chat_reset_yes' },
            { label: '🚫 Não é necessário', next: 'chat_reset_no' },
            { label: '⬅️ Voltar', next: 'chat_simple' },
          ],
        },
        chat_storage_no: {
          text: 'Sem persistência, o componente fica mais leve e com menos dependências. Deseja incluir um indicador visual de digitação?',
          options: [
            { label: '⌨️ Sim, indicador de digitação', next: 'chat_typing_yes' },
            { label: '⚡ Não, resposta imediata', next: 'chat_typing_no' },
            { label: '⬅️ Voltar', next: 'chat_simple' },
          ],
        },
        chat_reset_yes: {
          text: 'A opção de reset melhora a experiência em demonstrações. Onde prefere posicioná-la?',
          options: [
            { label: '✅ No cabeçalho', next: 'end_good' },
            { label: '📌 No rodapé', next: 'end_good' },
            { label: '⬅️ Voltar', next: 'chat_storage_yes' },
          ],
        },
        chat_reset_no: {
          text: 'Sem o reset, a interface se mantém mais limpa. Deseja personalizar a mensagem de abertura do chat?',
          options: [
            { label: '👋 Manter mensagem padrão', next: 'end_good' },
            { label: '🎯 Mensagem contextualizada', next: 'end_good' },
            { label: '⬅️ Voltar', next: 'chat_storage_yes' },
          ],
        },
        chat_typing_yes: {
          text: 'O indicador de digitação contribui para uma experiência mais natural. Qual velocidade prefere?',
          options: [
            { label: '⚡ Ágil', next: 'end_good' },
            { label: '🙂 Cadência humana', next: 'end_good' },
            { label: '⬅️ Voltar', next: 'chat_storage_no' },
          ],
        },
        chat_typing_no: {
          text: 'Respostas imediatas são ideais em contextos de alta eficiência. Deseja adicionar notificações sonoras?',
          options: [
            { label: '🔊 Sim', next: 'end_good' },
            { label: '🤫 Não', next: 'end_good' },
            { label: '⬅️ Voltar', next: 'chat_storage_no' },
          ],
        },
        front_cards: {
          text: 'Os componentes de card e grade foram desenvolvidos com foco em responsividade e consistência visual. Qual estilo melhor se alinha ao seu projeto?',
          options: [
            { label: '✨ Moderno', next: 'end_good' },
            { label: '🧊 Minimalista', next: 'end_good' },
            { label: '⬅️ Voltar', next: 'front_components' },
          ],
        },
        front_navbar: {
          text: 'As implementações de navegação incluem variações com glassmorphism, comportamento sticky e animações de transição. Qual desperta mais interesse?',
          options: [
            { label: '🧊 Glassmorphism', next: 'end_good' },
            { label: '📌 Sticky com scroll', next: 'end_good' },
            { label: '⬅️ Voltar', next: 'front_components' },
          ],
        },
        front_ecommerce: {
          text: 'Os projetos de e-commerce e landing page cobrem desde a apresentação do produto até o fluxo de conversão. Qual etapa prefere analisar?',
          options: [
            { label: '🛍️ Catálogo e filtros', next: 'end_good' },
            { label: '💳 Checkout e pagamento', next: 'end_good' },
            { label: '⬅️ Voltar', next: 'projects_front' },
          ],
        },
        front_dashboard: {
          text: 'Os painéis desenvolvidos combinam visualização de dados com usabilidade. Qual formato é mais relevante para sua avaliação?',
          options: [
            { label: '📈 Gráficos e indicadores', next: 'end_good' },
            { label: '📋 Tabelas e relatórios', next: 'end_good' },
            { label: '⬅️ Voltar', next: 'projects_front' },
          ],
        },
        projects_back: {
          text: 'Os projetos de back-end contemplam diferentes camadas de uma aplicação. Qual área é de seu interesse?',
          options: [
            { label: '🔐 Autenticação e autorização', next: 'end_good' },
            { label: '🗄️ Modelagem e persistência de dados', next: 'end_good' },
            { label: '🚀 APIs RESTful', next: 'end_good' },
            { label: '🧩 Perfil Beecrowd', action: 'link', url: links.beecrowd },
            { label: '⬅️ Voltar', next: 'projects' },
          ],
        },
        projects_mobile: {
          text: 'O desenvolvimento mobile foi realizado com foco em performance e experiência nativa. Qual plataforma prefere avaliar?',
          options: [
            { label: '📱 React Native', next: 'end_good' },
            { label: '🦋 Flutter', next: 'end_good' },
            { label: '⬅️ Voltar', next: 'projects' },
          ],
        },
        projects_ui: {
          text: 'O trabalho de design cobre desde a concepção de protótipos até a estruturação de sistemas de design. O que prefere conhecer?',
          options: [
            { label: '🎨 Prototipagem e fluxos', next: 'end_good' },
            { label: '🧩 Design system', next: 'end_good' },
            { label: '⬅️ Voltar', next: 'projects' },
          ],
        },
        about: {
          text: 'Sobre qual aspecto da trajetória profissional você gostaria de saber mais?',
          options: [
            { label: '📍 Localização e disponibilidade', next: 'about_location' },
            { label: '🎓 Formação e capacitação', next: 'about_education' },
            { label: '🧩 Metodologia de trabalho', next: 'about_workstyle' },
            { label: '⬅️ Voltar', next: 'start' },
          ],
        },
        about_location: {
          text: 'Atuo com base no Brasil e tenho disponibilidade para projetos remotos, bem como para oportunidades presenciais a depender da localidade e da proposta. Deseja saber mais sobre disponibilidade?',
          options: [
            { label: '🌍 Trabalho remoto', next: 'about_remote' },
            { label: '🏢 Trabalho presencial', next: 'about_presential' },
            { label: '⬅️ Voltar', next: 'about' },
          ],
        },
        about_remote: {
          text: 'Tenho experiência consolidada em rotinas de trabalho remoto, incluindo colaboração assíncrona e uso de ferramentas de gestão distribuída. Posso encaminhar meu perfil no LinkedIn caso seja de seu interesse.',
          options: [
            { label: '🔗 Acessar LinkedIn', action: 'link', url: links.linkedin },
            { label: '⬅️ Voltar', next: 'about_location' },
          ],
        },
        about_presential: {
          text: 'Estou aberto a oportunidades presenciais mediante análise da proposta e localidade. Para discutirmos os detalhes, podemos entrar em contato diretamente.',
          options: [
            { label: '📩 Ir para contato', next: 'contact' },
            { label: '⬅️ Voltar', next: 'about_location' },
          ],
        },
        about_education: {
          text: 'Minha formação é predominantemente prática, complementada por cursos especializados e aprendizado contínuo por meio de projetos reais. Gostaria de conhecer as tecnologias que domino?',
          options: [
            { label: '🛠️ Ver competências', next: 'skills' },
            { label: '⬅️ Voltar', next: 'about' },
          ],
        },
        about_workstyle: {
          text: 'Trabalho com foco em código sustentável, interfaces cuidadosas e entregas que equilibram velocidade e qualidade. Valorizo comunicação clara, revisão de código e documentação adequada. Deseja ver minhas competências técnicas?',
          options: [
            { label: '🛠️ Ver competências', next: 'skills' },
            { label: '⬅️ Voltar', next: 'about' },
          ],
        },
        skills: {
          text: 'As competências estão distribuídas entre diferentes camadas do desenvolvimento. Qual área é mais relevante para sua avaliação?',
          options: [
            { label: '🎨 Front-end', next: 'skills_front' },
            { label: '⚙️ Back-end', next: 'skills_back' },
            { label: '🧩 Fullstack', next: 'skills_full' },
            { label: '⬅️ Voltar', next: 'start' },
          ],
        },
        skills_front: {
          text: 'No front-end, tenho domínio de Vue.js, React, Tailwind CSS, animações com CSS e JavaScript, e boas práticas de acessibilidade e performance. Deseja ver exemplos aplicados ou projetos completos?',
          options: [
            { label: '📌 Exemplos de componentes', next: 'end_good' },
            { label: '📁 Projetos completos', next: 'projects' },
            { label: '💻 Ver GitHub', action: 'link', url: links.github },
            { label: '⬅️ Voltar', next: 'skills' },
          ],
        },
        skills_back: {
          text: 'No back-end, tenho experiência com desenvolvimento de APIs RESTful, autenticação segura e modelagem de banco de dados relacional e não relacional. Gostaria de detalhes sobre minha abordagem técnica?',
          options: [
            { label: '📦 Sim, quero saber mais', next: 'end_good' },
            { label: '⬅️ Voltar', next: 'skills' },
          ],
        },
        skills_full: {
          text: 'Tenho capacidade de conduzir o ciclo completo de desenvolvimento de uma aplicação — do planejamento da arquitetura à entrega em produção. Gostaria de ver um exemplo de projeto fullstack?',
          options: [
            { label: '🚀 Sim', next: 'end_good' },
            { label: '⬅️ Voltar', next: 'skills' },
          ],
        },
        contact: {
          text: 'Estou disponível para contato pelos seguintes canais. Qual prefere utilizar?',
          options: [
            { label: '📧 E-mail', next: 'contact_email' },
            { label: '💼 LinkedIn', next: 'contact_linkedin' },
            { label: '📱 WhatsApp', next: 'contact_whatsapp' },
            { label: '💼 Upwork', next: 'contact_upwork' },
            { label: '⬅️ Voltar', next: 'start' },
          ],
        },
        contact_email: {
          text: 'Pode entrar em contato diretamente pelo e-mail leonardopigatti@yahoo.com.br. Clique abaixo para abrir o cliente de e-mail.',
          options: [
            { label: '📧 Abrir e-mail', action: 'link', url: links.email },
            { label: '⬅️ Voltar', next: 'contact' },
          ],
        },
        contact_linkedin: {
          text: 'O LinkedIn é o canal mais indicado para oportunidades profissionais. Clique abaixo para acessar o perfil diretamente.',
          options: [
            { label: '🔗 Acessar LinkedIn', action: 'link', url: links.linkedin },
            { label: '⬅️ Voltar', next: 'contact' },
          ],
        },
        contact_whatsapp: {
          text: 'O WhatsApp permite uma comunicação mais ágil. Clique abaixo para iniciar uma conversa.',
          options: [
            { label: '📱 Abrir WhatsApp', action: 'link', url: links.whatsapp },
            { label: '⬅️ Voltar', next: 'contact' },
          ],
        },
        contact_upwork: {
          text: 'Para projetos freelance, meu perfil no Upwork concentra avaliações e histórico de entregas.',
          options: [
            { label: '🔗 Acessar Upwork', action: 'link', url: links.upwork },
            { label: '⬅️ Voltar', next: 'contact' },
          ],
        },
        goals: {
          text: 'Gostaria de conhecer os objetivos profissionais?',
          options: [
            { label: '🎯 Sim', next: 'goals_yes' },
            { label: '⬅️ Voltar', next: 'start' },
          ],
        },
        goals_yes: {
          text: 'Busco integrar equipes onde excelência técnica e cuidado com o produto caminham juntos. Meu interesse está em posições que estimulem o desenvolvimento de soluções robustas, bem arquitetadas e com impacto real para o negócio — seja em front-end especializado, desenvolvimento fullstack ou na liderança técnica de projetos. Estou aberto tanto a vínculos CLT quanto a colaborações por projeto. Gostaria de analisar meu trabalho ou prefere entrar em contato diretamente?',
          options: [
            { label: '📁 Ver projetos', next: 'projects' },
            { label: '📩 Entrar em contato', next: 'contact' },
            { label: '⬅️ Voltar', next: 'goals' },
          ],
        },
        end_good: {
          text: 'Fico à disposição caso tenha dúvidas adicionais. Podemos continuar explorando o portfólio ou iniciar uma conversa diretamente.',
          options: [
            { label: '📩 Entrar em contato', next: 'contact' },
            { label: '📁 Ver mais projetos', next: 'projects' },
            { label: '⬅️ Voltar ao início', next: 'start' },
          ],
        },
        end_contact: {
          text: 'Agradeço o interesse. Retornarei o contato com brevidade. Caso prefira explorar meu código diretamente, os repositórios estão disponíveis no GitHub.',
          options: [
            { label: '💻 Acessar GitHub', action: 'link', url: links.github },
            { label: '⬅️ Voltar ao início', next: 'start' },
            { label: '📁 Ver projetos', next: 'projects' },
          ],
        },
      }),
    },
  },

  Italia: {
    tag: 'Designer & Sviluppatore UX',
    title: 'Progetto e costruisco',
    downloadCV: 'Scarica CV Completo (PDF)',
    sections: ['BENVENUTO', 'CHI SONO', 'PROGETTI', 'CONNETTITI'],
    phrases: ['esperienze digitali', 'siti straordinari', 'app interattive', 'design creativi'],
    bio: 'Concentrato sulla creazione di interfacce pulite, esperienze fluide e prodotti veloci e premium.',
    role1: 'Tecnologo Creativo',
    role2: 'Designer UX',
    role3: 'Costruttore',
    footer: {
      phrase: ['Costruendo interfacce che ', 'contano', '.'],
      rights: 'Tutti i diritti riservati.',
    },
    social: {
      title: 'Connettiti Con Me',
      subtitle: 'Rimani aggiornato e contattami attraverso i miei canali social ufficiali. Seguimi, collabora o semplicemente salutami — adoro connettermi con professionisti, creativi e menti curiose.',
      clickHere: 'Clicca qui per accedere.',
      tileDescriptions: {
        linkedin: [
          'Sul mio LinkedIn troverai una panoramica completa del mio percorso professionale.',
          'Include la mia storia lavorativa, le posizioni ricoperte, le competenze specifiche e le certificazioni rilevanti.',
          'Puoi anche consultare le raccomandazioni di colleghi e manager, i miei interessi professionali e le connessioni di networking.',
          'Questa piattaforma è ideale per chi vuole comprendere il mio background, analizzare la mia esperienza in progetti e aree specifiche, o esplorare opportunità di collaborazione, partnership e recruiting.',
        ],
        instagram: [
          'Sul mio Instagram avrai accesso a contenuti visivi e dinamici, inclusi foto, video e storie sui miei progetti.',
          'Mostro processi creativi, dietro le quinte del mio lavoro, momenti quotidiani e ispirazioni che influenzano le mie attività.',
          'Condivido anche consigli, novità e insight utili per altri professionisti o persone interessate al mio campo.',
          'È uno spazio per seguire in modo leggero e visivo le mie esperienze e realizzazioni.',
        ],
        whatsapp: [
          'WhatsApp è il modo più diretto e rapido per contattarmi.',
          'Puoi inviare messaggi istantanei, chiarire dubbi, fissare riunioni o richiedere informazioni specifiche su progetti o servizi.',
          'Questo canale è pensato per la comunicazione personale e professionale immediata, consentendo interazioni rapide e dirette.',
          'Ideale per questioni che richiedono risposte veloci o negoziazioni in tempo reale.',
        ],
        youtube: [
          'Sul mio canale YouTube troverai una varietà di video dettagliati sulle mie aree di competenza.',
          'Includo tutorial passo a passo, dimostrazioni di progetti, analisi, recensioni e contenuti educativi per professionisti o appassionati di tecnologia e creatività.',
          'Ogni video è pensato per insegnare, ispirare o fornire spunti pratici, aiutandoti a comprendere meglio il mio lavoro, le metodologie applicate e le soluzioni che sviluppo.',
          "Condivido anche video di eventi, conferenze ed esperienze che ritengo rilevanti per l'apprendimento e il networking.",
        ],
        upwork: [
          'Sul mio profilo Upwork puoi esplorare in dettaglio i miei servizi da freelancer.',
          'È elencata la cronologia completa dei progetti realizzati, incluse descrizioni, scadenze, tecnologie utilizzate e feedback dei clienti.',
          'Vedrai le mie principali competenze, certificazioni e aree di specializzazione, oltre a informazioni sulla disponibilità e il modo di lavorare.',
          'Questo spazio è ideale per i clienti che desiderano assumere servizi di qualità e vedere esempi concreti di lavori già consegnati.',
        ],
        beecrowd: [
          "Su Beecrowd (ex URI Online Judge) troverai un'ampia raccolta di sfide di programmazione che ho risolto nel tempo.",
          "Ogni soluzione dimostra il mio ragionamento logico, la capacità di analisi dei problemi e l'applicazione di algoritmi efficienti.",
          'Le soluzioni includono spiegazioni, ottimizzazioni e approcci diversi a problemi variati, mostrando la mia abilità nella codifica, nella logica matematica e nello sviluppo di soluzioni precise.',
          'È un ottimo spazio per chi vuole valutare le mie prestazioni tecniche e la mia esperienza pratica nella programmazione competitiva.',
        ],
        github: [
          'Sul mio GitHub avrai accesso completo ai miei progetti di programmazione pubblici.',
          "Ogni repository contiene codice sorgente, documentazione, istruzioni d'uso ed esempi di implementazione.",
          'Puoi esplorare i miei contributi a progetti open-source, vedere come organizzo il codice e analizzare i diversi linguaggi, framework e tecnologie che utilizzo.',
          'Questo spazio è per chi vuole conoscere le mie capacità tecniche, lo stile di programmazione, la metodologia di sviluppo e i progetti concreti che ho realizzato o a cui ho collaborato.',
        ],
        email: [
          'Tramite la mia email puoi contattarmi per conversazioni formali, proposte di lavoro, domande dettagliate, collaborazioni o qualsiasi comunicazione che richieda una traccia scritta.',
          'È il canale ufficiale per trattare questioni professionali, inviare documenti, fissare riunioni o discutere progetti in modo strutturato.',
          "L'email consente di dettagliare le richieste, fornire informazioni complete e mantenere uno storico delle comunicazioni — ideale per interazioni più formali e ben organizzate.",
        ],
      },
    },
    chat: {
      greeting: 'Ciao. Sono l\'assistente virtuale di questo portfolio. Come posso aiutarti?',
      placeholder: 'Scrivi un messaggio...',
      linkOpened: 'Il link è stato aperto in una nuova scheda. Sono a disposizione se hai bisogno di ulteriori informazioni.',
      noMatch: 'Non è stato possibile identificare la tua richiesta con precisione. Usa i pulsanti di navigazione o scrivi termini come "progetti", "competenze", "contatto" o "obiettivi".',
      keywordMap: [
        { keywords: ['progetto', 'progetti', 'lavoro', 'portfolio'], node: 'projects' },
        { keywords: ['front', 'frontend', 'front-end', 'vue', 'react', 'css', 'html', 'tailwind', 'componente'], node: 'projects_front' },
        { keywords: ['back', 'backend', 'back-end', 'api', 'node', 'database', 'sql'], node: 'projects_back' },
        { keywords: ['mobile', 'app', 'flutter', 'react native'], node: 'projects_mobile' },
        { keywords: ['design', 'ui', 'ux', 'figma', 'prototipo'], node: 'projects_ui' },
        { keywords: ['skill', 'skills', 'competenza', 'competenze', 'tecnologia', 'stack'], node: 'skills' },
        { keywords: ['chi', 'about', 'traiettoria', 'formazione', 'esperienza', 'background'], node: 'about' },
        { keywords: ['contatto', 'email', 'linkedin', 'whatsapp', 'assumere', 'lavoro', 'opportunità'], node: 'contact' },
        { keywords: ['obiettivo', 'obiettivi', 'meta', 'futuro', 'piano', 'interesse'], node: 'goals' },
        { keywords: ['dashboard', 'grafico', 'tabella', 'pannello', 'dati'], node: 'front_dashboard' },
        { keywords: ['chat', 'widget', 'chatbot', 'assistente'], node: 'front_chatwidget' },
        { keywords: ['ia', 'intelligenza', 'artificiale', 'gpt', 'claude', 'openai', 'llm'], node: 'chat_integrate_ai' },
      ],
      dialogTree: (links) => ({
        start: {
          text: 'Da dove preferisci iniziare?',
          options: [
            { label: '📁 Progetti', next: 'projects' },
            { label: '👤 Sul professionista', next: 'about' },
            { label: '🛠️ Competenze', next: 'skills' },
            { label: '📩 Contatto', next: 'contact' },
            { label: '🎯 Obiettivi professionali', next: 'goals' },
          ],
        },
        projects: {
          text: 'I progetti sono organizzati per area. Quale segmento ti interessa?',
          options: [
            { label: '💻 Front-end', next: 'projects_front' },
            { label: '⚙️ Back-end', next: 'projects_back' },
            { label: '📱 Mobile', next: 'projects_mobile' },
            { label: '🎨 UI Design', next: 'projects_ui' },
            { label: '⬅️ Indietro', next: 'start' },
          ],
        },
        projects_front: {
          text: 'I progetti front-end coprono diverse tipologie di consegna. Quale ti interessa nello specifico?',
          options: [
            { label: '🧩 Componenti riutilizzabili', next: 'front_components' },
            { label: '🛒 Landing page ed e-commerce', next: 'front_ecommerce' },
            { label: '📊 Dashboard e pannelli', next: 'front_dashboard' },
            { label: '⬅️ Indietro', next: 'projects' },
          ],
        },
        front_components: {
          text: 'Il portfolio include componenti sviluppati con attenzione alla riusabilità e alla qualità visiva — tra cui questa stessa chat. Quale vorresti esplorare?',
          options: [
            { label: '💬 Chat widget interattiva', next: 'front_chatwidget' },
            { label: '🧱 Card e layout a griglia', next: 'front_cards' },
            { label: '🧭 Navigazione e menu', next: 'front_navbar' },
            { label: '⬅️ Indietro', next: 'projects_front' },
          ],
        },
        front_chatwidget: {
          text: 'Questo componente è stato sviluppato in Vue 3 con un albero di dialogo strutturato. Quale approccio ti interessa valutare?',
          options: [
            { label: '⚡ Versione semplificata', next: 'chat_simple' },
            { label: '🤖 Versione con integrazione IA', next: 'chat_advanced' },
            { label: '⬅️ Indietro', next: 'front_components' },
          ],
        },
        chat_simple: {
          text: 'La versione semplificata privilegia leggerezza e chiarezza. Vuoi includere la persistenza della cronologia?',
          options: [
            { label: '💾 Sì, con archiviazione locale', next: 'chat_storage_yes' },
            { label: '🧹 No, solo per sessione', next: 'chat_storage_no' },
            { label: '⬅️ Indietro', next: 'front_chatwidget' },
          ],
        },
        chat_advanced: {
          text: 'La versione avanzata supporta flussi guidati da pulsanti e integrazione con API di linguaggio naturale. Quale approccio preferisci?',
          options: [
            { label: '🧠 Flusso strutturato con opzioni', next: 'chat_flow_buttons' },
            { label: '🔌 Integrazione LLM via API', next: 'chat_integrate_ai' },
            { label: '⬅️ Indietro', next: 'front_chatwidget' },
          ],
        },
        chat_flow_buttons: {
          text: 'Questo è esattamente l\'approccio utilizzato in questa chat — un albero di dialogo con navigazione tramite pulsanti, senza dipendenze da servizi esterni. Vuoi vedere altri progetti o metterti in contatto?',
          options: [
            { label: '📁 Vedere altri progetti', next: 'projects' },
            { label: '📩 Mettersi in contatto', next: 'contact' },
            { label: '⬅️ Indietro', next: 'chat_advanced' },
          ],
        },
        chat_integrate_ai: {
          text: 'L\'integrazione con modelli di linguaggio consente risposte dinamiche tramite OpenAI, Claude o API simili. È un\'evoluzione naturale di questo componente. Vorresti discutere questa possibilità?',
          options: [
            { label: '📩 Mettersi in contatto', next: 'contact' },
            { label: '📁 Vedere altri progetti', next: 'projects' },
            { label: '⬅️ Indietro', next: 'chat_advanced' },
          ],
        },
        chat_storage_yes: {
          text: 'Con localStorage, la cronologia viene preservata tra le sessioni. Vorresti includere anche un\'opzione di reset?',
          options: [
            { label: '✅ Sì, con pulsante di reset', next: 'chat_reset_yes' },
            { label: '🚫 Non necessario', next: 'chat_reset_no' },
            { label: '⬅️ Indietro', next: 'chat_simple' },
          ],
        },
        chat_storage_no: {
          text: 'Senza persistenza, il componente risulta più leggero e con meno dipendenze. Vorresti un indicatore visivo di digitazione?',
          options: [
            { label: '⌨️ Sì, indicatore di digitazione', next: 'chat_typing_yes' },
            { label: '⚡ No, risposta immediata', next: 'chat_typing_no' },
            { label: '⬅️ Indietro', next: 'chat_simple' },
          ],
        },
        chat_reset_yes: {
          text: 'L\'opzione di reset migliora l\'esperienza nelle demo. Dove preferisci posizionarla?',
          options: [
            { label: '✅ Nell\'intestazione', next: 'end_good' },
            { label: '📌 Nel piè di pagina', next: 'end_good' },
            { label: '⬅️ Indietro', next: 'chat_storage_yes' },
          ],
        },
        chat_reset_no: {
          text: 'Senza reset, l\'interfaccia rimane più pulita. Vuoi personalizzare il messaggio di apertura?',
          options: [
            { label: '👋 Mantenere il messaggio predefinito', next: 'end_good' },
            { label: '🎯 Messaggio contestualizzato', next: 'end_good' },
            { label: '⬅️ Indietro', next: 'chat_storage_yes' },
          ],
        },
        chat_typing_yes: {
          text: 'L\'indicatore di digitazione contribuisce a un\'esperienza più naturale. Quale velocità preferisci?',
          options: [
            { label: '⚡ Veloce', next: 'end_good' },
            { label: '🙂 Cadenza umana', next: 'end_good' },
            { label: '⬅️ Indietro', next: 'chat_storage_no' },
          ],
        },
        chat_typing_no: {
          text: 'Le risposte immediate sono ideali in contesti ad alta efficienza. Vorresti aggiungere notifiche sonore?',
          options: [
            { label: '🔊 Sì', next: 'end_good' },
            { label: '🤫 No', next: 'end_good' },
            { label: '⬅️ Indietro', next: 'chat_storage_no' },
          ],
        },
        front_cards: {
          text: 'I componenti card e griglia sono stati sviluppati con attenzione alla responsività e alla coerenza visiva. Quale stile si allinea meglio al tuo progetto?',
          options: [
            { label: '✨ Moderno', next: 'end_good' },
            { label: '🧊 Minimalista', next: 'end_good' },
            { label: '⬅️ Indietro', next: 'front_components' },
          ],
        },
        front_navbar: {
          text: 'Le implementazioni di navigazione includono varianti con glassmorphism, comportamento sticky e animazioni di transizione. Quale ti incuriosisce di più?',
          options: [
            { label: '🧊 Glassmorphism', next: 'end_good' },
            { label: '📌 Sticky con scroll', next: 'end_good' },
            { label: '⬅️ Indietro', next: 'front_components' },
          ],
        },
        front_ecommerce: {
          text: 'I progetti e-commerce e landing page coprono dalla presentazione del prodotto al flusso di conversione. Quale fase vuoi analizzare?',
          options: [
            { label: '🛍️ Catalogo e filtri', next: 'end_good' },
            { label: '💳 Checkout e pagamento', next: 'end_good' },
            { label: '⬅️ Indietro', next: 'projects_front' },
          ],
        },
        front_dashboard: {
          text: 'Le dashboard sviluppate combinano visualizzazione dei dati e usabilità. Quale formato è più rilevante per la tua valutazione?',
          options: [
            { label: '📈 Grafici e indicatori', next: 'end_good' },
            { label: '📋 Tabelle e report', next: 'end_good' },
            { label: '⬅️ Indietro', next: 'projects_front' },
          ],
        },
        projects_back: {
          text: 'I progetti back-end coprono diversi livelli applicativi. Quale area ti interessa?',
          options: [
            { label: '🔐 Autenticazione e autorizzazione', next: 'end_good' },
            { label: '🗄️ Modellazione e persistenza dei dati', next: 'end_good' },
            { label: '🚀 API RESTful', next: 'end_good' },
            { label: '🧩 Profilo Beecrowd', action: 'link', url: links.beecrowd },
            { label: '⬅️ Indietro', next: 'projects' },
          ],
        },
        projects_mobile: {
          text: 'Lo sviluppo mobile è stato realizzato con focus su performance ed esperienza nativa. Quale piattaforma preferisci valutare?',
          options: [
            { label: '📱 React Native', next: 'end_good' },
            { label: '🦋 Flutter', next: 'end_good' },
            { label: '⬅️ Indietro', next: 'projects' },
          ],
        },
        projects_ui: {
          text: 'Il lavoro di design copre dalla prototipazione alla strutturazione di design system. Cosa preferisci esplorare?',
          options: [
            { label: '🎨 Prototipazione e flussi', next: 'end_good' },
            { label: '🧩 Design system', next: 'end_good' },
            { label: '⬅️ Indietro', next: 'projects' },
          ],
        },
        about: {
          text: 'Su quale aspetto del percorso professionale vorresti sapere di più?',
          options: [
            { label: '📍 Posizione e disponibilità', next: 'about_location' },
            { label: '🎓 Formazione e specializzazione', next: 'about_education' },
            { label: '🧩 Metodologia di lavoro', next: 'about_workstyle' },
            { label: '⬅️ Indietro', next: 'start' },
          ],
        },
        about_location: {
          text: 'Opero dal Brasile e sono disponibile per progetti remoti, nonché per opportunità in presenza a seconda della località e della proposta. Vuoi sapere di più sulla disponibilità?',
          options: [
            { label: '🌍 Lavoro da remoto', next: 'about_remote' },
            { label: '🏢 Lavoro in presenza', next: 'about_presential' },
            { label: '⬅️ Indietro', next: 'about' },
          ],
        },
        about_remote: {
          text: 'Ho solida esperienza in routine di lavoro da remoto, inclusa la collaborazione asincrona e l\'uso di strumenti di gestione distribuita. Posso condividere il mio profilo LinkedIn se ti interessa.',
          options: [
            { label: '🔗 Accedi a LinkedIn', action: 'link', url: links.linkedin },
            { label: '⬅️ Indietro', next: 'about_location' },
          ],
        },
        about_presential: {
          text: 'Sono aperto a opportunità in presenza in base alla proposta e alla località. Possiamo metterci in contatto per discutere i dettagli.',
          options: [
            { label: '📩 Vai ai contatti', next: 'contact' },
            { label: '⬅️ Indietro', next: 'about_location' },
          ],
        },
        about_education: {
          text: 'La mia formazione è prevalentemente pratica, integrata da corsi specializzati e apprendimento continuo attraverso progetti reali. Vorresti conoscere le tecnologie che padroneggio?',
          options: [
            { label: '🛠️ Vedi competenze', next: 'skills' },
            { label: '⬅️ Indietro', next: 'about' },
          ],
        },
        about_workstyle: {
          text: 'Lavoro con focus su codice sostenibile, interfacce curate e consegne che bilanciano velocità e qualità. Valorizzo comunicazione chiara, code review e documentazione adeguata. Vuoi vedere le mie competenze tecniche?',
          options: [
            { label: '🛠️ Vedi competenze', next: 'skills' },
            { label: '⬅️ Indietro', next: 'about' },
          ],
        },
        skills: {
          text: 'Le competenze sono distribuite tra diversi livelli di sviluppo. Quale area è più rilevante per la tua valutazione?',
          options: [
            { label: '🎨 Front-end', next: 'skills_front' },
            { label: '⚙️ Back-end', next: 'skills_back' },
            { label: '🧩 Fullstack', next: 'skills_full' },
            { label: '⬅️ Indietro', next: 'start' },
          ],
        },
        skills_front: {
          text: 'Nel front-end, ho padronanza di Vue.js, React, Tailwind CSS, animazioni CSS e JavaScript, e buone pratiche di accessibilità e performance. Vuoi vedere esempi applicati o progetti completi?',
          options: [
            { label: '📌 Esempi di componenti', next: 'end_good' },
            { label: '📁 Progetti completi', next: 'projects' },
            { label: '💻 Vedi GitHub', action: 'link', url: links.github },
            { label: '⬅️ Indietro', next: 'skills' },
          ],
        },
        skills_back: {
          text: 'Nel back-end, ho esperienza nello sviluppo di API RESTful, autenticazione sicura e modellazione di database relazionali e non relazionali. Vuoi dettagli sul mio approccio tecnico?',
          options: [
            { label: '📦 Sì, dimmi di più', next: 'end_good' },
            { label: '⬅️ Indietro', next: 'skills' },
          ],
        },
        skills_full: {
          text: 'Sono in grado di gestire l\'intero ciclo di sviluppo di un\'applicazione — dalla pianificazione dell\'architettura al rilascio in produzione. Vorresti vedere un esempio di progetto fullstack?',
          options: [
            { label: '🚀 Sì', next: 'end_good' },
            { label: '⬅️ Indietro', next: 'skills' },
          ],
        },
        contact: {
          text: 'Sono disponibile attraverso i seguenti canali. Quale preferisci?',
          options: [
            { label: '📧 Email', next: 'contact_email' },
            { label: '💼 LinkedIn', next: 'contact_linkedin' },
            { label: '📱 WhatsApp', next: 'contact_whatsapp' },
            { label: '💼 Upwork', next: 'contact_upwork' },
            { label: '⬅️ Indietro', next: 'start' },
          ],
        },
        contact_email: {
          text: 'Puoi contattarmi direttamente all\'indirizzo leonardopigatti@yahoo.com.br. Clicca qui sotto per aprire il client email.',
          options: [
            { label: '📧 Apri email', action: 'link', url: links.email },
            { label: '⬅️ Indietro', next: 'contact' },
          ],
        },
        contact_linkedin: {
          text: 'LinkedIn è il canale più indicato per opportunità professionali. Clicca qui sotto per accedere al profilo direttamente.',
          options: [
            { label: '🔗 Accedi a LinkedIn', action: 'link', url: links.linkedin },
            { label: '⬅️ Indietro', next: 'contact' },
          ],
        },
        contact_whatsapp: {
          text: 'WhatsApp consente una comunicazione più rapida. Clicca qui sotto per avviare una conversazione.',
          options: [
            { label: '📱 Apri WhatsApp', action: 'link', url: links.whatsapp },
            { label: '⬅️ Indietro', next: 'contact' },
          ],
        },
        contact_upwork: {
          text: 'Per progetti freelance, il mio profilo Upwork raccoglie valutazioni e storico delle consegne.',
          options: [
            { label: '🔗 Accedi a Upwork', action: 'link', url: links.upwork },
            { label: '⬅️ Indietro', next: 'contact' },
          ],
        },
        goals: {
          text: 'Vorresti conoscere gli obiettivi professionali?',
          options: [
            { label: '🎯 Sì', next: 'goals_yes' },
            { label: '⬅️ Indietro', next: 'start' },
          ],
        },
        goals_yes: {
          text: 'Cerco di far parte di team in cui eccellenza tecnica e cura del prodotto vanno di pari passo. Il mio interesse è rivolto a posizioni che stimolino lo sviluppo di soluzioni robuste, ben architettate e con impatto reale sul business — sia in front-end specializzato, sviluppo fullstack o leadership tecnica. Sono aperto sia a contratti a tempo indeterminato che a collaborazioni per progetto. Vorresti analizzare il mio lavoro o preferisci metterti in contatto direttamente?',
          options: [
            { label: '📁 Vedi progetti', next: 'projects' },
            { label: '📩 Mettersi in contatto', next: 'contact' },
            { label: '⬅️ Indietro', next: 'goals' },
          ],
        },
        end_good: {
          text: 'Sono a disposizione se hai ulteriori domande. Possiamo continuare a esplorare il portfolio o iniziare una conversazione direttamente.',
          options: [
            { label: '📩 Mettersi in contatto', next: 'contact' },
            { label: '📁 Vedere altri progetti', next: 'projects' },
            { label: '⬅️ Torna all\'inizio', next: 'start' },
          ],
        },
        end_contact: {
          text: 'Grazie per l\'interesse. Ti risponderò a breve. Se preferisci esplorare direttamente il mio codice, i repository sono disponibili su GitHub.',
          options: [
            { label: '💻 Accedi a GitHub', action: 'link', url: links.github },
            { label: '⬅️ Torna all\'inizio', next: 'start' },
            { label: '📁 Vedi progetti', next: 'projects' },
          ],
        },
      }),
    },
  },
}

export function useLang() {
  const t = () => translations[selectedLang.value]

  function setLang(lang) {
    selectedLang.value = lang
  }

  return { selectedLang, t, setLang }
}