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