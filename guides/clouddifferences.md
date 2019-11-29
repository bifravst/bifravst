# Cloud Differences

This document records key differences between the reference AWS implementation and other Cloud Providers IoT implementation:

## Google Cloud Platform \(GCP\)

### Authentication

Devices connect to the broker host using TLS 1.2, but authenticate against MQTT using a username \(any\) and a JWT token, which has been signed with the device key. Which means devices need to be provisioned [with the TLS Root Certitifcates](https://cloud.google.com/iot/docs/how-tos/mqtt-bridge#using_a_long-term_mqtt_domain) AND the device-specific keypair.

### Digital Twin

GCP has Configuration \(_AWS: desired_\) and State \(_AWS: reported_\).

Devices receive their configuration by subscribing to the `/devices/${deviceId}/config` topic. On successfull subscription they will receive their configuration on this topic. If the configuration is changed, the updated config will be published to the topic. There is no _AWS: delta_.

Devices publish their state to `/devices/${deviceId}/state` topic. They always must publish the _entire_ state, there is no native support for partial update

### Websockets

The IoT Core does not support Websocket connections which is used in the app to get notified in real-time about changes on device state.

