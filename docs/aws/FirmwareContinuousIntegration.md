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

> Note: these devices connect to an existing instance, so the firmware tests
> will not set up a new blank Bifravst AWS environment for every test, but be
> run against an existing instance. The reason for that is that we want to
> reduce the possible reasons for failures during the test. The development
> model is also that firmware and cloud backend are development independently so
> there is limited value in running a test for a specific combination of cloud
> backend and firmware.

## Preparation

The purpose of end-to-end testing is ensure that the firmware is communicating
correctly with Bifravst, therefore a test environment is also needed. During
test runs, a device certificate will be created and passed alongside the
firmware hexfile to the CI runner. The hardware devices controlled by the CI
runner will be provisioned and connect to the endpoint of the test environment.
Each CI run on GitHub Actions uses AWS IoT jobs to communication with the
Firmware CI runner.

> **Note:** It's recommended to use a separate account for CI purposes.

Set up a test instance of Bifravst with the Firmware CI resources in the CI
account (see [Getting Started](./GettingStarted.md)).

    npx cdk -a 'node dist/cdk/cloudformation-sourcecode.js' deploy
    npx cdk bootstrap
    # Do not deploy the web apps
    npx cdk deploy '*' -c firmware-ci=1 -c webapp=0 -c deviceui=0

You should also enable [Continuous Deployment](./ContinuousDeployment.md) for
the test instance so it's kept in sync with the development.

    npx cdk deploy '*' -c firmware-ci=1 -c webapp=0 -c deviceui=0 -c cd=1

Print the AWS Key for the CI runner on GitHub Actions using this command:

    node cli firmware-ci -s

Now you can create a new IoT Thing to be used for a Firmware CI runner:

    node cli firmware-ci -c

Provide the generated JSON file to the CI runner.

You can delete a device using this command:

    node cli firmware-ci -r <deviceId>
