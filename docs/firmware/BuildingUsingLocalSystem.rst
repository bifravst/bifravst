================================================================================
Building using your local system
================================================================================

.. note::

    Getting your system to the required state to build firmware
is \    cumbersome. It is recommend to check out the alternative of using
\    \[Docker\](./BuildingUsingDocker.md) or use a \> \[CI
Runner\](./BuildingUsingGitHub.md)

Prepare your system
================================================================================

.. note::

    You can always check out the \> \[GitHub Actions
workflow\](<https://github.com/bifravst/firmware/blob/saga/.github/workflows/build-and-release.yaml>)
\    as a reference, which sets up a blank Ubuntu image to build the
firmware.

Follow the \[Getting Started
Guide\](<http://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/getting_started.html>)
of the Nordic Connect SDK to set up your system for building the
project. Especially make sure to follow the instructions on \_Installing
the nRF Connect [SDK]().

Clone the project and install dependencies
================================================================================

Create a folder, e.g. [ncs]{.title-ref} and init the project:

    cd ./ncs sudo pip3 install -U \--pre west west init -m
    <https://github.com/bifravst/firmware> \--mr saga west update sudo
    pip3 install -r zephyr/scripts/requirements.txt sudo pip3 install
    pc_ble_driver_py sudo pip3 install -r nrf/scripts/requirements.txt
    sudo pip3 install -r mcuboot/scripts/requirements.txt ================================================================================
this sets
================================================================================
    \$ZEPHYR_TOOLCHAIN_VARIANT and \$GNUARMEMB_TOOLCHAIN_PATH source
    zephyr/zephyr-env.sh

Building
================================================================================

Then build the actual application: change to the
[./ncs/firmware]{.title-ref} directory and build for your board:

Thingy:91 ([PCA20035]{.title-ref})
--------------------------------------------------------------------------------

    west build -p always -b thingy91_nrf9160ns

nRF9160 DK ([PCA10090]{.title-ref})
--------------------------------------------------------------------------------

    west build -p always -b nrf9160_pca10090ns

Location of the HEX file
================================================================================

The built HEX file will be located in
[ncs/firmware/build/zephyr/merged.hex]{.title-ref}.
