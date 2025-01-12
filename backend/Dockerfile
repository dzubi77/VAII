FROM openjdk:22-jdk-slim
WORKDIR /app
COPY out/artifacts/vaii_jar/vaii.jar VAII.jar
EXPOSE 8080
CMD ["java", "-jar", "VAII.jar"]