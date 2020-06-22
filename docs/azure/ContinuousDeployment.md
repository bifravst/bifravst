# Continuous Deployment

    export LOCATION=northeurope
    export RESOURCE_GROUP_NAME=bifravst
    # APP_NAME (must be unique, so pick something different)
    export APP_NAME=bifravstcd

Continuous Deployment should be installed in a dedicated directory with a
dedicated subscription to have clear control over permissions and costs.

Go to the _Azure Active Directory_ blade and create a new tenant, and select
_Azure Active Directory (B2C)_ as the type. Click _Next: Configure_ and use
these settings:

- Organization name: Bifravst CD
- Initial domain name: `$APP_NAME`
- Country/Region: Sweden
- Subscription: Bifravst CD
- Resource group: bifravst

![Create Directory settings](./cd/create-directory.png)

It will take a while to be created.

Switch to the newly created directory.

Go to the _Subscriptions_ blade and add a new subscription for Bifravst and name
it _Bifravst CD_, copy the subscription id:

    export SUBSCRIPTION_ID=<subscription id>

Find the newly created subscription and select _Change directory_ and assign it
to the directory you created above.

Then, go to the _Azure Active Directory_ blade and create a new tenant, and
select _Azure Active Directory (B2C)_ as the type. Click _Next: Configure_ and
use these settings:

Re-login to make the new subscription available:

    az login

Create a new resource group:

    az group create --subscription $SUBSCRIPTION_ID --name $RESOURCE_GROUP_NAME --location $LOCATION

Enable required resources

    az provider register --subscription $SUBSCRIPTION_ID --namespace Microsoft.AzureActiveDirectory
    az provider register --subscription $SUBSCRIPTION_ID --namespace Microsoft.Storage
    az provider register --subscription $SUBSCRIPTION_ID --namespace Microsoft.Insights
    az provider register --subscription $SUBSCRIPTION_ID --namespace Microsoft.SignalRService
    az provider register --subscription $SUBSCRIPTION_ID --namespace Microsoft.DocumentDB
    az provider register --subscription $SUBSCRIPTION_ID --namespace Microsoft.Devices
    az provider register --subscription $SUBSCRIPTION_ID --namespace Microsoft.Web

Switch to the created directory, and create an App Registration. Use
`https://${RESOURCE_GROUP_NAME}.azurewebsites.net/` as the redirect URLs
(replace ).

![Create App Registration settings](./cd/create-app-registration.png)

Store the _application (client) id_ of the created Active Directory B2C App
registration in the secret `APP_REG_CLIENT_ID`.

Now create the CI credentials:

    az ad sp create-for-rbac --name GitHub --role Contributor --sdk-auth --scopes /subscriptions/${SUBSCRIPTION_ID} > ci-credentials.json

Fork the
[Bifravst Azure project](https://github.com/bifravst/azure/settings/secrets/new)
and add these secrets.

- `APP_REG_CLIENT_ID`: store the _application (client) id_ of the created Active
  Directory B2C App registration
- `AZURE_CREDENTIALS`: store the contents of the JSON file created above
