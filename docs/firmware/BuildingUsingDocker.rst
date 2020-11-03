================================================================================
Building using Docker
================================================================================

.. note::

    Read more about this aproach `here <https://github.com/coderbyheart/fw-nrfconnect-nrf-docker>`_.

This is the simplest way to build the project on your local system.
Install `Docker <https://www.docker.com/>`_ and use it to contain all
dependencies in the image, without needing to install them in your
system.

The docker image is not intended to be shared, but to simplify building
locally. It is used to cache all dependencies so you can build and
develop locally without needing to install dependencies directly in your
system.

.. code-block:: bash

    git clone https://github.com/bifravst/firmware
    cd firmware
    docker build -t bifravst-firmware-docker .
    BROKER_HOSTNAME=`aws iot describe-endpoint --endpoint-type iot:Data-ATS | jq -r '.endpointAddress'`
    echo "CONFIG_AWS_IOT_BROKER_HOST_NAME=\"${BROKER_HOSTNAME}\"" >> prj_nrf9160dk_nrf9160ns.conf
    echo "CONFIG_AWS_IOT_BROKER_HOST_NAME=\"${BROKER_HOSTNAME}\"" >> prj_thingy91_nrf9160ns.conf

Building
================================================================================

Thingy:91 (:code:`PCA20035`)
--------------------------------------------------------------------------------

.. code-block:: bash

    docker run --rm -v ${PWD}:/workdir/ncs/firmware bifravst-firmware-docker /bin/bash -c 'cd /workdir/ncs/firmware; west build -p always -b thingy91_nrf9160ns'
    ls -la build/zephyr/merged.hex

nRF9160 DK (:code:`PCA10090`)
--------------------------------------------------------------------------------

.. code-block:: bash

    docker run --rm -v ${PWD}:/workdir/ncs/firmware bifravst-firmware-docker /bin/bash -c 'cd /workdir/ncs/firmware; west build -p always -b nrf9160dk_nrf9160ns'
    ls -la build/zephyr/merged.hex

Location of the HEX file
================================================================================

The built HEX file will be located in
:code:`ncs/nrf/build/zephyr/merged.hex`.
