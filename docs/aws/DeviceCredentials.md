# Device Credentials

On AWS devices, connect to IoT core using
[TLS version 1.2](https://docs.aws.amazon.com/iot/latest/developerguide/iot-security-identity.html)..

## Generate a CA certificate

> **Note:** Creating the CA certificate is a **one-time operation**. If you have
> a directory called `certificates` with a `rootCA.pem` file in it, you have
> already completed this step.

It is recommended to use
[your own Certificate Authority (CA)](https://docs.aws.amazon.com/iot/latest/developerguide/device-certs-your-own.html)
to create certificates for your devices since it allows generating _Device
Certificates_ offline.

Run the following script to generate and register a CA certificate in your
AWS account:

    node cli create-ca

## Generate a device certificate

Run the following script to generate a certificate for a new device:

    node cli create-device-cert
