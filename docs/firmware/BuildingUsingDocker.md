# Building using Docker

The docker image is not intended to be shared, but to simplify building locally.
It is used to cache all dependencies so you can build and develop locally
without needing to install dependencies directly in your system.

    git clone https://github.com/bifravst/firmware
    cd firmware
    docker build -t ncs .
    BROKER_HOSTNAME=`aws iot describe-endpoint --endpoint-type iot:Data-ATS | jq -r '.endpointAddress'`
    echo "CONFIG_AWS_IOT_BROKER_HOST_NAME=\"${BROKER_HOSTNAME}\"" >> prj.conf
    docker run --name ncs --rm -v ${PWD}:/workdir/ncs/firmware ncs /bin/bash -c 'cd ncs/firmware; west build -p auto -b nrf9160_pca20035ns'
    ls -la build/zephyr/merged.hex
