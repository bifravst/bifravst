# Building the project

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
