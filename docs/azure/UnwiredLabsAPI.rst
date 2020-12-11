================================================================================
Unwired Labs API
================================================================================

.. note::

    This enables the `cell geolocation lookup <../app/CellGeolocation.html>`_
    for the app using the Unwired Labs API.

To use `Unwired Labs`_ geolocation API, provide the :code:`unwiredlabsApiKey`
parameter when deploying the solution:

.. code-block:: bash

    az deployment group create --resource-group ${APP_NAME:-bifravst} \
        --mode Complete --name ${APP_NAME:-bifravst} \
        --template-file azuredeploy.json \
        --parameters \
            appName=${APP_NAME:-bifravst} \
            location=$LOCATION appRegistrationClientId=$APP_REG_CLIENT_ID \
            b2cTenant=$B2C_TENANT \
            unwiredlabsApiKey="<your API key>"

This will enable the `geolocateCellFromUnwiredLabs` function to resolve cells,
otherwise this function will return a status :code:`402` on the API route
:code:`cellgeolocation/unwired`.

.. note::

    The Unwired Labs' LocationAPI is free for low volumes,
    however there is `opencellid.org <https://opencellid.org/>`_ which
    allows to use the underlying dataset for free. If this is relevant
    for you, please `vote in this
    issue <https://github.com/bifravst/azure/issues/403>`_.

.. _Unwired Labs: https://unwiredlabs.com/