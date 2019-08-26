# Device-Cloud-Protocol

> 🚧 Draft

## Preface

This document will provide a general introduction in the way devices
communication with the cloud in the Bifravst project. _Communication_ is the
most important aspect to optimize for when developing an ultra-low-power product
because initiating and maintaining network connection is relatively expense
compared to other operations (for example reading a sensor value). It is
therefore recommended to invest a reasonable amount of time to revisit the
principles explained here and customize them to your specific needs. The more
the modem-uptime can be reduce and the smaller the total transferred amount if
data becomes, the longer will your battery and your data contingent last.

## MQTT as transport protocol

Bifravst uses MQTT to connect the device to the cloud provider.

The MQTT client ID defaults to the IMEI of the device.

## JSON as a data format

Bifravst uses JSON to represent all transferred data. If offers very good
support in tooling and is human readable. Especially during development its
verbosity is valuable.

### Possible Optimizations

As a data- and power-optimization technique it is recommended to look into
denser data protocols, especially since the majority of IoT applications (like
in the Cat Tracker example) will always send data in the same structure, only
the values change.

Consider the GPS message:

```json
{
  "v": {
    "lng": 10.414394,
    "lat": 63.430588,
    "acc": 17.127758,
    "alt": 221.639832,
    "spd": 0.320966,
    "hdg": 0
  },
  "ts": 1566042672382
}
```

In JSON notation this document (without newlines) has 114 bytes. If the message
were to be transferred using for example
[Protocol Buffers](https://developers.google.com/protocol-buffers/) the data can
be encoded with only 62 bytes (a 46% improvement)
([source code](https://gist.github.com/coderbyheart/34a8e71ffe30af882407544567971efb)).

Note that even though the savings in transferred data over the lifetime of a
device are significant, there is an extra cost of maintaining the source code on
the device side and on the cloud side that enables the use of a protocol that is
not supported natively by the cloud provider.

## The four kinds of data

![Data Protocols](./images/data-protocols.jpg)

The Cat Tracker example needs to communicate with the cloud in order to send
position updates and information about it's health, first an foremost is the
battery level a critical health indicator. This data is considered the **device
state**. Because we want to always be able to quickly see the latest state of
the device, a _digital twin_ is used to store this state on the cloud side:
whenever the device sends an update, the digital twin is updated. This allows
the web application to access the most recent device state immediately without
needing to wait for the device to come online.

It is an important criterion for the robustness of any IoT product to gracefully
handle situations in which the device is not connected to the internet. It might
even not be favorable to be connected all the time&mdash;wireless communication
is relatively expensive consumes a lot of energy and therefore increases the
power consumption.

> The _Cat Tracker_ example is optimized for ultra low power consumption, we
> want to turn off the modem as quickly as possible and keep it off as long as
> possible.

This is achieved by making the device smart and allowing it to decide based on
the situation whether it should try to send data.

In _passive_ mode, data is sent when movement is detected: the accelerometer
_wakes up_ the application thread which then tries to acquire a GPS fix and a
cellular connection. If there is no longer movement detected, the modem will be
turned off and the application goes back to sleep. The passive mode is designed
to conserve as much energy as possible, nevertheless we want the device to once
in a while send an update, so we know about its battery condition and in case
the motion sensor stops working properly.

Optimizing this behavior takes time and while the devices are in the field
sending firmware updates for every change (more about that later) will be
expensive. We observe firmware sizes of around 500 KB which will, even when
compressed, be expensive because it will take a device some time to download and
apply the updated, not to mention the costs for transferring the firmware update
over the cellular network. Especially in NB-IoT-only deployments is the data
rate low. Updating a fleet of devices with a new firmware involves orchestrating
the roll-out and observing for faults. All these challenges lead to the ability
to **configure the device**, which allows to tweak the behavior of the device
until the inflection point is reached: battery life vs. data granularity.
Interesting configuration options are for example the sensitivity of the motion
sensor: depending on the tracked subject what is considered "movement" can vary
greatly. Various timeout settings have an important influence on power- and
data-consumption: the time the device waits to acquire a GPS fix, or the time it
waits between sending updates when in motion. Finally the device can be put in
an _active_ mode, where it sends updates based on an configurable interval (of
course) regardless whether motion is detected or not. This is great when
actively developing the firmware with individual devices or when debugging the
device behavior in specific areas and situations.

Device **state** and **configuration** are timeless datum, they apply always and
absolutely. The device sends a GPS position over the cellular connection and the
digital twin is updated, we now know where the device is _now_. When the device
configuration is changed (`A -> A'`) the device will eventually apply the new
configuration, and if another configuration change was made while the device was
not connected (`A' -> A''`) the device can directly _jump_ to `A''`. To make
state and configuration changes available over time we can store all changes on
the cloud side with the time of the change and make them available for retrieval
in a time-series fashion.

> Time is relative.

This approach has an inherent problem: if we are to store the battery level
measured by the device with the time it was received by the cloud, the timestamp
will not be accurate. It can take minutes between the sampling of the battery
voltage and the time the update is finally delivered on the receiving end,
because for example it took the device a while to establish the cellular
connection in order to send the update. While this might be acceptable with a
sensor that has low volatility, it might not be acceptable in scenarios where it
is important to exactly know _when_ something happened. Imaging you are tracking
parcels and want to track if a parcel is dropped. A few minutes can make a big
difference to pinpoint the exact situation when the parcel is being moved by a
person or even in a vehicle.

The need for precise time measurement on the device is important and is achieved
by combining three time sources: the relative device timestamp (a relative time
with microsecond resolution that counts upwards from zero after the device is
powered on), the cellular network time and the time from the GPS sensor.

```
       42      131
0---------------------->
        ^       ^
        |       |
       LTE     GPS
```

Every time a sensor is read, the value is recorded with the device timestamp.
Once theses measurements are about to be sent (in which case there is a cellular
connection and at least the network time is known), the relative timestamps can
be converted to absolute timestamps using the _relative_ timestamps of the
network or the gps time.

This way all data is sent with precise timestamps to the cloud where the device
time is used when visualizing data to accurately reflect _when_ the datum was
created.

TODO:

- Batching of data.
- Sheep example: go in valley (GPS), go on hill (GPS+LTE), we must know that
  sheep was in valley
