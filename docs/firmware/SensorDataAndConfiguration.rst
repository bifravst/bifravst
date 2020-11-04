================================================================================
Device Data and Configuration
================================================================================

The data published by the device and the configuration options are
described in detail in `the state JSON schema file <./state.schema.json>`_.
See `this state JSON document example <./state.json>`_ for an example device state.

Sending and receiving this data is different per cloud-operator, see
implementation details for `AWS here <../aws/IoTShadowAndTopics.html>`_.

State vs Messages
================================================================================

Most data is stored in the digital twin of the device, this is useful to
be able to quickly query the last known data from the device. However
some data does not fit well into this model, e.g. because of its
ephemeral nature. In the Cat Tracker example we send the button pushes
as a message and do not store it in the digital twin; after all it is a
UI element and it in case of push buttons has no *state* which could
be restored on the device or persists over a longer time.

The messages published by the device are described in detail in 
`the messages JSON schema file <./messages.schema.json>`_.
See `this messages JSON document example <./message.json>`_ for an example device state.

Batch data
================================================================================

The firmware may send data as batch, using the schema described
`in this JSON schema file <./batch.schema.json>`_. See
`this JSON document <./batch-message.json>`_ for an example batch message.

For sending batched data from the device, the topic :code:`<deviceId>/batch`
is used.

Tracking Modes
================================================================================

The firmware implements two tracking modes: *passive* and
*active*.

Passive Mode
--------------------------------------------------------------------------------

This is the default mode.

In passive mode the device publishes data based on movement: if it
registers movement on the accelerometer, it will publish data. It will
wait the amount of seconds configured in :code:`cfg.mvres` before
publishing the next time.

If it detects no movement for the amount of seconds specified in
:code:`cfg.mvt`, it will also publish data once.

The `nRF9160 DK (PCA10090) <https://www.nordicsemi.com/Software-and-tools/Development-Kits/nRF9160-DK>`_
does not support *passive* mode by default. The *passive* mode
depends on an external accelerometer (Analog Devices ADXL362) being
connected to the GPIO ports specified in the
:code:`nrf9160_pca10090ns.overlay` file.

Active Mode
--------------------------------------------------------------------------------

In active mode the device publishes data based on elapsed time. It will
wait the amount of seconds configured in :code:`cfg.actwt` before
publishing the next time.

The device can be put in *active* mode by setting the
:code:`cfg.act` to :code:`true`.

GPS Timeout configuration
================================================================================

Since the nRF9160 currently does not support AGPS depending on the
device location acquiring a GPS fix can take a long time. Therefore a
timeout of at least 1000s should be chosen.
