# Continuous Integration

> _Note:_ This is an advanced topic for those who want to further develop and
> customize Bifravst according to their needs. Please see the
> [GitHub project page](https://github.com/bifravst/azure/) of Bifravst for
> Azure which implements the process outlined here.

> _Warning:_ Compared to the
> [AWS continuous integration setup](../aws/ContinuousIntegration.md) getting it
> to work on Azure is immensely more complicated and involves many manual steps,
> which unfortunately cannot be automated. If you know how to make the whole
> set-up process simpler,
> [please provide your input here!](https://github.com/bifravst/azure/issues/1)

## Prepare your Azure Account

### Create a new tenant (Azure Active Directory)

In order to separate the CI test runs from the production resources, go to the
[Azure Portal](https://portal.azure.com/) and create a new Azure Active
Directory tenant:

- Organization name: `Bifravst (CI)`
- Initial domain name: `bifravstci` (since this is globally unique customize
  this)
- Country: pick your preferred country

After submitting, it will take a few minutes for the tenant to be created.

Note down the initial domain name you used:

    export TENANT_DOMAIN=<Primary domain> # e.g. "bifravstci"

Note down the Tenant ID which you can find in the Active Directory blade:

    export TENANT_ID=<Tenant ID> # e.g. "9a81f8ed-f7a5-408d-8d4f-af3d46cb83d3"

### Create subscription

Go to the Subscriptions blade and create a new subscription for the CI tenant,
this will make identifying costs for this purpose easier.

After the subscription has been created, change its directory to the one created
above.

Note down the Subscription ID which you can find in the Subscriptions blade:

    export SUBSCRIPTION_ID=<Subscription ID> # e.g. "1aae311f-12d6-419e-8c6b-ebcf3ec4ed15"

### Create another new tenant (Azure Active Directory B2C)

Create a new Azure Active Directory B2C tenant, which is used as the identity
management solution for the user accounts of the Bifravst instance.

Follow
[this guide](https://docs.microsoft.com/en-us/azure/active-directory-b2c/tutorial-create-tenant)
to create a new Azure AD B2C tenant:

- Organization name: `Bifravst (CI) Users`
- Initial domain name: `bifravstciusers` (since this is globally unique
  customize this)
- Country: pick your preferred country

Note down the initial domain name you used:

    export B2C_TENANT=<Primary domain> # e.g. "bifravstciusers"

Link this Azure AD B2C tenant to the subscription for CI by following
[this guide](https://docs.microsoft.com/en-us/azure/active-directory-b2c/billing#link-an-azure-ad-b2c-tenant-to-a-subscription).

## Create Azure Active Directory B2C application

Follow the steps in the [Continous Deployment](./ContinuousDeployment.md)
instructions to create a new App registration.

- Name: Bifravst Web App
- Redirect URI (make sure to select SPA):
  `https://bifravstciapp.z16.web.core.windows.net/` (instead of `bifravstciapp`
  you need to pick something else that fits your project because this name is
  globally unique)

Note down the _Application (client) ID_ and the _Directory (tenant) ID_ of the
created Active Directory B2C App registration:

```
export APP_REG_CLIENT_ID=<application (client) id>
export B2C_TENANT_ID=<Directory (tenant) ID>
```

For the test-runner to be able to programmatically log-in users, the resource
owner password credentials (ROPC) flow
[needs to be enabled](https://docs.microsoft.com/EN-US/azure/active-directory-b2c/configure-ropc?tabs=app-reg-ga)
with these settings:

- Name: `B2C_1_developer`
- Application claims: select _Show more ..._ and then mark `Email Addresses` as
  a return claim

Add the permission to manager user accounts (Microsoft Graph >
`User.ReadWrite.All`) and grant admin consent.

In Authentication allow the Implicit grant for Access and ID tokens and select
_Yes_ for _Treat application as a public client._

Create a new client secret for the App registration and note it down as

    export B2C_CLIENT_SECRET=<Client Secret Value> # e.g. "12OzW72ie-U.vlmzik-eO5gX.x26jLTI6U"

## Deploy the solution

Now drop into a shell and login:

    az login

Make sure you have enabled the right subscription:

    az account set --subscription $SUBSCRIPTION_ID
    # Verify that it is set to default
    az account list --output table

Enable required resources

    az provider register --namespace Microsoft.AzureActiveDirectory
    az provider register --namespace Microsoft.Storage
    az provider register --namespace Microsoft.Insights
    az provider register --namespace Microsoft.SignalRService
    az provider register --namespace Microsoft.DocumentDB
    az provider register --namespace Microsoft.Devices
    az provider register --namespace Microsoft.Web

Now create the CI credentials:

    az ad sp create-for-rbac --name https://github.com/ --role Contributor --sdk-auth --scopes /subscriptions/${SUBSCRIPTION_ID} > ci-credentials.json

Create a resource group for Bifravst

    # Change to your liking
    export RESOURCE_GROUP_NAME=bifravst
    # Use "az account list-locations -o table" to list all locations
    export LOCATION=northeurope

    az group create --name $RESOURCE_GROUP_NAME --location $LOCATION

Deploy the resources:

    # Change to your liking
    export APP_NAME=bifravst

    az deployment group create \
    --resource-group $RESOURCE_GROUP_NAME \
    --mode Complete \
    --template-file azuredeploy.json \
    --parameters \
      appName=$APP_NAME \
      location=$LOCATION \
      appRegistrationClientId=$APP_REG_CLIENT_ID \
      tenantId=$TENANT_ID \
      b2cTenant=$B2C_TENANT \
      b2cFlowName=B2C_1_developer

Publish the functions:

    func azure functionapp publish ${APP_NAME}API --typescript

Docker variant for publishing the functions (in case you get a
`Permission denied.` error):

    docker run --rm -v ${PWD}:/workdir -v ${HOME}/.azure:/root/.azure bifravst/azure-dev:latest \
        func azure functionapp publish ${APP_NAME}API --typescript

## Run end-to-end tests manually

    export API_ENDPOINT=https://`az functionapp show -g ${RESOURCE_GROUP_NAME} -n ${APP_NAME}api --query 'defaultHostName' --output tsv | tr -d '\n'`/

    npm ci
    npm run test:e2e

## Configure GitHub Actions

Configure these environment variables with the values you noted down earlier:

- `APP_REG_CLIENT_ID`
- `AZURE_CREDENTIALS`
- `B2C_CLIENT_SECRET`
- `B2C_TENANT_ID`
