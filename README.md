# OngFinder API

Projeto de demonstração para o Spring Boot

## Pré-requisitos

- Java 17
- Maven
- PostgreSQL

## Começando

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/ong-finder-api.git
    cd ong-finder-api
    ```

2.  **Configuração do Banco de Dados:**
    - Certifique-se de ter o PostgreSQL instalado e em execução.
    - Crie um novo banco de dados chamado `ongfinder`.
    - Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:
      ```
      DB_URL=jdbc:postgresql://localhost:5432/ongfinder
      DB_USERNAME=seu_usuario_postgres
      DB_PASSWORD=sua_senha_postgres
      ```

3.  **Execute a aplicação:**
    ```bash
    ./mvnw spring-boot:run
    ```

A aplicação estará em execução em `http://localhost:8080`.

# OngFinder GUI

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.