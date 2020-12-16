.. _awsiot_shadowtopics:

AWS IoT Shadow and Topics
#########################

On AWS, the `IoT Shadow <https://docs.aws.amazon.com/iot/latest/developerguide/iot-device-shadows.html>`_ is used to send device data and configuration through the JSON shadow documents.
A shadow document describes the different states of the device through a state property.
Following are some examples of device states:

* Reported state
* Desired state

Reported state
**************

The document is described in `JSON schema file <../firmware/state.reported.aws.schema.json>`_.
See `JSON document <../firmware/state.reported.aws.json>`_ for a sample device state.

Desired state
*************

The document contains the ``cfg`` object described in the above schema.
