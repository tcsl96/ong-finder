FROM maven:3.9.9-eclipse-temurin-17 AS builder
WORKDIR /workspace
COPY pom.xml mvnw ./
RUN mvn dependency:go-offline -B
COPY src src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre
WORKDIR /app
RUN addgroup --system appuser && adduser --system --ingroup appuser appuser
COPY --from=builder /workspace/target/*.jar app.jar
USER appuser
ENTRYPOINT ["java", "-jar", "app.jar"]

