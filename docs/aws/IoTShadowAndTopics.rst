================================================================================
AWS IoT Shadow and Topics
================================================================================

On AWS the `IoT
Shadow <https://docs.aws.amazon.com/iot/latest/developerguide/iot-device-shadows.html>`_
is used to send device data and configuration.

Reported state
================================================================================

The document is described in `this JSON schema file <../firmware/state.reported.aws.schema.json>`_.

See `this JSON document <../firmware/state.reported.aws.json>`_ for an example device state.

Desired state
================================================================================

The document contains the :code:`cfg` object described in the
schema above.
