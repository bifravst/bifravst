================================================================================
Unwired Labs API
================================================================================

.. note::

    This enables the `cell geolocation lookup <../app/CellGeolocation.html>`_
    for the app using the Unwired Labs API.

To use `Unwired Labs`_ geolocation API,
store your API key as an SSM parameter and redeploy the stack:

.. code-block:: bash

    aws ssm put-parameter --name /bifravst/cellGeoLocation/unwiredlabs/apiKey \
        --type String --value "<API Key>"
    npx cdk deploy '*'

This will update the StateMachine which resolves cells from devices to
use the UnwiredLabs API as a resolver.

.. note::

    The Unwired Labs' LocationAPI is free for low volumes,
    however there is `opencellid.org <https://opencellid.org/>`_ which
    allows to use the underlying dataset for free. If this is relevant
    for you, please `vote in this
    issue <https://github.com/bifravst/aws/issues/120>`_.

.. _Unwired Labs: https://unwiredlabs.com/