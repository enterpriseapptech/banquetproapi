pipeline {
    agent { label 'ubuntu-master' }

    environment {
        AWS_REGION = 'us-east-1'
        ACCOUNT_ID = '123456789012'  // <-- Change this
        GITHUB_TOKEN = credentials('GITHUB_ACCESS_TOKEN')
    }

    options {
        disableConcurrentBuilds()
        timestamps()
    }

    stages {

        stage('Example') {
            steps {
                echo "Using GitHub Token: ${GITHUB_TOKEN}"
            }
        }

        stage('Checkout code') {
            steps {
                echo 'Checking out the source code...'
                script {
                    // Dynamically determine the branch to check out
                    def branchName = env.GITHUB_PR_SOURCE_BRANCH ?: 'master'
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: "*/${branchName}"]],
                        userRemoteConfigs: [[url: "https://${GITHUB_TOKEN}@github.com/company/api.git"]]
                    ])
                }
                // git url: 'https://github.com/enterpriseapptech/banquetproapi.git', branch: 'main'
            }
        }


        stage('Setup Environment') {
            steps {
                script {
                    echo 'Setting up the environment...'
                    // setting default branch name to master, this will be updated if triggered by PR
                    env.BRANCH_NAME = 'main'
                    // Install additional tools or environment setup here if needed
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    echo 'Installing npm dependencies...'
                    sh 'npm ci --prefer-offline' // Use offline cache if available
                }
            }
        }

        stage('Check TypeScript') {
            steps {
                script {
                    echo 'Running TypeScript type checks...'
                    sh 'npm run check-types' // Add this script to check types
                    echo 'TypeScript checks completed.'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    echo 'Building the project...'
                    timeout(time: 120, unit: 'MINUTES') {
                        sh 'npm run build'
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
                            docker build -t ${repo}:${BUILD_NUMBER} ${path}
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
