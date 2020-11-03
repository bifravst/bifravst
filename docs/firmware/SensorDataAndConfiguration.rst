================================================================================
Device Data and Configuration
================================================================================

The data published by the device and the configuration options are
described in detail in \[this JSON schema file\](./state.schema.json).
See \[this JSON document\](./state.json) for an example device state.

Sending and receiving this data is different per cloud-operator, see
implementation details for \[AWS here\](../aws/IoTShadowAndTopics.md).

State vs Messages
================================================================================

Most data is stored in the digital twin of the device, this is useful to
be able to quickly query the last known data from the device. However
some data does not fit well into this model, e.g. because of its
ephemeral nature. In the Cat Tracker example we send the button pushes
as a message and do not store it in the digital twin; after all it is a
UI element and it in case of push buttons has no \_[state]() which could
be restored on the device or persists over a longer time.

The messages published by the device are described in detail in \[this
JSON schema file\](./messages.schema.json). See \[this JSON
document\](./message.json) for an example device state.

Batch data
================================================================================

The firmware may send data as batch, using the schema described \[in
this JSON schema file\](./batch.schema.json). See \[this JSON
document\](./batch-message.json) for an example batch message.

For sending batched data from the device, the topic
[\<deviceId\>/batch]{.title-ref} is used.

Tracking Modes
================================================================================

The firmware implements two tracking modes: \_[passive]() and
\_[active]().

Passive Mode
--------------------------------------------------------------------------------

This is the default mode.

In passive mode the device publishes data based on movement: if it
registers movement on the accelerometer, it will publish data. It will
wait the amount of seconds configured in [cfg.mvres]{.title-ref} before
publishing the next time.

If it detects no movement for the amount of seconds specified in
[cfg.mvt]{.title-ref}, it will also publish data once.

The \[nRF9160 DK
([PCA10090]{.title-ref})\](<https://www.nordicsemi.com/Software-and-tools/Development-Kits/nRF9160-DK>)
does not support \_[passive]() mode by default. The \_[passive]() mode
depends on an external accelerometer (Analog Devices ADXL362) being
connected to the GPIO ports specified in the
[nrf9160_pca10090ns.overlay]{.title-ref} file.

Active Mode
--------------------------------------------------------------------------------

In active mode the device publishes data based on elapsed time. It will
wait the amount of seconds configured in [cfg.actwt]{.title-ref} before
publishing the next time.

The device can be put in \_[active]() mode by setting the
[cfg.act]{.title-ref} to [true]{.title-ref}.

GPS Timeout configuration
================================================================================

Since the nRF9160 currently does not support AGPS depending on the
device location acquiring a GPS fix can take a long time. Therefore a
timeout of at least 1000s should be chosen.
