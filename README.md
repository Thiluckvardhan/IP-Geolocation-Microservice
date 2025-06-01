# IP Geolocation Microservice

A lightweight stateless REST API built with Node.js and Express that returns geolocation information based on client IP using the ip-api.com API.

## 📦 Tech Stack
- Node.js
- Express.js
- ip-api.com
- Docker
- Jenkins

## 🚀 Run Locally
```bash
npm install
node server.js
# Visit http://localhost:3000
```

## 🐳 Docker
```bash
docker build -t thiluck/ip-geolocation-microservice .
docker run -d -p 3000:3000 thiluck/ip-geolocation-microservice
```

## 🛠 Jenkins CI/CD
- Make sure you have Jenkins installed.
- Add DockerHub credentials (ID: dockerhub-credentials) in Jenkins.
- Set up Jenkins to use this repo with the included Jenkinsfile.
- On every push, Jenkins will:
  - Install dependencies
  - (Skip) tests
  - Build Docker image
  - Push to Docker Hub
  - Deploy to localhost
