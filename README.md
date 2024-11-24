# :heavy_dollar_sign:ERP Financeiro - Conta Corrente

Este repositório contém o projeto desenvolvido para o módulo financeiro de um sistema ERP, focado na funcionalidade de gerenciamento de contas correntes.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Express**: Framework para construção de APIs e gerenciamento de rotas.
- **PostgreSQL**: Banco de dados relacional utilizado para armazenar dados.
- **JWT (JSON Web Token)**: Sistema de autenticação para proteger rotas da API.
- **Nunjucks**: Template engine para renderização de páginas dinâmicas.
- **axios**: Biblioteca para realizar requisições HTTP entre frontend e backend.

## Descrição

O sistema foi desenvolvido com arquitetura Cliente-Servidor, oferecendo uma interface gráfica e um conjunto de APIs para operações CRUD na tabela de **conta_corrente**. A tabela é composta pelos seguintes campos:
- `contaid`: Identificador único do registro.
- `num_conta`: Número da conta corrente.
- `nome_titular`: Nome do titular da conta corrente.
- `saldo`: Saldo atual.
- `data_abertura`: Data de criação da conta.
- `removido`: Indica se o registro foi "soft deleted".

## Estrutura do Projeto
   ```bash
   erp_financeiro/
   │
   ├── backend/                  # Diretório do back-end
   │   ├── apps/                 # Módulos de funcionalidades do back-end
   │   ├── database/             # Configurações do banco de dados
   │   ├── node_modules/         # Módulos Node.js para o back-end
   │   ├── routes/               # Rotas da API
   │   ├── .env                  # Variáveis de ambiente do backend
   │   ├── .gitignore            # Arquivos a serem ignorados no controle de versão
   │   ├── app.js                # Arquivo principal do servidor
   │   ├── databaseConfig.sql    # Script de configuração do banco de dados
   │   ├── package-lock.json     # Controle de versões exatas das dependências
   │   └── package.json          # Gerenciamento de dependências do backend
   │
   ├── frontend/                 # Diretório do front-end
   │   ├── apps/                 # Módulos de funcionalidades do front-end
   │   ├── node_modules/         # Módulos Node.js para o front-end
   │   ├── routes/               # Rotas do front-end
   │   ├── static/               # Arquivos estáticos (CSS, JS, imagens)
   │   ├── .env                  # Variáveis de ambiente do front-end
   │   ├── .gitignore            # Arquivos a serem ignorados no controle de versão
   │   ├── app.js                # Arquivo principal do front-end
   │   ├── package-lock.json     # Controle de versões exatas das dependências
   │   └── package.json          # Gerenciamento de dependências do frontend
   └── 
   ```

## Funcionalidades Implementadas
1. **APIs**:
   - `GetAllContas`: Lista as contas não removidas.
   - `GetContaByID`: Exibe dados de uma conta específica.
   - `InsertContas`: Insere uma nova conta.
   - `UpdateContas`: Atualiza uma conta existente.
   - `DeleteContas`: Realiza "soft delete" na conta.

2. **Segurança**:
   - Proteção de rotas com JWT.
   - Sistema de login para controle de acesso.

3. **Front-End**:
   - Funções integradas com as APIs do back-end.
   - Tela de login e controle de sessão.
   - Layout customizado para a interface de conta corrente.

## Como Executar

1. **Clonar o repositório**:
   ```bash
   git clone https://github.com/camilymilsoni/bsi-trabalho-dw3.git

2. **Instalar as dependências do backend e frontend**:
   
   - No diretório `backend/`:
     
     ```bash
      npm i

   - No diretório `frontend/`:
     
     ```bash
      npm i

3. **Configurar as variáveis de ambiente (.env)**:

   No repositório clonado, você verá um arquivo chamado `.env.example` dentro do diretório `backend/`. O próximo passo é criar o arquivo .env com as configurações corretas para a aplicação:

   - Renomear o arquivo `.env.example` para `.env` apenas no diretório `backend/`:
  
     ```bash
     mv .env.example .env

   - Configurar as variáveis de ambiente:
  
     - Abra o arquivo `.env` no diretório `backend/` e edite as variáveis de ambiente necessárias.

4. **Iniciar o servidor**:

   - No diretório `backend/`:
     
     ```bash
      node app.js

   - No diretório `frontend/`:
     
     ```bash
      node app.js

5. **Acessar a aplicação**:

   - Abra o navegador e vá para o seguinte endereço:
  
     ```bash
     localhost:30000
     
   - Faça o login utilizando as seguintes credenciais:
  
      - Usuário: `comum`
      - Senha: `comum`
     
