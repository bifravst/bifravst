Troubleshooting
###############

Following are some of the common errors and related information.

Connection
**********

Error code ``-22``
==================

Verify the client ID, the endpoint and the certificates.

Cellular connection
===================

Since 5G support is currently being deployed by mobile phone network operators, there is a high chance of connection issues in your location.

It is generally recommended to try multiple SIM cards from different vendors in case you experience connectivity issues.

GPS
***

Error: ``GPS_EVT_OPERATION_BLOCKED``
====================================

This error occurs if the network provider does not grant Power Saving Mode (PSM) and the GPS takes a long time to acquire a fix.
For more details, see the `DevZone post related to GPS and LTE issue <https://devzone.nordicsemi.com/f/nordic-q-a/51962/gps-and-lte-issue/210272#210272>`_.

A solution is to switch to a SIM card that grants PSM.

Another solution is to use assisted GPS (A-GPS) to speed up the time to fix.
Currently there is no support for `A-GPS in the Asset Tracker Cloud Example. <https://github.com/bifravst/firmware/issues/8>`_.
