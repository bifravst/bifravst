# Building using Docker

This is the simplest way to build the project on your local system. Install
[Docker](https://www.docker.com/) and use it to contain all dependencies in the
image, without needing to install them in your system.

The docker image is not intended to be shared, but to simplify building locally.
It is used to cache all dependencies so you can build and develop locally
without needing to install dependencies directly in your system.

    git clone https://github.com/bifravst/firmware
    cd firmware
    docker build -t ncs .
    BROKER_HOSTNAME=`aws iot describe-endpoint --endpoint-type iot:Data-ATS | jq -r '.endpointAddress'`
    echo "CONFIG_AWS_IOT_BROKER_HOST_NAME=\"${BROKER_HOSTNAME}\"" >> prj.conf
    ls -la build/zephyr/merged.hex

## Building

### Thingy:91 (`PCA20035`)

    docker run --name ncs --rm -v ${PWD}:/workdir/ncs/firmware ncs /bin/bash -c 'cd ncs/firmware; west build -p auto -b nrf9160_pca20035ns'

### nRF9160 DK (`PCA10090`)

    docker run --name ncs --rm -v ${PWD}:/workdir/ncs/firmware ncs /bin/bash -c 'cd ncs/firmware; west build -p auto -b nrf9160_pca10090ns'

## Location of the HEX file

The built HEX file will be located in `ncs/nrf/build/zephyr/merged.hex`.
