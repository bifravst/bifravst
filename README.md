# *Bifravst :rainbow:*

> Gvðín gerþu bru af iorþu til himins, er heitir Bifravst.

[![CircleCI](https://circleci.com/gh/bifravst/bifravst/tree/saga.svg?style=svg)](https://circleci.com/gh/bifravst/bifravst/tree/saga)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier/)
[![ESLint: TypeScript](https://img.shields.io/badge/ESLint-TypeScript-blue.svg)](https://github.com/typescript-eslint/typescript-eslint)  
[![{DevZone Community](https://img.shields.io/badge/%7BDevZone-community-brightgreen.svg)](https://devzone.nordicsemi.com/search?q=bifravst)
[![Spectrum Chat](https://img.shields.io/badge/Spectrum-chat-blue.svg)](https://spectrum.chat/bifravst) [![Greenkeeper badge](https://badges.greenkeeper.io/bifravst/bifravst.svg)](https://greenkeeper.io/)

:construction: Development progress is managed in [this GitHub Project](https://github.com/orgs/bifravst/projects/1).

:question: You can get in touch by [creating an issue in this repository](https://github.com/bifravst/bifravst/issues/new),  
or via [DevZone](https://devzone.nordicsemi.com/) (please use the tag [bifravst](https://devzone.nordicsemi.com/search?q=bifravst) to mark your questions).  
:speech_balloon: There is also [a chat on Spectrum](https://spectrum.chat/bifravst).

## Vision

*Bifravst* aims to provide a concrete end-to-end sample for an IoT product in the asset tracker space, a *Cat Tracker*. 

![Bifravst: Cat Tracker IoT example](./docs/avatar.png)

**With *Bifravst* developers are able set up their devices using their cloud provider and start developing custom firmware for their prototype within minutes.**

*Bifravst* aims to provide answers and best practices to these questions:

- *How can I connect Nordic's long-range chips to my cloud provider?*
- *How do devices send data into the cloud?*
- *How can data be sent to the devices?*
- *How do can users and other services interact with devices?*
- *How can I update the application firmware of my devices while they are deployed in the field?*

### Comparison to nRF Connect for Cloud

*Bifravst* does not aim to replace or superseed nRF Connect for Cloud. It has a distinctly different scope:

|   | [nRF Connect for Cloud](https://www.nordicsemi.com/Software-and-Tools/Development-Tools/nRF-Connect-for-Cloud) | *Bifravst* |
|---|-----------------------|----------|
| **Development model** | Closed | Open |
| **License** | Commercial | Open Source |
| **Cloud vendor support** | AWS Only | Multiple |
| **Feature set** | Generalized, large | Specialized, small |
| **Hosting** | managed | self-hosted |
| **No. of devices** | unlimited | ~100 |
| **User Interface** | Desktop-Browsers, REST API | Mobile first web-app |

### Core principles

*Bifravst* is built around the following principles:

- *teach through showing*: all samples are build to solve a concrete use-case (a *Cat Tracker*) instead of providing generic or abstract solutions. *Bifravst* is not a framework, but a real application.
- *err on the side of security*: *Bifravst* follows the most robust security recommendations of the respective cloud provider.
- *single tenancy*: *Bifravst* implements a scenario in which all authenticated users can be trusted to access all devices. This is a typical scenario in IIoT products and simplifies the onboarding of new devices.
- *limited scalability*: This examples are intended for the small scale prototyping of IoT products (around 100 devices) with a quick turnaround for the user and for them to evaluate the necessary software components and processes.
- *cloud native*: build the sample following the respective cloud providers best practices.

### System overview and technical considerations

![System overview](./docs/System%20overview.jpg)

The cloud and web application will be developed using [TypeScript](https://www.typescriptlang.org/)  (a typed superset of JavaScript). JavaScript is the most popular language according to a [2019 Stack Overflow survey](https://insights.stackoverflow.com/survey/2019#technology). All (or at least most) cloud providers provide SDKs in JavaScript.

The reference single page application (SPA) will be developed using [create-react-app](https://github.com/facebook/create-react-app).

### Supported Cloud Providers

Support for cloud providers is planned be implemented in this order:

1. Amazon Web Services
1. Google Cloud
1. Alibaba Cloud

---

**Acknowledgments**  
*Nyan Cat by [Christopher Torres](https://www.youtube.com/watch?v=QH2-TGUlwu4).*  
*Northern Lighs by [Naian Wang](https://unsplash.com/photos/F9wrh2miJLA)*.  
*Amazon Web Services, the aws logo are trademarks of Amazon.com, Inc. or its affiliates in the United States and/or other countries.*  
*Google and the Google logo are registered trademarks of Google LLC.*  
*Microsoft and Azure are registered trademarks of Microsoft Corporation in the United States and/or other countries.*
