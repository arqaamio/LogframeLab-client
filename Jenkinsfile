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
                // sh 'docker-compose up --build -d'
                sh 'docker cp jenkins:$PWD/dist/client/. /tmp/logframelab-client'
            }
        }

        stage('Deploy Prod') {
            when {
                branch 'master'
            }
            steps {
                // input message: 'Deploy to the production environment? (Click "Proceed" to continue)'
                // echo 'Sending the build to the production machine'
                sshPublisher(publishers: [sshPublisherDesc(configName: 'PROD', transfers: [
                    sshTransfer(cleanRemote: false, excludes: '', execCommand: '', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: 'logframelab-client', remoteDirectorySDF: false, removePrefix: '', sourceFiles: 'dist/client/**')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
            }
        }
    }
}