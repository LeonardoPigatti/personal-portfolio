/**
 * projects.js
 *
 * Dados estáticos dos projetos exibidos no carrossel.
 * A chave `repoName` deve bater EXATAMENTE com o nome do repositório no GitHub.
 * Os campos `image` e `description` substituem os da API.
 * Todos os outros dados (stars, forks, linguagem, url…) vêm da API em tempo real.
 *
 * Ordem aqui = ordem de exibição no carrossel.
 */

export const projects = [
  {
    repoName: "buscador",
    image: "/images/projects/buscador.jpg",
    description: "Escreva aqui uma descrição no estilo do seu portfólio para o projeto Buscador.",
  },
  {
    repoName: "Calculadora-Numeros-Complexos",
    image: "/images/projects/calculadora-numeros-complexos.jpg",
    description: "Escreva aqui uma descrição no estilo do seu portfólio para a Calculadora de Números Complexos.",
  },
  // Quando criar novos repositórios públicos, adicione-os aqui:
  // {
  //   repoName: "nome-exato-do-repo",
  //   image: "/images/projects/nome-do-projeto.jpg",
  //   description: "Descrição customizada aqui.",
  // },
]