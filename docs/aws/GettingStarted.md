# Getting started

[![Release](https://img.shields.io/github/v/release/bifravst/aws.svg)](https://github.com/bifravst/aws/releases)
[![GitHub Actions](https://github.com/bifravst/aws/workflows/Test%20and%20Release/badge.svg)](https://github.com/bifravst/aws/actions)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Renovate](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com)
[![Mergify Status](https://img.shields.io/endpoint.svg?url=https://dashboard.mergify.io/badges/bifravst/athena-helpers&style=flat)](https://mergify.io)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier/)
[![ESLint: TypeScript](https://img.shields.io/badge/ESLint-TypeScript-blue.svg)](https://github.com/typescript-eslint/typescript-eslint)

## System requirements

You need a development environment with the
[upcoming LTS release candidate of Node.js](https://nodejs.org/en/about/releases/)
(current release is version 14).

If you are using Windows, we recommend using the
[Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10)
with
[Ubuntu 18.04 LTS](https://www.microsoft.com/nb-no/p/ubuntu-1804-lts/9n9tngvndl3q?rtc=1).

## Clone the project and install dependencies

Clone the latest version of the [Bifravst AWS](https://github.com/bifravst/aws)
project and install the dependencies using the following commands:


    git clone https://github.com/bifravst/aws.git bifravst-aws
    cd bifravst-aws
    npm ci
    npx tsc

## Provide your AWS credentials

In order to set up Bifravst on AWS you first need to set up a new AWS account
and provide AWS credentials.

> 🚨 It is recommended to install these resources in a blank AWS account to
> clearly separate them from your other projects. After you have registered your
> personal account, sign up for
> [AWS Organizations](https://aws.amazon.com/organizations/) and create a
> sub-account for Bifravst. You can have many sub-accounts, without extra costs.

To setup a new AWS account and provide credentials, complete the following steps:

1. Navigate to your
[IAM console](https://console.aws.amazon.com/iam/home?region=us-east-1#/home)
and add a new user for
[programmatic access](https://wa.aws.amazon.com/wat.question.SEC_3.en.html)
1. Attach the `arn:aws:iam::aws:policy/AdministratorAccess` policy directly.
Note that this action creates a user who can perform any action with the
account, therefore it should only be created in an account dedicated for
Bifravst.

1. See the
[Getting Started guide](https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html)
to configure the AWS CDK.

1. As a recommended workflow, use a [_direnv_](https://direnv.net/) plugin
for your shell, which locates the environment variables in a `.envrc` file in
the project folder and automatically exports them.

1. Create a new `.envrc` file in the project folder and add the credentials
that are provided to you when you create the new user.

1. Also add your preferred region and your AWS account ID (that can be found
under [My Account_ on the AWS console](https://console.aws.amazon.com/billing/home?#/account)),
to the `.envrc` file, as shown in the following code:

```
export AWS_ACCESS_KEY_ID=<value of Access key ID>
export AWS_SECRET_ACCESS_KEY=<value of Secret access key>
export AWS_DEFAULT_REGION=<your preferred AWS region>
```

>Note: You should add the `.envrc` file to your global 
>[.gitignore file](https://help.github.com/en/github/using-git/ignoring-files#create-a-global-gitignore).lobal-gitignore).

## Supported regions

Not all AWS features are available in all the AWS regions.
You can see a warning if you are deploying to a region that has not been tested
and the AWS CDK might fail.

The supported regions are listed below:

- `us-east-1`
- `eu-west-1`
- `eu-central-1`

## Install Bifravst into your AWS account

The following commands set up the necessary resources in your AWS account:

    npx cdk -a 'node dist/cdk/cloudformation-sourcecode.js' deploy
    npx cdk bootstrap
    npx cdk deploy '*'

The AWS CDK will provide a list of permission changes to your account, and you
need to review them carefully whenever you make changes to the setup.
However, this step is not mandatory, and you can skip it by using the following
command:

`npx cdk deploy '*' --require-approval never`. 🤞

After the setup completes successfully, the historical data resources need to be
set up through the CLI, by using the following command:

    node cli historical-data --setup

## What's next:

You can now [deploy the web application](../app/AWS.md)  
and [provision credentials to your devices](./DeviceCredentials.md).
