================================================================================
Configuration
================================================================================

Setting the AWS IoT Core MQTT broker hostname
================================================================================

.. note::

    If [CONFIG_AWS_IOT_BROKER_HOST_NAME]{.title-ref} is not set
you will not be able \    to build the firmware.

In order to build the [cat_tracker]{.title-ref} application your AWS IoT
Core MQTT broker hostname **must** be provided.

Add a definition called [CONFIG_AWS_IOT_BROKER_HOST_NAME]{.title-ref} to
the project configuration ([./firmware/prj.conf]{.title-ref}) or
([./firmware/prj_thingy91_nrf9160ns.conf]{.title-ref}) depending on the
board you are building for, like this:

`` ` CONFIG_AWS_IOT_BROKER_HOST_NAME="<your broker hostname>" ``\`

Setting the application version
================================================================================

You **may** configure the application version that is sent as part of
the device information, it can be any string and defaults to
[0.0.0-development]{.title-ref}.

You can customize this string by adding a defintion called
[CONFIG_CAT_TRACKER_APP_VERSION]{.title-ref} to the project
configuration ([./firmware/prj.conf]{.title-ref}) or
([./firmware/prj_thingy91_nrf9160ns.conf]{.title-ref}), like this:

`` ` CONFIG_CAT_TRACKER_APP_VERSION="<your version string>" ``\`

Packet Data Protocol AT command ([+CGDCONT]{.title-ref})
================================================================================

In some networks you might need to provide additional configuration to
the modem (e.g. the APN). You can achieve this through the
\[[LTE_PDP_CMD]{.title-ref} configuration
setting\](<https://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/reference/kconfig/CONFIG_LTE_PDP_CMD.html>).

`` ` CONFIG_LTE_PDP_CMD=y CONFIG_LTE_PDP_CONTEXT="0,\"IP\",\"apn.example.com\"" ``\`
