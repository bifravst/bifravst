# Sensor Data and Configuration

The data published by the device and the configuration options are described in
detail in [this JSON schema file](./schema.json). See
[this JSON document](./state.json) for an example device state.

The firmware may send data as batch, unsing the schema described
[in this JSON schema file](./batch-schema.json). See
[this JSON document](./batch-message.json) for an example batch message.

## Tracking Modes

The firmware implements two tracking modes: _passive_ and _active_.

### Passive Mode

This is the default mode.

In passive mode the device publishes data based on movement: if it registers
movement on the accelerometer, it will publish data. It will wait the amount of
seconds configured in `cfg.mvres` before publishing the next time.

If it detects no movement for the amount of seconds specified in `cfg.mvt`, it
will also publish data once.

### Active Mode

In active mode the device publishes data based on elapsed time. It will wait the
amount of seconds configured in `cfg.actwt` before publishing the next time.

The device can be put in _active_ mode by setting the `cfg.act` to `true`.

## GPS Timeout configuration

Since the nRF9160 currently does not support AGPS depending on the device
location acquiring a GPS fix can take a long time. Therefore a timeout of at
least 1000s should be chosen.

## LED colors

- Yellow flashing: cellular connection search
- Purple flashing: GPS fix search
- Green flashing: sending data
- Light blue flashing: active mode
- Dark blue slow flashing (short on, long off): passive mode
- Red solid: error
