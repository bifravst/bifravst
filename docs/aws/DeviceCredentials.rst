================================================================================
Device Credentials
================================================================================

On AWS devices, connect to IoT core using `TLS version
1.2 <https://docs.aws.amazon.com/iot/latest/developerguide/iot-security-identity.html>`_.

Generate a CA certificate
================================================================================

Note that this action will create a user which can do
everything in the account, therefore it should only be created in an
account dedicated for Bifravst.

    Creating the CA certificate is a **one-time operation**. If
    you have  a directory called :code:`certificates` with a
    :code:`rootCA.pem` file in it, you have already completed this step.

It is recommended to use `your own Certificate Authority
(CA) <https://docs.aws.amazon.com/iot/latest/developerguide/device-certs-your-own.html>`_
to create certificates for your devices since it allows generating
*Device Certificates* offline.

Run the following script to generate and register a CA certificate in your
AWS account:

.. code-block:: bash

    node cli create-ca

Generate a device certificate
================================================================================

Run the following script to generate a certificate for a new device:

.. code-block:: bash

    node cli create-device-cert
