================================================================================
Continuous Integration of Firmware
================================================================================

.. note::

    The AWS implementation of Bifravst provides resources to continuously
    test the firmware build on real hardware.

Overview
================================================================================

Every commit to the `firmware <https://github.com/bifravst/firmware>`_
repo will trigger a CI run on GitHub Actions. The CI run will

#.  create a new device and credentials on AWS IoT
#.  build a firmware that has the device ID hardcoded for the MQTT
    client ID
#.  send the firmware along with the credentials to the 
    `Firmware CI runner`_
#.  observe the firmware CI run until it finishes
#.  download the log result from S3
#.  run assertions against the log result

The `Firmware CI runner`_ is
running on a Raspberry Pi connected to AWS IoT where it receives jobs to
execute:

#.  it flashes the firmware and optional credentials using the connected
    debugger to the connected nRF9160 DK or Thingy:91
#.  it then collects all log output until

    a.  a timeout is reached
    b.  or a stop condition is reached (wait for a log output to match a
        regex)
    
#.  it uploads the logs to S3

.. note::

    These devices connect to an existing instance, so the firmware
    tests will not set up a new blank Bifravst AWS environment for every
    test, but be run against an existing instance. The reason for that is
    that we want to reduce the possible reasons for failures during the
    test. The development model is also that firmware and cloud backend
    are development independently so there is limited value in running a
    test for a specific combination of cloud backend and firmware.

Preparation
================================================================================

The purpose of end-to-end testing is ensure that the firmware is
communicating correctly with Bifravst, therefore a test environment is
also needed. During test runs, a device certificate will be created and
passed alongside the firmware hexfile to the CI runner. The hardware
devices controlled by the CI runner will be provisioned and connect to
the endpoint of the test environment. Each CI run on GitHub Actions uses
AWS IoT jobs to communication with the Firmware CI runner.

.. note::

    It's recommended to use a separate account for CI purposes.

Set up a test instance of Bifravst with the Firmware CI resources in the
CI account (see `Getting Started <./GettingStarted.html>`_).

.. code-block:: bash

    npx cdk -a 'node dist/cdk/cloudformation-sourcecode.js' deploy 
    npx cdk bootstrap 
    # Do not deploy the web apps
    npx cdk deploy '*' -c firmware-ci=1 -c webapp=0 -c deviceui=0

You should also enable `Continuous Deployment <./ContinuousDeployment.html>`_ 
for the test instance so it's kept in sync with the development.

.. code-block:: bash

    npx cdk deploy '*' -c firmware-ci=1 -c webapp=0 -c deviceui=0 -c cd=1

Print the AWS Key for the CI runner on GitHub Actions using this
command:

.. code-block:: bash

    node cli firmware-ci -s
    
    Region: "<Region>"
    Bucket name: "<Bucket name>"
    Access Key ID: "<AWS Access Key ID>"
    Secret Access Key: "<AWS Secret Access Key>"

Now you can create a new IoT Thing to be used for a Firmware CI runner:

.. code-block:: bash

    node cli firmware-ci -c

You can delete a device using this command:

.. code-block:: bash

    node cli firmware-ci -r "<deviceId>"

CI Runner
================================================================================

#.  Download `JLink <https://www.segger.com/downloads/jlink/>`_ for
    your platform. Use the path to the folder (e.g.
    :code:`~/JLink_Linux_V686_arm64/`) further down.

#.  Install
    `firmware-ci-aws <https://github.com/bifravst/firmware-ci-aws.git>`_:

    .. code-block:: bash

        git clone https://github.com/bifravst/firmware-ci-aws.git
        cd firmware-ci-aws
        npm ci
        npx tsc

#.  Now provide these environment variables:

    .. code-block:: bash

        export AWS_ACCESS_KEY_ID="<AWS Access Key ID printed above>"
        export AWS_SECRET_ACCESS_KEY="<AWS Secret Access Key printed above>"
        export REGION="<Region printed above>"
        export BUCKET_NAME="<Bucket name printed above>"
        export PATH="<Path to JLINK>":$PATH

    The recommended workflow is to use a
    `direnv <https://direnv.net/>`_ plugin for your shell
    which will automatically export the environment variables it
    finds in a :code:`.envrc` file in the project folder: >
    Create a new file :code:`.envrc` in the project folder and add
    the credentials that are presented to you after you have created
    the new user.

#.  Copy over the JSON file containing the certificate

#.  Run:

    .. code-block:: bash

        node cli run "<path to certificate.json>"

The Firmware CI will now process all schedule jobs one after another.

.. _Firmware CI runner: https://github.com/bifravst/firmware-ci-aws