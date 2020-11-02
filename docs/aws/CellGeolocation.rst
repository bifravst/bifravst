================================================================================
Cell Geolocation
================================================================================

Devices can be shown on the map based on the location of their cell,
even without them having a GPS fix yet. This allows to location devices
within a few kilometer radius. Depending on your scenario this can be
useful. Obviously for a cat this won\'t be very helpful, but in case of
an tracking assets like parcels it the rough location can be combined
with known points of interest e.g. warehouses, ports, to know e.g. if a
shipment has been arrived at its destination.

Locating cells based on device data
================================================================================

!\[Calculating the location of a cell using device geo location
data\](<https://github.com/bifravst/cell-geolocation-helpers/raw/saga/map.gif>)

GPS locations acquired by devices together with their cell information
(cell id, area id, MCC/MNC) are stored and and used to \[calculate the
location of the
cell\](<https://github.com/bifravst/cell-geolocation-helpers#cellfromgeolocations>).

In case there is no device geo location for the cell from your own
devices, third-party services like
`UnwiredLabs <https://unwiredlabs.com/>`_ or
`RXNetworks <https://rxnetworks.com/location.io#!RT-GNSS>`_ provide a
database of cell geo locations.

UnwiredLabs API
================================================================================

To use `UnwiredLabs <https://unwiredlabs.com/>`_ geolocation API,
store your API key as an SSM parameter and redeploy the stack:

    aws ssm put-parameter \--name
    /bifravst/cellGeoLocation/unwiredlabs/apiKey \--type String \--value
    \<API Key\> npx cdk deploy \'\*\'

This will update the StateMachine which resolves cells from devices to
use the UnwiredLabs API as a resolver.

.. note::

     The Unwired Labs\' LocationAPI is free for low volumes,
however there \    is `opencellid.org <https://opencellid.org/>`_ which
allows to use the \    underlying dataset for free. If this is relevant
for you, please \    \[vote in this
issue\](<https://github.com/bifravst/aws/issues/120>).
