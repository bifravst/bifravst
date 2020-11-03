================================================================================
AWS IoT Shadow and Topics
================================================================================

On AWS the `IoT
Shadow <https://docs.aws.amazon.com/iot/latest/developerguide/iot-device-shadows.html>`_
is used to send device data and configuration.

Reported state
================================================================================

The document is described in this JSON schema file:

.. literalinclude:: ../firmware/state.schema.json
  :language: JSON

See this JSON document for an example device state:

.. literalinclude:: ../firmware/state.json
  :language: JSON

Desired state
================================================================================

The document contains the :code:`cfg` object described in the
schema above.
