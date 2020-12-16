.. _device_cred:

Device credentials
##################

On AWS devices, you can connect to IoT core using `TLS version 1.2 <https://docs.aws.amazon.com/iot/latest/developerguide/iot-security-identity.html>`_ and `Elliptic Curve Cryptography (ECC) based certificates <https://aws.amazon.com/blogs/iot/elliptic-curve-cryptography-and-forward-secrecy-support-in-aws-iot-3/>`_.

For creating device credentials, you have to generate the following certificates:

* CA certificate
* Device certificate

Generate a CA certificate
*************************

Creating the CA certificate is a *one-time* operation.
If you have a directory called :file:`certificates` with a :file:`rootCA.pem` file in it, you have already completed this step.

.. note::

   Note that this action will create a user with full access rights to the account, and therefore it must be created only in an account dedicated for *Bifravst*.

It is recommended to use your `own Certificate Authority (CA) <https://docs.aws.amazon.com/iot/latest/developerguide/device-certs-your-own.html>`_ to create certificates for your devices since it allows generating *device certificates* offline.

Run the following script to generate and register a CA certificate in your AWS account:

.. code-block:: bash

    node cli create-ca

.. create_dev_cert:

Generate a device certificate
*****************************

Run the following script to generate a certificate for a new device:

.. code-block:: bash

    node cli create-device-cert
