.. _aws-unwired-labs-api:

Unwired Labs API
################

You can enable the :ref:`cell geolocation lookup <app-cellgeolocation>` for the application using `Unwired Labs' <https://unwiredlabs.com/>`_ geolocation API in your deployment.

To use Unwired Labs' geolocation API, store your API key as an SSM parameter and re-deploy the stack as shown:

.. code-block:: bash

    aws ssm put-parameter --name /cat-tracker/cellGeoLocation/unwiredlabs/apiKey \
        --type String --value "<API Key>"
    npx cdk deploy '*'

This will update the StateMachine, which resolves cells from devices to use the Unwired Labs' API as a resolver.

.. note::

   Unwired Labs' LocationAPI is free for low volumes.
   However, `opencellid.org <https://opencellid.org/>`_ allows to use the underlying dataset for free.
   If you find it relevant, vote in the `Integrate OpenCelliD data <https://github.com/bifravst/aws/issues/120>`_ issue.
