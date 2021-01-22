.. _azure-continuous-deployment:

Continuous Deployment
#####################

Continuous Deployment should be deployed with a dedicated subscription to have clear control over permissions and costs.

Create a subscription for the *Asset Tracker for Azure Example*
***************************************************************

#.  Go to the *Subscriptions* blade and add a new subscription for the *Asset Tracker for Azure Example* and name it *Cat Tracker [CD]*.
#.  After the subscription has been created navigate again to the *Subscriptions* blade and copy the subscription id of the newly created subscription:

    .. code-block:: bash

        export SUBSCRIPTION_ID="<subscription id>"

Create an Azure Active Directory B2C
************************************

.. note::

     This `can currently only be achieved through the CLI <https://github.com/NordicSemiconductor/asset-tracker-cloud-azure/issues/1>`_.
     If you know how to make the whole set-up process simpler, `please provide your input here! <https://github.com/NordicSemiconductor/asset-tracker-cloud-azure/issues/1>`_

#.  Go to the *Marketplace* blade and search for *Azure Active Directory [B2C]*.
#.  Click the *Azure Active Directory [B2C]* tile, and on then click the *Create* button.
#.  Select *Create a new Azure AD B2C Tenant.*
#.  Use these settings:

    -   Organization name: *Cat Tracker (Production)*
    -   Initial domain name: ``cat-tracker-prod`` (you need to pick something else that fits your project because this name is globally unique)
    -   Country/Region: Sweden (or pick a location that is closer to you)

        .. figure:: ./cd/create-directory.png
           :alt: Create Directory settings

           Create Directory settings

#.  Click *Next: Review + create* to see the summary and then click *Create* to create the new Active Directory B2C.
    It will take a while to be created.
#.  Copy the initial domain name:

        .. code-block:: bash

            export B2C_TENANT=cat-tracker-prod

#.  Switch to the newly created directory, by following the link in the success message.
#.  You need to link a Subscription to the B2C Directory, follow the link in the notification message to find the instructions.

    .. figure:: ./cd/link-subscription.png
        :alt: Link Subscription

        Link Subscription

#.  Select the subscription and create a new resource group for this assignment:

    .. figure:: ./cd/link-subscription2.png
        :alt: Link Subscription

        Link Subscription

#.  Switch back to the B2C directory
#.  Create an App Registration:

    -   Name: Cat Tracker Web App
    -   Redirect URI (make sure to select SPA): ``https://cat-tracker-prodapp.z16.web.core.windows.net/`` (instead of ``cat-tracker-prodapp`` you need to pick something else that fits your project because this name is globally unique)

        .. figure:: ./cd/create-app-registration.png
            :alt: Create App Registration settings

            Create App Registration settings

#.  In *Expose an API* set the *Application ID URI* to ``api``
#.  Click *+ Add a scope* and create a new scope:

    -   Scope name: ``cat-tracker.admin``
    -   Admin consent display name: Admin Access to the Cat Tracker API
    -   Admin consent description: Allows admin access to all resources exposed through the Cat Tracker API

#.  In *API permissions* click *+ Add a permission* and under *My APIs* select the app registration
#.  Enable the ``cat-tracker.admin`` permission and click *Add permission*
#.  Click *Grant admin consent for <your main directory>* 

    .. figure:: ./cd/add-scope.png
        :alt: Add Scope

        Add Scope

#.  store the *application (client) id* and the *Directory (tenant) ID* of the created Active Directory B2C App registration:

    .. code-block:: bash

        export APP_REG_CLIENT_ID="<application (client) id>"

#.  Enable the implicit grant flow for *Access tokens* and *ID tokens* and click *Save*:

    .. figure:: ./cd/implicit-grant.png
        :alt: Enable implicit grant flow

        Enable implicit grant flow

#.  store the subdomain name used in the Redirect URI:

        .. code-block:: bash

            export APP_NAME=cat-tracker-prodapp

#.  Create the *Sign up and sign [in* user flow for local users, and name it ``signup_signin`` (`Reference <https://docs.microsoft.com/en-us/azure/active-directory-b2c/tutorial-create-user-flows>`_).
#.  Switch back to the main directory
#.  Find the Cat Tracker Azure Function App
#.  Select *Authentication / Authorization*
#.  Select *Log in with Azure Active Directory* for *Action to take when request is not authenticated*
#.  Click *Azure Active Directory* and configure the authentication using the *Advanced Management mode*:

    -   Client ID: ``$APP_REG_CLIENT_ID``
    -   Issuer URL: ``https://${B2C_TENANT}.b2clogin.com/${B2C_TENANT}.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1_signup_signin``
      
        .. figure:: ./cd/function-app-settings.png
            :alt: Function App Settings

            Function App Settings

Acquire credentials for the CI runner
*************************************

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

Create a resource group for the *Asset Tracker for Azure Example*

.. code-block:: bash

    az group create --name ${RESOURCE_GROUP_NAME:-cat-tracker} --location ${LOCATION:-northeurope}

Fork the `Asset Tracker for Azure Example project <https://github.com/NordicSemiconductor/asset-tracker-cloud-azure>`_ and add these secrets.

-   ``AZURE_CREDENTIALS``: store the contents of the JSON file created above
-   ``APP_REG_CLIENT_ID``: the *application (client) id* of the created Active Directory B2C App registration
-   ``B2C_TENANT``: the *initial domain name* of the created Active Directory B2C

Now trigger a deploy.

You can now :ref:`create device credentials <azure-device-credentials>`  for this environment.
