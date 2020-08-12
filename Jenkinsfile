pipeline {
    agent any
    tools {
        nodejs 'Node'
    }

    stages {

        stage('Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            when {
                expression {
                    return env.BRANCH_NAME != 'master';
                }
            }
            steps {
                sh 'node node_modules/@angular/cli/bin/ng build --verbose'
                //                sh 'node --max_old_space_size=4096 node_modules/@angular/cli/bin/ng build --prod --buildOptimizer --verbose'
            }
        }

        stage('Build Prod') {
            when {
                branch 'master'
            }
            steps {
                sh 'node node_modules/@angular/cli/bin/ng build --prod --buildOptimizer --verbose'
            }
        }

        stage('Test') {
            steps {
                sh 'npm run test:docker'
            }
        }

        stage('Deploy Dev') {
            when {
                branch 'develop'
            }
            steps {
                input message: 'Deploy to the development environment? (Click "Proceed" to continue)'
                // sh 'cp -R dist/client /usr/share/nginx/html'
                sh 'docker-compose up --build -d'
            }
        }

        stage('Deploy Prod') {
            when {
                branch 'master'
            }
            steps {
                input message: 'Deploy to the production environment? (Click "Proceed" to continue)'
                echo 'Sending the build to the production machine'
                // use ssh to send the compilation files to the EC2
                // sh 'cp -R dist/client /usr/share/nginx/html'
                // sh 'docker-compose up --build -d'
            }
        }
    }
}