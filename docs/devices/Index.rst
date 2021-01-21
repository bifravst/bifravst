.. _connect-using-real-device:

Connect using a real device
###########################

You can use any of the :ref:`supported development kits <firmware-supported-boards>` to connect to your account.

For the device to connect, you need to complete the following steps:

1. Upgrade the modem firmware according to the instructions in the following documentation:

   * `nRF9160 DK modem upgrade <https://infocenter.nordicsemi.com/topic/ug_nrf91_dk_gsg/UG/nrf91_DK_gsg/updating_modem_firmware.html>`_
   * `Thingy:91 modem upgrade <https://infocenter.nordicsemi.com/topic/ug_nc_programmer/UG/nrf_connect_programmer/ncp_updating_modem_thingy91_intro.html>`_

#. :ref:`Provision the certificate <devices-provisioning-certificate>`.
#. Program the application firmware according to the instructions in the following documentation:

   * `nRF9160 DK application firmware update <https://infocenter.nordicsemi.com/topic/ug_nrf91_dk_gsg/UG/nrf91_DK_gsg/updating_application_firmware.html>`_
   * `Thingy:91 application firmware update <https://infocenter.nordicsemi.com/topic/ug_nc_programmer/UG/nrf_connect_programmer/ncp_pgming_thingy91_usb.html>`_

Documentation
*************

.. toctree::
   :titlesonly:

   FlashingCertificate.rst
   TroubleShooting.rst
   FOTA.rst
