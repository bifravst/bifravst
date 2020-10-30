================================================================================
Running the app locally with Docker
================================================================================

In case your system has a different Node.js version you can run the app
locally \[\_in a Docker
[container]()\](<https://hub.docker.com/r/bifravst/azure-dev>).

Export the IotHub connection string, the Avatar storage environment
variables (can be found in the function app\'s configuration) to the
environment variables
[IOT_HUB_CONNECTION_STRING]{.title-ref},\`AVATAR_STORAGE_ACCOUNT_NAME\`,
[AVATAR_STORAGE_ACCESS_KEY]{.title-ref},\`FOTA_STORAGE_ACCOUNT_NAME\`,
[FOTA_STORAGE_ACCESS_KEY]{.title-ref},
[HISTORICAL_DATA_COSMOSDB_CONNECTION_STRING]{.title-ref}.

Make sure to include these settings in your \`local.settings.json\`:

`` `json {   "IsEncrypted": false,   "Values": {     "IoTHubEventHubCompatibleConnectionString": "...",     "AzureWebJobsStorage": "...",     "IoTHubEventHubName": "...",     "SignalRConnectionString": "..."   },   "Host": {     "CORS": "*",     "CORSCredentials": false   } } ``\`

Run this command to list the environment variables of the function app.
Export them.

    az functionapp config appsettings list \--resource-group
    \${RESOURCE_GROUP_NAME:-bifravst} \--name \${APP_NAME:-bifravst}API \|
    jq -r \'.\[\] \| .name+\"=\"\"+.value+\"\"\"\'

Run the functions app:

    docker run \--rm \--net=host -P -e IOT_HUB_CONNECTION_STRING -e
    AVATAR_STORAGE_ACCOUNT_NAME -e AVATAR_STORAGE_ACCESS_KEY -e
    FOTA_STORAGE_ACCOUNT_NAME -e FOTA_STORAGE_ACCESS_KEY -e
    HISTORICAL_DATA_COSMOSDB_CONNECTION_STRING -v \${PWD}:/workdir
    bifravst/azure-dev:latest func start \--typescript

You can then use [http://localhost:7071/]{.title-ref} as your
[REACT_APP_AZURE_API_ENDPOINT]{.title-ref} for the app.
