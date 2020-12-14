.. _unwired_labs_api:

Unwired Labs API
################

You can enable the `cell geolocation lookup <../app/CellGeolocation.html>`_ for the app using `Unwired Labs <https://unwiredlabs.com/>`_ geolocation API in your deployment.

To use `Unwired Labs`_ geolocation API, store your API key as an SSM parameter and re-deploy the stack as shown below:

.. code-block:: bash

    aws ssm put-parameter --name /bifravst/cellGeoLocation/unwiredlabs/apiKey \
        --type String --value "<API Key>"
    npx cdk deploy '*'

This will update the StateMachine, which resolves cells from devices to use the Unwired Labs API as a resolver.

.. note::

   Unwired Lab's LocationAPI is free for low volumes.
   However, `opencellid.org <https://opencellid.org/>`_ allows to use the underlying dataset for free.
   If it is relevant for you, vote in the `Integrate OpenCelliD data <https://github.com/bifravst/aws/issues/120>`_ issue.
