# Continuous Integration of Firmware

> The AWS implementation of Bifravst provides resources to continuously test the
> firmware build on real hardware.

## Overview

Every commit to the [firmware](https://github.com/bifravst/firmware) repo will
trigger a CI run on GitHub Actions. The CI run will

1. create a new device and credentials on AWS IoT
1. build a firmware that has the device ID hardcoded for the MQTT client ID
1. send the firmware along with the credentials to the
   [Firmware CI runner](https://github.com/bifravst/firmware-ci)
1. observe the firmware CI run until it finishes
1. download the log result from S3
1. run assertions against the log result

The [Firmware CI runner](https://github.com/bifravst/firmware-ci) is running on
a Raspberry Pi connected to AWS IoT where it receives jobs to execute:

1. it flashes the firmware and optional credentials using the connected debugger
   to the connected nRF9160 DK or Thingy:91
1. it then collects all log output until
   1. a timeout is reached
   1. or a stop condition is reached (wait for a log output to match a regex)
1. it uploads the logs to S3

## Preparation

The CI run on GitHub Actions uses AWS IoT jobs to communication with the
Firmware CI runner.

Run this command to set up the Firmware CI Stack in an AWS Account.

    npx cdk -a 'node --unhandled-rejections=strict dist/cdk/cloudformation-firmware-ci.js' deploy

Print the AWS Key for the CI runner on GitHub Actions using this command:

    node cli firmware-ci -s

Now you can create a new IoT Thing to be used for a Firmware CI runner:

    node cli firmware-ci -c

Provide the generated JSON file to the CI runner.

You can delete a device using this command:

    node cli firmware-ci -r <deviceId>
