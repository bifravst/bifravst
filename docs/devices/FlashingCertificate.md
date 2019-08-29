# Flashing the certificate

## Generating a certificate

Use the CLI to generate a certificate for your device. The firmware will use the
IMEI of the device as the MQTT client ID. You can read the IMEI of your device
using the AT command `AT+CGSN`:

    AT+CGSN
    352656100248049
    OK

Use the IMEI when generating the certificate:

    node cli generate-cert -d <imei>

## Flashing using nRF Connect for Desktop

You can use the `certificates/device-<deviceId>.json` file with the _Certificate
Manager_ in the
[nRF Connect for Desktop](https://www.nordicsemi.com/Software-and-Tools/Development-Tools/nRF-Connect-for-desktop)
app _LTE Link Monitor_ to flash certificate onto the device.

The _Certificate Manager_ uses AT commands to write the certificate information
to the secure storage of the modem and you need to flash your device with a
firmware that has the AT command host enabled.

Flash
[`thingy91_at_client_increased_buf.hex`](https://github.com/bifravst/bifravst/releases/download/v4.2.1/thingy91_at_client_increased_buf.hex)
using the _Programmer_ app.

![nRF Connect for Desktop Programmer](images/programmer-desktop.png)

Drag and Drop (or select via _Add HEX file_) the
[`thingy91_at_client_increased_buf.hex`](https://github.com/bifravst/bifravst/releases/download/v4.2.1/thingy91_at_client_increased_buf.hex),
click _Erase & Write_ and wait until the operation has finished.

![nRF Connect for Desktop Programmer](images/programmer-modem-desktop.png)

Afterwards, launch the _LTE Link Monitor_ app.

![nRF Connect for Desktop LTE Link Monitor](images/lte-link-monitor-desktop.png)

Use the _Certificate Manager_ with the JSON file to write the certificate to the
device.

![nRF Connect for Desktop Certificate Manager](images/certificate-manager-desktop.png)

Drag and Drop or select the JSON file.

**Note:** Change the security tag to `42`. The modem can hold multiple
credentials, and the default security tag (`16842753`) is reserved for
[nRF Connect for Cloud](https://www.nordicsemi.com/Software-and-Tools/Development-Tools/nRF-Connect-for-Cloud)
credentials.

Click _Update certificates_ and wait until the operation finishes.

## Flash using `nrjprog`

First flash the AT host:

    nrfjprog -f nrf91 --program thingy91_at_client.hex --sectoranduicrerase -r --log

Now flash the certificates

    node cli flash <imei>

You configure the port to use by passing the `-p <port>` flag:

    node cli flash <imei> -p /dev/ttyS31 # Linux
    node cli flash <imei> -p COM31       # Windows
