# Connect using the simulator

## Set up the UI

The [device-ui](https://github.com/bifravst/device-ui) provides a browser-based
UI to control the simulated device. Set it up on your Google Cloud using
Firebase Hosting.

> **Note:** Remember to
> [authenticate against the GitHub package registry](../guides/GitHubRegistry.md).

First
[create a new Firebase project](https://firebase.google.com/docs/web/setup),
let's call it `bifravst-device-ui` then

    git clone https://github.com/bifravst/device-ui
    cd device-ui
    npm ci
    npm run build
    npx firebase login
    npx firebase deploy

## Connect

Run this script to connect to the broker using the previously generated
certificate:

    node cli connect <id of your device>

This script also provides a browser-based UI which you can use to simulate
device data.
