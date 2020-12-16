================================================================================
Cell Geolocations
================================================================================

Locating a device is an important aspect of any IoT solution. In case of
the Cat Tracker, it's one of the primary functions. But acquiring a GPS
fix is sometimes not possible, e.g. when the device is indoors. In these
situation other data can be used to approximate the device's location.
If the device has a cellular connection, the id of the cell(s) the
device modem is communicating with can be used to triangulate its
location. Smartphones use this technique (and even combine data from
other wireless networks) to quickly estimate a location down to a few
meters. Knowing roughly *where* the device is, is then used by the
GPS module to speed up the time to the first GPS fix since it can limit
the number of GPS sattelites it queries to the ones that should
currently be visible on the sky.

Smartphones however are multiple orders of magnitudes more powerful
*and* there is a concrete need to have location information *on the
device* quickly (e.g. for showing the user's location in a
navigation application while the device is indoors). Smartphones have
location-dependend features, while most IoT devices wont have them. For
example the Cat Tracker has no feature that depends on a location, it
will only *report* the location to the cloud backend, and it's the
mobile app which is visualizing the Cat Tracker's location tha has a
need to *know* the device location.

.. note::

    Since it is much more efficient to resolve cell
    geolocations on the cloud it's the cloud backends responsibility.

Assisted GPS (AGPS)
================================================================================

The only *location-dependend* feature on the Cat Tracker is AGPS,
which tremendously speeds of the time to acquire the first GPS fix
(seconds instead of minutes). But there is no need to have complex
location triangulation based on mobile network cells or WiFi MAC
Addresses, it is sufficient to have an up-to-date `GPS
almanac <https://en.wikipedia.org/wiki/GPS_signals#Almanac>`_ and know
the rough location on the globe, which is provided by the mobile network
operators country code. This is sufficient to provide the GPS module
with the data it needs for a quick GPS fix.

.. note::

    `AGPS is currently not implemented in the Cat Tracker
    Firmware <https://github.com/bifravst/firmware/issues/8>`_.

Geolocating cells
================================================================================

As mentioned above, on the UI the user is interested to know *where*
the device is as soon as possible, even an approximate location can be
sufficient: depending on the tracked subject, a few hundred meters
accuracy may be enough. And an approximate position is always better
then no location information at all (if the device is unable to acquire
a GPS fix). Therefore it is beneficial to geolocate the current mobile
network cell.

Geolocating cells using other devices
--------------------------------------------------------------------------------

Resolving the cell location on the cloud backend has unique advantages
over resolving it on the device: it removes the firmware image size and
memory usage and it can leverage other devices past GPS fixes. If many
devices are closely located it saves a lot of resource because a cell's
geolocation only needs to be resolved once and then can be made
available to all device. This should also be the preferred aproach when
developing an IoT product that has location-specific features that can
rely on the aproximate location of cell towers to operate. If a device
knows its cell tower it is mormally safe to assume that it has an
internet connection in order to request the approximate location from
the cloud. This allows to offload expensive calculations to the cloud
and reduce the resource usage on the device.

In Bifravst every time a device reports a GPS fix, that position is
stored together with the cell id. Over time this builds a cell location
database that is independet from a third party API and up to date. It is
used as the primary mean of geolocation cells in Bifravst. Only if a
cell has not previously been geolocated by a device will the third-party
API be called, **if it is enabled**.

Geolocating cells using third-party APIs
--------------------------------------------------------------------------------

Third-party APIs and services like
`UnwiredLabs <https://unwiredlabs.com/>`_ and
`CellMapper <https://www.cellmapper.net/>`_ have a database of cell
tower locations and provide an API to query against them. Bifravst
implements the optional resolution on the cloud side using
*UnwiredLabs* on :ref:`AWS <aws-unwired-labs-api>`  for cell that
have not been geolocation by devices.
