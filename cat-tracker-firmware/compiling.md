# Compiling

Follow the [Getting Started Guide](http://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/getting_started.html) of the Nordic Connect SDK to set up your system for compiling the project.

Then build the actual application: change to the `ncs/nrf/applications/cat_tracker` directory and build for your board:

## Thingy:91

```text
west build -p auto -b nrf9160_pca20035ns
```

## nRF9160 DK

```text
west build -p auto -b nrf9160_pca20035ns
```

## nRF9160 Tracker

> **Note:** Zephyr needs to be patched in order to enable the board.

```text
patch -b ncs/zephyr/cmake/app/boilerplate.cmake < ncs/nrf/.github/workflows/zephyr.patch
west build -p auto -b nrf9160_pca10015ns
```

## Location of the HEX file

The built HEX file will be located in `ncs/nrf/applications/cat_tracker/build/zephyr/merged.hex`.

## Compiling using GitHub actions

Since it is a tedious effort to compile the application, you can leverage GitHub Actions \(which is free for open-source projects\) to compile the application for you. Using the [provided workflow](https://github.com/bifravst/cat-tracker-fw/blob/saga/.github/workflows/build-and-release.yaml) you can quickly set up compilation for your application using a fork.

After you have forked the repository, [enable GitHub Actions](https://help.github.com/en/github/automating-your-workflow-with-github-actions/about-github-actions#requesting-to-join-the-limited-public-beta-for-github-actions) and look for the _Actions_ tab in your repo, there you will find the the Action runs. Now commit a change to your repo, e.g. change the MQTT hostname, and the Action will compile the application and attach the HEX files to a release.

