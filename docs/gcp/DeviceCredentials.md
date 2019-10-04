# Device Credentials

On GCP devices connect to IoT core using
[TLS version 1.2](https://cloud.google.com/iot/docs/concepts/device-security).

In contrast to AWS IoT Core, GCP IoT does not support custom CAs

Like with AWS IoT Core
[use of your own Certificate Authority (CA) is possible](https://cloud.google.com/iot/docs/how-tos/credentials/verifying-credentials)
to create keys for your devices.

## Generate a CA certificate

> **Note:** Creating the CA certificate is a **one-time operation**. If you have
> a directory called `certificates` with a `rootCA.pem` in it, you already did
> this step.

Run the script to generate a CA certificate:

    node cli generate-ca

## Create an IoT registry

Now
[create a new IoT registry](https://console.cloud.google.com/iot/registries/new?project=bifravst)
and provide the CA certificate.

## Generate a device certificate

Run this script to generate a certificate for a new device:

    node cli generate-cert
