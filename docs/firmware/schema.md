# Bifravst Firmware Sensor Data and Configuration Schema

```
https://github.com/bifravst/bifravst/blob/saga/docs/firmware/schema.json
```

Describes the data published by the device and its configuration options.

| Abstract            | Extensible | Status       | Identifiable | Custom Properties | Additional Properties | Defined In |
| ------------------- | ---------- | ------------ | ------------ | ----------------- | --------------------- | ---------- |
| Can be instantiated | No         | Experimental | No           | Forbidden         | Permitted             |            |

# Bifravst Firmware Sensor Data and Configuration Properties

| Property    | Type     | Required     | Nullable | Defined by                                                    |
| ----------- | -------- | ------------ | -------- | ------------------------------------------------------------- |
| [acc](#acc) | `object` | Optional     | No       | Bifravst Firmware Sensor Data and Configuration (this schema) |
| [bat](#bat) | `object` | Optional     | No       | Bifravst Firmware Sensor Data and Configuration (this schema) |
| [cfg](#cfg) | `object` | **Required** | No       | Bifravst Firmware Sensor Data and Configuration (this schema) |
| [gps](#gps) | `object` | Optional     | No       | Bifravst Firmware Sensor Data and Configuration (this schema) |
| `*`         | any      | Additional   | Yes      | this schema _allows_ additional properties                    |

## acc

The accelerometer reading

`acc`

- is optional
- type: `object`
- defined in this schema

### acc Type

`object` with following properties:

| Property | Type   | Required     |
| -------- | ------ | ------------ |
| `ts`     | string | **Required** |
| `v`      | array  | **Required** |

#### ts

Timestamp with millisecond precision and timezone

`ts`

- is **required**
- type: `string`

##### ts Type

`string`

All instances must conform to this regular expression (test examples
[here](<https://regexr.com/?expression=%5E%5Cd%7B4%7D-%5B01%5D%5Cd-%5B0-3%5D%5CdT%5B0-2%5D%5Cd%3A%5B0-5%5D%5Cd%3A%5B0-5%5D%5Cd%5C.%5Cd%2B(%5B%2B-%5D%5B0-2%5D%5Cd%3A%5B0-5%5D%5Cd%7CZ)%24>)):

```regex
^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)$
```

#### v

Accelerometer reading: x,y,z

`v`

- is **required**
- type: `number[]`\* between `3` and `3` items in the array

##### v Type

Array type: `number[]`

All items must be of the type: `number`

## bat

The battery reading

`bat`

- is optional
- type: `object`
- defined in this schema

### bat Type

`object` with following properties:

| Property | Type    | Required     |
| -------- | ------- | ------------ |
| `ts`     | string  | **Required** |
| `v`      | integer | **Required** |

#### ts

Timestamp with millisecond precision and timezone

`ts`

- is **required**
- type: `string`

##### ts Type

`string`

All instances must conform to this regular expression (test examples
[here](<https://regexr.com/?expression=%5E%5Cd%7B4%7D-%5B01%5D%5Cd-%5B0-3%5D%5CdT%5B0-2%5D%5Cd%3A%5B0-5%5D%5Cd%3A%5B0-5%5D%5Cd%5C.%5Cd%2B(%5B%2B-%5D%5B0-2%5D%5Cd%3A%5B0-5%5D%5Cd%7CZ)%24>)):

```regex
^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)$
```

#### v

Battery value as send from the modem

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
| `act`    | boolean | **Required** |
| `actwt`  | integer | **Required** |
| `gpst`   | integer | **Required** |
| `mvres`  | integer | **Required** |
| `mvt`    | integer | **Required** |

#### act

Whether to enable the active mode

`act`

- is **required**
- type: `boolean`

##### act Type

`boolean`

#### actwt

In active mode: wait this amount of seconds until sending the next update. The actual interval will be this time plus
the time it takes to get a GPS fix.

`actwt`

- is **required**
- type: `integer`

##### actwt Type

`integer`

- minimum value: `1`

#### gpst

GPS treshold (in seconds): timeout for GPS fix

`gpst`

- is **required**
- type: `integer`

##### gpst Type

`integer`

- minimum value: `1`

#### mvres

(movement resolution) In passive mode: Time in seconds to wait after detecting movement

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

## gps

The GPS reading

`gps`

- is optional
- type: `object`
- defined in this schema

### gps Type

`object` with following properties:

| Property | Type   | Required     |
| -------- | ------ | ------------ |
| `ts`     | string | **Required** |
| `v`      | object | **Required** |

#### ts

Timestamp with millisecond precision and timezone

`ts`

- is **required**
- type: `string`

##### ts Type

`string`

All instances must conform to this regular expression (test examples
[here](<https://regexr.com/?expression=%5E%5Cd%7B4%7D-%5B01%5D%5Cd-%5B0-3%5D%5CdT%5B0-2%5D%5Cd%3A%5B0-5%5D%5Cd%3A%5B0-5%5D%5Cd%5C.%5Cd%2B(%5B%2B-%5D%5B0-2%5D%5Cd%3A%5B0-5%5D%5Cd%7CZ)%24>)):

```regex
^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)$
```

#### v

`v`

- is **required**
- type: `object`

##### v Type

`object` with following properties:

| Property | Type    | Required     |
| -------- | ------- | ------------ |
| `acc`    | integer | **Required** |
| `alt`    | number  | **Required** |
| `hdg`    | number  | **Required** |
| `lat`    | number  | **Required** |
| `lng`    | number  | **Required** |
| `spd`    | number  | **Required** |

#### acc

Accuracy

`acc`

- is **required**
- type: `integer`

##### acc Type

`integer`

- minimum value: `0`

#### alt

Altitude

`alt`

- is **required**
- type: `number`

##### alt Type

`number`

#### hdg

Heading

`hdg`

- is **required**
- type: `number`

##### hdg Type

`number`

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

Speed

`spd`

- is **required**
- type: `number`

##### spd Type

`number`
