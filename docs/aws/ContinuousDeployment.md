# Continuous Deployment

> *Note:* This is an optional step to keep the deployment in your account in sync with the source code repository automatically. 

For this to work you need to fork the source code in order to register the webhook listeners that trigger an update to your deployment.

After forking, make sure to update the `repository.url` in your forks `package.json`.

## Provide GitHub credentials

You need to create a [developer token](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line) with `repo` permissions for an account that has write permissions to your repository. 

> 🚨 It is recommended to use a separate user for this, not your personal GitHub account.

This token is stored as Parameters in your AWS account:

	aws ssm put-parameter --name /codebuild/github-token --type String --value <Github Token>
	aws ssm put-parameter --name /codebuild/github-username --type String --value <Github Username>

> Note that you need to give CodeBuild permissions to your GitHub account in order for the token to work.
> That is a one-time operation that can be done through the AWS Console for CodeBuild.

## Enable Continuous Deployment

Now you can set up the continuous deployment:

	npx cdk -a 'node dist/cloudformation-cd.js' deploy
