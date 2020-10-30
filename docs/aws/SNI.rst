================================================================================
SNI
================================================================================

The \[AWS
docs\](<https://docs.aws.amazon.com/iot/latest/developerguide/transport-security.html>)
mention that the Server Name Indication (SNI) extension is required for
TLS both using MQTT as well as HTTPs.

However:

-   SNI is not required when connecting to AWS IoT using MQTT
-   HTTP is handled separately and different from MQTT and requires that
    SNI bit is set.
-   AWS IoT uses the certificates provided in the MQTT\'s TLS connection
    to route the request to right account and not the endpoint itself.
-   This also means that when using a wrong account endpoint to connect
    to AWS IoT with a certificate that does not belong to that account
    endpoint the request will be routed to correct account endpoint.
-   new features such as \[Multi-Account
    registration\](<https://docs.aws.amazon.com/iot/latest/developerguide/x509-client-certs.html#multiple-account-cert>)
    and \[configurable
    endpoints\](<https://docs.aws.amazon.com/iot/latest/developerguide/iot-custom-endpoints-configurable.html>),
    require SNI bits in MQTT connection. The SNI bit is significant when
    using these features and used by AWS IoT to route the request
    properly.

\    Devices connected to AWS IoT currently through MQTT and not using SNI
won\'t be \    affected and will keep working with AWS IoT.
