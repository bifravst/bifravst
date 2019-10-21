# Continuous Deployment

> **Note:** This is an optional step to keep the deployment in your account in
> sync with the source code repository automatically.

For this to work you need to fork the source code in order to register the
webhook listener that trigger an update to your deployment.

After forking, make sure to update the `repository.url` in your forks
`package.json`.

This will set up a CodePipeline which triggers a CodeBuild project for every
push to the `saga` branch. You can configure the branch in the `deploy.branch`
property of the `package.json`. The CodeBuild project updates the CloudFormation
stack which contains the Bifravst resources.

A second CodePipeline will be set up for the web app which triggers a CodeBuild
project for every push to the `saga` branch. You can configure the repository
URL and the branch for the web app in the `deploy.webApp` property of the
`package.json`. The CodeBuild project updates the web app deployment on the S3
bucket.

## Provide GitHub credentials

You need to create a
[developer token](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line)
with `repo`, `admin:repo_hook` and `read:packages` permissions for an account
that has write permissions to your repository.

> 🚨 It is recommended to use a separate GitHub account for this, not your
> personal GitHub account.

You need to store this token in AWS ParameterStore which is a **one-time**
manual step done through the AWS CLI:

    aws ssm put-parameter --name /codebuild/github-token --type String --value <Github Token>

## Enable Continuous Deployment

Now you can set up the continuous deployment:

    npx cdk -a 'node dist/cdk/cloudformation-cd.js' deploy

## Check the status of the Continuous Deployment

If you want to check the status of the Continuous Deployment after you have made
changes, you can use this CLI command:

    node cli cd

![Output of node cli cd](./cli-cd.png)
