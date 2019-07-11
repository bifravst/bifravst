# *Bifravst :rainbow:*

> Gvðín gerþu bru af iorþu til himins, er heitir Bifravst.

## Vision

*Bifravst :rainbow:* aims to provide a concrete end-to-end sample for an IoT product in the asset tracker space, a *Cat Tracker*. 

![Bifravst: Cat Tracker IoT example](./docs/nyancat.gif)

**With *Bifravst :rainbow:* developers are able set up their devices using their cloud provider and start developing custom firmware for their prototype within minutes.**

*Bifravst :rainbow:* aims to provide answers and best practices to these questions:

- *How can I connect Nordic's long-range chips to my cloud provider?*
- *How do devices send data into the cloud?*
- *How can data be sent to the devices?*
- *How do can users and other services interact with devices?*
- *How can I update the application firmware of my devices while they are deployed in the field?*

### Comparison to nRF Connect for Cloud

*Bifravst :rainbow:* does not aim to replace or superseed nRF Connect for Cloud. It has a distinctly different scope:

|   | [nRF Connect for Cloud](https://www.nordicsemi.com/Software-and-Tools/Development-Tools/nRF-Connect-for-Cloud) | *Bifravst :rainbow:* |
|---|-----------------------|----------|
| **Development model** | Closed | Open |
| **License** | Commercial | Open Source |
| **Cloud vendor support** | AWS Only | Multiple |
| **Feature set** | Generalized, large | Specialized, small |
| **Hosting** | managed | self-hosted |
| **No. of devices** | unlimited | ~100 |

### Core principles

*Bifravst :rainbow:* is built around the following principles:

- *teach through showing*: all samples are build to solve a concrete use-case (a *Cat Tracker*) instead of providing generic or abstract solutions. *Bifravst :rainbow:* is not a framework, but a real application.
- *err on the side of security*: *Bifravst :rainbow:* follows the most robust security recommendations of the respective cloud provider.
- *single tenancy*: *Bifravst :rainbow:* implements a scenario in which all authenticated users can be trusted to access all devices. This is a typical scenario in IIoT products and simplifies the onboarding of new devices.
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

## Contact

You can get in touch by creating an issue in this repository, or via [DevZone](https://devzone.nordicsemi.com/), please use the tag [bifravst](https://devzone.nordicsemi.com/search?q=bifravst) to mark your questions.

---

<small>

**Acknowledgments**  
*Nyancat GIF by [ElKay on Know Your Meme](https://knowyourmeme.com/photos/480551-nyan-cat).*  
*Amazon Web Services, the aws logo are trademarks of Amazon.com, Inc. or its affiliates in the United States and/or other countries.*  
*Google and the Google logo are registered trademarks of Google LLC.*  
*Microsoft and Azure are registered trademarks of Microsoft Corporation in the United States and/or other countries.*

</small>
