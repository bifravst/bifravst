.. _azure-upgrade-installation:

Upgrading an existing installation
##################################

If you already have an installation and you want to upgrade to the latest release, perform the following steps:

.. code-block:: bash

    git pull
    npm ci
    npx tsc
    az deployment group create \
        --resource-group ${APP_NAME:-bifravst} \
        --mode Complete \
        --name cli-`uuidgen` \
        --template-file azuredeploy.json \
        --parameters \
            appName=${APP_NAME:-bifravst} \
            location=${LOCATION:-northeurope} \
            appRegistrationClientId=$APP_REG_CLIENT_ID \
            b2cTenant=${B2C_TENANT:-bifravst}
    func azure functionapp publish ${APP_NAME:-bifravst}API --typescript

Docker variant (in case you get a ``Permission denied.`` error):

.. code-block:: bash

    docker run --rm -v ${PWD}:/workdir -v ${HOME}/.azure:/root/.azure bifravst/azure-dev:latest \
        func azure functionapp publish ${APP_NAME:-bifravst}API --typescript

.. tip::

   You can verify the validity of a template using the following command:

   .. code-block:: bash

       az deployment group validate \
           --resource-group ${APP_NAME:-bifravst} \
           --mode Complete \
           --name ${APP_NAME:-bifravst} \
           --template-file azuredeploy.json \
           --parameters \
               appName=${APP_NAME:-bifravst} \
               location=${LOCATION:-northeurope} \
               appRegistrationClientId=$APP_REG_CLIENT_ID \
               b2cTenant=${B2C_TENANT:-bifravst}

If the command throws an error, you can find the detailed log message using the following command:

.. code-block:: bash

    az monitor activity-log list --correlation-id "<tracking id>" | jq '.[].properties.statusMessage | fromjson'
