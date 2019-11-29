# Device Credentials

On Azure devices connect to IoT Hub using [TLS version 1.2](https://docs.microsoft.com/en-us/azure/iot-fundamentals/iot-security-deployment).

## Generate IoT enrollment group and a CA certificate for Bifravst

Azure supports offline generation of device certificates through [Enrollment Groups](https://docs.microsoft.com/bs-latn-ba/azure/iot-dps/quick-enroll-device-x509-node). For these a CA certificate needs to be registered:

```text
node cli register-ca
# this is a separate step because immediate verification may fail
node cli proof-ca-posession
```

## Generate a device certificate and register a device

Run this script to generate a certificate for a new device and register it in the IoT Hub:

```text
node cli register-device
```

