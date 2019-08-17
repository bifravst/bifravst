# Flash the latest firmware for your device

## Getting the latest firmware build

Find the HEX files in the
[GitHub releases](https://github.com/bifravst/cat-tracker-fw/releases) for the firmware project.

## Flash using the _Programmer_

Flash the HEX file for your board using the _Programmer_ of the
[nRF Connect for Desktop](https://www.nordicsemi.com/Software-and-Tools/Development-Tools/nRF-Connect-for-desktop)
app.

![nRF Connect for Desktop Programmer](../aws/images/programmer.png)

Drag and Drop it (or select via _Add HEX file_), click _Erase & Write_ and wait
until the operation has finished.

![nRF Connect for Desktop Programmer](../aws/images/programmer-modem.png)

## Flash using `nrjprog`

    nrfjprog -f nrf91 --program <hexfile> --sectoranduicrerase -r
