================================================================================
Troubleshooting
================================================================================

Connection
================================================================================

Error code [-22]{.title-ref}
--------------------------------------------------------------------------------

Double check the clientID, the endpoint and the certificates.

Cellular connection
--------------------------------------------------------------------------------

Since 5G support is currently being deployed by mobile phone network
operators there is a high chance that you might perceive connection
issues in you location.

It is generally recommended to try multiple SIM cards from different
vendors in case you experience connectivity issues.

GPS
================================================================================

Error: [GPS_EVT_OPERATION_BLOCKED]{.title-ref}
--------------------------------------------------------------------------------

This happens if the Network provider does not grant PSM (power savings
mode) and the GPS takes too long to acquire a fix. \[See this {DevZone
post for more
details\](<https://devzone.nordicsemi.com/f/nordic-q-a/51962/gps-and-lte-issue/210272#210272>).

One solution is to switch SIM cards to one that grants PSM.

Another solution is to use assisted GPS (A-GPS) to speed up the time to
fix. \[Currently there is no support for A-GPS in
Bifravst.\](<https://github.com/bifravst/firmware/issues/8>)
