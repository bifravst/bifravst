# Continuous Deployment

> *Note:* This is an optional step to keep the deployment in your account in sync with the source code repository automatically. 

For this to work you need to fork the source code in order to register the webhook listeners that trigger an update to your deployment.

After forking, make sure to update the `repository.url` in your forks `package.json`.

## Provide GitHub credentials

You need to create a [developer token](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line) with `repo` and `admin:repo_hook` permissions for an account that has write permissions to your repository. 

> 🚨 It is recommended to use a separate GitHub account for this, not your personal GitHub account.

You need to provide this token to AWS CodeBuild which is a **one-time** manual step done through the AWS Console: go to CodeBuild and select *Create new Project*, for *Source Provider* select *GitHub* and *Connect with a GitHub personal access token*, enter the token you have created above and click *Save token*.

## Enable Continuous Deployment

Now you can set up the continuous deployment:

	npx cdk -a 'node dist/cloudformation-cd.js' deploy
