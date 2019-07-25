# Sensor Data and Configuration

The data published by the device and the configuration options are described in detail in [this JSON schema file](./schema.json). See [this JSON document](./state.json) for an example device state. A human-friendly documentation of the schema is available [here](./schema.md).

## Tracking Modes

The firmware implements two tracking modes: *passive* and *active*.

### Passive Mode

This is the default mode.

In passive mode the device publishes data based on movement: if it registers movement on the accelerometer, it will publish data. It will wait the amount of seconds configured in `cfg.mvres` before publishing the next time.

If it detects no movement for the amount of seconds specified in `cfg.mvt`, it will also publish data once.

### Active Mode

In active mode the device publishes data based on elapsed time. It will wait the amount of seconds configured in `cfg.actwt` before publishing the next time.

The device can be put in *active* mode by setting the `cfg.act` to `true`.
