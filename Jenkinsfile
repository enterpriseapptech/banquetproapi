pipeline {
    agent any

    environment {
        AWS_REGION = 'eu-north-1'
        ACCOUNT_ID = credentials('aws_account_id')  // <-- Change this
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
                echo 'Checking out the source code.fff..'
                script {
                    // Dynamically determine the branch to check out
                    def branchName = env.GITHUB_PR_SOURCE_BRANCH ?: 'main'
                    script {
                        echo "Checking out the source code for branch : ${branchName}..."
                        // setting default branch name to main, this will be updated if triggered by PR
                        env.BRANCH_NAME = 'main'
                        // Install additional tools or environment setup here if needed
                    }
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: "*/${branchName}"]],
                        userRemoteConfigs: [[url: "https://${GITHUB_TOKEN}@github.com/enterpriseapptech/banquetproapi.git"]]
                    ])
                }
                
            }
        }


        stage('Setup Environment') {
            steps {
                script {
                    echo 'Setting up the environment...'
                    // setting default branch name to main, this will be updated if triggered by PR
                    env.BRANCH_NAME = 'main'
                    // Install additional tools or environment setup here if needed
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    echo 'Installing npm dependencies...'
                    sh 'yarn install --frozen-lockfile' // Use offline cache if available
                }
            }
        }


        stage('Build') {
            steps {
                script {
                    echo 'Building the project...'
                    timeout(time: 120, unit: 'MINUTES') {
                        sh 'yarn build'
                    }
                    echo 'Build completed successfully.'
                }
            }
        }

        stage('Deployment Decision') {
            steps {
                script {
                    try {
                        timeout(time: 30, unit: 'MINUTES') {  // Set timeout to 30 minutes or adjust as needed
                            def userInput = input(
                                id: 'deployToDev',
                                message: 'Would you like to deploy to the development environment?',
                                parameters: [booleanParam(name: 'DEPLOY_TO_DEV', defaultValue: false, description: 'Select to deploy to the development environment')]
                            )
                            env.DEPLOY_TO_DEV = userInput ? 'true' : 'false'
                        }
                    } catch (org.jenkinsci.plugins.workflow.steps.FlowInterruptedException e) {
                        echo 'Deployment input timeout reached. Skipping deployment.'
                        env.DEPLOY_TO_DEV = 'false'
                    }
                }
            }
        }

        stage('Deploy Microservices') {
            when {
                expression { env.DEPLOY_TO_DEV == 'true' }
            }
            steps {
                script {
                    def services = [
                        [
                            repo: 'banquetpro/apigateway',
                            path: 'apps/apigateway',
                            taskDefinition: 'apigateway-task-definition',
                            service: 'apigateway-service'
                        ],
                        [
                            repo: 'banquetpro/users',
                            path: 'apps/users',
                            taskDefinition: 'users-task-definition',
                            service: 'users-service'
                        ],
                        [
                            repo: 'banquetpro/notifications',
                            path: 'apps/payment-service',
                            taskDefinition: 'notifications-task-definition',
                            service: 'notifications-service'
                        ]
                    ]

                    for (svc in services) {
                        def repo = svc.repo
                        def path = svc.path
                        def taskDefName = svc.taskDefinition
                        def serviceName = svc.service
                        def image = "${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${repo}:${BUILD_NUMBER}"

                        sh """
                            echo "Logging into ECR for ${repo}"
                            aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com

                            echo "Building image for ${repo}"
                            docker build -f ${path}/Dockerfile -t ${repo}:${BUILD_NUMBER} .

                            echo "Tagging image as ${image}"
                            docker tag ${repo}:${BUILD_NUMBER} ${image}

                            echo "Pushing image to ECR"
                            docker push ${image}

                            echo "Describing current task definition: ${taskDefName}"
                            TASK_DEF=\$(aws ecs describe-task-definition --task-definition ${taskDefName})
                            
                            echo "Creating new task definition revision for ${taskDefName} with new image"
                            NEW_TASK_DEF=\$(echo \$TASK_DEF | jq --arg IMAGE "${image}" '
                                .taskDefinition |
                                { 
                                    family: .family,
                                    networkMode: .networkMode,
                                    executionRoleArn: .executionRoleArn,
                                    taskRoleArn: .taskRoleArn,
                                    containerDefinitions: (.containerDefinitions | map(.image = \$IMAGE)),
                                    requiresCompatibilities: .requiresCompatibilities,
                                    cpu: .cpu,
                                    memory: .memory
                                }')
                            mkdir -p banquetpro
                            echo "\$NEW_TASK_DEF" > ${repo}-new-task-def.json

                            aws ecs register-task-definition --cli-input-json file://${repo}-new-task-def.json

                            echo "Updating ECS service: ${serviceName}"
                            aws ecs update-service \
                                --cluster ${ECS_CLUSTER} \
                                --service ${serviceName} \
                                --task-definition ${taskDefName} \
                                --force-new-deployment
                        """
                    }
                }
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
    }
}
def updateGitHubStatus(status, description) {
    def repoOwner = 'enterpriseapptech'
    def repoName = 'banquetproapi'
    def apiUrl = "https://api.github.com/repos/${repoOwner}/${repoName}/statuses/${GIT_COMMIT}"

    def payload = new groovy.json.JsonBuilder([
        state      : status,
        description: description,
        context    : "continuous-integration/jenkins"
    ]).toString()

    echo "Generated JSON Payload for GitHub Status Update: ${payload}"

    withCredentials([string(credentialsId: 'GITHUB_ACCESS_TOKEN', variable: 'GITHUB_TOKEN')]) {
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
        echo "GitHub Status updated successfully: ${response}"
    }
}