.. _azure-getting-started:

Getting started
###############

To setup Bifravst on Azure, complete the following steps:

1. Check and make sure that you have the necessary system requirements.
#. Clone the project and install dependencies.
#. Install the Azure CLI.
#. Install the Azure Functions Core Tools.
#. Deploy the solution to your account.

System requirements
*******************

You need a development environment with the `upcoming LTS release candidate of Node.js <https://nodejs.org/en/about/releases/>`_ (current release is version 14).

If you are using Windows, use the `Windows Subsystem for Linux <https://docs.microsoft.com/en-us/windows/wsl/install-win10>`_ with `Ubuntu 18.04 LTS <https://www.microsoft.com/nb-no/p/ubuntu-1804-lts/9n9tngvndl3q?rtc=1>`_.

Clone the project and install the dependencies
**********************************************

Clone the latest version of the `Azure <https://github.com/bifravst/azure>`_ project and install the dependencies by running the following commands:

.. code-block:: bash

    git clone https://github.com/bifravst/azure.git bifravst-azure 
    cd bifravst-azure
    npm ci
    npx tsc

Install the Azure CLI
*********************

Follow the instructions from the `Azure CLI documentation <https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest>`_ to install the CLI.

After installing the CLI, you must be able to execute the ``az`` command:

.. code-block:: bash

    az

Dockerizing the ``az`` command
==============================

In case you encounter the issue where the Azure CLI requires `an older Python version <https://github.com/Azure/azure-cli/issues/11239>`_, you can *dockerize* it as follows:

.. code-block:: bash

    #!/usr/bin/env bash 
    
    set -eu
    
    command="$@"
    
    docker run --rm --volume `pwd`:/root --volume $HOME/.azure:/root/.azure -w=/root mcr.microsoft.com/azure-cli az $command

Add the command to an executable file in your path.

Install the Azure Functions Core Tools
**************************************

To install the Azure Functions Core Tools, follow the `Azure Functions Core Tools installation instructions <https://github.com/Azure/azure-functions-core-tools#installing>`_. 
After the installation, you must be able to execute the ``func`` command:

.. code-block:: bash

    func

Deploy the solution to your account
***********************************

.. note::

    Since the project uses Azure Active Directory B2C, it is recommended to set up Bifravst in a dedicated subscription.

To deploy the solution to your account, complete the following steps:

1. In the Azure portal, navigate to the :guilabel:`Subscriptions` blade, and add a new subscription for Bifravst. Export the subscription ID onto the ``SUBSCRIPTION_ID`` environment variable:

	.. code-block:: bash

	   export SUBSCRIPTION_ID="<Subscription ID>"

#. Authenticate the CLI using the following command:

   .. code-block:: bash

      az login

#. Choose a name for the solution and export it as ``APP_NAME``. In this example, we use ``bifravst`` as the default name.

#. Deploy the solution in your preferred location (you can list the locations using ``az account list-locations``) and export it on the environment variable ``LOCATION``.

#. As the recommended workflow, use a `direnv <https://direnv.net/>`_) plugin for your shell, which locates the environment variables in a :file:`.envrc` file in the project folder and automatically exports them.

#. Create a new file :file:`.envrc` in the project folder and add the following environment variables:

   .. code-block:: bash

      export LOCATION=northeurope

#. Create the resource group for the solution:

   .. code-block:: bash

      az group create --subscription $SUBSCRIPTION_ID -l $LOCATION -n ${APP_NAME:-bifravst}

   Currently, it is not possible to create Active Directory B2C and application through the ARM template (see `GitHub issue <https://github.com/bifravst/azure/issues/1>`_).
   You must follow the instructions in the `tutorial for registering a web application in Azure Active Directory B2C <https://docs.microsoft.com/en-us/azure/active-directory-b2c/tutorial-register-applications?tabs=applications>`_ and create a B2C tenant and an application.
   Use ``http://localhost:3000/`` (for local development) and ``https://${APP_NAME:-bifravst}app.z16.web.core.windows.net/`` as the redirect URLs.

#. Save the ``directory (tenant) id`` of the created Active Directory B2C and the ``application (client) id`` to the environment variable ``APP_REG_CLIENT_ID`` in the :file:`.envrc` file:

   .. code-block:: bash

      export APP_REG_CLIENT_ID=...

#. Create the user flow for sign up, sign in, and make sure to name the userflow as ``B2C_1_signup_signin``.

#. Run the following command to allow the changed file:

   .. code-block:: bash

      direnv allow

#. Deploy the solution by running the following commands:

   .. code-block:: bash

       az deployment group create --resource-group ${APP_NAME:-bifravst} \
           --mode Complete --name ${APP_NAME:-bifravst} \
           --template-file azuredeploy.json \
           --parameters \
               appName=${APP_NAME:-bifravst} \
               location=$LOCATION appRegistrationClientId=$APP_REG_CLIENT_ID \
               b2cTenant=$B2C_TENANT
       # Currently it is not possible to enable website hosting through the ARM template
       az storage blob service-properties update \
           --account-name ${APP_NAME:-bifravst}app
           --static-website --index-document index.html
       az storage blob service-properties update \
           --account-name ${APP_NAME:-bifravst}deviceui \
           --static-website --index-document index.html
       # Deploy the functions
       func azure functionapp publish ${APP_NAME:-bifravst}API --typescript
