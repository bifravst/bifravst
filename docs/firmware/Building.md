# Compiling the project

## Prepare your system

> **Note:** You can always check out the
> [GitHub Actions workflow](https://github.com/bifravst/firmware/blob/saga/.github/workflows/build-and-release.yaml)
> as a reference, which sets up a blank Ubuntu image to build the firmware.

Follow the
[Getting Started Guide](http://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/getting_started.html)
of the Nordic Connect SDK to set up your system for building the project.
Especially make sure to follow the instructions on _Installing the nRF Connect
SDK_.

## Clone the project and install dependencies

Create a folder, e.g. `ncs` and init the project:

    cd ./ncs
    west init -m https://github.com/bifravst/firmware
    west update
    sudo pip3 install -r zephyr/scripts/requirements.txt
    sudo pip3 install pc_ble_driver_py
    sudo pip3 install -r nrf/scripts/requirements.txt
    sudo pip3 install -r mcuboot/scripts/requirements.txt
    # this sets $ZEPHYR_TOOLCHAIN_VARIANT and $GNUARMEMB_TOOLCHAIN_PATH
    source zephyr/zephyr-env.sh

## Configuration

### Setting the AWS IoT Core MQTT broker hostname

> **Note:** If `CONFIG_AWS_IOT_BROKER_HOST_NAME` is not set you will not be able
> to build the firmware.

In order to build the `cat_tracker` application your AWS IoT Core MQTT broker
hostname **must** be provided.

Add a definition called `CONFIG_AWS_IOT_BROKER_HOST_NAME` to the project
configuration (`./ncs/nrf/applications/cat_tracker/prj.conf`), like this:

```
CONFIG_AWS_IOT_BROKER_HOST_NAME="<your broker hostname>"
```

### Setting the application version

You **may** configure the application version that is sent as part of the device
information, it can be any string and defaults to `0.0.0-development`.

You can customize this string by adding a defintion called
`CONFIG_CAT_TRACKER_APP_VERSION` to the project configuration
(`./ncs/nrf/applications/cat_tracker/prj.conf`), like this:

```
CONFIG_CAT_TRACKER_APP_VERSION="<your version string>"
```

## Building

Then build the actual application: change to the
`./ncs/nrf/applications/cat_tracker` directory and build for your board:

### Thingy:91 (`PCA20035`)

    west build -p auto -b nrf9160_pca20035ns

### nRF9160 DK (`PCA10090`)

    west build -p auto -b nrf9160_pca20035ns

## Location of the HEX file

The built HEX file will be located in
`ncs/nrf/applications/cat_tracker/build/zephyr/merged.hex`.
