# Limiting the Shadow Document Size

The nRF9160 has a size limit of 2303 bytes for receiving TLS packages:

    *** Limitations
    ***************
    - TLS/DTLS
        - 2kB secure socket buffer size.

_(Source: `mfw_nrf9160_1.2.0_release_notes.txt` from
[1.2.0 nRF91 firmware binaries](https://www.nordicsemi.com/-/media/Software-and-other-downloads/Dev-Kits/nRF9160-DK/nRF9160-modem-FW/mfwnrf9160120.zip))_

Bifravst sets up an IoT rule which only publishes the `cfg` section of
[the shadow document](../firmware/state.json) to a separate topic
`$aws/things/<thing name>/shadow/get/accepted/desired/cfg` when devices receive
their state after publishing an empty message to
[`$aws/things/<thing name>/shadow/get`](https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html#get-pub-sub-topic).

The published object may be empty if the device has no shadow or the
configuration is not set:

    {}

Otherwise the message will contain one top-level key `cfg` and the desired
device configuration:

    {
      "cfg": {
        "gpst": 720,
        "celt": 600,
        "act": false,
        "actwt": 60,
        "mvres": 60,
        "mvt": 3600,
        "acct": 12
      }
    }
