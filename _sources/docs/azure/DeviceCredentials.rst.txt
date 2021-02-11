.. _azure-device-credentials:

Device credentials
##################

On Azure devices, connect to IoT Hub using `TLS version 1.2 <https://docs.microsoft.com/en-us/azure/iot-fundamentals/iot-security-deployment>`_ and Elliptic Curve Cryptography (ECC) based certificates.

Azure supports offline generation of device certificates through `Enrollment Groups <https://docs.microsoft.com/bs-latn-ba/azure/iot-dps/quick-enroll-device-x509-node>`_.

Device certificates are signed by using an intermediate CA.
Following are the advantages of using an intermediate CA:

* The CA root certificate remains secure since an intermediate CA certificate is created for use during device provisioning.
* The CA root certificate private key will never be transmitted to insecure locations (for example, a third-party factory).

If the intermediate CA certificate is compromised, it can be deactivated.
New devices with credentials signed by the compromised intermediate CA certificate will no longer be provisioned.

Devices that previously connected to the IoT Hub, will continue to work.

Device Provisioning Service
***************************

Devices connect to IoT Hub using the `Device Provisioning Service (DPS) <https://docs.microsoft.com/en-us/azure/iot-dps/>`_.
DPS allows better management of roaming devices.
However, it requires an extra connection step.
Following are the overall connection steps:

* Connect to DPS to retrieve the endpoint configuration
* Connect to the IoT Hub endpoint.

This is a one-time operation, and the device can cache its associated IoT Hub endpoint.

Creating device credentials
***************************

For creating device credentials, you must generate the following certificates:

* CA root certificate
* CA intermediate certificate
* Device certificate

Create a CA root certificate
============================

.. note::

   Make sure that you have exported the right resource group name as ``$RESOURCE_GROUP_NAME``.
   By default, it is set to ``bifravst``.

To create a CA root certificate and register it with the Azure IoT Device Provisioning Service, run the following command:

.. code-block:: bash

    node cli create-ca-root

The CA root certificate should not be shared.
The number of CA root certificates is typically very small, and the minimum number of certificates required is one.

Provide the proof your ownership of the CA with the following command:

.. code-block:: bash

    node cli proof-ca-root-possession

.. note::

    If you see the error *"A required certificate is not within its validity period when verifying against the current system clock or the timestamp in the signed file."*, confirm that your system clock is accurate.

Create a CA intermediate certificate
====================================

To creates a CA intermediate certificate and an enrollment group for it, run the following command:

.. code-block:: bash

    node cli create-ca-intermediate

You can share the CA intermediate certificate with the factory.
Over time, you will have multiple intermediate certificates.

Create a device certificate
===========================

Run the following script to generate a certificate for a new device:

.. code-block:: bash

    node cli create-device-cert

A device will initially connect to DPS using the certificate and place a request to be provisioned.
The DPS registers the device on the associated IoT Hub and returns the registration information to the device, which includes the hostname of the assigned IoT Hub.

The device then terminates the connection to the DPS and initiate a new connection to the IoT Hub endpoint.
The device should store the registration information so that it can directly connect to the assigned IoT Hub endpoint when the device boots up next time.
