# ⚡ EletroCursos

Plataforma de cursos online focada em elétrica e eletrônica. Desenvolvida com HTML, CSS e JavaScript puro, com sistema de administração integrado.

---

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Fluxo do Usuário](#fluxo-do-usuário)
- [Painel Administrativo](#painel-administrativo)
- [Tecnologias](#tecnologias)
- [Como Executar](#como-executar)
- [Configurações](#configurações)
- [Próximos Passos](#próximos-passos)
- [Contato](#contato)

---

## 👁️ Visão Geral

A EletroCursos é uma plataforma de cursos online voltada para o ensino de elétrica, eletrônica, automação industrial e energia solar. Os usuários podem visualizar os cursos disponíveis, criar uma conta gratuita e liberar o acesso completo a todo o conteúdo mediante pagamento único de **R$ 10,00** via PIX.

O administrador possui um painel exclusivo para gerenciar cursos, alunos, pagamentos e configurações da plataforma.

---

## 📁 Estrutura do Projeto
/
├── images/
│ ├── EletroCurso.png # Logo da plataforma
│ ├── EletroCurso.ico # Favicon
│ └── QR code pix.png # QR Code para pagamento PIX
├── css/
│ └── style.css # Estilos completos da plataforma
├── js/
│ └── script.js # Lógica do frontend e administração
├── index.html # Página inicial
├── cursos.html # Catálogo completo de cursos
├── sobre.html # Sobre a plataforma
├── contato.html # Links de contato (GitHub e LinkedIn)
├── entrar.html # Login e cadastro de usuários
├── pagamento.html # Página de pagamento via PIX
├── admin.html # Painel de administração
└── README.md # Documentação

text

---

## ⚙️ Funcionalidades

### Para Alunos
- Visualização de cursos em destaque na página inicial
- Catálogo completo com filtros por categoria (Elétrica, Eletrônica, Industrial, Energia Solar)
- Sistema de cadastro e login
- Página de pagamento via PIX com QR Code e código copia-e-cola
- Acesso a todos os cursos após confirmação de pagamento

### Para Administrador
- Dashboard com visão geral (total de cursos, alunos, pagantes e receita)
- Gerenciamento completo de cursos (adicionar, editar, excluir)
- Lista de alunos cadastrados com status de pagamento
- Histórico de pagamentos
- Marcar aluno como pago manualmente
- Exportar dados em formato CSV (alunos e pagamentos)
- Configurações personalizáveis (valor do acesso, chave PIX, dados do admin)

---

## 🔄 Fluxo do Usuário
Início → Ver Cursos → Entrar/Cadastrar → Pagamento PIX → Acesso Liberado

text

1. Usuário acessa a página inicial e visualiza os cursos em destaque
2. Clica em "Ver Cursos" para ver o catálogo completo
3. Clica em "Ver Detalhes" ou "Entrar" para fazer login/cadastro
4. Após login, é redirecionado para a página de pagamento
5. Escaneia o QR Code ou copia o código PIX
6. Administrador confirma o pagamento no painel
7. Acesso aos cursos liberado

---

## 🛡️ Painel Administrativo


### Funcionalidades do Painel

| Seção | Descrição |
|-------|-----------|
| **Dashboard** | Visão geral com cards de total de cursos, alunos, pagantes e receita |
| **Cursos** | CRUD completo - Adicionar, editar e excluir cursos |
| **Alunos** | Lista de alunos, marcar como pago, excluir registros |
| **Pagamentos** | Histórico de pagamentos, excluir registros |
| **Configurações** | Alterar valor do acesso, chave PIX, e-mail/senha do admin |

### Credenciais Padrão

text

> **Importante:** Altere a senha padrão nas configurações do painel admin.

---

## 💻 Tecnologias

- **HTML5** - Estrutura semântica
- **CSS3** - Flexbox, Grid, variáveis, animações e design responsivo
- **JavaScript (Vanilla)** - Manipulação do DOM, localStorage, sessionStorage
- **LocalStorage** - Persistência de dados no navegador

---

## 🚀 Como Executar

1. **Clone o repositório:**
```bash
git clone https://github.com/MisaAndrejezieski/eletrocursos.git
Abra o projeto:

Navegue até a pasta do projeto

Abra o arquivo index.html no navegador

Para desenvolvimento:

Use a extensão Live Server do VSCode

Clique com botão direito no index.html → "Open with Live Server"

🔧 Configurações
As configurações podem ser alteradas pelo painel admin ou diretamente no localStorage do navegador:

Chave	Descrição	Padrão
config	Objeto JSON com todas as configurações	Ver abaixo
json

📌 Próximos Passos
Integração com backend Python (Flask/FastAPI)

Banco de dados real (SQLite/PostgreSQL)

Sistema de verificação automática de pagamento PIX

Área do aluno com progresso dos cursos

Player de vídeo integrado

Emissão de certificados

Deploy no GitHub Pages + Vercel

📞 Contato
Misael Andrejezieski

https://img.shields.io/badge/GitHub-MisaAndrejezieski-181717?style=flat&logo=github
https://img.shields.io/badge/LinkedIn-Misael_Andrejezieski-0A66C2?style=flat&logo=linkedin

📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

