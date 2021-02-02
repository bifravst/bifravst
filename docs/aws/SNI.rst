.. _sni_readme:

SNI
###

The `Transport security in AWS IoT <https://docs.aws.amazon.com/iot/latest/developerguide/transport-security.html>`_ documentation mentions that the Server Name Indication (SNI) extension is required for TLS, both in the case of MQTT and HTTPS.

However, the following facts must be noted:

* SNI is required when connecting using a certificate that is created using the IoT console or the `RegisterCertificateWithoutCA <https://docs.aws.amazon.com/iot/latest/apireference/API_RegisterCertificateWithoutCA.html>`_ API, which registers the certificate with ``certificateMode`` ``SNI_ONLY``.

  * The devices that are currently connected to AWS IoT through MQTT and not using SNI will not be affected and such devices will continue to work with AWS IoT.

* SNI is not required when connecting to AWS IoT using MQTT, when using a CA certificate.

  * AWS IoT uses the certificates provided in the TLS connection of MQTT to route the request to the right account using the CA certificate and not to the endpoint.
    This also means that when using a wrong account endpoint to connect to AWS IoT with a certificate that does not belong to that account endpoint, the request will be routed to the correct account endpoint.

* HTTP is handled separately and different from MQTT and it requires that the SNI bit is set.

* New features such as `Multi-Account registration <https://docs.aws.amazon.com/iot/latest/developerguide/x509-client-certs.html#multiple-account-cert>`_ and `Configurable endpoints <https://docs.aws.amazon.com/iot/latest/developerguide/iot-custom-endpoints-configurable.html>`_, require SNI bits in MQTT connection.
  The SNI bit is significant when using these features and it is used by AWS IoT to route the request properly.
