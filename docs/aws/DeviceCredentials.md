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
