# Getting started

## System requirements

You need a development environment with the
[next LTS release candidate of Node.js](https://nodejs.org/en/about/releases/)
(right now version 12).

## Clone the project and install dependencies

Clone the latest version of the [gcp](https://github.com/bifravst/gcp) project
and install the dependencies:

    git clone https://github.com/bifravst/gcp.git bifravst-gcp
    cd bifravst-gcp
    npm ci

## Set up your GCP project

Follow the _Before you begin_ instructions in the
[Deployment Manager's Getting Started Guide](https://cloud.google.com/deployment-manager/docs/quickstart),
especially:

- [Enable the required APIs](https://console.cloud.google.com/flows/enableapi?apiid=deploymentmanager,iot)
  (Deployment Manager, IoT)
- [Install the Google Cloud SDK](https://cloud.google.com/sdk/install): most
  likely there is a package available through your operating system's package
  manager.
