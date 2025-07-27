pipeline {
    agent any

    environment {
        AWS_REGION = 'eu-north-1'
        ACCOUNT_ID = credentials('aws_account_id')
        GITHUB_TOKEN = credentials('GITHUB-ACCESS-TOKEN')
        ECS_CLUSTER = 'banquetpro-cluster'
        EC2_HOST = 'ubuntu@ec2-13-61-137-254.eu-north-1.compute.amazonaws.com'      // change user and IP accordingly
        SSH_KEY = credentials('EC2_DEPLOY_KEY')
    }

    options {
        disableConcurrentBuilds()
        timestamps()
    }

    stages {
        stage('Branch been built'){
            steps{
                script {
                    echo "CHANGE ID and branch details"
                    echo "CHANGE_ID: ${env.CHANGE_ID}"
                    echo "CHANGE_BRANCH: ${env.CHANGE_BRANCH}"
                    echo "CHANGE_TARGET: ${env.CHANGE_TARGET}"
                    echo "BRANCH_NAME: ${env.BRANCH_NAME}"
                }
            }
        }
        stage('Checkout code') {
            steps {
                script {
                    def branchName = env.CHANGE_BRANCH ? env.CHANGE_BRANCH : 'main'
                    env.BRANCH_NAME = branchName
                    echo "Checking out branch: ${branchName}"

                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: "*/${branchName}"]],
                        userRemoteConfigs: [[
                            url: "https://${GITHUB_TOKEN}@github.com/enterpriseapptech/banquetproapi.git"
                        ]]
                    ])
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm dependencies...'
                sh 'yarn install --frozen-lockfile'
            }
        }

        stage('Build') {
            steps {
                echo 'Building the project...'
                timeout(time: 10, unit: 'MINUTES') {
                    sh 'yarn build'
                }
                echo 'Build completed successfully.'
            }
        }

        // stage('Deployment Decision Apigateway') {
        //     steps {
        //         script {
        //             try {
        //                 timeout(time: 30, unit: 'MINUTES') {
        //                     def userInput = input(
        //                         id: 'deployApigatewayToDev',
        //                         message: 'Deploy apigateway to development?',
        //                         parameters: [booleanParam(name: 'DEPLOY_APIGATEWAY_TO_DEV', defaultValue: false)]
        //                     )
        //                     env.DEPLOY_APIGATEWAY_TO_DEV = userInput ? 'true' : 'false'
        //                 }
        //             } catch (org.jenkinsci.plugins.workflow.steps.FlowInterruptedException e) {
        //                 echo 'Deployment input timeout. Skipping apigateway deployment.'
        //                 env.DEPLOY_APIGATEWAY_TO_DEV = 'false'
        //             }
        //         }
        //     }
        // }

        stage('Deploy Apigateway') {
            // when {
            //     expression { env.DEPLOY_APIGATEWAY_TO_DEV == 'true' }
            // }
            steps {
                script {
                    deployService(
                        repo: 'banquetpro/apigateway',
                        path: 'apps/apigateway',
                        taskDefinition: 'apigateway-task-definition',
                        service: 'apigateway-service',
                        envFile: "APIGATEWAY_ENV_FILE",
                        localImage: "apigateway-image",
                        port: 8000,
                        rm: 'apps/users apps/booking apps/catering  apps/notifications apps/payments apps/eventcenters apps/management ',
                        prisma: '',
                        start: 'nohup yarn start:prod > ${service}.log 2>&1 &'

                    )
                }
            }
        }

        stage('Deployment Decision Management') {
            steps {
                script {
                    try {
                        timeout(time: 30, unit: 'MINUTES') {
                            def userInput = input(
                                id: 'deployManagementToDev',
                                message: 'Deploy MANAGEMENT to development?',
                                parameters: [booleanParam(name: 'DEPLOY_MANAGEMENT_TO_DEV', defaultValue: false)]
                            )
                            env.DEPLOY_MANAGEMENT_TO_DEV = userInput ? 'true' : 'false'
                        }
                    } catch (org.jenkinsci.plugins.workflow.steps.FlowInterruptedException e) {
                        echo 'Deployment input timeout. Skipping MANAGEMENT deployment.'
                        env.DEPLOY_MANAGEMENT_TO_DEV = 'false'
                    }
                }
            }
        }

        stage('Deploy Management') {
            when {
                expression { env.DEPLOY_MANAGEMENT_TO_DEV == 'true' }
            }
            steps {
                script {
                    deployService(
                        repo: 'banquetpro/management',
                        path: 'apps/management',
                        taskDefinition: 'management-task-defiition',
                        service: 'management-service',
                        envFile: "MANAGEMENT_ENV_FILE",
                        localImage: "management-image",
                        port: 8007, 
                        rm: 'apps/apigateway apps/booking apps/catering apps/notifications apps/payments apps/eventcenters apps/users libs/contracts/src/eventcenterbooking libs/contracts/src/booking libs/contracts/src/catering libs/contracts/src/payments libs/contracts/src/eventcenters libs/contracts/src/booking.ts  libs/contracts/src/payments.ts libs/contracts/src/eventcenters.ts',
                        prisma: 'yarn prisma generate --schema=/app/apps/management/prisma/schema.prisma',
                        start: 'yarn prisma migrate deploy --schema=/app/apps/management/prisma/schema.prisma && nohup yarn start:prodManagement > ${service}.log 2>&1 &'
                    )
                }
            }
        }


        stage('Deployment Decision Users') {
            steps {
                script {
                    try {
                        timeout(time: 30, unit: 'MINUTES') {
                            def userInput = input(
                                id: 'deployUsersToDev',
                                message: 'Deploy USERS to development?',
                                parameters: [booleanParam(name: 'DEPLOY_USERS_TO_DEV', defaultValue: false)]
                            )
                            env.DEPLOY_USERS_TO_DEV = userInput ? 'true' : 'false'
                        }
                    } catch (org.jenkinsci.plugins.workflow.steps.FlowInterruptedException e) {
                        echo 'Deployment input timeout. Skipping apigateway deployment.'
                        env.DEPLOY_USERS_TO_DEV = 'false'
                    }
                }
            }
        }

        stage('Deploy Users') {
            when {
                expression { env.DEPLOY_USERS_TO_DEV == 'true' }
            }
            steps {
                script {
                    deployService(
                        repo: 'banquetpro/users',
                        path: 'apps/users',
                        taskDefinition: 'users-task-defiition',
                        service: 'users-service',
                        envFile: "USERS_ENV_FILE",
                        localImage: "users-image"

                    )
                }
            }
        }

        stage('Deployment Decision Notifications') {
            steps {
                script {
                    try {
                        timeout(time: 30, unit: 'MINUTES') {
                            def userInput = input(
                                id: 'deployNotificationsToDev',
                                message: 'Deploy NOTIFICATIONS to development?',
                                parameters: [booleanParam(name: 'DEPLOY_NOTIFICATIONS_TO_DEV', defaultValue: false)]
                            )
                            env.DEPLOY_NOTIFICATIONS_TO_DEV = userInput ? 'true' : 'false'
                        }
                    } catch (org.jenkinsci.plugins.workflow.steps.FlowInterruptedException e) {
                        echo 'Deployment input timeout. Skipping apigateway deployment.'
                        env.DEPLOY_NOTIFICATIONS_TO_DEV = 'false'
                    }
                }
            }
        }

        stage('Deploy Notifications') {
            when {
                expression { env.DEPLOY_NOTIFICATIONS_TO_DEV == 'true' }
            }
            steps {
                script {
                    deployService(
                        repo: 'banquetpro/notifications',
                        path: 'apps/notifications',
                        taskDefinition: 'notifications-task-definition',
                        service: 'notifications-service',
                        envFile: "NOTFICATIONS_ENV_FILE",
                        localImage: "notifications-image"

                    )
                }
            }
        }

        stage('Deployment Decision EventCenters') {
            steps {
                script {
                    try {
                        timeout(time: 30, unit: 'MINUTES') {
                            def userInput = input(
                                id: 'deployEventCentersToDev',
                                message: 'Deploy EVENTCENTERS to development?',
                                parameters: [booleanParam(name: 'DEPLOY_EVENTCENTERS_TO_DEV', defaultValue: false)]
                            )
                            env.DEPLOY_EVENTCENTERS_TO_DEV = userInput ? 'true' : 'false'
                        }
                    } catch (org.jenkinsci.plugins.workflow.steps.FlowInterruptedException e) {
                        echo 'Deployment input timeout. Skipping EventCenters deployment.'
                        env.DEPLOY_EVENTCENTERS_TO_DEV = 'false'
                    }
                }
            }
        }

        stage('Deploy EventCenters') {
            when {
                expression { env.DEPLOY_EVENTCENTERS_TO_DEV == 'true' }
            }
            steps {
                script {
                    deployService(
                        repo: 'banquetpro/eventcenters',
                        path: 'apps/eventcenters',
                        taskDefinition: 'eventcenters-task-definition',
                        service: 'eventcenters-service',
                        envFile: "EVENTCENTERS_ENV_FILE",
                        localImage: "eventcenters-image"

                    )
                }
            }
        }


        stage('Deployment Decision Catering') {
            steps {
                script {
                    try {
                        timeout(time: 30, unit: 'MINUTES') {
                            def userInput = input(
                                id: 'deployCateringToDev',
                                message: 'Deploy CATERING to development?',
                                parameters: [booleanParam(name: 'DEPLOY_CATERING_TO_DEV', defaultValue: false)]
                            )
                            env.DEPLOY_CATERING_TO_DEV = userInput ? 'true' : 'false'
                        }
                    } catch (org.jenkinsci.plugins.workflow.steps.FlowInterruptedException e) {
                        echo 'Deployment input timeout. Skipping Catering deployment.'
                        env.DEPLOY_CATERING_TO_DEV = 'false'
                    }
                }
            }
        }

        stage('Deploy Catering') {
            when {
                expression { env.DEPLOY_CATERING_TO_DEV == 'true' }
            }
            steps {
                script {
                    deployService(
                        repo: 'banquetpro/catering',
                        path: 'apps/catering',
                        taskDefinition: 'catering-task-definition',
                        service: 'catering-service',
                        envFile: "CATERING_ENV_FILE",
                        localImage: "catering-image"

                    )
                }
            }
        }

        stage('Deployment Decision Booking') {
            steps {
                script {
                    try {
                        timeout(time: 30, unit: 'MINUTES') {
                            def userInput = input(
                                id: 'deployBookingToDev',
                                message: 'Deploy BOOKING to development?',
                                parameters: [booleanParam(name: 'DEPLOY_BOOKING_TO_DEV', defaultValue: false)]
                            )
                            env.DEPLOY_BOOKING_TO_DEV = userInput ? 'true' : 'false'
                        }
                    } catch (org.jenkinsci.plugins.workflow.steps.FlowInterruptedException e) {
                        echo 'Deployment input timeout. Skipping Booking deployment.'
                        env.DEPLOY_BOOKING_TO_DEV = 'false'
                    }
                }
            }
        }

        stage('Deploy Booking') {
            when {
                expression { env.DEPLOY_BOOKING_TO_DEV == 'true' }
            }
            steps {
                script {
                    deployService(
                        repo: 'banquetpro/booking',
                        path: 'apps/booking',
                        taskDefinition: 'booking-task-definition',
                        service: 'booking-service',
                        envFile: "BOOKING_ENV_FILE",
                        localImage: "booking-image"

                    )
                }
            }
        }


        stage('Cleanup Workspace for next build') {
            steps {
                cleanWs()
            }
        }
    }

    post {
        success {
            echo "Build succeeded."
            script {
                updateGitHubStatus('success', 'The build succeeded.')
            }
        }
        failure {
            echo "Build failed."
            script {
                updateGitHubStatus('failure', 'The build failed.')
            }
        }
        unstable {
            echo "Build is unstable."
            script {
                updateGitHubStatus('failure', 'The build is unstable.')
            }
        }

        // always {
        //     echo 'Cleaning up Docker resources to free up disk space...'
        //     sh 'docker system prune -a -f --volumes'
        //     sh 'sudo docker builder prune -a -f'

        // }
    }
}

def deployService(Map svc) {
    def repo = svc.repo
    def path = svc.path
    def serviceName = svc.service
    def envFileCredentialId = svc.envFile
    def containerName = serviceName // you can customize this
    def localImage = "${svc.localImage}:${BUILD_NUMBER}"
    def port = svc.port
    def rm = svc.rm
    def prisma = svc.prisma
    def start= svc.start

    withCredentials([file(credentialsId: envFileCredentialId, variable: 'ENV_FILE')]) {
        sh '''#!/bin/bash
        set -e

        echo "Preparing to copy env file: $ENV_FILE"
        ls -la
        rm -f .env || true
        touch .env
        chmod +w .env
        echo "Copying env file: $ENV_FILE"
        cp "$ENV_FILE" .env
        '''
    }

    // // Part 2: Docker build, tag, push and ECS update with double triple quotes
    withCredentials([file(credentialsId: envFileCredentialId, variable: 'ENV_FILE')]) {
        sh """
            ls -la
            rm -f ${path}/.env || true
            echo "Copying env file into ${path}/.env"
            ls -al apps/
            ls -al apps/management
            cp "$ENV_FILE" ${path}/.env

            echo "Removing old tar.gz if it exists..."
            rm -rf ${containerName}.tar.gz || true
            rm -rf banquetpro.tar.gz || true
            rm -rf dist || true
            rm -rf temporary || true


            echo "Lets know where we are..."
            pwd
            ls -la

            rm -rf temporary || true
            mkdir temporary

            echo "Copying to temporary directory"
            rsync -av --exclude=temporary/ --exclude=node_modules/ ./ temporary/
            cp -r .env package.json yarn.lock temporary/
            ls -la temporary/

            echo "Installing dependencies"
            cd temporary && yarn install

            echo "Removing unncecessary folders"
            rm -rf ${rm}

            echo "Yarn Build"
            ${prisma} 
            yarn build
 

            echo "Creating ${containerName}tar.gz with microservice and config files and Compressing artifacts..."
          
            cd ..
            tar -czf ${containerName}.tar.gz temporary/dist temporary/apps temporary/package.json temporary/yarn.lock temporary/${path}/.env
            pwd
            ls -la
            
        """

        sshagent(credentials: ['EC2_DEPLOY_KEY']) {
            sh """
                echo "Listing contents of working directory..."
                pwd
                ls -la

                echo "Listing contents of EC2 home directory..."
                ssh -o StrictHostKeyChecking=no ${EC2_HOST} "ls -la /home/ubuntu"

                echo "Copying project files to EC2"
                scp -o StrictHostKeyChecking=no ${containerName}.tar.gz ${EC2_HOST}:/home/ubuntu/
                ssh -o StrictHostKeyChecking=no ${EC2_HOST} "ls -l /home/ubuntu/${containerName}.tar.gz"

                echo "Cleaning old service directory and preparing fresh deploy dir"
                ssh -o StrictHostKeyChecking=no ${EC2_HOST} "
                    rm -rf /home/ubuntu/${containerName} || true && \
                    mkdir -p /home/ubuntu/${containerName}
                "
                echo "Creating service directory if needed and extracting..."
                ssh -o StrictHostKeyChecking=no ${EC2_HOST} "tar -xzf /home/ubuntu/${containerName}.tar.gz -C /home/ubuntu/${containerName}"

                echo "Changing into service directory"
                ssh -o StrictHostKeyChecking=no ${EC2_HOST} "cd /home/ubuntu/${containerName} && ls -la"

                echo "Installing dependencies"
                ssh -o StrictHostKeyChecking=no ${EC2_HOST} "cd /home/ubuntu/${containerName} && yarn install --production"

                echo "Checking if port ${port} is in use and killing the process if needed"
                ssh -o StrictHostKeyChecking=no ${EC2_HOST} "
                    PID=\$(lsof -ti tcp:${port})
                    if [ ! -z \"\$PID\" ]; then
                        echo \"Killing process using port ${port}: \$PID\"
                        kill -9 \$PID
                    else
                        echo \"No process found using port ${port}\"
                    fi
                "

                echo "Starting service in production"
                ssh -o StrictHostKeyChecking=no ${EC2_HOST} "
                    cd /home/ubuntu/${containerName} &&
                    cp temporary/${path}/.env .env &&
                    cat .env
                    ${start}
                    disown
                "
                echo "${containerName} Service started and detached successfully"
            """
        }

    }
}


def updateGitHubStatus(status, description) {
    def repoOwner = 'enterpriseapptech'
    def repoName = 'banquetproapi'
    def apiUrl = "https://api.github.com/repos/${repoOwner}/${repoName}/statuses/${GIT_COMMIT}"

    def payload = new groovy.json.JsonBuilder([
        state: status,
        description: description,
        context: "continuous-integration/jenkins"
    ]).toString()

    echo "Sending GitHub status update..."

    def response = sh(
        script: """
        curl -L \
            -X POST \
            -H "Accept: application/vnd.github+json" \
            -H "Authorization: Bearer ${GITHUB_TOKEN}" \
            -H "X-GitHub-Api-Version: 2022-11-28" \
            -d '${payload}' \
            ${apiUrl}
        """,
        returnStdout: true
    ).trim()

    echo "GitHub Status Response: ${response}"
    
}
