Cat Tracker firmware
####################

The Cat Tracker firmware is a reference application developed using the `nRF Connect SDK <https://github.com/nrfconnect/sdk-nrf>`_.
See `asset_tracker_v2 <https://github.com/nrfconnect/sdk-nrf/tree/master/applications/asset_tracker_v2>`_ for the source code for the Cat Tracker application.

.. _firmware-supported-boards:

Supported development kits
**************************

+-----------------------------------------------------------------------------------------------------+----------+------------------+------------------------+
|Hardware platforms                                                                                   |PCA       |Board name        |Build target            |
+=====================================================================================================+==========+==================+========================+
|`Thingy:91 <https://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/ug_thingy91.html>`_      | PCA20035 | thingy91_nrf9160 | ``thingy91_nrf9160ns`` |
+-----------------------------------------------------------------------------------------------------+----------+------------------+------------------------+
|`nRF9160 DK <https://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/ug_nrf9160.html>`_      | PCA10090 | nrf9160dk_nrf9160| ``nrf9160dk_nrf9160ns``|
+-----------------------------------------------------------------------------------------------------+----------+------------------+------------------------+

Documentation
*************

.. toctree::
   :titlesonly:

   Overview.rst
   UsingPrebuildImages.rst
   Configuration.rst
   BuildingUsingDocker.rst
   BuildingUsingLocalSystem.rst
   BuildingUsingGitHub.rst
   ../aws/FirmwareContinuousIntegration.rst
   Protocol.rst
   SensorDataAndConfiguration.rst
   LEDSchema.rst
