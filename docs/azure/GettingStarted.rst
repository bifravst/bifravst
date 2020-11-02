================================================================================
Getting started
================================================================================

\[!`Release <https://img.shields.io/github/v/release/bifravst/azure.svg>`_\](<https://github.com/bifravst/azure/releases>)
\[!\[GitHub
Actions\](<https://github.com/bifravst/azure/workflows/Test%20and%20Release/badge.svg>)\](<https://github.com/bifravst/azure/actions>)
\[!`semantic-release <https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg>`_\](<https://github.com/semantic-release/semantic-release>)
\[!`Renovate <https://img.shields.io/badge/renovate-enabled-brightgreen.svg>`_\](<https://renovatebot.com>)
\[!\[Mergify
Status\](<https://img.shields.io/endpoint.svg?url=https://dashboard.mergify.io/badges/bifravst/athena-helpers&style=flat>)\](<https://mergify.io>)
\[!\[Commitizen
friendly\](<https://img.shields.io/badge/commitizen-friendly-brightgreen.svg>)\](<http://commitizen.github.io/cz-cli/>)
\[!\[code style:
prettier\](<https://img.shields.io/badge/code_style-prettier-ff69b4.svg>)\](<https://github.com/prettier/prettier/>)
\[!\[ESLint:
TypeScript\](<https://img.shields.io/badge/ESLint-TypeScript-blue.svg>)\](<https://github.com/typescript-eslint/typescript-eslint>)

.. note::

    🚧 The Azure implementation is \> \[work in
progress\](<https://github.com/bifravst/bifravst/issues/29>).

.. note::

    💵 Because the Azure solution is using \> \[Cosmos
DB\](<https://docs.microsoft.com/en-us/azure/cosmos-db/introduction>)
for \    querying historical device data, the minimum costs to run
Bifravst on Azure is \    around \$24 per month. However, \> \[there is a
free tier for new
accounts\](<https://azure.microsoft.com/en-us/pricing/details/cosmos-db/>),
\    which you might be eligible for.

System requirements
================================================================================

You need a development environment with the \[next LTS release candidate
of Node.js\](<https://nodejs.org/en/about/releases/>) (right now version
14).

If you are using Windows, we recommend the \[Windows Subsystem for
Linux\](<https://docs.microsoft.com/en-us/windows/wsl/install-win10>)
with \[Ubuntu 18.04
LTS\](<https://www.microsoft.com/nb-no/p/ubuntu-1804-lts/9n9tngvndl3q?rtc=1>).

Clone the project and install dependencies
================================================================================

Clone the latest version of the
`azure <https://github.com/bifravst/azure>`_ project and install the
dependencies:

    git clone <https://github.com/bifravst/azure.git> bifravst-azure cd
    bifravst-azure npm ci npx tsc

Install the Azure CLI
================================================================================

Follow the instructions from the \[Azure CLI
documentation\](<https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest>)
in order to install the CLI.

Afterwards you should be able to execute the [az]{.title-ref} command:

    az

Dockerizing the [az]{.title-ref} command
--------------------------------------------------------------------------------

In case you encounter the issue where the azure CLI \[requires an older
Python version\](<https://github.com/Azure/azure-cli/issues/11239>), you
can \_[dockerize]() it like this:

    \#!/usr/bin/env bash set -eu
    
    command=\"\$@\"
    
    docker run \--rm \--volume \`pwd\`:/root \--volume
    \$HOME/.azure:/root/.azure -w=/root mcr.microsoft.com/azure-cli az
    \$command

Put above into an executable file in your path.

Install the Azure Functions Core Tools
================================================================================

Follow \[the installation
instructions\](<https://github.com/Azure/azure-functions-core-tools#installing>),
afterwards you should be able to execute the [func]{.title-ref} command:

    func

Deploy the solution to your account
================================================================================

.. note::

    since we will be using Azure Active Directory B2C it is
recommended to \    set up Bifravst in a dedicated subscription.

Go to the Subscriptions blade, and add a new subscription for Bifravst,
copy the subscription id.

    export SUBSCRIPTION_ID=0aef5c04-9e9c-4275-9ccf-e719842d082d

Authenticate the CLI:

    az login

Pick a name for the solution and export it as [APP_NAME]{.title-ref}, in
this example we use [bifravst]{.title-ref} as the default.

Deploy the solution in your preferred location (you can list them using
[az account list-locations]{.title-ref}) and export it on the
environment variable [LOCATION]{.title-ref}.

The recommended workflow is to use a
\[\_[direnv]()\](<https://direnv.net/>) plugin for your shell which will
automatically export the environment variables it finds in a
[.envrc]{.title-ref} file in the project folder:

Create a new file [.envrc]{.title-ref} in the project folder and add
these environment variables.

    export LOCATION=northeurope

Add the tenant ID:

    direnv allow

Now create the resource group for the solution:

    az group create \--subscription \$SUBSCRIPTION_ID -l \$LOCATION -n
    \${APP_NAME:-bifravst}

\[It\'s currently also not
possible\](<https://github.com/bifravst/azure/issues/1>) to create
Active Directory B2C and application through the ARM template, you need
to follow \[these
instructions\](<https://docs.microsoft.com/en-us/azure/active-directory-b2c/tutorial-register-applications?tabs=applications>)
and create a B2C tenant and an application. Use
[http://localhost:3000/]{.title-ref} (for local development) and
[https://\${APP_NAME:-bifravst}app.z16.web.core.windows.net/]{.title-ref}
as the redirect URLs.

Save the \_directory (tenant) [id]() of the created Active Directory B2C
and the \_application (client) [id]() to the environment variable
[APP_REG_CLIENT_ID]{.title-ref} in the [.envrc]{.title-ref} file:

    export APP_REG_CLIENT_ID=\...

Create the user flow for sign up and sign in and make sure to name it
[B2C_1\_signup_signin]{.title-ref}.

Remember to allow the changed file:

    direnv allow

Now deploy the solution:

    az deployment group create \--resource-group \${APP_NAME:-bifravst}
    \--mode Complete \--name \${APP_NAME:-bifravst} \--template-file
    azuredeploy.json \--parameters appName=\${APP_NAME:-bifravst}
    location=\$LOCATION appRegistrationClientId=\$APP_REG_CLIENT_ID
    b2cTenant=\$B2C_TENANT ================================================================================
It\'s currently not possible to enable
================================================================================
    website hosting through the ARM template az storage blob
    service-properties update \--account-name \${APP_NAME:-bifravst}app
    \--static-website \--index-document index.html az storage blob
    service-properties update \--account-name
    \${APP_NAME:-bifravst}deviceui \--static-website \--index-document
    index.html
    
    ================================================================================
Deploy the functions func azure functionapp publish
================================================================================
    \${APP_NAME:-bifravst}API \--typescript
