.. _azure-continuous-integration:

Continuous integration
######################

Continuous integration involves the following actions:

* Every change to the project is tested against an Azure account, which must be manually prepared.
* A BDD test-suite of end-to-end tests written in `Gherkin <https://cucumber.io/docs/gherkin/>`_, which describes the tests in English, is run.

In this way, the tests are not tied to the implementation and during refactoring, and you cannot accidentally drop tests.
Tests written for test-runners like `Jest <https://jestjs.io/>`_ tend to be closely tied to the API of the source-code implementation.
In the case of bigger refactoring, the tests themselves usually need to be refactored as well.
Since the BDD tests are purely testing based on the public API of the project (which is a mix of the native Azure API and a custom REST API), they can be kept unchanged during refactoring.

.. note::

    This is an advanced topic for those who need to further develop and customize Bifravst.
    See the `Bifravst for Azure GitHub project page <https://github.com/bifravst/azure/>`_, for the implementation of the process outlined in this section.

The project also provides an easily understandable description of the available (and implemented) features, in a single folder called  `features <https://github.com/bifravst/azure/tree/saga/features>`_.

Prepare your Azure Account
**************************

.. note::

   The setup process in Azure is more complicated when compared to the :ref:`AWS continuous integration setup <aws-continuous-integration>`, since it involves many manual steps, which cannot be automated.
   If you have ideas to simplify the process, `provide your input <https://github.com/bifravst/azure/issues/1>`_.

To prepare your Azure account, complete the following steps:

1. Create a new tenant (Azure Active Directory B2C).
#. Create a subscription.
#. Create a secondary tenant (Azure Active Directory B2C).

Create a new tenant (Azure Active Directory)
============================================

To separate the CI test runs from the production resources, navigate to the `Azure Portal <https://portal.azure.com/>`_ and create a new *Azure Active Directory tenant* with the following values:

* Organization name - ``Bifravst (CI)``.
* Initial domain name - ``bifravstci`` (Customize the name since it is globally unique).
* Country - Choose your preferred country.

After you submit, the tenant will be created in a few minutes.

Note down the initial domain name that you used:

.. code-block:: bash

      export TENANT_DOMAIN="<Primary domain>" # For example, "bifravstci"

Create subscription
===================

To create a subscription, complete the following steps:

1. Login to the Azure portal.
 
#. Navigate to the :guilabel:`Subscriptions` blade and create a new subscription for the CI tenant. This subscription creation will make it easier to identify the costs for the purpose.

#. After creating the subscription, change its directory to the one created in the previous section.

Note down the ``Subscription ID``, which you can find in the :guilabel:`Subscriptions` blade:

   .. code-block:: bash

      export SUBSCRIPTION_ID="<Subscription ID>" # For example, "1aae311f-12d6-419e-8c6b-ebcf3ec4ed15"

Create a secondary tenant (Azure Active Directory B2C)
======================================================

1. Create a new Azure Active Directory B2C tenant, which is used as the identity management solution for the user accounts of the Bifravst instance.

#. Follow `the Create Tenant guide <https://docs.microsoft.com/en-us/azure/active-directory-b2c/tutorial-create-tenant>`_ to create a new Azure AD B2C tenant with the following values:

   * Organization name - ``Bifravst (CI) Users``.
   * Initial domain name - ``bifravstciusers`` (Customize the name since it is globally unique).
   * Country - Choose your preferred country.

#. Note down the initial domain name that you used:

   .. code-block:: bash

      export B2C_TENANT="<Primary domain>" # For example, "bifravstciusers"

#. Link this Azure AD B2C tenant to the subscription for CI by following the `Billing guide <https://docs.microsoft.com/en-us/azure/active-directory-b2c/billing#link-an-azure-ad-b2c-tenant-to-a-subscription>`_.

Create the Azure Active Directory B2C application
*************************************************

To create the Azure Active Directory B2C application, complete the following steps:

1. Follow the instructions in the :ref:`Continous Deployment <azure-continuous-deployment>` instructions to create a new App registration with the following values:

   * Name - Bifravst Web App.
   * Redirect URI (make sure to select SPA) - ``https://bifravstciapp.z16.web.core.windows.net/`` (Choose a name that fits your project instead of ``bifravstciapp`` since ``bifravstciapp`` is globally unique).

#. Export the ``Application (client) ID`` and the ``Directory (tenant) ID`` of the created Active Directory B2C App registration into the ``APP_REG_CLIENT_ID`` and ``B2C_TENANT_ID`` parameters:

   .. code-block:: bash

      export APP_REG_CLIENT_ID="<Application (client) id>"
      export B2C_TENANT_ID="<Directory (tenant) ID>"

#. For enabling the test-runner to programmatically login users, enable `the resource owner password credentials (ROPC) flow <https://docs.microsoft.com/EN-US/azure/active-directory-b2c/configure-ropc?tabs=app-reg-ga>`_ with the following settings:

   * Name - ``B2C_1_developer``.
   * Application claims - Select ``Show more ...`` and then mark ``Email Addresses`` as a return claim.

#. Add the permission to manage user accounts (Microsoft Graph > ``User.ReadWrite.All``) and grant admin consent.

#. In the left menu, under :guilabel:`Manage`, select :guilabel:`Authentication`. Allow the Implicit grant for Access and ID tokens and select ``Yes`` for :guilabel:`Treat application as a public client`.

#. Create a new client secret for the App registration and note it down:

   .. code-block:: bash

       export B2C_CLIENT_SECRET="<Client Secret Value>" # For example, "12OzW72ie-U.vlmzik-eO5gX.x26jLTI6U"

Deploy the solution
*******************

To deploy the solution, complete the following steps:

1. Login to the shell:

   .. code-block:: bash

       az login

#. Make sure that you have enabled the right subscription by using the following commands:

   .. code-block:: bash

       az account set --subscription $SUBSCRIPTION_ID 
       # Verify that it is set to default
       az account list --output table

#. Enable the required resources

   .. code-block:: bash

       az provider register --namespace Microsoft.AzureActiveDirectory
       az provider register --namespace Microsoft.Storage
       az provider register --namespace Microsoft.Insights
       az provider register --namespace Microsoft.SignalRService
       az provider register --namespace Microsoft.DocumentDB
       az provider register --namespace Microsoft.Devices
       az provider register --namespace Microsoft.Web

#. Create the CI credentials:

   .. code-block:: bash

       az ad sp create-for-rbac --name https://github.com/ --role Contributor --sdk-auth --scopes /subscriptions/${SUBSCRIPTION_ID} > ci-credentials.json

#. Create a resource group for Bifravst:

   .. code-block:: bash

       az group create --name ${RESOURCE_GROUP_NAME:-bifravst} --location ${LOCATION:-northeurope}

#. Deploy the resources:

   .. code-block:: bash

       az deployment group create \
       --resource-group ${RESOURCE_GROUP_NAME:-bifravst} \
       --mode Complete \
       --template-file azuredeploy.json \
       --parameters \
       appName=${APP_NAME:-bifravst} \
       location=${LOCATION:-northeurope} \
       appRegistrationClientId=$APP_REG_CLIENT_ID \
       b2cTenant=$B2C_TENANT \
       b2cFlowName=B2C_1_developer

#. Publish the functions:

   .. code-block:: bash

       func azure functionapp publish ${APP_NAME:-bifravst}API --typescript

   Docker variant for publishing the functions (in case you get a ``Permission denied`` error):

   .. code-block:: bash

       docker run --rm -v ${PWD}:/workdir -v ${HOME}/.azure:/root/.azure bifravst/azure-dev:latest \
           func azure functionapp publish ${APP_NAME:-bifravst}API --typescript

Running the solution during development
***************************************

To run the solution during development, run the following commands:

   .. code-block:: bash

       export API_ENDPOINT=https://`az functionapp show -g ${RESOURCE_GROUP_NAME} -n ${APP_NAME:-bifravst}api --query 'defaultHostName' --output tsv | tr -d '\n'`/

       npm ci
       npm run test:e2e

.. note::

   Azure functions allow only one ``Issuer Url`` in the Active Directory authentication configuration. So, you cannot interact with this instance from the end-to-end tests and the web application since the user flow name differs (``B2C_1_developer`` for end-to-end tests and ``B2C_1_signup_signin`` for the web application) and it is part of the Issuer Url (for example, ``https://${TENANT_DOMAIN}.b2clogin.com/${TENANT_DOMAIN}.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1_developer``).

Setup the solution on GitHub
****************************

To setup the solution on GitHub, provide the following environment variables for GitHub Actions of the project:

*  ``E2E_APP_REG_CLIENT_ID``
*  ``E2E_AZURE_CREDENTIALS`` (the contents of :file:`ci-credentials.json`)
*  ``E2E_B2C_CLIENT_SECRET``
*  ``E2E_B2C_TENANT_ID``
