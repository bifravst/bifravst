.. _app-azure:

Deploying Cat Tracker to Azure
##############################

To deploy the Cat Tracker web application to Azure, complete the following steps:

1. Configure the web application
#. Deploy the web application
#. Register a new user

.. note::

   Before you start deploying, make sure that you have :ref:`set up the necessary Azure resources <azure-getting-started>`.

Configure the web application
*****************************

.. include:: ConfigureWebApp.rst
   :start-after: configure_web_app_start
   :end-before: configure_web_app_end

Configure the IDs of your Azure resources
=========================================

The web application requires the IDs of the Azure resources that were created during the setup of the stack.
Run the following command in the :file:`cat-tracker-app` directory to copy the output to the :file:`.env.local` file:

.. code-block:: bash

    node ../cat-tracker-azure/cli react-config > .env.local

Example for :file:`.env.local`
------------------------------

Following is an example for the contents of the :file:`.env.local` file:

.. code-block:: bash

    REACT_APP_CLOUD_FLAVOUR=Azure
    REACT_APP_AZURE_CLIENT_ID=358162bb-b809-42ef-9b62-22f8fa42b5fb
    REACT_APP_AZURE_AD_B2C_AUTHORITY=https://cat-trackerprod.b2clogin.com/cat-trackerprod.onmicrosoft.com/B2C_1_signup_signin
    REACT_APP_AZURE_B2C_TENANT=cat-trackerprod
    REACT_APP_VERSION=v3.6.1

Version string
==============

.. include:: ConfigureWebApp.rst
   :start-after: provide_versionstring_start
   :end-before: provide_versionstring_end

Deploy the web application
**************************

To build and deploy the web application to the Storage Account created while setting up the *Asset Tracker for Azure Example* in your Azure account, run the following commands:

.. code-block:: bash

    export APP_URL=`az storage account show -g ${RESOURCE_GROUP_NAME} -n ${APP_NAME}app --query 'primaryEndpoints.web' --output tsv | tr -d '\n'`
    export APP_STORAGE_CONNECTION_STRING=`az storage account show-connection-string --name ${APP_NAME}app --query 'connectionString'`
    npm run build
    az storage blob upload-batch --connection-string ${APP_STORAGE_CONNECTION_STRING} --account-name ${APP_NAME}app -s ./build -d '$web'
    echo "Done. Now open $APP_URL to view the web app."

After running the above commands, you can open the domain name printed in ``APP_URL`` to view the web application.

Register a new user
*******************

Since are no predefined user accounts in the B2C Active Directory, you need to register a new user.
