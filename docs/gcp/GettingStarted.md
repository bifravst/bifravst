# Getting started

[![Release](https://img.shields.io/github/v/release/bifravst/gcp.svg)](https://github.com/bifravst/gcp/releases)
[![GitHub Actions](https://github.com/bifravst/gcp/workflows/Test%20and%20Release/badge.svg)](https://github.com/bifravst/gcp/actions)
[![Greenkeeper badge](https://badges.greenkeeper.io/bifravst/gcp.svg)](https://greenkeeper.io/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier/)
[![ESLint: TypeScript](https://img.shields.io/badge/ESLint-TypeScript-blue.svg)](https://github.com/typescript-eslint/typescript-eslint)

## System requirements

You need a development environment with the
[next LTS release candidate of Node.js](https://nodejs.org/en/about/releases/)
(right now version 12).

If you are using Windows, we recommend the
[Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10)
with
[Ubuntu 18.04 LTS](https://www.microsoft.com/nb-no/p/ubuntu-1804-lts/9n9tngvndl3q?rtc=1).

## Supported regions

Not all GCP features are available in all GCP regions.

Supported regions are:

- `us-central1`
- `europe-west1`
- `asia-east1`

## Clone the project and install dependencies

> **Note:** Remember to
> [authenticate against the GitHub package registry](../guides/GitHubRegistry.md).

Clone the latest version of the [gcp](https://github.com/bifravst/gcp) project
and install the dependencies:

    git clone https://github.com/bifravst/gcp.git bifravst-gcp
    cd bifravst-gcp
    npm ci
    npx tsc

## Set up your GCP project

[Create a new project](https://console.cloud.google.com/projectcreate) and
remember the project name
[on the Google Cloud Platform Console](https://console.cloud.google.com/projectcreate),
enable the APIs
[Cloud IoT](https://console.cloud.google.com/flows/enableapi?apiid=cloudiot.googleapis.com),
[Firebase Hosting](https://console.cloud.google.com/flows/enableapi?apiid=firebasehosting.googleapis.com)
and
[Identity Platform](https://console.cloud.google.com/customer-identity/onboarding)
(and enable the _Email / Password provider_), then

    # Export the project name
    export PROJECT_NAME=bifravst

    # Authenticate on the console
    gcloud auth login

    # Set the active project to $PROJECT_NAME
    gcloud config set project $PROJECT_NAME

    # Create the service account bifravst
    gcloud iam service-accounts create bifravst

    # Grant permissions to the service account.
    gcloud projects add-iam-policy-binding $PROJECT_NAME --member "serviceAccount:bifravst@$PROJECT_NAME.iam.gserviceaccount.com" --role "roles/owner"

Do this on every machine you want to interact with the Google Cloud Console:

# Generate the key file gcloud iam service-accounts keys create gcp.json

--iam-account bifravst@\$PROJECT_NAME.iam.gserviceaccount.com
