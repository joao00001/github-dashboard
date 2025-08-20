# 🚀 Hub do Dev: Um Painel Pessoal do GitHub com Análise de IA

![Capa do Hub do Dev](https://placehold.co/1200x630/0A0A1A/7C7CEB?text=Hub%20do%20Dev&font=inter)

O **Hub do Dev** é uma aplicação web de página única que transforma qualquer perfil do GitHub em um dashboard interativo e visualmente rico. Vá além das estatísticas básicas e obtenha insights profundos sobre a jornada de um desenvolvedor, incluindo uma análise de perfil gerada por Inteligência Artificial com a API do Gemini.

---

## ✨ Funcionalidades Principais

- **Dashboard Completo:** Visualize informações de perfil, bio, links sociais e estatísticas gerais (seguidores, repositórios, estrelas totais, etc.) em um layout moderno com efeito *glassmorphism*.
- **Gráfico de Linguagens:** Um gráfico de pizza interativo que mostra as linguagens de programação mais utilizadas pelo desenvolvedor, calculado com base nos bytes de código em todos os repositórios.
- **Repositórios Populares:** Uma lista destacada dos projetos mais relevantes do usuário, ordenados por número de estrelas.
- **Feed de Atividade Recente:** Acompanhe as últimas contribuições, como commits, criação de repositórios e projetos favoritados.
- **Análise com IA (Gemini):** Com um clique, gere uma análise de perfil inteligente que atua como um "Recrutador Técnico", destacando pontos fortes e sugerindo próximos passos para a carreira do desenvolvedor.
- **Modo Comparação:** Analise dois perfis de desenvolvedores lado a lado e compare suas estatísticas e linguagens.
- **Tratamento de Erros Inteligente:** A aplicação diferencia erros de "usuário não encontrado" de "limite de requisições da API", guiando o usuário sobre como proceder.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com um conjunto de tecnologias modernas de front-end:

- **Framework:** [React](https://reactjs.org/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Gráficos:** [Recharts](https://recharts.org/)
- **Ícones:** [Lucide React](https://lucide.dev/)
- **Análise de IA:** [Google Gemini API](https://ai.google.dev/)
- **Renderização de Markdown:** [React Markdown](https://github.com/remarkjs/react-markdown)

---

## ⚙️ Como Executar o Projeto Localmente

Para executar o Hub do Dev na sua máquina, siga estes passos:

### 1. Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### 2. Clone o Repositório

```bash
git clone [https://github.com/joao00001/github-dashboard.git](https://github.com/joao00001/github-dashboard.git)
cd hub-do-dev
```

### 3. Instale as Dependências

```bash
pnpm install
```

### 4. Configure o Token do GitHub

Para evitar o baixo limite de requisições da API do GitHub (60/hora), é **altamente recomendado** usar um Token de Acesso Pessoal. Com um token, o limite sobe para 5.000 requisições por hora.

1.  **Gere um Token:** Siga o [guia do GitHub para criar um Personal Access Token](https://docs.github.com/pt/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens). Marque apenas o escopo `public_repo`.
2.  **Crie o arquivo de ambiente:** Na raiz do projeto, crie um arquivo chamado `.env`.
3.  **Adicione o token ao arquivo:**
    ```
    REACT_APP_GITHUB_TOKEN=SEU_TOKEN_PESSOAL_AQUI
    ```
    *(O prefixo `REACT_APP_` é obrigatório para que o Create React App reconheça a variável).*

### 5. Inicie a Aplicação

```bash
pnpm start
```

A aplicação estará disponível em `http://localhost:3000`.

---

## 🤝 Contribuições

Contribuições são bem-vindas! Se você tem ideias para novas funcionalidades, melhorias de UI/UX ou correções de bugs, sinta-se à vontade para abrir uma *issue* ou enviar um *pull request*.
