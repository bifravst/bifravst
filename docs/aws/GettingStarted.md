# Getting started

## System requirements

You need a development environment with the
[latest active LTS release of Node.js](https://nodejs.org/en/about/releases/)
(right now version 10).

## Clone the project and install dependencies

Clone the latest version of the [aws](https://github.com/bifravst/aws) project
and install the dependencies:

    git clone https://github.com/bifravst/aws.git bifravst-aws
    cd bifravst-aws
    npm ci

## Provide your AWS credentials

In order to set up Bifravst on AWS you first need to set up a new account.

> 🚨 It is recommended to install these resources in a blank AWS account to
> clearly separate them from your other projects. After you have registered your
> personal account, sign-up for
> [AWS Organizations](https://aws.amazon.com/organizations/) and create a
> sub-account for Bifravst. You can have as many sub-accounts as you like,
> without extra costs.

Go to your
[IAM console](https://console.aws.amazon.com/iam/home?region=us-east-1#/home)
and add a new user for programmatic access and attach the
`arn:aws:iam::aws:policy/AdministratorAccess` policy directly. Note that this
action will create a user which can do everything in the account, therefore it
should only be created in an account dedicated for Bifravst.

Follow
[this guide](https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html)
to configure AWS CDK.

The recommended workflow is to use a _dotenv_ plugin for your shell (e.g.
[this one for Zsh](https://github.com/robbyrussell/oh-my-zsh/tree/master/plugins/dotenv))
which will automatically export the environment variables it finds in a
`.dotenv` file in the project folder:

Create a new file `.env` in the project folder and add the credentials that are
presented to you after you have created the new user.

Also add your preferred region and your AWS account ID, which can be found
[under _My Account_ on the AWS console](https://console.aws.amazon.com/billing/home?#/account),
to the `.env` file.

```
AWS_ACCESS_KEY_ID=<value of Access key ID>
AWS_SECRET_ACCESS_KEY=<value of Secret access key>
AWS_DEFAULT_REGION=<your preferred AWS region>
AWS_ACCOUNT=<your AWS Account ID>
```

## Supported regions

Not all AWS features are available in all AWS regions. You will see a warning if
you are deploying to a region that has not been tested and CDK might fail.

Supported regions are:

- `us-east-1`
- `eu-west-1`
- `eu-central-1`

## Install Bifravst into your AWS account

This step sets up the necessary resources in your AWS account:

    npx cdk -a 'node dist/cdk/cloudformation-sourcecode.js' deploy
    npx cdk deploy

CDK will present you with a list of permission changes to your account, you need
to review them carefully everytime you make changes to your set-up. You can
however skip this step if you are adventurous:
`npx cdk deploy --require-approval never`. 🤞

After this completed successfully the historical data resources need to be set
up through the CLI:

    ./cli.js historical-data --setup

## What's next:

You can now [deploy the web application](../app/AWS.md)  
and [provision credentials to your devices](./DeviceCredentials.md).
