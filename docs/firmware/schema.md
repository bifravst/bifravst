# Bifravst Firmware Sensor Data and Configuration Schema

```
https://github.com/bifravst/bifravst/blob/saga/docs/firmware/schema.json
```

Describes the data published by the device and its configuration options.

| Abstract            | Extensible | Status       | Identifiable | Custom Properties | Additional Properties | Defined In |
| ------------------- | ---------- | ------------ | ------------ | ----------------- | --------------------- | ---------- |
| Can be instantiated | No         | Experimental | No           | Forbidden         | Permitted             |            |

# Bifravst Firmware Sensor Data and Configuration Properties

| Property      | Type     | Required     | Nullable | Defined by                                                    |
| ------------- | -------- | ------------ | -------- | ------------------------------------------------------------- |
| [acc](#acc)   | `object` | Optional     | No       | Bifravst Firmware Sensor Data and Configuration (this schema) |
| [bat](#bat)   | `object` | Optional     | No       | Bifravst Firmware Sensor Data and Configuration (this schema) |
| [cfg](#cfg)   | `object` | **Required** | No       | Bifravst Firmware Sensor Data and Configuration (this schema) |
| [dev](#dev)   | `object` | **Required** | No       | Bifravst Firmware Sensor Data and Configuration (this schema) |
| [gps](#gps)   | `object` | Optional     | No       | Bifravst Firmware Sensor Data and Configuration (this schema) |
| [roam](#roam) | `object` | **Required** | No       | Bifravst Firmware Sensor Data and Configuration (this schema) |
| `*`           | any      | Additional   | Yes      | this schema _allows_ additional properties                    |

## acc

The accelerometer reading

`acc`

- is optional
- type: `object`
- defined in this schema

### acc Type

`object` with following properties:

| Property | Type    | Required     |
| -------- | ------- | ------------ |
| `ts`     | integer | **Required** |
| `v`      | array   | **Required** |

#### ts

Timestamp as Unix epoch with millisecond precision (UTC)

`ts`

- is **required**
- type: `integer`

##### ts Type

`integer`

- minimum value: `1234567890123`

#### v

Accelerometer reading: x,y,z in m/s²

`v`

- is **required**
- type: `number[]`\* between `3` and `3` items in the array

##### v Type

Array type: `number[]`

All items must be of the type: `number`

## bat

Battery reading in millivolt

`bat`

- is optional
- type: `object`
- defined in this schema

### bat Type

`object` with following properties:

| Property | Type    | Required     |
| -------- | ------- | ------------ |
| `ts`     | integer | **Required** |
| `v`      | integer | **Required** |

#### ts

Timestamp as Unix epoch with millisecond precision (UTC)

`ts`

- is **required**
- type: `integer`

##### ts Type

`integer`

- minimum value: `1234567890123`

#### v

Battery reading read by the modem

`v`

- is **required**
- type: `integer`

##### v Type

`integer`

- minimum value: `1`

## cfg

Configures the device

`cfg`

- is **required**
- type: `object`
- defined in this schema

### cfg Type

`object` with following properties:

| Property | Type    | Required     |
| -------- | ------- | ------------ |
| `acct`   | integer | **Required** |
| `act`    | boolean | **Required** |
| `actwt`  | integer | **Required** |
| `gpst`   | integer | **Required** |
| `mvres`  | integer | **Required** |
| `mvt`    | integer | **Required** |

#### acct

Accelerometer threshold: minimal absolute value for and accelerometer reading to
be considered movement. Divide by 10 to get the real threshold. Integers are
used because the nRF9160 has issue parsing JSON floats.

`acct`

- is **required**
- type: `integer`

##### acct Type

`integer`

- minimum value: `0`

#### act

Whether to enable the active mode

`act`

- is **required**
- type: `boolean`

##### act Type

`boolean`

#### actwt

In active mode: wait this amount of seconds until sending the next update. The
actual interval will be this time plus the time it takes to get a GPS fix.

`actwt`

- is **required**
- type: `integer`

##### actwt Type

`integer`

- minimum value: `1`

#### gpst

GPS timeout (in seconds): timeout for GPS fix

`gpst`

- is **required**
- type: `integer`

##### gpst Type

`integer`

- minimum value: `1`

#### mvres

(movement resolution) In passive mode: Time in seconds to wait after detecting
movement before sending the next update

`mvres`

- is **required**
- type: `integer`

##### mvres Type

`integer`

- minimum value: `1`

#### mvt

(movement timeout) In passive mode: Send update at least this often (in seconds)

`mvt`

- is **required**
- type: `integer`

##### mvt Type

`integer`

- minimum value: `1`

## dev

Static device information. This information shall be updated by the device once
after reboot.

`dev`

- is **required**
- type: `object`
- defined in this schema

### dev Type

`object` with following properties:

| Property | Type    | Required     |
| -------- | ------- | ------------ |
| `ts`     | integer | **Required** |
| `v`      | object  | **Required** |

#### ts

Timestamp as Unix epoch with millisecond precision (UTC)

`ts`

- is **required**
- type: `integer`

##### ts Type

`integer`

- minimum value: `1234567890123`

#### v

`v`

- is **required**
- type: `object`

##### v Type

`object` with following properties:

| Property | Type   | Required     |
| -------- | ------ | ------------ |
| `appV`   | string | **Required** |
| `band`   | number | **Required** |
| `brdV`   | string | **Required** |
| `iccid`  | string | **Required** |
| `modV`   | string | **Required** |
| `nw`     | string | **Required** |
| `op`     | string | **Required** |

#### appV

Application Firmware Version

`appV`

- is **required**
- type: `string`

##### appV Type

`string`

- minimum length: 1 characters

##### appV Example

```json
v1.0.0-rc1-327-g6fc8c16b239f
```

#### band

Band

`band`

- is **required**
- type: `number`

##### band Type

`number`

- minimum value: `1`

##### band Example

```json
3
```

#### brdV

Board Version

`brdV`

- is **required**
- type: `string`

##### brdV Type

`string`

- minimum length: 1 characters

##### brdV Example

```json
nrf9160_pca20035
```

#### iccid

SIM ICCID

`iccid`

- is **required**
- type: `string`

##### iccid Type

`string`

- minimum length: 19 characters
- maximum length: 20 characters

##### iccid Example

```json
89450421180216216095
```

#### modV

Modem Firmware Version

`modV`

- is **required**
- type: `string`

##### modV Type

`string`

- minimum length: 1 characters

##### modV Example

```json
mfw_nrf9160_1.0.0
```

#### nw

Network mode

`nw`

- is **required**
- type: `string`

##### nw Type

`string`

- minimum length: 1 characters

##### nw Example

```json
NB-IoT GPS
```

#### op

Network Operator

`op`

- is **required**
- type: `string`

##### op Type

`string`

- minimum length: 1 characters

##### op Example

```json
Telia
```

## gps

The GPS reading

`gps`

- is optional
- type: `object`
- defined in this schema

### gps Type

`object` with following properties:

| Property | Type    | Required     |
| -------- | ------- | ------------ |
| `ts`     | integer | **Required** |
| `v`      | object  | **Required** |

#### ts

Timestamp as Unix epoch with millisecond precision (UTC)

`ts`

- is **required**
- type: `integer`

##### ts Type

`integer`

- minimum value: `1234567890123`

#### v

`v`

- is **required**
- type: `object`

##### v Type

`object` with following properties:

| Property | Type   | Required     |
| -------- | ------ | ------------ |
| `acc`    | number | **Required** |
| `alt`    | number | **Required** |
| `hdg`    | number | **Required** |
| `lat`    | number | **Required** |
| `lng`    | number | **Required** |
| `spd`    | number | **Required** |

#### acc

Accuracy (2D 1-sigma) in meters

`acc`

- is **required**
- type: `number`

##### acc Type

`number`

- minimum value: `0`

#### alt

Altitude above WGS-84 ellipsoid in meters

`alt`

- is **required**
- type: `number`

##### alt Type

`number`

#### hdg

Heading of movement in degrees

`hdg`

- is **required**
- type: `number`

##### hdg Type

`number`

- minimum value: `0`
- maximum value: `360`

#### lat

Latitude

`lat`

- is **required**
- type: `number`

##### lat Type

`number`

#### lng

Longitude

`lng`

- is **required**
- type: `number`

##### lng Type

`number`

#### spd

Horizontal speed in meters

`spd`

- is **required**
- type: `number`

##### spd Type

`number`

- minimum value: `0`

## roam

Roaming information. This information shall be updated by the device every time
it publishes primary application data. It is considered low-priority information
so it should always be sent after the primary application data has been
published.

`roam`

- is **required**
- type: `object`
- defined in this schema

### roam Type

`object` with following properties:

| Property | Type    | Required     |
| -------- | ------- | ------------ |
| `ts`     | integer | **Required** |
| `v`      | object  | **Required** |

#### ts

Timestamp as Unix epoch with millisecond precision (UTC)

`ts`

- is **required**
- type: `integer`

##### ts Type

`integer`

- minimum value: `1234567890123`

#### v

`v`

- is **required**
- type: `object`

##### v Type

`object` with following properties:

| Property | Type   | Required     |
| -------- | ------ | ------------ |
| `area`   | number | **Required** |
| `cell`   | number | **Required** |
| `ip`     | string | **Required** |
| `mccmnc` | number | **Required** |
| `rsrp`   | string | **Required** |

#### area

Area code

`area`

- is **required**
- type: `number`

##### area Type

`number`

- minimum value: `1`

##### area Example

```json
12
```

#### cell

Cell id

`cell`

- is **required**
- type: `number`

##### cell Type

`number`

- minimum value: `1`

##### cell Example

```json
33703719
```

#### ip

IP address

`ip`

- is **required**
- type: `string`

##### ip Type

`string`

- minimum length: 1 characters

##### ip Examples

```json
10.81.183.99
```

```json
2001:0db8:85a3:0000:0000:8a2e:0370:7334
```

```json
2001:db8:85a3::8a2e:370:7334
```

#### mccmnc

Mobile country code and mobile network code

`mccmnc`

- is **required**
- type: `number`

##### mccmnc Type

`number`

- minimum value: `10000`
- maximum value: `99999`

##### mccmnc Example

```json
24202
```

#### rsrp

Signal strength

`rsrp`

- is **required**
- type: `string`

##### rsrp Type

`string`

- minimum length: 1 characters

##### rsrp Example

```json
???
```
