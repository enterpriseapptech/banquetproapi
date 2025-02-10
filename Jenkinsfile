pipeline {
    agent any

    environment {
        NODEJS_HOME = tool name: 'NodeJS 18'
        PATH = "${env.NODEJS_HOME}/bin:${env.PATH}"
        AWS_ACCESS_KEY_ID = credentials('AWS_ACCESS_KEY_ID')
        AWS_SECRET_ACCESS_KEY = credentials('AWS_SECRET_ACCESS_KEY')
        GITHUB_TOKEN = credentials('GITHUB_ACCESS_TOKEN')
        NODE_OPTIONS = "--max-old-space-size=8192"
        COVERAGE_THRESHOLD = '100.0'
    }

    options {
        disableConcurrentBuilds()
        timestamps()
    }

    stages {

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
            }
        }

        stage('Setup Environment') {
            steps {
                script {
                    echo 'Setting up the environment...'
                    // setting default branch name to master, this will be updated if triggered by PR
                    env.BRANCH_NAME = 'master'
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

        stage('Test') {
            steps {
                script {
                    catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE'){
                        echo 'Running unit tests...'
                        def testStatus = sh(script: 'npm run test:ci', returnStatus: true)
                        if (testStatus != 0) {
                            echo 'Tests failed.'
                            error('Unit tests did not pass.')
                        } else {
                            echo 'All unit tests passed successfully.'
                        }
                    }
                }
            }
            post {
                always {
                    echo 'Archiving JUnit test results from the project root...'
                    junit 'junit.xml' // Adjust path to locate report in project root
                }
            }
        }

        stage('Code Coverage') {
            steps {
                script {
                    catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE'){
                        echo 'Generating code coverage report...'
                        sh 'npm run test:coverage'

                        // Read the coverage summary file
                        def coverageJson = readFile('coverage/coverage-summary.json')
                        def coverage = readJSON(text: coverageJson)
                        // Ensure coverage metrics are Doubles
                        def currentLineCoverage = coverage.total.lines.pct as Double
                        def currentBranchCoverage = coverage.total.branches.pct as Double
                        def currentFunctionCoverage = coverage.total.functions.pct as Double
                        def currentStatementCoverage = coverage.total.statements.pct as Double

                        // Ensure COVERAGE_THRESHOLD is also a Double
                        def coverageThreshold = COVERAGE_THRESHOLD as Double

                        echo "Current Line coverage: ${currentLineCoverage}%"
                        echo "Current Statement coverage: ${currentStatementCoverage}%"
                        echo "Current Function coverage: ${currentFunctionCoverage}%"
                        echo "Current Branch coverage: ${currentBranchCoverage}%"

                        // Check each coverage metric against the threshold
                        def coverageBelowThreshold = false

                        if (currentLineCoverage < coverageThreshold) {
                            echo "Line coverage ${currentLineCoverage}% is below the threshold of ${coverageThreshold}%."
                            coverageBelowThreshold = true
                        }

                        if (currentStatementCoverage < coverageThreshold) {
                            echo "Statement coverage ${currentStatementCoverage}% is below the threshold of ${coverageThreshold}%."
                            coverageBelowThreshold = true
                        }

                        if (currentFunctionCoverage < coverageThreshold) {
                            echo "Function coverage ${currentFunctionCoverage}% is below the threshold of ${coverageThreshold}%."
                            coverageBelowThreshold = true
                        }

                        if (currentBranchCoverage < coverageThreshold) {
                            echo "Branch coverage ${currentBranchCoverage}% is below the threshold of ${coverageThreshold}%."
                            coverageBelowThreshold = true
                        }

                        if (coverageBelowThreshold) {
                            error("Code coverage is below the required threshold of ${coverageThreshold}%. Please review the coverage report.")
                        } else {
                            echo "All coverage metrics meet or exceed the required threshold of ${coverageThreshold}%."
                        }
                    }
                }
            }
        }



        stage('Post Code Coverage To PR') {
            when {
                expression { env.GITHUB_PR_NUMBER != null }
            }
            steps {
                script {
                    env.BRANCH_NAME = env.GITHUB_PR_SOURCE_BRANCH
                    echo 'Posting coverage report to PR...'
                    postCoverageReportToPR()
                }
            }
        }

        stage('Get Branch Information') {
            steps {
                script {
                    echo 'Retrieving branch information...'
                    env.STAGE = env.BRANCH_NAME == 'master' ? 'staging' : 'dev'
                    echo "Branch Name: ${env.BRANCH_NAME}, Deployment Stage: ${env.STAGE}"
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

        stage('Deploy to Serverless') {
            when {
                expression { env.DEPLOY_TO_DEV == 'true' }
            }
            steps {
                script {
                    echo 'Deploying application to serverless environment...'
                    sh "npx serverless deploy --stage ${env.STAGE} --verbose"
                    echo 'Deployment completed successfully.'
                }
            }
        }
    }

    post {
        always {
            script {
                def recipientList = getEmailRecipient()
                emailext(
                    subject: "Build ${env.JOB_NAME} #${env.BUILD_NUMBER} - ${currentBuild.currentResult}",
                    body: "Build #${env.BUILD_NUMBER} of ${env.JOB_NAME} ${currentBuild.currentResult}. Please check the Jenkins console output for more details.",
                    to: recipientList
                )
            }
            echo 'Archiving JUnit reports from the project root...'
            junit 'junit.xml'
            echo 'Cleaning up the workspace...'
            cleanWs()
        }
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

def postCoverageReportToPR() {
    def gitUrl = env.GITHUB_REPO_GIT_URL
    def repoOwner = 'organisationName'
    def repoName = 'repoName'
    def prNumber = env.GITHUB_PR_NUMBER

    // Parse the coverage report HTML file
    def coverageFilePath = 'coverage/lcov-report/index.html'
    def coverageContent = readFile(file: coverageFilePath)

    // Helper method to extract coverage percentage
    def extractCoverage = { regex, content ->
        def match = (content =~ regex)
        if (match) {
            // Clean up extracted value to ensure it's numeric
            return match[0][1].replaceAll('[^\\d.]', '').trim()
        } else {
            return 'N/A'
        }
    }

    // Extract coverage percentages using regex
    def statementsCoverage = extractCoverage(/<div class='fl pad1y space-right2'>\s*<span class="strong">(\d+(\.\d+)?)%\s*<\/span>\s*<span class="quiet">Statements<\/span>/, coverageContent)
    def branchesCoverage = extractCoverage(/<div class='fl pad1y space-right2'>\s*<span class="strong">(\d+(\.\d+)?)%\s*<\/span>\s*<span class="quiet">Branches<\/span>/, coverageContent)
    def functionsCoverage = extractCoverage(/<div class='fl pad1y space-right2'>\s*<span class="strong">(\d+(\.\d+)?)%\s*<\/span>\s*<span class="quiet">Functions<\/span>/, coverageContent)
    def linesCoverage = extractCoverage(/<div class='fl pad1y space-right2'>\s*<span class="strong">(\d+(\.\d+)?)%\s*<\/span>\s*<span class="quiet">Lines<\/span>/, coverageContent)

    // Log extracted coverage values for debugging
    echo "Extracted Statements Coverage: ${statementsCoverage}"
    echo "Extracted Branches Coverage: ${branchesCoverage}"
    echo "Extracted Functions Coverage: ${functionsCoverage}"
    echo "Extracted Lines Coverage: ${linesCoverage}"

    // Construct the coverage report using Markdown
    def coverageReport = """
    ### 📊 Code Coverage Summary

    | Metric     | Coverage | Status |
    |------------|----------|--------|
    | Statements | ${statementsCoverage}% | ${getEmojiForCoverage(statementsCoverage)} |
    | Branches   | ${branchesCoverage}% | ${getEmojiForCoverage(branchesCoverage)} |
    | Functions  | ${functionsCoverage}% | ${getEmojiForCoverage(functionsCoverage)} |
    | Lines      | ${linesCoverage}% | ${getEmojiForCoverage(linesCoverage)} |

    **Threshold**: ${COVERAGE_THRESHOLD}%
    """

    def commentPayload = new groovy.json.JsonBuilder([
        body: coverageReport
    ]).toString()

    echo "Generated JSON Payload: ${commentPayload}"

    def apiUrl = "https://api.github.com/repos/${repoOwner}/${repoName}/issues/${prNumber}/comments"

    withCredentials([string(credentialsId: 'GITHUB_ACCESS_TOKEN', variable: 'GITHUB_TOKEN')]) {
        def response = sh(
            script: """
            curl -L \
            -X POST \
            -H "Accept: application/vnd.github+json" \
            -H "Authorization: Bearer ${GITHUB_TOKEN}" \
            -H "X-GitHub-Api-Version: 2022-11-28" \
            ${apiUrl} \
            -d '${commentPayload}'
            """,
            returnStdout: true
        )
        echo "Comment posted successfully to PR ${prNumber}: ${response}"
    }
}

def getEmailRecipient() {
  if (env.GITHUB_PR_TRIGGER_SENDER_EMAIL) {
    return env.GITHUB_PR_TRIGGER_SENDER_EMAIL
    } else {
    // fallback email
    return 'egeregav@gmail.com.ng'
  }
}

def updateGitHubStatus(status, description) {
    def repoOwner = 'organisation or github owner'
    def repoName = 'repoName'
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

// Helper function to get the appropriate emoji for coverage
def getEmojiForCoverage(coverage) {
    double coverageThreshold = COVERAGE_THRESHOLD.toDouble()

    try {
        if (coverage instanceof String) {  // Check if coverage is a String
            double coverageValue = coverage.toDouble()  // Convert string to double
            return coverageValue >= coverageThreshold ? '✅' : '❌'  // Compare with threshold
        } else {
            echo "Unexpected type for coverage: ${coverage.class.name}"  // Log unexpected types
            return '❓'  // Return default emoji for unexpected types
        }
    } catch (NumberFormatException e) {  // Catch number format exceptions
        echo "Error converting coverage to double: ${coverage}"  // Log conversion error
        return '❓'  // Return default emoji if conversion fails
    } catch (Exception e) {  // Catch all other exceptions
        echo "An unexpected error occurred: ${e.getMessage()}"  // Log unexpected errors
        return '❓'  // Return default emoji for unexpected errors
    }
}