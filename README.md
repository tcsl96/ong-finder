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
    - Abra o arquivo `src/main/resources/application.properties` e atualize as seguintes propriedades com suas credenciais do PostgreSQL:
      ```properties
      spring.datasource.url=jdbc:postgresql://localhost:5432/ongfinder
      spring.datasource.username=seu_usuario_postgres
      spring.datasource.password=sua_senha_postgres
      ```

3.  **Execute a aplicação:**
    ```bash
    ./mvnw spring-boot:run
    ```

A aplicação estará em execução em `http://localhost:8080`.
