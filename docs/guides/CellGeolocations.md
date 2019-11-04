# Cell Geolocations

Locating the device is an important aspect of an IoT solution. In case of the
Cat Tracker, it's one of the primary functions. But acquiring a GPS fix is
sometimes not possible, e.g. when the device is indoors. In these situation
other data can be used to approximate the device location. If the device has a
cellular connection, the id of the cell(s) the device is seeing can be use to
triangulate its location. Smartphones use this technique (and even combine other
local networks like WiFi MAC addresses) to quickly estimate a location down to a
few meters. Knowing roughly _where_ the device is also is then used by the GPS
module to speed up the time to the first GPS fix since it can limit the number
of GPS sattelites it queries.

However Smartphones are multiple orders of magnitudes more powerful _and_ there
is a need to have a location information _on the device_ quickly (e.g. for
showing a location on a map application while the device is indoors).
Smartphones have location-dependend features, while most IoT wont have them.
E.g. the Cat Tracker has not feature that depends on a location, it will only
_report_ the location to the cloud backend, and the mobile app visualizing the
Cat Tracker's location has a need to know the location.

## Assisted GPS (AGPS)

The only _location-dependend_ feature on the Cat Tracker is AGPS, which
tremendously speeds of the time to acquire the first GPS fix (seconds instead of
minutes). But there is no need to have complex location triangulation based on
mobile network cells or WiFi MAC Addresses, it is sufficient to have an
up-to-date [GPS almanac](https://en.wikipedia.org/wiki/GPS_signals#Almanac) and
now the rough location on the globe, which is provided by the mobile network
operators country code. This is sufficient to provide the GPS module with the
data it needs for a quick GPS fix.

## Geolocating cells

As mentioned above, on the UI the user is interested to know _where_ the device
is as soon as possible, even an approximate location can be sufficcient:
depending on the tracked subject a few hundred meters accuracy may be enough.
And an approximate position is always better then no location (if the device is
unable to acquire a GPS fix). Therefore it is beneficial to geolocation the
current mobile network cell.

### Geolocating cells using other devices

Resolving the cell location on the cloud backend has unique advantages over
resolving on the device: it can leverage other devices who acquired a GPS fix in
a cell. If many devices are closely located it saves a lot of resource to only
resolve a cell location once and make it available for all device. This should
also be the preferred aproach when developing an IoT product that has
location-specific features that can rely on the aproximate location of cell
towers to operate. If a device knows it's cell tower it usually means that it
has an internet connection in order to request the approximate location from the
cloud. This allows to offload expensive calculations to the cloud and reduce the
resource usage on the device.

In Bifravst everytime a device reports a GPS fix, that position is stored
together with the cell id. Over time this builds a cell location database that
is independet from a third party API and up to date. It is used as the primary
mean of geolocation cells, only if a cell has not previously been _mapped_ by a
device will the third-party API be called, if it is enabled.

### Geolocating cells using third-party APIs

Third-party APIs and services like [UnwiredLabs](https://unwiredlabs.com/) and
[CellMapper](https://www.cellmapper.net/) have a database of cell tower
locations and provide an API to query against them. Bifravst implements the
resolution on the cloud side using _UnwiredLabs_ on
[AWS](../aws/CellGeolocation.md).
