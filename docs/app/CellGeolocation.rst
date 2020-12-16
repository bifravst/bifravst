.. _app-cellgeolocation:

================================================================================
Cell Geolocation
================================================================================

Devices can be shown on the map based on the location of their cell,
even without them having a GPS fix yet. This allows to location devices
within a few kilometer radius. Depending on your scenario this can be
useful. Obviously for a cat this won't be very helpful, but in case of
an tracking assets like parcels it the rough location can be combined
with known points of interest e.g. warehouses, ports, to know e.g. if a
shipment has been arrived at its destination.

Locating cells based on device data
================================================================================

.. figure:: https://github.com/bifravst/cell-geolocation-helpers/raw/saga/map.gif
   :alt: Calculating the location of a cell using device geo location data
    
   Calculating the location of a cell using device geo location data

GPS locations acquired by devices together with their cell information
(cell id, area id, MCC/MNC) are stored and and used to `calculate the
location of the
cell <https://github.com/bifravst/cell-geolocation-helpers#cellfromgeolocations>`_.

In case there is no device geo location for the cell from your own
devices, third-party services like
`Unwired Labs`_ or
`RXNetworks <https://rxnetworks.com/location.io#!RT-GNSS>`_ provide a
database of cell geo locations.

Unwired Labs API
================================================================================

The `Unwired Labs`_ geolocation API is a commercial third-party solution that
provides an API for resolving cell information to a geo location. This is an
optional feature which can be enabled.

This way it's possible to the a rough location of a device as soon as it sends
it's roaming information to the cloud. The API provides the geolocation of
nearly every cell tower and using this information, devices can be located
within a few kilometers around the cell tower's location. Note that cellular
signals can travel many kilometers and `our tests <https://www.youtube.com/watch?v=p1_0OAlTcuY>`_
show that a range of 10 km and more is possible in certain conditions.

Follow the configuration guide in the respective implementation to enable it:

- :ref:`AWS <aws-unwired-labs-api>` 
- :ref:`Azure <azure-unwired-labs-api>` 

.. _Unwired Labs: https://unwiredlabs.com/