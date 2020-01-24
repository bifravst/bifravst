# Updating an existing installation

If you already have an installation and you want to update to the latest
release, follow these steps.

    git pull
    npm ci
    npx tsc
    az group deployment create --resource-group bifravst --mode Complete --name bifravst --template-file azuredeploy.json \
        --parameters appName=bifravst location=$LOCATION appRegistrationClientId=$APP_REG_CLIENT_ID tenantId=$TENANT_ID
    func azure functionapp publish bifravstWebsite
