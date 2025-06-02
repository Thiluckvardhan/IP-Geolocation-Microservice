pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'thiluck/ip-geolocation-microservice:latest'
    }

    stages {

        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }  

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                timeout(time: 10, unit: 'MINUTES') {
                    bat "docker build -t ${DOCKER_IMAGE} ."
                }
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    bat "docker login -u %DOCKER_USER% -p %DOCKER_PASS%"
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                bat "docker push ${DOCKER_IMAGE}"
            }
        }

        stage('Verify') {
            steps {
                bat 'docker ps -a'
            }
        }
    }

    post {
        success {
            echo "✅ Build Successful! 🎉"
        }
        failure {
            echo "❌ Build Failed! Please check the logs for details."
        }
    }
}
