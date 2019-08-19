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

1. Device state
2. Device configuration
3. Sensor data
4. Firmware
