Projeto para a disciplina de Serviços Web.
Projeto de API Rest para testar rotas e autenticação de usuários com JWT

-Baixe o repositório no Github. Abra o prompt de comando na pasta do projeto e instale as dependências
   npm install
   

-Configure as variáveis de ambiente

   Crie um arquivo `.env` na raiz do projeto 

   PORT=3000
   JWT_SECRET="chavesupersecreta"
   NODE_ENV="development"
   DATABASE_URL="file:./dev.db"
  



-Banco de Dados

Gere o banco e as tabelas
   
  npx prisma migrate dev --name init


-Rodando a API

  npm run dev

A API estará disponível em: [http://localhost:3000](http://localhost:3000)

---

-Usuário Admin
 npx prisma db seed  

-Chamados (Tickets)

- Todas as rotas abaixo exigem o header:
- Authorization: Bearer SEU_TOKEN_AQUI

**Criar chamado**

  POST http://localhost:3000/tickets
  Authorization: Bearer SEU_TOKEN_AQUI
  Content-Type: application/json
  {
    "title": "Problema X",
    "description": "Detalhes do problema",
    "email": "lucas@email.com"
  }

**Listar Chamados**

  Um usuário só poderá listar seus próprios chamados
  O Administrador irá listar todos os chamados
  GET http://localhost:3000/tickets
  Authorization: SEU_TOKEN_AQUI

**Editar meu chamado**
  Somente o usuário pode editar o próprio chamado
  PUT http://localhost:3000/tickets/Id
  Authorization: Bearer SEU_TOKEN_AQUI
  Content-Type: application/json

  {
    "title": "Novo título2",
    "description": "Nova descrição2",
    "email": "novo@email.com"
  }



**Excluir chamado**
  Somente o Admin pode excluir chamados
  DELETE http://localhost:3000/tickets/f805d3bb-e9bc-4406-8825-0c76903048ea
  Authorization: SEU_TOKEN_AQUI

