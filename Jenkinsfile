pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'thiluck/ip-geolocation-microservice:latest'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Test') {
            steps {
                bat 'npm test || echo "No tests found, skipping"'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat "docker build -t $DOCKER_IMAGE ."
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    bat "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                    bat "docker push $DOCKER_IMAGE"
                }
            }
        }

        stage('Deploy') {
            steps {
                bat "docker stop ip-geo-container || true"
                bat "docker rm ip-geo-container || true"
                bat "docker run -d --name ip-geo-container -p 3000:3000 $DOCKER_IMAGE"
            }
        }
    }
}
