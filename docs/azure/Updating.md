# Updating an existing installation

If you already have an installation and you want to update to the latest
release, follow these steps.

    git pull
    npm ci
    npx tsc
    az deployment group create --resource-group $APP_NAME --mode Complete --name $APP_NAME --template-file azuredeploy.json \
        --parameters appName=$APP_NAME location=$LOCATION appRegistrationClientId=$APP_REG_CLIENT_ID tenantId=$TENANT_ID
    func azure functionapp publish ${APP_NAME}website --typescript
