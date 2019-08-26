# Compiling the project

Follow the
[Getting Started Guide](http://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/getting_started.html)
of the Nordic Connect SDK to set up your system for compiling the project.

Then build the actual application: change to the
`ncs/nrf/applications/cat_tracker` directory and build for your board:

## Thingy:91

    west build -p auto -b nrf9160_pca20035ns

## nRF9160 DK

    west build -p auto -b nrf9160_pca20035ns

## nRF9160 Tracker

Note: Zephyr needs to be patched in order to enable the board.

    patch -b ncs/zephyr/cmake/app/boilerplate.cmake < ncs/nrf/.github/workflows/zephyr.patch
    west build -p auto -b nrf9160_pca10015ns

## Location of the HEX file

The built HEX file will be located in
`ncs/nrf/applications/cat_tracker/build/zephyr/merged.hex`.
