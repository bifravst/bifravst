================================================================================
Continuous Deployment
================================================================================

Continuous Deployment should be deployed with a dedicated subscription
to have clear control over permissions and costs.

Create a subscription for Bifravst
================================================================================

1.  Go to the \_[Subscriptions]() blade and add a new subscription for
    Bifravst and name it \_Bifravst [CD]().
2.  After the subscription has been created navigate again to the
    \_[Subscriptions]() blade and copy the subscription id of the newly
    created subscription:

`` ` export SUBSCRIPTION_ID=<subscription id    ``\`

Create an Azure Active Directory B2C
================================================================================

.. note::

     This \> \[can currently only be achieved through the
CLI\](<https://github.com/bifravst/azure/issues/1>). \    If you know how
to make the whole set-up process simpler, \    \[please provide your input
here!\](<https://github.com/bifravst/azure/issues/1>)

4.  Go to the \_[Marketplace]() blade and search for \_Azure Active
    Directory [B2C]().
5.  Click the \_Azure Active Directory [B2C]() tile, and on then click
    the \_[Create]() button.
6.  Select \_Create a new Azure AD B2C Tenant.\_
7.  Use these settings:
    -   Organization name: \_Bifravst (Production)\_
    -   Initial domain name: [bifravstprod]{.title-ref} (you need to
        pick something else that fits your project because this name is
        globally unique)
    -   Country/Region: Sweden (or pick a location that is closer to
        you) !\[Create Directory settings\](./cd/create-directory.png)
8.  Click \_Next: Review + [create]() to see the summary and then click
    \_[Create]() to create the new Active Directory B2C. It will take a
    while to be created.
9.  Copy the initial domain name:

`` ` export B2C_TENANT=bifravstprod ``\`

10. Switch to the newly created directory, by following the link in the
    success message.
11. You need to link a Subscription to the B2C Directory, follow the
    link in the notification message to find the instructions. !\[Link
    Subscription\](./cd/link-subscription.png)
12. Select the subscription and create a new resource group for this
    assignment: !\[Link Subscription\](./cd/link-subscription2.png)
13. Switch back to the B2C directory
14. Create an App Registration:
    -   Name: Bifravst Web App
    -   Redirect URI (make sure to select SPA):
        [https://bifravstprodapp.z16.web.core.windows.net/]{.title-ref}
        (instead of [bifravstprodapp]{.title-ref} you need to pick
        something else that fits your project because this name is
        globally unique) !\[Create App Registration
        settings\](./cd/create-app-registration.png)
15. In \_Expose an [API]() set the \_Application ID [URI]() to
    [api]{.title-ref}
16. Click \_+ Add a [scope]() and create a new scope:
    -   Scope name: [bifravst.admin]{.title-ref}
    -   Admin consent display name: Admin Access to the Bifravst API
    -   Admin consent description: Allows admin access to all resources
        exposed through the Bifravst API
17. In \_API [permissions]() click \_+ Add a [permission]() and under
    \_My [APIs]() select the app registration
18. Enable the [bifravst.admin]{.title-ref} permission and click \_Add
    [permission]()
19. Click \_Grant admin consent for &lt;your main directory&gt;\_ !\[Add
    Scope\](./cd/add-scope.png)
20. store the \_application (client) [id]() and the \_Directory (tenant)
    [ID]() of the created Active Directory B2C App registration:

`` ` export APP_REG_CLIENT_ID=<application (client) id    ``\`

21. Enable the implicit grant flow for \_Access [tokens]() and \_ID
    [tokens]() and click \_[Save](): !\[Enable implicit grant
    flow\](./cd/implicit-grant.png)
22. store the subdomain name used in the Redirect URI:

`` ` export APP_NAME=bifravstprodapp ``\`

23. Create the \_Sign up and sign [in]() user flow for local users, and
    name it [signup_signin]{.title-ref}
    (`Reference <https://docs.microsoft.com/en-us/azure/active-directory-b2c/tutorial-create-user-flows>`_).
24. Switch back to the main directory
25. Find the Bifravst Azure Function App
26. Select \_Authentication / [Authorization]()
27. Select \_Log in with Azure Active [Directory]() for \_Action to take
    when request is not [authenticated]()
28. Click \_Azure Active [Directory]() and configure the authentication
    using the \_Advanced Management [mode]():
    -   Client ID: [\$APP_REG_CLIENT_ID]{.title-ref}
    -   Issuer URL:
        [https://\${B2C_TENANT}.b2clogin.com/\${B2C_TENANT}.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1\_signup_signin]{.title-ref}
        !\[Function App Settings\](./cd/function-app-settings.png)

\-\--

Now drop into a shell and login:

    az login

Make sure you have enabled the right subscription:

    az account set \--subscription \$SUBSCRIPTION_ID ================================================================================
Verify that it is
================================================================================
    set to default az account list \--output table

Enable required resources

    az provider register \--namespace Microsoft.AzureActiveDirectory az
    provider register \--namespace Microsoft.Storage az provider register
    \--namespace Microsoft.Insights az provider register \--namespace
    Microsoft.SignalRService az provider register \--namespace
    Microsoft.DocumentDB az provider register \--namespace
    Microsoft.Devices az provider register \--namespace Microsoft.Web

Now create the CI credentials:

    az ad sp create-for-rbac \--name <https://github.com/> \--role
    Contributor \--sdk-auth \--scopes /subscriptions/\${SUBSCRIPTION_ID}
    \> ci-credentials.json

Create a resource group for Bifravst

    az group create \--name \${RESOURCE_GROUP_NAME:-bifravst} \--location
    \${LOCATION:-northeurope}

Fork the \[Bifravst Azure
project\](<https://github.com/bifravst/azure/settings/secrets/new>) and
add these secrets.

-   \`AZURE_CREDENTIALS\`: store the contents of the JSON file created
    above
-   \`APP_REG_CLIENT_ID\`: the \_application (client) [id]() of the
    created Active Directory B2C App registration
-   \`B2C_TENANT\`: the \_initial domain [name]() of the created Active
    Directory B2C

Now trigger a deploy.

You can now \[create device credentials\](./DeviceCredentials.md) for
this environment.
