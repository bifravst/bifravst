================================================================================
Flashing the latest firmware for your device
================================================================================

Configure and build the firmware
================================================================================

\    Removing this step is planned (see \> \[this
issue\](<https://github.com/bifravst/firmware/issues/12>)), so that at
some \    point we can provide you with pre-built HEX files for all
supported devices, \    which we currently publish in the \> \[GitHub
releases\](<https://github.com/bifravst/firmware/releases>) for the \>
firmware project. \    \> How the HEX files are automatically built for
every commit to the GitHub \    project is explained
\[here\](../guides/AutomateHEXFileBuilding.md).

In order to connect the cloud using the Cat Tracker firmware, it needs
to be build needs to be build to include the MQTT endpoint for your
cloud account.

This is done through the config
[CONFIG_AWS_IOT_BROKER_HOST_NAME]{.title-ref} setting.

In order to use your endpoint, add a new entry to
`[firmwareprj.conf]{.title-ref} <https://github.com/bifravst/firmware/prj.conf>`_
if you are building for the \[nRF9160 DK
([PCA10090]{.title-ref})\](<https://www.nordicsemi.com/Software-and-tools/Development-Kits/nRF9160-DK>)
or
`[firmwareprj_thingy91_nrf9160ns.conf]{.title-ref} <https://github.com/bifravst/firmware/prj.conf>`_
if you are building for the \[Thingy:91
([PCA20035]{.title-ref})\](<https://www.nordicsemi.com/Software-and-tools/Prototyping-platforms/Nordic-Thingy-91>):

    CONFIG_BIFRAVST_CLOUD_HOST_NAME=\"\<mqtt endpoint\>\"

You can find the endpoint for your installation through the CLI:

    node cli info -o mqttEndpoint

Build
--------------------------------------------------------------------------------

Follow the instructions on \[how to build\](../firmware/Building.md) the
HEX file for your board.

Flash using the \_[Programmer]()
================================================================================

Flash the HEX file for your board using the \_[Programmer]() of the
\[nRF Connect for
Desktop\](<https://www.nordicsemi.com/Software-and-Tools/Development-Tools/nRF-Connect-for-desktop>)
app.

!\[nRF Connect for Desktop Programmer\](images/programmer-desktop.png)

Drag and Drop it (or select via \_Add HEX [file]()), click \_Erase &
[Write]() and wait until the operation has finished.

!\[nRF Connect for Desktop
Programmer\](images/programmer-modem-desktop.png)

Flash using [nrjprog]{.title-ref}
================================================================================

\    Note: The nRF9160 \> \[should be programmed using
[nrfjprog]{.title-ref}\](<http://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/ug_nrf9160.html#board-controller>).
\    [west flash]{.title-ref} is not supported.

    nrfjprog -f nrf91 \--program \<hexfile\> \--sectoranduicrerase -r
