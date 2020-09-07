# Getting started

[![Release](https://img.shields.io/github/v/release/bifravst/app.svg)](https://github.com/bifravst/app/releases)
[![GitHub Actions](https://github.com/bifravst/app/workflows/Test%20and%20Release/badge.svg)](https://github.com/bifravst/app/actions)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Renovate](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com)
[![Mergify Status](https://img.shields.io/endpoint.svg?url=https://dashboard.mergify.io/badges/bifravst/athena-helpers&style=flat)](https://mergify.io)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier/)
[![ESLint: TypeScript](https://img.shields.io/badge/ESLint-TypeScript-blue.svg)](https://github.com/typescript-eslint/typescript-eslint)

The Cat Tracker Web Application is a reference single-page application (SPA)
developed using [create-react-app](https://github.com/facebook/create-react-app)
in [TypeScript](https://www.typescriptlang.org/).

## System requirements

You need a development environment with the
[next LTS release candidate of Node.js](https://nodejs.org/en/about/releases/)
(right now version 14).

If you are using Windows, we recommend the
[Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10)
with
[Ubuntu 18.04 LTS](https://www.microsoft.com/nb-no/p/ubuntu-1804-lts/9n9tngvndl3q?rtc=1).

## Clone the project and install dependencies

Clone the latest version of the [app](https://github.com/bifravst/app) project
and install the dependencies:

    git clone https://github.com/bifravst/app.git bifravst-app
    cd bifravst-app
    npm ci

Set the environment `EXTEND_ESLINT` to `true` (this is needed for Create React
App to pick up the
[custom eslint configuration](https://create-react-app.dev/docs/setting-up-your-editor/#experimental-extending-the-eslint-config)).

The recommended workflow is to use a [_direnv_](https://direnv.net/) plugin for
your shell which will automatically export the environment variables it finds in
a `.envrc` file in the project folder:

Create a new file `.envrc` in the project folder and add these environment
variables.

    export EXTEND_ESLINT=true

Add the tenant ID:

    direnv allow
