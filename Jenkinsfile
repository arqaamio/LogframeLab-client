pipeline {
    agent any
    tools {
        nodejs 'Node'
    }
    // Get code from develop branch
    stages {
        // stage('Source Code') {
        //     steps {
        //         // git credentialsId: 'Ari-GitHub', url: 'https://github.com/arqaamio/LogframeLab-client', branch: 'develop'
        //          git credentialsId: 'Ari-GitHub', url: 'https://github.com/git-ari/LogframeLab-client', branch: 'feature/add_docker_config'
        //     }
        // }
        stage('Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm run testdocker'
            }
        }

        stage('Build') {
            steps {
                sh 'node node_modules/@angular/cli/bin/ng build --verbose'
//                sh 'node --max_old_space_size=4096 node_modules/@angular/cli/bin/ng build --prod --buildOptimizer --verbose'
            }
        }

        stage('Deploy Dev') {
            input{
                message 'Deploy to dev?'
            }
            steps {
                // sh 'cp -R dist/client /usr/share/nginx/html'
                sh 'docker-compose up --build -d'
            }
        }
        
        stage('Deploy Prod') {
            input{
                message 'Deploy to prod?'
            }
            steps {
                echo 'Building production build'
                sh 'node node_modules/@angular/cli/bin/ng build --prod --buildOptimizer --verbose'
                echo 'Sending the build to the production machine'
                // use ssh to send the compilation files to the EC2
                // sh 'cp -R dist/client /usr/share/nginx/html'
                // sh 'docker-compose up --build -d'
            }
        }
    }
}