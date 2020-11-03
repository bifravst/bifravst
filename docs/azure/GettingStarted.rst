================================================================================
Getting started
================================================================================

.. warning::

    🚧 The Azure implementation is 
    `work in progress <https://github.com/bifravst/bifravst/issues/29>`_.

.. note::

    💵 Because the Azure solution is using 
    `Cosmos DB <https://docs.microsoft.com/en-us/azure/cosmos-db/introduction>`_
    for querying historical device data, the minimum costs to run
    Bifravst on Azure is around $24 per month. However,
    `there is a free tier for new accounts <https://azure.microsoft.com/en-us/pricing/details/cosmos-db/>`_,
    which you might be eligible for.

System requirements
================================================================================

You need a development environment with the `upcoming LTS release candidate
of Node.js <https://nodejs.org/en/about/releases/>`_ (current release is version
14).

If you are using Windows, we recommend using the `Windows Subsystem for
Linux <https://docs.microsoft.com/en-us/windows/wsl/install-win10>`_
with `Ubuntu 18.04
LTS <https://www.microsoft.com/nb-no/p/ubuntu-1804-lts/9n9tngvndl3q?rtc=1>`_.

Clone the project and install dependencies
================================================================================

Clone the latest version of the
`azure <https://github.com/bifravst/azure>`_ project and install the
dependencies:

.. code-block:: bash

    git clone https://github.com/bifravst/azure.git bifravst-azure 
    cd bifravst-azure npm ci npx tsc

Install the Azure CLI
================================================================================

Follow the instructions from the
`Azure CLI documentation <https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest>`_
in order to install the CLI.

Afterwards you should be able to execute the :code:`az` command:

.. code-block:: bash

    az

Dockerizing the :code:`az` command
--------------------------------------------------------------------------------

In case you encounter the issue where the azure CLI
`requires an older Python version <https://github.com/Azure/azure-cli/issues/11239>`_,
you can *dockerize* it like this:

.. code-block:: bash

    #!/usr/bin/env bash 
    
    set -eu
    
    command="$@"
    
    docker run --rm --volume `pwd`:/root --volume $HOME/.azure:/root/.azure -w=/root mcr.microsoft.com/azure-cli az $command

Put above into an executable file in your path.

Install the Azure Functions Core Tools
================================================================================

Follow
`the installation instructions <https://github.com/Azure/azure-functions-core-tools#installing>`_,
afterwards you should be able to execute the :code:`func` command:

.. code-block:: bash

    func

Deploy the solution to your account
================================================================================

.. note::

    Since we will be using Azure Active Directory B2C it is
    recommended to set up Bifravst in a dedicated subscription.

Go to the Subscriptions blade, and add a new subscription for Bifravst,
copy the subscription id.

.. code-block::

    export SUBSCRIPTION_ID=<Subscription ID>

Authenticate the CLI:

.. code-block:: bash

    az login

Pick a name for the solution and export it as :code:`APP_NAME`, in
this example we use :code:`bifravst` as the default.

Deploy the solution in your preferred location (you can list them using
:code:`az account list-locations`) and export it on the
environment variable :code:`LOCATION`.

The recommended workflow is to use a
`direnv <https://direnv.net/>`_) plugin for your shell which will
automatically export the environment variables it finds in a
:code:`.envrc` file in the project folder:

Create a new file :code:`.envrc` in the project folder and add
these environment variables.

.. code-block:: bash

    export LOCATION=northeurope

Add the tenant ID:

.. code-block:: bash

    direnv allow

Now create the resource group for the solution:

.. code-block:: bash

    az group create --subscription $SUBSCRIPTION_ID -l $LOCATION -n ${APP_NAME:-bifravst}

`It's currently also not possible <https://github.com/bifravst/azure/issues/1>`_
to create Active Directory B2C and application through the ARM template, you need
to follow
`these instructions <https://docs.microsoft.com/en-us/azure/active-directory-b2c/tutorial-register-applications?tabs=applications>`_
and create a B2C tenant and an application. Use
:code:`http://localhost:3000/` (for local development) and
:code:`https://${APP_NAME:-bifravst}app.z16.web.core.windows.net/`
as the redirect URLs.

Save the *directory (tenant) id* of the created Active Directory B2C
and the *application (client) id* to the environment variable
:code:`APP_REG_CLIENT_ID` in the :code:`.envrc` file:

.. code-block:: bash

    export APP_REG_CLIENT_ID=...

Create the user flow for sign up and sign in and make sure to name it
:code:`B2C_1_signup_signin`.

Remember to allow the changed file:

.. code-block:: bash

    direnv allow

Now deploy the solution:

.. code-block:: bash

    az deployment group create --resource-group ${APP_NAME:-bifravst} \
        --mode Complete --name ${APP_NAME:-bifravst} \
        --template-file azuredeploy.json \
        --parameters \
            appName=${APP_NAME:-bifravst} \
            location=$LOCATION appRegistrationClientId=$APP_REG_CLIENT_ID \
            b2cTenant=$B2C_TENANT
    # It's currently not possible to enable website hosting through the ARM template
    az storage blob service-properties update \
        --account-name ${APP_NAME:-bifravst}app
        --static-website --index-document index.html
    az storage blob service-properties update \
        --account-name ${APP_NAME:-bifravst}deviceui \
        --static-website --index-document index.html
    # Deploy the functions
    func azure functionapp publish ${APP_NAME:-bifravst}API --typescript
