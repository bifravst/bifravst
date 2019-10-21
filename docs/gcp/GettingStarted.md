# Getting started

## System requirements

You need a development environment with the
[next LTS release candidate of Node.js](https://nodejs.org/en/about/releases/)
(right now version 12).

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
