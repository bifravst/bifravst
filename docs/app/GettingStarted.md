# Getting started

The Cat Tracker Web Application is a reference single-page application (SPA)
developed using [create-react-app](https://github.com/facebook/create-react-app)
in [TypeScript](https://www.typescriptlang.org/).

## System requirements

You need a development environment with the
[next LTS release candidate of Node.js](https://nodejs.org/en/about/releases/)
(right now version 12).

If you are using Windows, we recommend the
[Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10)
with
[Ubuntu 18.04 LTS](https://www.microsoft.com/nb-no/p/ubuntu-1804-lts/9n9tngvndl3q?rtc=1).

## Clone the project and install dependencies

> **Note:** Remember to
> [authenticate against the GitHub package registry](../guides/GitHubRegistry.md).

Clone the latest version of the [app](https://github.com/bifravst/app) project
and install the dependencies:

    git clone https://github.com/bifravst/app.git bifravst-app
    cd bifravst-app
    npm ci
