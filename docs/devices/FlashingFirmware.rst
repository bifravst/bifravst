.. _devices-flashing-firmware:

Flashing the latest firmware for your device
############################################

Configure and build the firmware
********************************

.. note::
    Removing this step is planned (see `this issue <https://github.com/bifravst/firmware/issues/12>`_), so that at some point we can provide you with pre-built HEX files for all supported devices, which we currently publish in the `GitHub releases <https://github.com/bifravst/firmware/releases>`_ for the firmware project.
    How the HEX files are automatically built for every commit to the GitHub project is explained :ref:`here <guides-automate-hexfile-building>` .

In order to connect the cloud using the Cat Tracker firmware, it needs to be build needs to be build to include the MQTT endpoint for your cloud account.

This is done through the config ``CONFIG_AWS_IOT_BROKER_HOST_NAME`` setting.

In order to use your endpoint, add a new entry to `prj_nrf9160dk_nrf9160ns.conf <https://github.com/bifravst/firmware/prj_nrf9160dk_nrf9160ns.conf>`_ if you are building for the `nRF9160 DK (PCA10090) <https://www.nordicsemi.com/Software-and-tools/Development-Kits/nRF9160-DK>`_ or `prj_thingy91_nrf9160ns.conf <https://github.com/bifravst/firmware/prj_thingy91_nrf9160ns.conf>`_ if you are building for the `Thingy:91 (PCA20035) <https://www.nordicsemi.com/Software-and-tools/Prototyping-platforms/Nordic-Thingy-91>`_:

.. code-block:: bash

    CONFIG_BIFRAVST_CLOUD_HOST_NAME="<mqtt endpoint>"

You can find the endpoint for your installation through the CLI:

.. code-block:: bash

    node cli info -o mqttEndpoint

Build
=====

Follow the instructions on :ref:`how to build <firmware-building>`  the HEX file for your board.

Flash using the *Programmer*
****************************

Flash the HEX file for your board using the *Programmer* of the `nRF Connect for Desktop <https://www.nordicsemi.com/Software-and-Tools/Development-Tools/nRF-Connect-for-desktop>`_ app.

.. figure:: ./images/programmer-desktop.png
   :alt: nRF Connect for Desktop Programmer

   nRF Connect for Desktop Programmer

Drag and Drop it (or select via *Add HEX file*), click *Erase & Write* and wait until the operation has finished.

.. figure:: ./images/programmer-modem-desktop.png
   :alt: nRF Connect for Desktop Programmer

   nRF Connect for Desktop Programmer

Flash using ``nrfjprog``
************************

.. note::

    The nRF9160 `should be programmed using nrfjprog <http://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/ug_nrf9160.html#board-controller>`_. ``west flash`` is not supported.

.. code-block:: bash

    nrfjprog -f nrf91 --program <hexfile> --sectoranduicrerase -r
