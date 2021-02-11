Using pre-build images
######################

You can use the pre-build firmware released on the `Bifravst firmware project page <https://github.com/bifravst/firmware/releases>`_ to connect to your own AWS account **if it is in the same region as our environment** (currently `eu-west-1`).

This works, because the way the AWS IoT MQTT broker handles connections:
When using a *wrong* account endpoint to connect to AWS IoT with a certificate that does not belong to that account endpoint the request will be routed to *correct* account endpoint because AWS can infer the *correct* account from the certificate, which belongs to that account.

.. note::

    This only works when using the default endpoint hostnames.
    If you `configure custom endpoints <https://docs.aws.amazon.com/iot/latest/developerguide/iot-custom-endpoints-configurable.html>`_, it will stop working because the endpoints certificate will no longer match.