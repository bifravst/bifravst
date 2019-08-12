# Device Credentials

On AWS IoT devices connect to IoT core using
[TLS version 1.2](https://docs.aws.amazon.com/iot/latest/developerguide/iot-security-identity.html).

It is recommended to
[use your own Certificate Authority (CA)](https://docs.aws.amazon.com/iot/latest/developerguide/device-certs-your-own.html)
to create certificates for your devices.

## Generate a CA certificate

> **Note:** Creating the CA certificate is a **one-time operation**. If you have
> a directory called `certificates` with a `rootCA.pem` in it, you already did
> this step.

Run the script to generate and register a CA certificate in your AWS account:

    node cli register-ca

## Generate a device certificate

Run this script to generate a certificate for a new device:

    node cli generate-cert

## Connect with the device

### Using the simulator

Run this script to connect to the broker using the previously generated
certificate:

    node cli connect <id of your device>

This script also provides a browser-based UI which you can use to simulate
sensor data.

### Using a real device

In order to connect you also need the
[AWS IoT Root certificate](https://www.amazontrust.com/repository/AmazonRootCA1.pem).

You can use the `certificates/device-<deviceId>.json` file with the _Certificate
Manager_ in the
[nRF Connect for Desktop](https://www.nordicsemi.com/Software-and-Tools/Development-Tools/nRF-Connect-for-desktop)
app _LTE Link Monitor_ to flash certificate onto the device.
