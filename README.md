# Projeto N2 – Segurança da Informação

Este repositório contém duas versões de uma API RESTful para cadastro e gerenciamento de usuários, desenvolvidas para o trabalho N2 da disciplina de Segurança da Informação. O objetivo é demonstrar a evolução de uma aplicação insegura para uma aplicação segura, abordando vulnerabilidades comuns em aplicações web e boas práticas de segurança.

---

## 👥 Integrantes da Equipe

- Bruno Luis Pereira
- Isaac Graper
- Luis Quintino
- Ramires Paes
- Victor Moy da Cruz
- Victoria Abigail Pansini

---

## 📦 Estrutura do Projeto

```
N2-SEG-INFORMACAO/
├── api-v1-insegura/     # Versão vulnerável (sem segurança)
├── api-v2-segura/       # Versão protegida com JWT, bcrypt, etc.
├── relatorios/          # Relatórios técnico e executivo
└── README.md
```

---

# 🔓 Versão 1 – API Insegura

## Funcionalidades

- CRUD completo de usuários:
  - `GET /users`
  - `POST /users`
  - `PUT /users/:id`
  - `DELETE /users/:id`
- Sem autenticação
- Sem validação de entrada
- Sem criptografia
- Sem sanitização

## Vulnerabilidades exploradas

### 🔥 NoSQL Injection

- Foi possível injetar `{ "$gt": "" }` em campos como `username`
- API retornava todos os usuários indevidamente

### 🧨 XSS (Cross-site Scripting)

- Usuário com `<script>alert("XSS")</script>` foi salvo e renderizado sem filtro
- O script era executado ao ser exibido no navegador com `innerHTML`

### 🎯 CSRF (Cross-Site Request Forgery)

- Uma página externa HTML enviava requisições `POST /users` sem consentimento
- Demonstrou que um site externo podia criar usuários ao carregar um `form` malicioso

## ▶️ Como rodar a versão 1

```bash
cd api-v1-insegura
node server.js
```

### 🔍 Como ver os ataques em HTML

1. Abra os arquivos na pasta `pages/`:

   - `test-xss.html` → simula ataque XSS
   - `csrf-ataque.html` → simula ataque CSRF

2. Execute com Live Server ou abra no navegador diretamente (duplo clique)

---

# 🔐 Versão 2 – API Segura

## ✅ Tecnologias Utilizadas

- Node.js + Express
- MongoDB Atlas + Mongoose
- JSON Web Token (JWT)
- Bcrypt para criptografar senhas
- Helmet (headers de segurança)
- Express-validator (validação de dados)
- dotenv

---

## 🚀 Instalação das Dependências

```bash
npm install
```

---

## ▶️ Como rodar a versão 2

```bash
cd api-v2-segura
node server.js
```

Crie o arquivo `.env`:

```env
MONGO_URI=mongodb+srv://<USUARIO>:<SENHA>@<CLUSTER>.mongodb.net/n2api?retryWrites=true&w=majority
JWT_SECRET=suaChaveJWTsecreta
```

---

## 🔐 Rotas da API v2

### 1. POST `/register`

```json
{
  "username": "joao",
  "email": "joao@email.com",
  "password": "123456"
}
```

### 2. POST `/login`

```json
{
  "email": "joao@email.com",
  "password": "123456"
}
```

**Resposta:**

```json
{
  "message": "Login bem-sucedido",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

### 3. GET `/users` (protegido)

- **Method:** `GET`
- **URL:** `http://localhost:3000/users`
- **Header:**
  ```
  Authorization: Bearer <token>
  ```

---

### 4. PUT `/users/:id` (protegido)

- **Method:** `PUT`
- **URL:** `http://localhost:3000/users/ID_DO_USUARIO`
- **Header:**
  ```
  Authorization: Bearer <token>
  ```
- **Body:**
  ```json
  {
    "username": "novo-nome"
  }
  ```

---

### 5. DELETE `/users/:id` (protegido)

- **Method:** `DELETE`
- **URL:** `http://localhost:3000/users/ID_DO_USUARIO`
- **Header:**
  ```
  Authorization: Bearer <token>
  ```

---

## 🛡 Segurança Implementada na v2

| Proteção                                      | Status |
| --------------------------------------------- | ------ |
| Criptografia de senha com bcrypt              | ✅     |
| Autenticação com JWT                          | ✅     |
| Middleware de verificação de token            | ✅     |
| Proteção das rotas PUT e DELETE               | ✅     |
| Validação e sanitização com express-validator | ✅     |
| Headers de segurança (Helmet)                 | ✅     |
| Imune a CSRF (por uso de JWT via header)      | ✅     |

---

## 📚 Observações

- A versão 2 resolve todas as vulnerabilidades da versão 1
- A estrutura do código está separada por responsabilidade (controllers, models, routes, middlewares)
- Ideal para demonstrar como uma API real pode evoluir de forma segura

---
