# _Bifravst_

> Gvðín gerþu bru af iorþu til himins, er heitir Bifravst.

### What does _Bifravst_ mean?

Bifravst is a term from the Nordic mythology and it refers to the bridge built
by the gods between earth and heaven.
[Read more about it](https://www.lyngen.com/2020/03/the-vikings-and-the-northern-lights-bridge/).

[![GitHub Actions](https://github.com/bifravst/bifravst/workflows/Test%20and%20Release/badge.svg)](https://github.com/bifravst/bifravst/actions)
[![Known Vulnerabilities](https://snyk.io/test/github/bifravst/bifravst/badge.svg)](https://snyk.io/test/github/bifravst/bifravst)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Renovate](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com)
[![Mergify Status](https://img.shields.io/endpoint.svg?url=https://dashboard.mergify.io/badges/bifravst/bifravst&style=flat)](https://mergify.io)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier/)
[![ESLint: TypeScript](https://img.shields.io/badge/ESLint-TypeScript-blue.svg)](https://github.com/typescript-eslint/typescript-eslint)

## Development roadmap

🚧 Development progress is managed in the
[Bifravst GitHub Project](https://github.com/orgs/bifravst/projects/1).

> **🐣 incubating _Bifravst_ as an official _Nordic Semiconductor_ project 🎉**
>
> In the coming weeks, we will establish the best path to provide this project
> through nRF Connect SDK, Nordic Semiconductor Info center and potentially
> other established channels. For more information see the
> [GitHub issue](https://github.com/bifravst/bifravst/issues/56).

## Vision

_Bifravst_ aims to provide a concrete end-to-end example for an ultra-low power
cellular IoT product in the asset tracker space, namely a _Cat Tracker_.

![Bifravst: Cat Tracker IoT example](./docs/logo-with-text.png)

**_Bifravst_ enables the developers to set up a real world IoT solution using
the respective cloud provider and adapt the example firmware and software
quickly for a specific use case.**

_Bifravst_ aims to provide answers and recommend best practices to the following
questions :

- _How can you connect Nordic's cellular IoT chips to your cloud provider?_
- _How do devices send data into the cloud?_
- _How can the data be sent to the devices?_
- _How can users and other services interact with the devices?_
- _How can you update the application firmware of your devices while they are
  deployed in the field?_
- _How can you develop a cellular IoT product that maximizes battery life,
  minimizes data usage, and handles unreliable connectivity gracefully?_

_Bifravst_ is licensed under the [3-clause BSD license](./LICENSE) (software)
and the
[Nordic 5-clause BSD license](https://github.com/bifravst/firmware/blob/saga/LICENSE)
(firmware).

### Project characteristics overview

| Characteristic                     | Principle            |
| ---------------------------------- | -------------------- |
| **Development model**              | Open                 |
| **License**                        | Open source          |
| **Cloud vendor support**           | Multiple             |
| **Feature set**                    | Specialized, small   |
| **Hosting**                        | Self-hosted          |
| **User Interface**                 | Mobile-first web-app |
| **Cloud Tenancy**                  | Single               |
| **Integration of Cloud resources** | Native               |
| **Device paradigm**                | Offline mostly       |
| **Sensor timestamping**            | Device-side          |

### Core principles

_Bifravst_ is built on the following principles:

- _Teach by showing_ - All examples are designed to solve a concrete use case (a
  _Cat Tracker_) instead of providing generic or abstract solutions. _Bifravst_
  is not a framework, but it is a real application.
- _Err on the side of security_ - _Bifravst_ follows the most robust security
  recommendations of the respective cloud provider.
- _Single tenancy_ - _Bifravst_ implements a scenario in which all the
  authenticated users can be trusted to access all the devices. This is a
  typical scenario for cellular IoT products and it simplifies the onboarding of
  new devices.
- _Serverless_ - _Bifravst_ uses a serverless architecture as much as possible
  to have near-zero costs for the operation during the development, and to
  provide horizontal scaling of resources to be used in a production system if
  needed.
- _Cloud native_ - _Bifravst_ examples are designed by following the best
  practices of the respective cloud provider to reduce development efforts due
  to abstraction.
- _Being offline is not an exception_ - Highly mobile cellular IoT products need
  to handle unreliable connections gracefully, by implementing mechanisms to
  retry the failed sending of data. This also means that the sensor measurements
  need to be timestamped when they are created, and not when they arrive at the
  cloud.
- _Maximize power saving_ - The firmware examples should highlight power saving
  features of the nRF9160 DK because this is critical for developing very small
  form-factor devices.

### System overview and technical considerations

![System overview](./docs/System%20overview.jpg)

Devices connect to the message broker using TLS over TCP. The messaging protocol
is JSON over MQTT. The TLS certificates are generated offline by the developer
to simplify the provisioning during production.

The cloud and the web application are developed using
[TypeScript](https://www.typescriptlang.org/) (a typed superset of JavaScript).
JavaScript is the most popular language according to the
[2019 Stack Overflow survey](https://insights.stackoverflow.com/survey/2019#technology).
All (or at least most) cloud providers provide their SDKs in JavaScript.

It provides tools to configure the developer's cloud account for use with the
developer's devices and the single-page application (SPA). After the cloud
account has been configured, it provides the resources necessary for the asset
trackers to connect to the message broker and to send and receive messages. It
also provides the appropriate APIs for the SPA to interact with the developer's
devices.

The mobile-first SPA is developed using
[create-react-app](https://github.com/facebook/create-react-app) and it provides
a reference implementation of a user interface to control and interact with the
devices.

The web application offers the following features:

- User registration including password recovery
  - Optional - User approval by an admin.
- Listing of asset trackers
- Viewing of asset trackers
  - Current and historical device data
    - GPS location
    - Battery voltage
    - Accelerometer
  - Configure asset tracker
    - Update interval
    - Sensor threshold
- Managing of asset trackers
  - Delete asset tracker
  - Firmware update

### Supported Cloud Providers

|                   | Amazon Web Services                                                                     | Google Cloud                                              | Microsoft Azure                                               | Alibaba Cloud |
| ----------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------- | ------------- |
| LTE-M: TCP+MQTT   | [feature complete](https://bifravst.gitbook.io/bifravst/bifravst-on-aws/gettingstarted) | [on hold](https://github.com/bifravst/bifravst/issues/25) | [in progress](https://github.com/bifravst/bifravst/issues/29) | Planned       |
| NB-IoT: UDP+LWM2M | Planned                                                                                 | Planned                                                   | Planned                                                       | Planned       |

For cloud providers having no native UDP+LWM2M support using a bridge, e.g.
[Eclipse Californium](https://github.com/eclipse/californium), was evaluated.
For more information see
[Leshan LwM2M AWS IoT Gateway](https://github.com/coderbyheart/leshan-aws).

#### IoT Cloud vendor survey results

|            | Nordic internal (2019) | [Eclipse Fdtn. (2019)](https://iot.eclipse.org/resources/iot-developer-survey/iot-comm-adoption-survey-2019.pdf) |
| ---------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------- |
| AWS        | 1. 100%                | 1. 100%                                                                                                          |
| Google     | 2. 79%                 | 3. 73%                                                                                                           |
| Azure      | 3. 66%                 | 2. 84%                                                                                                           |
| ARM Pelion | 4. 25%                 |                                                                                                                  |
| IBM        | 5. 20%                 |                                                                                                                  |

## Support

[![{DevZone Community](https://img.shields.io/badge/%7BDevZone-community-brightgreen.svg)](https://devzone.nordicsemi.com/search?q=bifravst)

❓ You can get in touch via [DevZone](https://devzone.nordicsemi.com/) (You can
use the tag [Bifravst](https://devzone.nordicsemi.com/search?q=bifravst) to mark
your questions) or by
[creating an issue in the Bifravst repository](https://github.com/bifravst/bifravst/issues/new).

---

**Acknowledgments** _Pin Icon created by Nun from the Noun Project._ _Cat Icon
created by Focus Lab from the Noun Project._ _Amazon Web Services, the AWS logo
are trademarks of Amazon.com, Inc. or its affiliates in the United States and/or
other countries._ _Google and the Google logo are registered trademarks of
Google LLC._ _Microsoft and Azure are registered trademarks of Microsoft
Corporation in the United States and/or other countries._
