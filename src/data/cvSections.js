export const getCvSections = (lang = 'EUA') => {
  const data = {
    EUA: {
      summary: {
        type: 'summary',
        title: 'Professional Summary',
        content: 'Technology professional with nearly 3 years of experience in B2B products within the agribusiness sector, combining software development, quality assurance and strong proximity to Product, UX and Business teams. Hands on experience in agile environments (Scrum), working from requirements definition and backlog prioritization through delivery and solution validation. Hybrid and technical profile, with strong ability to translate business needs into clear and feasible requirements, support development teams, remove impediments and ensure value driven deliveries.',
        subtitle: 'Core Skills',
        subcontent: ['Full Stack Development', 'RESTful API Design & Development', 'Database Integration & Modeling', 'Clean Code & Best Practices', 'Testing & Software Quality Assurance', 'Git & Version Control', 'Agile Methodologies', 'Technical Requirements Gathering & Refinement'],
        tooltips: ['Scalable full-stack solutions.', 'Robust RESTful API design.', 'Database performance & integrity.', 'SOLID principles & clean code.', 'Unit, integration & E2E testing.', 'Git workflows & code reviews.', 'Scrum & Kanban delivery.', 'Technical specs from business needs.', 'Bridging Tech, Product & UX.'],
      },
      experience: {
        type: 'experience',
        title: 'Professional Experience',
        experiences: [
          {
            company: 'Yeb Inteligência de Mercado',
            positions: [
              {
                role: 'Full Stack Developer | Jan/2023 – Nov/2025',
                bullets: [
                  'Worked on the development of the B2B software Cotagri, participating in scope definition and requirements gathering together with the product team.',
                  'Implemented features using Vue.js, Vuex, Vue Router, Node.js, GraphQL and TypeScript, ensuring scalability and maintainability.',
                  'Planned and organized weekly sprints, supporting the team in technical prioritization and removal of impediments.',
                  'Acted directly as an interface between engineering, product, UX and stakeholders, with frequent contact with enterprise clients such as Cerradinho Bioenergia and Raízen, ensuring technical deliveries aligned with real business needs.',
                ],
              },
              {
                role: 'Quality Assurance Specialist | Jul/2024 – Nov/2025',
                bullets: [
                  'Implemented and automated tests for the Cotagri and SGF systems, ensuring delivery quality and stability.',
                  'Worked closely with product and development teams to create test plans aligned with business requirements.',
                  'Acted in risk identification, requirements validation and prevention of production issues.',
                  'Actively contributed to the continuous improvement of agile and quality processes.',
                ],
              },
            ],
          },
          {
            company: 'CRM Soluções',
            positions: [
              {
                role: 'Full Stack Developer | Jun/2021 – Oct/2021',
                bullets: [
                  'Worked on cross-functional projects supporting product and engineering teams.',
                  'Collaborated on requirement analysis, documentation and delivery validation.',
                  'Contributed to process improvements and quality routines in agile environments.',
                ],
              },
            ],
          },
        ],
      },
      education: {
        type: 'education',
        title: 'Education',
        content: '',
        subtitle: 'Courses and Certifications',
        courses: [
          { title: 'Principles and Practices of Project Management – University of São Paulo (USP)', certificates: ['/src/assets/certifications/certs-gp-usp/_1Introdução aos Princípios e Práticas da Gestão De Projetos Certificado de Especialização!_page-0001.jpg', '/src/assets/certifications/certs-gp-usp/Gestão de Riscos e de Mudanças em Projetos_page-0001.jpg', '/src/assets/certifications/certs-gp-usp/Iniciação e Planejamento de Projetos_page-0001.jpg', '/src/assets/certifications/certs-gp-usp/Orçamento e Cronograma de Projetos_page-0001.jpg', '/src/assets/certifications/certs-gp-usp/Projeto Aplicado - Introdução a Gestão de Projetos_page-0001.jpg'], verifyUrl: 'https://LINK-DA-USP-AQUI' },
          { title: 'Bug Bounty Hunting & Web Security Testing – Udemy', certificates: ['/src/assets/certifications/bug-bounty/bug-bounty.jpg'], verifyUrl: 'https://LINK-DA-UDEMY-AQUI' },
          { title: 'Tech Lead: Key Skills and Strategies for Success – Udemy', certificates: ['/src/assets/certifications/tech-leader-udemy/tech-leader.jpg'], verifyUrl: 'https://LINK-DA-UDEMY-AQUI' },
          { title: 'Cybersecurity Essentials – Cisco Networking Academy', certificates: ['/src/assets/certifications/cisco/cisco.jpg'], verifyUrl: 'https://LINK-DA-CISCO-AQUI' },
          { title: 'Specialization in Software Design and Architecture – University of Alberta (In Progress)', certificates: [], verifyUrl: 'https://LINK-DA-PLATAFORMA-AQUI' },
        ],
        items: [
          { degree: "Bachelor's Degree in Computer Engineering", school: 'FHO – Fundação Hermínio Ometto', period: '2020 – 2026' },
          { degree: 'Technical Degree in Information Technology', school: 'ETEC – São Paulo State Technical School', period: '2017 – 2019' },
        ],
      },
      languages: {
        type: 'languages',
        title: 'Languages',
        content: '',
        subtitle: 'Technological Stack',
        subcontent: ['Front-end', 'Back-end', 'Testing', 'APIs & Tools', 'Databases', 'Cloud & DevOps'],
        tooltips: ['Vue.js · React · Vuex · Vue Router · TypeScript · JavaScript · HTML · CSS', 'Node.js · TypeScript · GraphQL · REST · PHP (Laravel) · Python', 'Jest · Vitest · Cypress · Playwright', 'Postman · Newman', 'MySQL · SQL Server · MongoDB · PostgreSQL', 'AWS · Docker · CI/CD · Git · Azure'],
        items: [{ language: 'Portuguese', level: 'Native' }, { language: 'English', level: 'Advanced (C1)' }, { language: 'Spanish', level: 'Intermediate (B2)' }],
      },
    },

    Brasil: {
      summary: {
        type: 'summary',
        title: 'Resumo Profissional',
        content: 'Profissional de tecnologia com quase 3 anos de experiência em produtos B2B no setor de agronegócio, combinando desenvolvimento de software, garantia de qualidade e forte proximidade com times de Produto, UX e Negócios. Experiência prática em ambientes ágeis (Scrum), atuando desde a definição de requisitos e priorização do backlog até a entrega e validação de soluções. Perfil híbrido e técnico, com forte capacidade de traduzir necessidades de negócio em requisitos claros e viáveis, apoiar times de desenvolvimento, remover impedimentos e garantir entregas orientadas a valor.',
        subtitle: 'Competências Principais',
        subcontent: ['Desenvolvimento Full Stack', 'Design e Desenvolvimento de APIs RESTful', 'Integração e Modelagem de Banco de Dados', 'Código Limpo e Boas Práticas', 'Testes e Garantia de Qualidade de Software', 'Git e Controle de Versão', 'Metodologias Ágeis', 'Levantamento e Refinamento de Requisitos Técnicos'],
        tooltips: ['Soluções full-stack escaláveis.', 'Design robusto de APIs RESTful.', 'Performance e integridade de banco de dados.', 'Princípios SOLID e código limpo.', 'Testes unitários, integração e E2E.', 'Workflows Git e revisão de código.', 'Entregas com Scrum e Kanban.', 'Specs técnicas a partir de necessidades de negócio.', 'Ponte entre Tech, Produto e UX.'],
      },
      experience: {
        type: 'experience',
        title: 'Experiência Profissional',
        experiences: [
          {
            company: 'Yeb Inteligência de Mercado',
            positions: [
              {
                role: 'Desenvolvedor Full Stack | Jan/2023 – Nov/2025',
                bullets: [
                  'Atuou no desenvolvimento do software B2B Cotagri, participando da definição de escopo e levantamento de requisitos junto ao time de produto.',
                  'Implementou funcionalidades utilizando Vue.js, Vuex, Vue Router, Node.js, GraphQL e TypeScript, garantindo escalabilidade e manutenibilidade.',
                  'Planejou e organizou sprints semanais, apoiando o time na priorização técnica e remoção de impedimentos.',
                  'Atuou diretamente como interface entre engenharia, produto, UX e stakeholders, com contato frequente com clientes enterprise como Cerradinho Bioenergia e Raízen, garantindo entregas técnicas alinhadas às necessidades reais do negócio.',
                ],
              },
              {
                role: 'Especialista em Quality Assurance | Jul/2024 – Nov/2025',
                bullets: [
                  'Implementou e automatizou testes para os sistemas Cotagri e SGF, garantindo qualidade e estabilidade nas entregas.',
                  'Trabalhou em estreita colaboração com times de produto e desenvolvimento para criar planos de teste alinhados aos requisitos de negócio.',
                  'Atuou na identificação de riscos, validação de requisitos e prevenção de problemas em produção.',
                  'Contribuiu ativamente para a melhoria contínua dos processos ágeis e de qualidade.',
                ],
              },
            ],
          },
          {
            company: 'CRM Soluções',
            positions: [
              {
                role: 'Desenvolvedor Full Stack | Jun/2021 – Out/2021',
                bullets: [
                  'Atuou em projetos multifuncionais apoiando times de produto e engenharia.',
                  'Colaborou na análise de requisitos, documentação e validação de entregas.',
                  'Contribuiu para melhorias de processos e rotinas de qualidade em ambientes ágeis.',
                ],
              },
            ],
          },
        ],
      },
      education: {
        type: 'education',
        title: 'Formação',
        content: '',
        subtitle: 'Cursos e Certificações',
        courses: [
          { title: 'Princípios e Práticas de Gestão de Projetos – Universidade de São Paulo (USP)', certificates: ['/src/assets/certifications/certs-gp-usp/_1Introdução aos Princípios e Práticas da Gestão De Projetos Certificado de Especialização!_page-0001.jpg', '/src/assets/certifications/certs-gp-usp/Gestão de Riscos e de Mudanças em Projetos_page-0001.jpg', '/src/assets/certifications/certs-gp-usp/Iniciação e Planejamento de Projetos_page-0001.jpg', '/src/assets/certifications/certs-gp-usp/Orçamento e Cronograma de Projetos_page-0001.jpg', '/src/assets/certifications/certs-gp-usp/Projeto Aplicado - Introdução a Gestão de Projetos_page-0001.jpg'], verifyUrl: 'https://LINK-DA-USP-AQUI' },
          { title: 'Bug Bounty Hunting & Testes de Segurança Web – Udemy', certificates: ['/src/assets/certifications/bug-bounty/bug-bounty.jpg'], verifyUrl: 'https://LINK-DA-UDEMY-AQUI' },
          { title: 'Tech Lead: Habilidades e Estratégias para o Sucesso – Udemy', certificates: ['/src/assets/certifications/tech-leader-udemy/tech-leader.jpg'], verifyUrl: 'https://LINK-DA-UDEMY-AQUI' },
          { title: 'Fundamentos de Cibersegurança – Cisco Networking Academy', certificates: ['/src/assets/certifications/cisco/cisco.jpg'], verifyUrl: 'https://LINK-DA-CISCO-AQUI' },
          { title: 'Especialização em Design e Arquitetura de Software – University of Alberta (Em Andamento)', certificates: [], verifyUrl: 'https://LINK-DA-PLATAFORMA-AQUI' },
        ],
        items: [
          { degree: 'Bacharelado em Engenharia de Computação', school: 'FHO – Fundação Hermínio Ometto', period: '2020 – 2026' },
          { degree: 'Técnico em Informática', school: 'ETEC – Escola Técnica Estadual de São Paulo', period: '2017 – 2019' },
        ],
      },
      languages: {
        type: 'languages',
        title: 'Idiomas',
        content: '',
        subtitle: 'Stack Tecnológica',
        subcontent: ['Front-end', 'Back-end', 'Testes', 'APIs e Ferramentas', 'Bancos de Dados', 'Cloud e DevOps'],
        tooltips: ['Vue.js · React · Vuex · Vue Router · TypeScript · JavaScript · HTML · CSS', 'Node.js · TypeScript · GraphQL · REST · PHP (Laravel) · Python', 'Jest · Vitest · Cypress · Playwright', 'Postman · Newman', 'MySQL · SQL Server · MongoDB · PostgreSQL', 'AWS · Docker · CI/CD · Git · Azure'],
        items: [{ language: 'Português', level: 'Nativo' }, { language: 'Inglês', level: 'Avançado (C1)' }, { language: 'Espanhol', level: 'Intermediário (B2)' }],
      },
    },

    Italia: {
      summary: {
        type: 'summary',
        title: 'Profilo Professionale',
        content: 'Professionista tecnologico con quasi 3 anni di esperienza in prodotti B2B nel settore agroalimentare, combinando sviluppo software, garanzia della qualità e forte vicinanza ai team di Prodotto, UX e Business. Esperienza pratica in ambienti agili (Scrum), operando dalla definizione dei requisiti e dalla prioritizzazione del backlog fino alla consegna e validazione delle soluzioni. Profilo ibrido e tecnico, con forte capacità di tradurre le esigenze aziendali in requisiti chiari e fattibili, supportare i team di sviluppo, rimuovere impedimenti e garantire consegne orientate al valore.',
        subtitle: 'Competenze Principali',
        subcontent: ['Sviluppo Full Stack', 'Progettazione e Sviluppo di API RESTful', 'Integrazione e Modellazione di Database', 'Codice Pulito e Best Practice', 'Test e Garanzia della Qualità del Software', 'Git e Controllo di Versione', 'Metodologie Agili', 'Raccolta e Raffinamento di Requisiti Tecnici'],
        tooltips: ['Soluzioni full-stack scalabili.', 'Progettazione robusta di API RESTful.', 'Performance e integrità del database.', 'Principi SOLID e codice pulito.', 'Test unitari, integrazione ed E2E.', 'Workflow Git e revisione del codice.', 'Consegne con Scrum e Kanban.', 'Specifiche tecniche dai bisogni aziendali.', 'Collegamento tra Tech, Prodotto e UX.'],
      },
      experience: {
        type: 'experience',
        title: 'Esperienza Professionale',
        experiences: [
          {
            company: 'Yeb Inteligência de Mercado',
            positions: [
              {
                role: 'Sviluppatore Full Stack | Gen/2023 – Nov/2025',
                bullets: [
                  'Ha lavorato allo sviluppo del software B2B Cotagri, partecipando alla definizione dello scope e alla raccolta dei requisiti insieme al team di prodotto.',
                  'Ha implementato funzionalità utilizzando Vue.js, Vuex, Vue Router, Node.js, GraphQL e TypeScript, garantendo scalabilità e manutenibilità.',
                  'Ha pianificato e organizzato sprint settimanali, supportando il team nella prioritizzazione tecnica e nella rimozione degli impedimenti.',
                  "Ha agito direttamente come interfaccia tra ingegneria, prodotto, UX e stakeholder, con contatti frequenti con clienti enterprise come Cerradinho Bioenergia e Raízen, garantendo consegne tecniche allineate alle reali esigenze aziendali.",
                ],
              },
              {
                role: 'Specialista Quality Assurance | Lug/2024 – Nov/2025',
                bullets: [
                  'Ha implementato e automatizzato test per i sistemi Cotagri e SGF, garantendo qualità e stabilità nelle consegne.',
                  'Ha collaborato strettamente con i team di prodotto e sviluppo per creare piani di test allineati ai requisiti aziendali.',
                  'Ha operato nella identificazione dei rischi, validazione dei requisiti e prevenzione di problemi in produzione.',
                  'Ha contribuito attivamente al miglioramento continuo dei processi agili e di qualità.',
                ],
              },
            ],
          },
          {
            company: 'CRM Soluções',
            positions: [
              {
                role: 'Sviluppatore Full Stack | Giu/2021 – Ott/2021',
                bullets: [
                  "Ha lavorato su progetti interfunzionali a supporto dei team di prodotto e ingegneria.",
                  "Ha collaborato all'analisi dei requisiti, alla documentazione e alla validazione delle consegne.",
                  'Ha contribuito al miglioramento dei processi e alle routine di qualità in ambienti agili.',
                ],
              },
            ],
          },
        ],
      },
      education: {
        type: 'education',
        title: 'Formazione',
        content: '',
        subtitle: 'Corsi e Certificazioni',
        courses: [
          { title: 'Principi e Pratiche di Project Management – Università di San Paolo (USP)', certificates: ['/src/assets/certifications/certs-gp-usp/_1Introdução aos Princípios e Práticas da Gestão De Projetos Certificado de Especialização!_page-0001.jpg', '/src/assets/certifications/certs-gp-usp/Gestão de Riscos e de Mudanças em Projetos_page-0001.jpg', '/src/assets/certifications/certs-gp-usp/Iniciação e Planejamento de Projetos_page-0001.jpg', '/src/assets/certifications/certs-gp-usp/Orçamento e Cronograma de Projetos_page-0001.jpg', '/src/assets/certifications/certs-gp-usp/Projeto Aplicado - Introdução a Gestão de Projetos_page-0001.jpg'], verifyUrl: 'https://LINK-DA-USP-AQUI' },
          { title: 'Bug Bounty Hunting & Web Security Testing – Udemy', certificates: ['/src/assets/certifications/bug-bounty/bug-bounty.jpg'], verifyUrl: 'https://LINK-DA-UDEMY-AQUI' },
          { title: 'Tech Lead: Competenze e Strategie per il Successo – Udemy', certificates: ['/src/assets/certifications/tech-leader-udemy/tech-leader.jpg'], verifyUrl: 'https://LINK-DA-UDEMY-AQUI' },
          { title: 'Fondamenti di Cybersecurity – Cisco Networking Academy', certificates: ['/src/assets/certifications/cisco/cisco.jpg'], verifyUrl: 'https://LINK-DA-CISCO-AQUI' },
          { title: 'Specializzazione in Software Design e Architettura – University of Alberta (In Corso)', certificates: [], verifyUrl: 'https://LINK-DA-PLATAFORMA-AQUI' },
        ],
        items: [
          { degree: 'Laurea in Ingegneria Informatica', school: 'FHO – Fundação Hermínio Ometto', period: '2020 – 2026' },
          { degree: 'Diploma Tecnico in Informatica', school: 'ETEC – Scuola Tecnica Statale di San Paolo', period: '2017 – 2019' },
        ],
      },
      languages: {
        type: 'languages',
        title: 'Lingue',
        content: '',
        subtitle: 'Stack Tecnologico',
        subcontent: ['Front-end', 'Back-end', 'Testing', 'API e Strumenti', 'Database', 'Cloud e DevOps'],
        tooltips: ['Vue.js · React · Vuex · Vue Router · TypeScript · JavaScript · HTML · CSS', 'Node.js · TypeScript · GraphQL · REST · PHP (Laravel) · Python', 'Jest · Vitest · Cypress · Playwright', 'Postman · Newman', 'MySQL · SQL Server · MongoDB · PostgreSQL', 'AWS · Docker · CI/CD · Git · Azure'],
        items: [{ language: 'Portoghese', level: 'Madrelingua' }, { language: 'Inglese', level: 'Avanzato (C1)' }, { language: 'Spagnolo', level: 'Intermedio (B2)' }],
      },
    },
  }

  const d = data[lang] || data['EUA']
  return [d.summary, d.experience, d.education, d.languages]
}