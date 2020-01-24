# Getting started

[![Release](https://img.shields.io/github/v/release/bifravst/azure.svg)](https://github.com/bifravst/azure/releases)
[![GitHub Actions](https://github.com/bifravst/azure/workflows/Test%20and%20Release/badge.svg)](https://github.com/bifravst/azure/actions)
[![Greenkeeper badge](https://badges.greenkeeper.io/bifravst/azure.svg)](https://greenkeeper.io/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier/)
[![ESLint: TypeScript](https://img.shields.io/badge/ESLint-TypeScript-blue.svg)](https://github.com/typescript-eslint/typescript-eslint)

## System requirements

You need a development environment with the
[next LTS release candidate of Node.js](https://nodejs.org/en/about/releases/)
(right now version 12).

If you are using Windows, we recommend the
[Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10)
with
[Ubuntu 18.04 LTS](https://www.microsoft.com/nb-no/p/ubuntu-1804-lts/9n9tngvndl3q?rtc=1).

## Clone the project and install dependencies

> **Note:** Remember to
> [authenticate against the GitHub package registry](../guides/GitHubRegistry.md).

Clone the latest version of the [aws](https://github.com/bifravst/azure) project
and install the dependencies:

    git clone https://github.com/bifravst/azure.git bifravst-azure
    cd bifravst-azure
    npm ci
    npx tsc

## Install the Azure CLI

Follow the instructions from the
[Azure CLI documentation](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest)
in order to install the CLI.

Afterwards you should be able to execute the `az` command:

    az

### Dockerizing the `az` command

In case you encounter the issue where the azure CLI
[requires an older Python version](https://github.com/Azure/azure-cli/issues/11239),
you can _dockerize_ it like this:

    #!/usr/bin/env bash
    set -eu

    command="$@"

    docker run --rm --volume `pwd`:/root --volume $HOME/.azure:/root/.azure -w=/root mcr.microsoft.com/azure-cli az $command

Put above into an executable file in your path.

## Install the Azure Functions Core Tools

Follow
[the installation instructions](https://github.com/Azure/azure-functions-core-tools#installing),
afterwards you should be able to execute the `func` command:

    func

## Deploy the solution to your account

> Note: since we will be using Azure Active Directory B2C it is recommended to
> set up Bifravst in a dedicated account.

Authenticate the CLI:

    az login

Deploy the solution in your preferred location (you can list them using
`az account list-locations`) and export it on the environment variable
`LOCATION`:

    az group create -l $LOCATION -n bifravst
    # It's currently also not possible to create Active Directory App Registrations through the ARM template
    export APP_REG_CLIENT_ID=`az ad app create --display-name bifravst --query "appId" -o tsv`
    echo "Note down this id an export it when updating as APP_REG_CLIENT_ID=$APP_REG_CLIENT_ID"
    export TENANT_ID=`az account show  --query "tenantId" -o tsv`
    echo "Note down this id an export it when updating as TENANT_ID=$TENANT_ID"
    az group deployment create --resource-group bifravst --mode Complete --name bifravst --template-file azuredeploy.json \
        --parameters appName=bifravst location=$LOCATION appRegistrationClientId=$APP_REG_CLIENT_ID tenantId=$TENANT_ID
    # It's currently not possible to enable website hosting through the ARM template
    az storage blob service-properties update --account-name bifravstapp --static-website --index-document index.html
    az storage blob service-properties update --account-name bifravstdeviceui --static-website --index-document index.html

    # Deploy the functions
    func azure functionapp publish bifravstWebsite

    # TODO: Maybe?
    # add the reply url to the app registration reply urls
    # az ad app update --id $clientId   --add replyUrls "https://${functionAppName}.azurewebsites.net/.auth/login/aad/callback"
