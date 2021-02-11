.. _azure-running-app-locally:

Running the application locally with Docker
###########################################

If your system has a different version of Node.js, you can run the application locally in a `Docker container <https://hub.docker.com/r/bifravst/azure-dev>`_.

To run the application locally with Docker, complete the following steps:

1. Export the IoT Hub connection string and the Avatar storage environment variables (located in the configuration of the function app) to the following environment variables:

   * ``IOT_HUB_CONNECTION_STRING``
   * ``AVATAR_STORAGE_ACCOUNT_NAME``
   * ``AVATAR_STORAGE_ACCESS_KEY``
   * ``FOTA_STORAGE_ACCOUNT_NAME``
   * ``FOTA_STORAGE_ACCESS_KEY``
   * ``HISTORICAL_DATA_COSMOSDB_CONNECTION_STRING``

#. Make sure to include the following settings in your :file:`local.settings.json` file:

   .. code-block:: json

       {
           "IsEncrypted": false,
           "Values": {
               "IoTHubEventHubCompatibleConnectionString": "...",
               "AzureWebJobsStorage": "...",
               "IoTHubEventHubName": "...",
               "SignalRConnectionString": "..."
           },
           "Host": {
               "CORS": "*",
               "CORSCredentials": false
           }
       }

#. Run the following command to list the environment variables of the function app and export them:


   .. code-block:: bash

       az functionapp config appsettings list \
           --resource-group ${RESOURCE_GROUP_NAME:-bifravst} \
           --name ${APP_NAME:-bifravst}API | jq -r '.[] | .name + "=\"" + .value + "\""'

#. Run the function app by using the following command:

   .. code-block:: bash

       docker run --rm --net=host -P \
           -e IOT_HUB_CONNECTION_STRING \
           -e AVATAR_STORAGE_ACCOUNT_NAME \
           -e AVATAR_STORAGE_ACCESS_KEY \
           -e FOTA_STORAGE_ACCOUNT_NAME \
           -e FOTA_STORAGE_ACCESS_KEY \
           -e HISTORICAL_DATA_COSMOSDB_CONNECTION_STRING \
           -e UNWIREDLABS_API_KEY \
           -e UNWIREDLABS_API_ENDPOINT \
           -v ${PWD}:/workdir bifravst/azure-dev:latest \
           func start --typescript

You can now use ``http://localhost:7071/`` as your ``REACT_APP_AZURE_API_ENDPOINT`` for the app.
