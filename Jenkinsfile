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

        stage('Inject apigateway environment variables') {
            when {
                expression { env.DEPLOY_APIGATEWAY_TO_DEV == 'true' }
            }
            steps {
                withCredentials([string(credentialsId: 'APIGATEWAY_ENV_FILE', variable: 'DOTENV')]) {
                    writeFile file: '.env', text: DOTENV

                    sh '''
                        echo "[" > env.json
                        grep -v '^#' .env | grep '=' | while IFS='=' read -r key value; do
                            echo "  { \\"name\\": \\"${key}\\", \\"value\\": \\"${value}\\" }," >> env.json
                        done
                        sed -i '$ s/,$//' env.json
                        echo "]" >> env.json
                    '''
                }
            }
        }

        stage('Inject into Apigateway Task Definition') {
            steps {
                sh '''
                jq --argjson env "$(cat env.json)" \
                    '.containerDefinitions[0].environment = $env' \
                    ecs/taskdef.template.json > taskdef.final.json
                '''
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
                        service: 'apigateway-service'
                    )
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

def deployService(Map svc) {
    def repo = svc.repo
    def path = svc.path
    def taskDefName = svc.taskDefinition
    def serviceName = svc.service
    def image = "${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${repo}:${BUILD_NUMBER}"

    sh """
        echo "Logging into ECR"
        aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com

        echo "Building Docker image for ${repo}"
        docker build -f ${path}/Dockerfile -t ${repo}:${BUILD_NUMBER} .

        echo "Tagging image"
        docker tag ${repo}:${BUILD_NUMBER} ${image}

        echo "Pushing image to ECR"
        docker push ${image}

        echo "Describing existing task definition"
        TASK_DEF=\$(aws ecs describe-task-definition --task-definition ${taskDefName})

        echo "Registering new task definition revision"
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

        echo "Updating ECS service"
        aws ecs update-service \
            --cluster ${ECS_CLUSTER} \
            --service ${serviceName} \
            --task-definition ${taskDefName} \
            --force-new-deployment
    """
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

        echo "GitHub Status Response: ${response}"
    }
}
