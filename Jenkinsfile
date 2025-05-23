pipeline {
    agent any

    environment {
        AWS_REGION = 'us-east-1'
        ACCOUNT_ID = credentials('aws_account_id')  // <-- Change this
        GITHUB_TOKEN = credentials('GITHUB-ACCESS-TOKEN')
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
                // git url: 'https://github.com/enterpriseapptech/banquetproapi.git', branch: 'main'
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

        stage('Deploy Microservices') {
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

                            echo "\$NEW_TASK_DEF" > ${repo}-new-task-def.json

                            aws ecs register-task-definition --cli-input-json file://${repo}-new-task-def.json

                            echo "Updating ECS service: ${serviceName}"
                            aws ecs update-service \
                                --cluster default \
                                --service ${serviceName} \
                                --task-definition ${taskDefName} \
                                --force-new-deployment
                        """
                    }
                }
            }
        }


        // stage('Deploy Microservices') {
        //     steps {
        //         script {
        //             def services = [
        //                 [name: 'apigateway', path: 'apps/apigateway'],
        //                 [name: 'user-service', path: 'apps/users'],
        //                 [name: 'notifications-service', path: 'apps/payment-service']
        //             ]

        //             for (svc in services) {
        //                 def repo = svc.name
        //                 def path = svc.path
        //                 def image = "${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${repo}:${BUILD_NUMBER}"

        //                 sh """
        //                     echo "Logging into ECR for ${repo}"
        //                     aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com

        //                     echo "Building image for ${repo}"
        //                     docker build -t ${repo}:${BUILD_NUMBER} ${path}
        //                     docker tag ${repo}:${BUILD_NUMBER} ${image}

        //                     echo "Pushing image to ECR"
        //                     docker push ${image}

        //                     echo "Updating ECS task definition and service for ${repo}"

        //                     TASK_DEF=\$(aws ecs describe-task-definition --task-definition ${repo})
        //                     NEW_TASK_DEF=\$(echo \$TASK_DEF | jq --arg IMAGE "${image}" '.taskDefinition | .containerDefinitions[0].image = $IMAGE | {family: .family, containerDefinitions: [.containerDefinitions[0]]}')
        //                     echo \$NEW_TASK_DEF > ${repo}-new-task-def.json
        //                     aws ecs register-task-definition --cli-input-json file://${repo}-new-task-def.json
        //                     aws ecs update-service --cluster ${repo}-cluster --service ${repo}-service --force-new-deployment
        //                 """
        //             }
        //         }
        //     }
        // }
    }
}
