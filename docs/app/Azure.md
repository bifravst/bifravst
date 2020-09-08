# Deploying to Azure

> **Note:** first make sure you have
> [set up the necessary Azure resources](../azure/GettingStarted.md).

## Configure the react app

The app needs to be configured to be able to run against your account.

In this section we will create a file called `.env.local` which Create React App
uses to make the settings in there available
[as environment variables during build time](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables).

### Configure ids of your Azure resources

The web app needs to know the ids of the Azure resources that were created
during the set-up of the solution. Run this command in the `bifravst-app`
directory to copy the output to a file called `.env.local`.

    node ../bifravst-azure/cli react-config > .env.local

### Version string

Run this command to provide the version to the app:

    echo REACT_APP_VERSION=`git describe --tags $(git rev-list --tags --max-count=1)` >> .env.local

### Example `.env.local`

This is how the file would look like:

    REACT_APP_CLOUD_FLAVOUR=AZURE
    REACT_APP_AZURE_CLIENT_ID=358162bb-b809-42ef-9b62-22f8fa42b5fb
    REACT_APP_AZURE_AD_B2C_AUTHORITY=https://bifravstprod.b2clogin.com/bifravstprod.onmicrosoft.com/B2C_1_signup_signin
    REACT_APP_AZURE_AD_B2C_TENANT=bifravstprod
    REACT_APP_VERSION=v3.6.1

## Deploy the app

This builds and deploys the app to the Storage Account created when setting up
_Bifravst_ in your Azure account.

    export APP_URL=`az storage account show -g ${RESOURCE_GROUP_NAME} -n ${APP_NAME}app --query 'primaryEndpoints.web' --output tsv | tr -d '\n'`
    export APP_STORAGE_CONNECTION_STRING=`az storage account show-connection-string --name ${APP_NAME}app --query 'connectionString'`
    az storage blob upload-batch --connection-string ${APP_STORAGE_CONNECTION_STRING} --account-name ${APP_NAME}app -s ./app/build -d '$web'
    echo "Done. Now open https://$APP_URL/ to view the web app."

Afterwards you can open the domain name printed in `APP_URL` to view the web
app.

## Registering a user

There are no predefined user accounts in the B2C Active Directory, so you need
to register a new user.
