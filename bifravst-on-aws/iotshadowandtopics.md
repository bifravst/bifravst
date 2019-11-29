# IoT Shadow and Topics

On AWS the [IoT Shadow](https://docs.aws.amazon.com/iot/latest/developerguide/iot-device-shadows.html) is used to send device data and configuration.

## Reported state

The document is described [in this JSON schema file](https://github.com/bifravst/bifravst/tree/ed771dfece8f13da8d57904ee79735c07692d6bc/docs/firmware/schema.json). See [this JSON document](https://github.com/bifravst/bifravst/tree/ed771dfece8f13da8d57904ee79735c07692d6bc/docs/firmware/state.json) for an example device state.

## Desired state

The document contains the `cfg` object described in the schema above.

