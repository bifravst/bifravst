.. _azure-continuous-integration:

Continuous Integration
######################

.. note::

    This is an advanced topic for those who want to further develop and customize Bifravst according to their needs.
    Please see the `GitHub project page <https://github.com/bifravst/azure/>`_ of Bifravst for Azure which implements the process outlined here.

Every change to the project is tested against an Azure account (which has to be manually prepared, see below), and then a BDD test-suite of end-to-end tests written in `Gherkin <https://cucumber.io/docs/gherkin/>`_, which describes tests in plain english, is run.

This way the tests itself are not tied to the implementation and during refactoring one cannot accidentally drop tests: tests written for test runners like Jest tend to be tied closely to the API of the source-code implementation, in a case of bigger refactoring the tests themselves usually need to be refactored as well.
Since the BDD test above are purely testing based on the public API of the project (which is a mix of the native Azure API and a custom REST API), they can be kept unchanged during refactoring.

This also provides an easily grokable description of the available (and implemented) features, `in one folder <https://github.com/bifravst/azure/tree/saga/features>`_.

Prepare your Azure Account
**************************

.. warning::

    Compared to the :ref:`AWS continuous integration setup <aws-continuous-integration>` getting it to work on Azure is immensely more complicated and involves many manual steps, which unfortunately cannot be automated.
    If you know how to make the whole set-up process simpler, `please provide your input here! <https://github.com/bifravst/azure/issues/1>`_

Create a new tenant (Azure Active Directory)
================================================================================

In order to separate the CI test runs from the production resources, go to the `Azure Portal <https://portal.azure.com/>`_ and create a new Azure Active Directory tenant:

-   Organization name: ``Bifravst (CI)``
-   Initial domain name: ``bifravstci`` (since this is
    globally unique customize this)
-   Country: pick your preferred country

After submitting, it will take a few minutes for the tenant to be created.

Note down the initial domain name you used:

.. code-block:: bash

    export TENANT_DOMAIN="<Primary domain>" # e.g. "bifravstci"

Create subscription
================================================================================

Go to the Subscriptions blade and create a new subscription for the CI tenant, this will make identifying costs for this purpose easier.

After the subscription has been created, change its directory to the one created above.

Note down the Subscription ID which you can find in the Subscriptions blade:

.. code-block:: bash

    export SUBSCRIPTION_ID="<Subscription ID>" # e.g. "1aae311f-12d6-419e-8c6b-ebcf3ec4ed15"

Create another new tenant (Azure Active Directory B2C)
================================================================================

Create a new Azure Active Directory B2C tenant, which is used as the identity management solution for the user accounts of the Bifravst instance.

Follow `the Create Tenant guide <https://docs.microsoft.com/en-us/azure/active-directory-b2c/tutorial-create-tenant>`_ to create a new Azure AD B2C tenant:

-   Organization name: ``Bifravst (CI) Users``
-   Initial domain name: ``bifravstciusers`` (since this is
    globally unique customize this)
-   Country: pick your preferred country

Note down the initial domain name you used:

.. code-block:: bash

    export B2C_TENANT="<Primary domain>" # e.g. "bifravstciusers"

Link this Azure AD B2C tenant to the subscription for CI by following `the Billing guide <https://docs.microsoft.com/en-us/azure/active-directory-b2c/billing#link-an-azure-ad-b2c-tenant-to-a-subscription>`_.

Create Azure Active Directory B2C application
*********************************************

Follow the steps in the :ref:`Continous Deployment <azure-continuous-deployment>`  instructions to create a new App registration.

-   Name: Bifravst Web App
-   Redirect URI (make sure to select SPA): ``https://bifravstciapp.z16.web.core.windows.net/`` (instead of ``bifravstciapp`` you need to pick something else that fits your project because this name is globally unique)

Note down the *Application (client) ID* and the *Directory (tenant) ID* of the created Active Directory B2C App registration:

.. code-block:: bash

    export APP_REG_CLIENT_ID="<application (client) id>"
    export B2C_TENANT_ID="<Directory (tenant) ID>"

For the test-runner to be able to programmatically log-in users, the resource owner password credentials (ROPC) flow `needs to be enabled <https://docs.microsoft.com/EN-US/azure/active-directory-b2c/configure-ropc?tabs=app-reg-ga>`_ with these settings:

-   Name: ``B2C_1_developer``
-   Application claims: select *Show more ...* and then mark *Email Addresses* as a return claim

Add the permission to manager user accounts (Microsoft Graph > ``User.ReadWrite.All``) and grant admin consent.

In Authentication allow the Implicit grant for Access and ID tokens and select *Yes* for *Treat application as a public client*.

Create a new client secret for the App registration and note it down as

.. code-block:: bash

    export B2C_CLIENT_SECRET="<Client Secret Value>" # e.g. "12OzW72ie-U.vlmzik-eO5gX.x26jLTI6U"

Deploy the solution
*******************

Now drop into a shell and login:

.. code-block:: bash

    az login

Make sure you have enabled the right subscription:

.. code-block:: bash

    az account set --subscription $SUBSCRIPTION_ID 
    # Verify that it is set to default
    az account list --output table

Enable required resources

.. code-block:: bash

    az provider register --namespace Microsoft.AzureActiveDirectory
    az provider register --namespace Microsoft.Storage
    az provider register --namespace Microsoft.Insights
    az provider register --namespace Microsoft.SignalRService
    az provider register --namespace Microsoft.DocumentDB
    az provider register --namespace Microsoft.Devices
    az provider register --namespace Microsoft.Web

Now create the CI credentials:

.. code-block:: bash

    az ad sp create-for-rbac --name https://github.com/ --role Contributor --sdk-auth --scopes /subscriptions/${SUBSCRIPTION_ID} > ci-credentials.json

Create a resource group for Bifravst

.. code-block:: bash

    az group create --name ${RESOURCE_GROUP_NAME:-bifravst} --location ${LOCATION:-northeurope}

Deploy the resources:

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

Publish the functions:

.. code-block:: bash

    func azure functionapp publish ${APP_NAME:-bifravst}API --typescript

Docker variant for publishing the functions (in case you get a ``Permission denied`` error):

.. code-block:: bash

    docker run --rm -v ${PWD}:/workdir -v ${HOME}/.azure:/root/.azure bifravst/azure-dev:latest \
        func azure functionapp publish ${APP_NAME:-bifravst}API --typescript

Running during development
**************************

.. code-block:: bash

    export API_ENDPOINT=https://`az functionapp show -g ${RESOURCE_GROUP_NAME} -n ${APP_NAME:-bifravst}api --query 'defaultHostName' --output tsv | tr -d '\n'`/

    npm ci
    npm run test:e2e

.. note::

    Azure functions only allow one *Issuer Url* in the Active Directory authentication configuration, so you cannot interact with this instance both from the end-to-end tests **and** the web app because the user flow name differs (``B2C_1_developer`` for end-to-end tests and ``B2C_1_signup_signin`` for the web application) and it is part of the Issuer Url, e.g. ``https://${TENANT_DOMAIN}.b2clogin.com/${TENANT_DOMAIN}.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1_developer``.

Set up on GitHub
****************

Provide these environment variables for GitHub Actions of the project you noted down earlier:

-   ``E2E_APP_REG_CLIENT_ID``
-   ``E2E_AZURE_CREDENTIALS`` (the contents of ``ci-credentials.json``)
-   ``E2E_B2C_CLIENT_SECRET``
-   ``E2E_B2C_TENANT_ID``
