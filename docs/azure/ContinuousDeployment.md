# Continuous Deployment

Continuous Deployment should be installed in a dedicated directory with a
dedicated subscription to have clear control over permissions and costs.

1.  Go to the _Subscriptions_ blade and add a new subscription for Bifravst and
    name it _Bifravst CD_.
1.  After the subscription has been created navigate again to the
    _Subscriptions_ blade and copy the subscription id of the newly created
    subscription:

```
export SUBSCRIPTION_ID=<subscription id>
```

3.  Go to the _Marketplace_ blade and search for _Azure Active Directory B2C_.
1.  Click the _Azure Active Directory B2C_ tile, and on then click the _Create_
    button.
1.  Select _Create a new Azure AD B2C Tenant._
1.  Use these settings:
    - Organization name: _Bifravst CD_
    - Initial domain name: `$APP_NAME` (in this example we will use
      `bifravstcd`, but you should pick something that fits your project)
    - Country/Region: Sweden (or pick a location that is closer to you)
    - Subscription: Bifravst CD
    - Resource group: bifravst
      ![Create Directory settings](./cd/create-directory.png)
1.  Click _next_ to see the summary and then click _Create_ to create the new
    Active Directory B2C. It will take a while to be created.
1.  Switch to the newly created directory, by following the link in the success
    message.
1.  Create an App Registration. Use `https://${APP_NAME}.azurewebsites.net/` as
    the redirect URLs.
    ![Create App Registration settings](./cd/create-app-registration.png)
1.  store the _application (client) id_ of the created Active Directory B2C App
    registration

```
export APP_REG_CLIENT_ID=<application (client) id>
```

---

Now drop into a shell and login:

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

Now create the CI credentials:

    az ad sp create-for-rbac --name GitHub --role Contributor --sdk-auth --scopes /subscriptions/${SUBSCRIPTION_ID} > ci-credentials.json

Fork the
[Bifravst Azure project](https://github.com/bifravst/azure/settings/secrets/new)
and add these secrets.

- `AZURE_CREDENTIALS`: store the contents of the JSON file created above
- `APP_REG_CLIENT_ID`: the _application (client) id_ of the created Active
  Directory B2C App registration
- `SUBSCRIPTION_ID`: the ID of the subscription
