pipeline {
    agent any

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
                    def branchName = env.CHANGE_BRANCH ?: 'main'
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
                        taskDefinition: 'users-task-definition',
                        service: 'users-service',
                        envFile: "USERS_ENV_FILE",
                        localImage: "users-image"

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
    def taskDefName = svc.taskDefinition
    def serviceName = svc.service
    def envFileCredentialId = svc.envFile
    def image = "${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${repo}:${BUILD_NUMBER}"
    def localImage = "${svc.localImage}:${BUILD_NUMBER}"

    // Part 1: Generate env.json with single triple quotes
    
    // Part 1: Generate env.json with single triple quotes
    withCredentials([file(credentialsId: envFileCredentialId, variable: 'ENV_FILE')]) {
        sh '''#!/bin/bash
        set -e

        echo "Preparing to copy env file: $ENV_FILE"
        rm -f .env || true
        touch .env
        chmod +w .env
        echo "Copying env file: $ENV_FILE"
        cp "$ENV_FILE" .env

        echo "[" > apienv.json

        lines=()

        while IFS='=' read -r key value || [ -n "$key" ]; do
            # Skip empty or commented lines
            [[ "$key" =~ ^#.*$ || -z "$key" || -z "$value" ]] && continue

            key=$(echo "$key" | tr -d '\r\n')
            value=$(echo "$value" | tr -d '\r\n')

            # Strip all surrounding single/double quotes
            value=$(echo "$value" | sed -E 's/^[\'\\"']+//; s/[\'\\"']+$//')

            # Escape any inner double quotes for JSON
            value=$(echo "$value" | sed 's/"/\\\\\\"/g')

            # Append properly quoted JSON line
            lines+=("  { \\"name\\": \\"${key}\\", \\"value\\": \\"${value}\\" }")
        done < .env

        for i in "${!lines[@]}"; do
            if [[ $i -lt $((${#lines[@]} - 1)) ]]; then
                echo "${lines[$i]}," >> apienv.json
            else
                echo "${lines[$i]}" >> apienv.json
            fi
        done

        echo "]" >> apienv.json

        echo "=== Contents of apienv.json ==="
        cat apienv.json
        '''
    }

    // // Part 2: Docker build, tag, push and ECS update with double triple quotes
    withCredentials([file(credentialsId: envFileCredentialId, variable: 'ENV_FILE')]) {
        sh """#!/bin/bash
        set -e

        echo "Logging into ECR"
        aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com

        echo "Building Docker image"
        echo "Using local image tag: ${localImage}"
        docker build -f ${path}/Dockerfile -t ${localImage} .

        echo "Tagging image for ECR"
        docker tag ${localImage} ${image}

        echo "Pushing image to ECR"
        docker push ${image}

        echo "Fetching existing task definition hoping to update"
        TASK_DEF=\$(aws ecs describe-task-definition --task-definition ${taskDefName})

        echo "Injecting env and updating image"
        echo "=== Contents of apienv.json before injecting ==="
        cat apienv.json

        ENV_JSON=\$(cat apienv.json)

        NEW_TASK_DEF=\$(echo "\$TASK_DEF" | jq --arg IMAGE "${image}" --argjson env "\$ENV_JSON" '
        .taskDefinition |
        {
            family: .family,
            networkMode: .networkMode,
            executionRoleArn: .executionRoleArn,
            taskRoleArn: .taskRoleArn,
            containerDefinitions: (
            .containerDefinitions | map(
                .image = \$IMAGE | .environment = \$env
            )
            ),
            requiresCompatibilities: .requiresCompatibilities,
            cpu: .cpu,
            memory: .memory
        }'
        )
        mkdir -p banquetpro
        echo "\$NEW_TASK_DEF" > ${repo}-taskdef-final.json

        echo "Registering updated task definition"
        aws ecs register-task-definition --cli-input-json file://${repo}-taskdef-final.json

        echo "Updating ECS service"
        aws ecs update-service \
            --cluster ${ECS_CLUSTER} \
            --service ${serviceName} \
            --task-definition ${taskDefName} \
            --force-new-deployment

        echo "Cleaning up temporary files"
        rm -f apienv.json .env env.json
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
