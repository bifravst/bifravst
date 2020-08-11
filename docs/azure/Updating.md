# Updating an existing installation

If you already have an installation and you want to update to the latest
release, follow these steps.

    git pull
    npm ci
    npx tsc
    az deployment group create \
        --resource-group $APP_NAME \
        --mode Complete \
        --name $APP_NAME \
        --template-file azuredeploy.json \
        --parameters \
            appName=$APP_NAME \
            location=$LOCATION \
            appRegistrationClientId=$APP_REG_CLIENT_ID \
            b2cTenant=$B2C_TENANT
    func azure functionapp publish ${APP_NAME}API --typescript

Docker variant

    docker run --rm -v ${PWD}:/workdir -v ${HOME}/.azure:/root/.azure bifravst/azure-dev:latest \
        func azure functionapp publish ${APP_NAME}API --typescript

_Tip:_ You can verify the validity of a template using

    az deployment group validate \
        --resource-group $APP_NAME \
        --mode Complete \
        --name $APP_NAME \
        --template-file azuredeploy.json \
        --parameters \
            appName=$APP_NAME \
            location=$LOCATION \
            appRegistrationClientId=$APP_REG_CLIENT_ID \
            b2cTenant=$B2C_TENANT

If this throws an error, you can find the detailed log message using

    az monitor activity-log list --correlation-id <tracking id> | jq '.[].properties.statusMessage | fromjson'
