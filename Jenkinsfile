pipeline {
    agent any
    environment {
        EC2_HOST = 'ec2-user@your-ec2-ip'      // change user and IP accordingly
        SSH_KEY = credentials('EC2_DEPLOY_KEY')
    }
    environment {
        AWS_REGION = 'eu-north-1'
        ACCOUNT_ID = credentials('aws_account_id')
        GITHUB_TOKEN = credentials('GITHUB-ACCESS-TOKEN')
        ECS_CLUSTER = 'banquetpro-cluster'
    }

    options {
        disableConcurrentBuilds()
        timestamps()
    }

    stages {
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

        stage('Deployment Decision Apigateway') {
            steps {
                script {
                    try {
                        timeout(time: 30, unit: 'MINUTES') {
                            def userInput = input(
                                id: 'deployApigatewayToDev',
                                message: 'Deploy apigateway to development?',
                                parameters: [booleanParam(name: 'DEPLOY_APIGATEWAY_TO_DEV', defaultValue: false)]
                            )
                            env.DEPLOY_APIGATEWAY_TO_DEV = userInput ? 'true' : 'false'
                        }
                    } catch (org.jenkinsci.plugins.workflow.steps.FlowInterruptedException e) {
                        echo 'Deployment input timeout. Skipping apigateway deployment.'
                        env.DEPLOY_APIGATEWAY_TO_DEV = 'false'
                    }
                }
            }
        }

        stage('Deploy Apigateway') {
            when {
                expression { env.DEPLOY_APIGATEWAY_TO_DEV == 'true' }
            }
            steps {
                script {
                    deployService(
                        repo: 'banquetpro/apigateway',
                        path: 'apps/apigateway',
                        taskDefinition: 'apigateway-task-definition',
                        service: 'apigateway-service',
                        envFile: "APIGATEWAY_ENV_FILE",
                        localImage: "apigateway-image"

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
                        localImage: "management-image"

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

    withCredentials([file(credentialsId: envFileCredentialId, variable: 'ENV_FILE')]) {
        // Save env file to workspace
        sh 'cp $ENV_FILE .env'
    }

    sh """
        echo "Building Docker image locally..."
        docker build -f ${path}/Dockerfile -t ${localImage} .

        echo "Compressing artifacts..."
        tar -czf ${containerName}.tar.gz -C ${path} . Dockerfile .env
    """

    sshagent(credentials: ['EC2_DEPLOY_KEY']) {
        sh """
            echo "Copying project files to EC2"
            scp ${containerName}.tar.gz ${EC2_HOST}:/home/ec2-user/

            echo "Deploying on EC2..."
            ssh ${EC2_HOST} << 'EOF'
                set -e
                cd /home/ec2-user
                tar -xzf ${containerName}.tar.gz -C ${containerName} || mkdir ${containerName} && tar -xzf ${containerName}.tar.gz -C ${containerName}
                cd ${containerName}
                
                echo "Stopping and removing old container"
                docker rm -f ${containerName} || true

                echo "Building image"
                docker build -t ${localImage} .

                echo "Running container"
                docker run -d --name ${containerName} --env-file .env -p YOUR_PORT:YOUR_PORT ${localImage}
            EOF
        """
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
