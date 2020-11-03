================================================================================
Configuration
================================================================================

Setting the AWS IoT Core MQTT broker hostname
================================================================================

.. note::

    If :code:`CONFIG_AWS_IOT_BROKER_HOST_NAME` is not set
    you will not be able to build the firmware.

In order to build the :code:`cat_tracker` application your AWS IoT
Core MQTT broker hostname **must** be provided.

Add a definition called :code:`CONFIG_AWS_IOT_BROKER_HOST_NAME` to
the project configuration (:code:`./firmware/<boarname>.conf`), like this:

.. code-block:: bash

    CONFIG_AWS_IOT_BROKER_HOST_NAME="<your broker hostname>"

Setting the application version
================================================================================

You **may** configure the application version that is sent as part of
the device information, it can be any string and defaults to
:code:`0.0.0-development`.

You can customize this string by adding a defintion called
:code:`CONFIG_CAT_TRACKER_APP_VERSION` to the project
configuration (:code:`./firmware/<boarname>.conf`), like this:

.. code-block:: bash

    CONFIG_CAT_TRACKER_APP_VERSION="<your version string>"

Packet Data Protocol AT command (:code:`+CGDCONT`)
================================================================================

In some networks you might need to provide additional configuration to
the modem (e.g. the APN). You can achieve this through the
`LTE_PDP_CMD configuration setting <https://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/reference/kconfig/CONFIG_LTE_PDP_CMD.html>`_.

.. code-block:: bash

    CONFIG_LTE_PDP_CMD=y
    CONFIG_LTE_PDP_CONTEXT="0,\"IP\",\"apn.example.com\""
