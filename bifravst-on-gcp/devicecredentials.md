# Device Credentials

On GCP devices connect to IoT core using [TLS version 1.2](https://cloud.google.com/iot/docs/concepts/device-security).

## Create the IoT registry for Bifravst

```text
node cli create-registry
```

## Generate a CA certificate

> **Note:** Creating the CA certificate is a **one-time operation**. If you have a directory called `certificates` with a `CA.pem` in it, you already did this step.

It is recommended to [use your own Certificate Authority \(CA\)](https://cloud.google.com/iot/docs/how-tos/credentials/verifying-credentials) to create certificates for your devices because this allows to generate _Device Certificates_ offline.

Run the script to generate a CA certificate:

```text
node cli register-ca
```

## Generate a device certificate and register a device

Run this script to generate a certificate for a new device and register it in the registry:

```text
node cli register-device
```

