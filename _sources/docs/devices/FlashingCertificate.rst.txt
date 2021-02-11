.. _devices-provisioning-certificate:

Provisioning the certificate
############################

You need to generate and provision certificates to your device.
Provisioning the certificates can be done in the following ways:

* Using the CLI
* Using nRF Connect for Desktop

Generating a certificate
************************

You can use the CLI to generate a certificate for your device.
The firmware will use the IMEI of the device as the MQTT client ID.
You can get the IMEI of your device using the AT command ``AT+CGSN``.

Following is the output of the command:

.. code-block::

    352656100248049 OK

Use the IMEI when generating the certificate:

.. code-block:: bash

    node cli create-device-cert -d "<imei>"

Provisioning the certificate using CLI
**************************************

.. note::

   To provision the device certificate using CLI, you must have `Segger JLink <https://www.segger.com/downloads/jlink/>`_ installed in your path.

Use the CLI to provision the device certificates:

.. code-block:: bash

    node cli flash "<imei>"

Provisioning of the certificate using CLI also results in the following actions:

* Downloading of the latest firmware from the `Firmware releases GitHub page <https://github.com/bifravst/firmware/releases>`_ 
* Programming of the firmware to the device

Provisioning using nRF Connect for Desktop
******************************************

You can use the :file:`certificates/device-<deviceId>.json` file with *Certificate Manager* in `LTE Link Monitor <https://infocenter.nordicsemi.com/topic/ug_link_monitor/UG/link_monitor/lm_intro.html>`_, which is an application implemented as part of `nRF Connect for Desktop <https://infocenter.nordicsemi.com/topic/struct_nrftools/struct/nrftools_nrfconnect.html>`_, to provision the certificate to the device.

*Certificate Manager* uses AT commands to write the certificate information to the secure storage of the modem and you need to program your device with a firmware that has the AT command host enabled.

To provision the certificate using LTE Link Monitor, complete the following steps:

#. Program the AT host using `nRF Connect Programmer <https://infocenter.nordicsemi.com/topic/ug_nrf91_dk_gsg/UG/nrf91_DK_gsg/provisioning_certificate.html>`_ application (part of nRF Connect for Desktop). 

   .. figure:: ./images/programmer-desktop.png
      :alt: nRF Connect for Desktop Programmer

      nRF Connect for Desktop Programmer

   For programming, use the following files:
 
   *   Thingy:91 -  `thingy91_at_client_increased_buf.hex <https://github.com/bifravst/bifravst/releases/download/v4.2.1/thingy91_at_client_increased_buf.hex>`_
   *   nRF9160 DK - `91dk_at_client_increased_buf.hex <https://github.com/bifravst/bifravst/releases/download/v5.9.2/91dk_at_client_increased_buf.hex>`_

   For instructions, see the following documentation:

   *  `Programming the Thingy:91 <https://infocenter.nordicsemi.com/topic/ug_nc_programmer/UG/nrf_connect_programmer/ncp_pgming_thingy91_usb.html>`_
   *  `Programming the nRF9160 DK <https://infocenter.nordicsemi.com/topic/ug_nc_programmer/UG/common/ncp_programming_applications_nrf9160dk.html>`_

   .. important::

      Make sure that the selected device is directly connected and not connected via the debugger.


#. Open nRF Connect for Desktop and launch the LTE Link Monitor application.

   .. figure:: ./images/launch-lte-link-monitor-desktop.png
      :alt: nRF Connect for Desktop LTE Link Monitor
      
      nRF Connect for Desktop LTE Link Monitor

#. Click :guilabel:`Certificate Manager`.
 
   .. figure:: ./images/certificate-manager-desktop.png
      :alt: nRF Connect for Desktop Certificate Manager

      LTE Link Monitor Certificate Manager

#. Drag and drop the JSON file into the *Certificate Manager* window or select the JSON file using the :guilabel:`Load from JSON` option.

   .. note::

      Change the security tag to ``42``. The modem can hold multiple credentials, and the default security tag ``16842753`` is reserved for `nRF Connect for Cloud <https://www.nordicsemi.com/Software-and-Tools/Development-Tools/nRF-Connect-for-Cloud>`_ credentials.


#. Click :guilabel:`Update certificates` and wait until the operation finishes.
