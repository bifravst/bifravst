================================================================================
Flashing the certificate
================================================================================

Generating a certificate
================================================================================

Use the CLI to generate a certificate for your device. The firmware will
use the IMEI of the device as the MQTT client ID. You can read the IMEI
of your device using the AT command \`AT+CGSN\`:

    AT+CGSN

The output will look like this

    352656100248049 OK

Use the IMEI when generating the certificate:

    node cli create-device-cert -d \<imei\>

Flashing using nRF Connect for Desktop
================================================================================

You can use the [certificates/device-\<deviceId\>.json]{.title-ref} file
with the \_Certificate [Manager]() in the \[nRF Connect for
Desktop\](<https://www.nordicsemi.com/Software-and-Tools/Development-Tools/nRF-Connect-for-desktop>)
app \_LTE Link [Monitor]() to flash certificate onto the device.

The \_Certificate [Manager]() uses AT commands to write the certificate
information to the secure storage of the modem and you need to flash
your device with a firmware that has the AT command host enabled.

Flash the AT host using the \_[Programmer]() app:

-   for the Thingy:91 use
    `[thingy91_at_client_increased_buf.hex]{.title-ref} <https://github.com/bifravst/bifravst/releases/download/v4.2.1/thingy91_at_client_increased_buf.hex>`_
-   for the nRF9160 DK use
    `[91dk_at_client_increased_buf.hex]{.title-ref} <https://github.com/bifravst/bifravst/releases/download/v5.9.2/91dk_at_client_increased_buf.hex>`_

!\[nRF Connect for Desktop Programmer\](images/programmer-desktop.png)

Drag and Drop the HEX file (or select it via \_Add HEX [file]()), click
\_Erase & [Write]() and wait until the operation has finished.

!\[nRF Connect for Desktop
Programmer\](images/programmer-modem-desktop.png)

Afterwards, launch the \_LTE Link [Monitor]() app.

!\[nRF Connect for Desktop LTE Link
Monitor\](images/lte-link-monitor-desktop.png)

Use the \_Certificate [Manager]() with the JSON file to write the
certificate to the device.

!\[nRF Connect for Desktop Certificate
Manager\](images/certificate-manager-desktop.png)

Drag and Drop or select the JSON file.

.. note::

    Change the security tag to [42]{.title-ref}. The modem can
hold multiple credentials, and the default security tag
([16842753]{.title-ref}) is reserved for \[nRF Connect for
Cloud\](<https://www.nordicsemi.com/Software-and-Tools/Development-Tools/nRF-Connect-for-Cloud>)
credentials.

.. note::

    Make sure that the selected device is directly connected and
not connected via the debugger!

Click \_Update [certificates]() and wait until the operation finishes.
