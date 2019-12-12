# Flashing the latest firmware for your device

## Configure and build the firmware

> Removing this step is planned (see
> [this issue](https://github.com/bifravst/cat-tracker-fw/issues/17)), so that
> at some point we can provide you with pre-built HEX files for all supported
> devices, which we currently publish in the
> [GitHub releases](https://github.com/bifravst/cat-tracker-fw/releases) for the
> firmware project.
>
> How the HEX files are automatically built for every commit to the GitHub
> project is explained [here](../guides/AutomateHEXFileBuilding.md).

In order to connect the cloud using the Cat Tracker firmware, it needs to be
build needs to be build to include the MQTT endpoint for your cloud account.

This is done through the config `CLOUD_HOST_NAME` setting.

In order to use your endpoint, add a new entry to
[`applications\cat_tracker\prj.conf`](https://github.com/bifravst/cat-tracker-fw/blob/saga/applications/cat_tracker/prj.conf):

    CONFIG_BIFRAVST_CLOUD_HOST_NAME="<mqtt endpoint>"

You can find the endpoint for your installation through the CLI:

    node cli info -o mqttEndpoint

### Build

Follow the instructions on [how to compile](../firmware/Compiling.md) the HEX
file for your board.

## Flash using the _Programmer_

Flash the HEX file for your board using the _Programmer_ of the
[nRF Connect for Desktop](https://www.nordicsemi.com/Software-and-Tools/Development-Tools/nRF-Connect-for-desktop)
app.

![nRF Connect for Desktop Programmer](images/programmer-desktop.png)

Drag and Drop it (or select via _Add HEX file_), click _Erase & Write_ and wait
until the operation has finished.

![nRF Connect for Desktop Programmer](images/programmer-modem-desktop.png)

## Flash using `nrjprog`

> Note: The nRF9160
> [should be programmed using `nrfjprog`](http://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/ug_nrf9160.html#board-controller).
> `west flash` is not supported.

    nrfjprog -f nrf91 --program <hexfile> --sectoranduicrerase -r
