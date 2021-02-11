.. _azure-continuous-deployment:

Continuous deployment
#####################

Continuous deployment must be deployed with a dedicated subscription to have clear control over the permissions and costs.
For continuous deployment, complete the following steps:

1. Create a subscription for Bifravst.
#. Create an `Azure Active Directory B2C <https://docs.microsoft.com/en-us/azure/active-directory-b2c/overview>`_.
#. Acquire credentials for the CI runner and deploy the project.

Create a subscription for Bifravst
**********************************

To create a subscription for *Bifravst*, complete the following steps:

1. Login to the Azure portal.
#. Navigate to the :guilabel:`Subscriptions` blade and add a new subscription for Bifravst by clicking :guilabel:`Add`. Name the new subscription as ``Bifravst [CD]``.
#. After creating the subscription, navigate to the :guilabel:`Subscriptions` blade and export the subscription identifier of the newly created subscription:

   .. code-block:: bash

      export SUBSCRIPTION_ID="<subscription id>"

Create an Azure Active Directory B2C
************************************

.. note::

     Currently, you can create an Azure Active Directory B2C only through the CLI.
     If you have ideas to simplify the setup process, `share your input <https://github.com/bifravst/azure/issues/1>`_.

To create an Azure Active Directory B2C, complete the following steps:

1. After logging in to the Azure portal, navigate to the :guilabel:`Marketplace` blade and search for ``Azure Active Directory [B2C]``.
#. Click on the :guilabel:`Azure Active Directory [B2C]` tile, and then click the :guilabel:`Create` button.
#. Select :guilabel:`Create a new Azure AD B2C Tenant`.
#. Use the following settings while creating the Azure AD B2C Tenant:

    * Organization name - ``Bifravst (Production)``
    * Initial domain name - ``bifravstprod`` (Choose a name that fits your project as the given name is globally unique)
    * Country/Region - Sweden (or choose a location that is closer to you)

    .. figure:: ./cd/create-directory.png
       :alt: Create Directory settings

       Create Directory settings

#. Click :guilabel:`Next: Review + create` to see the summary and then click :guilabel:`Create` to create the new Active Directory B2C. The operation will take a while to complete.

#. Copy the initial domain name to the ``B2C_TENANT`` environment variable:

   .. code-block:: bash

      export B2C_TENANT=bifravstprod

#. Switch to the newly created directory by following the link in the success message.
#. You must link a subscription to the B2C Directory. Follow the link in the notification message to find the instructions as shown in the figure:

   .. figure:: ./cd/link-subscription.png
      :alt: Link Subscription

      Link Subscription

#. Select the subscription and create a new resource group for this subscription assignment as shown in the following figure:

   .. figure:: ./cd/link-subscription2.png
      :alt: Link Subscription

      Link Subscription

#. Switch back to the B2C directory.
#. Create an App Registration:

    * Name - Bifravst Web App
    * Redirect URI (make sure to select SPA) - ``https://bifravstprodapp.z16.web.core.windows.net/`` (Choose another name that fits your project instead of ``bifravstprodapp``  since this name is globally unique)

    .. figure:: ./cd/create-app-registration.png
       :alt: Create App Registration settings

       Create App Registration settings

#. Click :guilabel:`Expose an API` and  set the ``Application ID URI`` field to ``api``.
#. Click :guilabel:`+ Add a scope` and create a new scope with the following values:

    * Scope name - ``bifravst.admin``
    * Admin consent display name - Admin Access to the Bifravst API
    * Admin consent description - Allows admin access to all resources exposed through the Bifravst API

#. Click :guilabel:`API permissions` and then click :guilabel:`+ Add a permission`. Under :guilabel:`My APIs`, select the app registration.

#. Enable the ``bifravst.admin`` permission and click :guilabel:`Add permission`.
#. Click :guilabel:`Grant admin consent for <your main directory>` as shown in the following figure:

   .. figure:: ./cd/add-scope.png
       :alt: Add Scope

       Add Scope

#. Store the ``application (client) id`` and the ``Directory (tenant) ID`` of the created Active Directory B2C App registration:

   .. code-block:: bash

      export APP_REG_CLIENT_ID="<application (client) id>"

#. Enable the implicit grant flow for :guilabel:`Access tokens` and :guilabel:`ID tokens` and click :guilabel:`Save` as shown in the following figure:

   .. figure:: ./cd/implicit-grant.png
      :alt: Enable implicit grant flow

      Enable implicit grant flow

#. Store the subdomain name used in the Redirect URI:

   .. code-block:: bash

      export APP_NAME=bifravstprodapp

#. Create the *Sign up and sign in* user flow for local users, and name it ``signup_signin``. For more information, see the `Azure Active Directory B2C documentation on creating user flow <https://docs.microsoft.com/en-us/azure/active-directory-b2c/tutorial-create-user-flows>`_.
#.  Switch back to the main directory.
#.  Find the Bifravst Azure Function App.
#.  Select :guilabel:`Authentication / Authorization`.
#.  Select ``Log in with Azure Active Directory`` for the option :guilabel:`Action to take when request is not authenticated`
#.  Click :guilabel:`Azure Active Directory` and configure the authentication using the *Advanced Management mode*:

    * Client ID - ``$APP_REG_CLIENT_ID``
    * Issuer URL - ``https://${B2C_TENANT}.b2clogin.com/${B2C_TENANT}.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1_signup_signin``
      
    .. figure:: ./cd/function-app-settings.png
       :alt: Function App Settings

       Function App Settings

Acquire credentials for the CI runner
*************************************

To acquire credentials for the CI runner, complete the following steps:

1. Login using the shell:

   .. code-block:: bash

      az login

#. Make sure that you have enabled the correct subscription by running the following commands:

   .. code-block:: bash

      az account set --subscription $SUBSCRIPTION_ID
      # Verify that it is set to default
      az account list --output table

#. Enable required resources using the following commands:

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

#. Fork the `Bifravst Azure project <https://github.com/bifravst/azure/settings/secrets/new>`_ and add the following secrets.

   * ``AZURE_CREDENTIALS`` - Store the contents of the JSON file created in the above step.
   * ``APP_REG_CLIENT_ID`` - The ``application (client) id`` of the Active Directory B2C App registration that is created.
   * ``B2C_TENANT`` - The ``initial domain name`` of the Active Directory B2C that is created.

#. Start a deployment.

You can now :ref:`create device credentials <azure-device-credentials>`  for this environment.
