================================================================================
Device Credentials
================================================================================

On Azure devices connect to IoT Hub using \[TLS version
1.2\](<https://docs.microsoft.com/en-us/azure/iot-fundamentals/iot-security-deployment>).

Azure supports offline generation of device certificates through
\[Enrollment
Groups\](<https://docs.microsoft.com/bs-latn-ba/azure/iot-dps/quick-enroll-device-x509-node>).

Device certificates are signed using an intermediate CA. This allows to
keep the CA root certificate secure and create an intermediate CA
certificate to be used during device provisioning. This way the CA root
certificate private key will never be transmitted to insecure locations
(e.g. a third-party factory).

If the intermediate CA certificate is compromised, it can be deactivated
so new devices with credentials signed by the compromised intermediate
CA certificate will no longer be provisioned.

Devices that previously connected to the IoT Hub, will keep working.

Device Provisioning Service (DPS)
================================================================================

Devices connect to IoT Hub using the Device Provisioning Service (DPS).
This allows to better manage roaming devices. However this requires an
extra connection step: first connect to DPS to retrieve the endpoint
configuration, then connect to the IoT Hub endpoint. This is a one-time
op, and the device can cache its associated IoT Hub endpoint.

Create a CA root certificate
================================================================================

.. note::

     Make sure you have exported the right resource group to
name as \    [\$RESOURCE_GROUP_NAME]{.title-ref}, it defaults to
[bifravst]{.title-ref}.

This creates a CA root certificate and registers it with the Azure IoT
Device Provisioning Service.

    node cli create-ca-root

The CA root certificate should not be shared. The number of CA root
certificates is typically very small, one (1) is sufficient.

Proof your ownership of the CA with

    node cli proof-ca-root-possession

.. note::

    if you see the error \_\"A required certificate is not within
its validity \    period when verifying against the current system clock
or the timestamp in the \    signed file.\"\_ double check that your
system\'s clock is correct, if it is set \    to a future time, this will
be the cause of this error.

Create a CA intermediate certificate
================================================================================

This creates a CA intermediate certificate and creates an enrollment
group for it.

    node cli create-ca-intermediate

The CA intermediate certificate is the one to be shared with the
factory. Over time you will have multiple intermediate certificates.

Create a device certificate
================================================================================

Run this script to generate a certificate for a new device:

    node cli create-device-cert

Devices will first connect to the \[Device Provisioning
Service\](<https://docs.microsoft.com/en-us/azure/iot-dps/>) (DPS) using
the certificate and request to be provisioned. The DPS registers the
device on the associated IoT Hub and returns the registration
information to the device, which includes the hostname of the assigned
IoT Hub.

Now the device can terminate the connection to the DPS and initiate a
new connection to the IoT Hub endpoint. The device should store the
registration information so that it can directly connect to the assigned
IoT Hub endpoint the next time it boots.
