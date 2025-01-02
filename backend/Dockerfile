FROM openjdk:22-jdk-slim
WORKDIR /app
COPY out/artifacts/app1_jar/app1.jar app1.jar
EXPOSE 8080
CMD ["java", "-jar", "app1.jar"]