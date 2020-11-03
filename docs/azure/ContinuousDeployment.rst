================================================================================
Continuous Deployment
================================================================================

Continuous Deployment should be deployed with a dedicated subscription
to have clear control over permissions and costs.

Create a subscription for Bifravst
================================================================================

1.  Go to the *Subscriptions* blade and add a new subscription for
    Bifravst and name it *Bifravst [CD]*.
2.  After the subscription has been created navigate again to the
    *Subscriptions* blade and copy the subscription id of the newly
    created subscription:

    .. code-block::

        export SUBSCRIPTION_ID=<subscription id>

Create an Azure Active Directory B2C
================================================================================

.. note::

     This 
     `can currently only be achieved through the CLI <https://github.com/bifravst/azure/issues/1>`_.
     If you know how to make the whole set-up process simpler,
     `please provide your input here! <https://github.com/bifravst/azure/issues/1>`_

3.  Go to the *Marketplace* blade and search for *Azure Active Directory [B2C]*.
4.  Click the *Azure Active Directory [B2C]* tile, and on then click
    the *Create* button.
5.  Select *Create a new Azure AD B2C Tenant.*
6.  Use these settings:

    -   Organization name: *Bifravst (Production)*
    -   Initial domain name: [bifravstprod]{.title-ref} (you need to
        pick something else that fits your project because this name is
        globally unique)
    -   Country/Region: Sweden (or pick a location that is closer to
        you)

        .. figure:: ./cd/create-directory.png
           :alt: Create Directory settings

           Create Directory settings

7.  Click *Next: Review + create* to see the summary and then click
    *Create* to create the new Active Directory B2C. It will take a
    while to be created.
8.  Copy the initial domain name:

        .. code-block:: bash

            export B2C_TENANT=bifravstprod

9.  Switch to the newly created directory, by following the link in the
    success message.
10. You need to link a Subscription to the B2C Directory, follow the
    link in the notification message to find the instructions. ![Link
    Subscription](./cd/link-subscription.png)
11. Select the subscription and create a new resource group for this
    assignment:

    .. figure:: ./cd/link-subscription2.png
        :alt: Link Subscription

        Link Subscription

12. Switch back to the B2C directory
13. Create an App Registration:

    -   Name: Bifravst Web App
    -   Redirect URI (make sure to select SPA):
        :code:`https://bifravstprodapp.z16.web.core.windows.net/`
        (instead of :code:`bifravstprodapp` you need to pick
        something else that fits your project because this name is
        globally unique)

        .. figure:: ./cd/create-app-registration.png
            :alt: Create App Registration settings

            Create App Registration settings

14. In *Expose an API* set the *Application ID URI* to
    :code:`api`
15. Click *+ Add a scope* and create a new scope:

    -   Scope name: :code:`bifravst.admin`
    -   Admin consent display name: Admin Access to the Bifravst API
    -   Admin consent description: Allows admin access to all resources
        exposed through the Bifravst API

16. In *API permissions* click *+ Add a permission* and under
    *My APIs* select the app registration
17. Enable the :code:`bifravst.admin` permission and click *Add permission*
18. Click *Grant admin consent for <your main directory>* 

    .. figure:: ./cd/add-scope.png
        :alt: Add Scope

        Add Scope

19. store the *application (client) id* and the *Directory (tenant) ID* 
    of the created Active Directory B2C App registration:

    .. code-block::

        export APP_REG_CLIENT_ID=<application (client) id>

20. Enable the implicit grant flow for *Access tokens* and 
    *ID tokens* and click *Save*:

    .. figure:: ./cd/implicit-grant.png
        :alt: Enable implicit grant flow

        Enable implicit grant flow

21. store the subdomain name used in the Redirect URI:

        .. code-block:: bash

            export APP_NAME=bifravstprodapp

22. Create the *Sign up and sign [in* user flow for local users, and
    name it :code:`signup_signin`
    (`Reference <https://docs.microsoft.com/en-us/azure/active-directory-b2c/tutorial-create-user-flows>`_).
23. Switch back to the main directory
24. Find the Bifravst Azure Function App
25. Select *Authentication / Authorization*
26. Select *Log in with Azure Active Directory* for
    *Action to take when request is not authenticated*
27. Click *Azure Active Directory* and configure the authentication
    using the *Advanced Management mode*:

    -   Client ID: :code:`$APP_REG_CLIENT_ID`
    -   Issuer URL: :code:`https://${B2C_TENANT}.b2clogin.com/${B2C_TENANT}.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1_signup_signin`
      
        .. figure:: ./cd/function-app-settings.png
            :alt: Function App Settings

            Function App Settings

Acquire credentials for the CI runner
================================================================================

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

Fork the
`Bifravst Azure project <https://github.com/bifravst/azure/settings/secrets/new>`_
and add these secrets.

-   :code:`AZURE_CREDENTIALS`: store the contents of the JSON file created above
-   :code:`APP_REG_CLIENT_ID`: the *application (client) id* of the created Active Directory B2C App registration
-   :code:`B2C_TENANT`: the *initial domain name* of the created Active Directory B2C

Now trigger a deploy.

You can now `create device credentials <./DeviceCredentials.html>`_ for
this environment.
