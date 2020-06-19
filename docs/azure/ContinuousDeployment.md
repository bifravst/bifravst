# Continuous Deployment

    export LOCATION=northeurope
    export RESOURCE_GROUP_NAME=bifravstcd
    # APP_NAME (must be unique, so pick something different)
    export APP_NAME=bifravstcd

Continuous Deployment should be installed in a dedicated subscription, to have
clear control over permissions and costs.

Go to the _Subscriptions_ blade, and add a new subscription for Bifravst and
name it _Bifravst CD_, copy the subscript id:

    export SUBSCRIPTION_ID=0aef5c04-9e9c-4275-9ccf-e719842d082d

Create a new resource group:

    SCOPE=`az group create --subscription $SUBSCRIPTION_ID --name $RESOURCE_GROUP_NAME --location $LOCATION --query 'id'`

It should also have it's own directory.

    az provider register --subscription $SUBSCRIPTION_ID --namespace Microsoft.AzureActiveDirectory
    az provider register --subscription $SUBSCRIPTION_ID --namespace Microsoft.Storage
    az provider register --subscription $SUBSCRIPTION_ID --namespace Microsoft.Insights
    az provider register --subscription $SUBSCRIPTION_ID --namespace Microsoft.SignalRService
    az provider register --subscription $SUBSCRIPTION_ID --namespace Microsoft.DocumentDB
    az provider register --subscription $SUBSCRIPTION_ID --namespace Microsoft.Devices
    az provider register --subscription $SUBSCRIPTION_ID --namespace Microsoft.Web

Then, go to the _Azure Active Directory_ blade and create a new tenant, and
select _Azure Active Directory (B2C)_ as the type. Click _Next: Configure_ and
use these settings:

- Organization name: Bifravst CD
- Initial domain name: `$APP_NAME`
- Country/Region: Sweden
- Subscription: Bifravst CD
- Resource group: bifravst

![Create Directory settings](./cd/create-directory.png)

It will take a while to be created.

Switch to the created directory, and create an App Registration. Use
`https://${APP_NAME}.azurewebsites.net/` as the redirect URLs (replace ).

![Create App Registration settings](./cd/create-app-registration.png)

Store the _application (client) id_ of the created Active Directory B2C App
registration in the secret `APP_REG_CLIENT_ID`.

Now create the CI credentials:

    az ad sp create-for-rbac --name $RESOURCE_GROUP_NAME --role Contributor --scopes $SCOPE --sdk-auth > ci-credentials.json

Fork the
[Bifravst Azure project](https://github.com/bifravst/azure/settings/secrets/new)
and add these secrets.

- `APP_REG_CLIENT_ID`: store the _application (client) id_ of the created Active
  Directory B2C App registration
- `AZURE_CREDENTIALS`: store the contents of the JSON file created above
