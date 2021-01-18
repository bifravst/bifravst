.. _aws-firmware-ci:

Continuous Integration of Firmware
##################################

.. note::

    The AWS implementation of Bifravst provides resources to continuously
    test the firmware using real hardware.

Overview
********

Every commit to the `firmware <https://github.com/bifravst/firmware>`_
repo will trigger a CI run.
The CI run will

#.  create a new device and credentials on AWS IoT
#.  build a firmware that has the device ID hardcoded for the MQTT client ID
#.  create an AWS IoT job with the firmware and the credentials, which is picked up by a the `Firmware CI runner`_ (see below)
#.  observe the firmware CI run until it finishes
#.  download the log result from S3
#.  run assertions against the log result

The `Firmware CI runner`_ is running on a Raspberry Pi connected to AWS IoT where it receives jobs to execute:

#.  it flashes the firmware and optional credentials using the connected debugger to the connected nRF9160 DK or Thingy:91
#.  it then collects all log output until
    a.  a timeout is reached
    b.  or a stop condition is reached (wait for a log output to match a string)
#.  it uploads the logs to S3

.. note::

    These devices connect to the existing instance of Bifravst, so the firmware tests will not set up a new blank Bifravst AWS environment for every test, but be run against the production environment. This is to ensure that firmware release will work against the existing, working solution. This approach is designed for `trunk-based development <https://thinkinglabs.io/talks/feature-branching-considered-evil.html>`_.

Preparation
***********

Enable the Firmware CI resources of Bifravst that allow GitHub Actions to create test devices, and the the `Firmware CI runner`_ to connect by enabling the context switch ``firmware-ci`` when deploying the stack (see :ref:`Getting Started <aws-getting-started>`).

.. code-block:: bash

    echo "firmware-ci=1" >> context.cfg
    npx cdk deploy '*'

Print the AWS Key for the CI runner on GitHub Actions using this command:

.. code-block:: bash

    node cli firmware-ci -s
    
    Region: "<Region>"
    Bucket name: "<Bucket name>"
    Access Key ID: "<AWS Access Key ID>"
    Secret Access Key: "<AWS Secret Access Key>"

Configure these as secrets on the firmware GitHub repository in an environment called ``production``:

 - ``AWS_ACCESS_KEY_ID``
 - ``AWS_SECRET_ACCESS_KEY``
 - ``AWS_REGION``
 - ``STACK_NAME``

Now you can create a new IoT Thing to be used for a Firmware CI runner (see below):

.. code-block:: bash

    node cli firmware-ci -c

You can delete a device using this command:

.. code-block:: bash

    node cli firmware-ci -r "<deviceId>"

Firmware CI runner
******************

#.  Download `JLink <https://www.segger.com/downloads/jlink/>`_ for your platform.
    Use the path to the folder (e.g. ``~/JLink_Linux_V686_arm64/``) further down.

#.  Install `firmware-ci-aws <https://github.com/bifravst/firmware-ci-aws.git>`_:

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

    The recommended workflow is to use a `direnv <https://direnv.net/>`_ plugin for your shell which will automatically export the environment variables it finds in a ``.envrc`` file in the project folder:
    Create a new file ``.envrc`` in the project folder and add the credentials that are presented to you after you have created the new user.

#.  Copy over the JSON file containing the certificate

#.  Run:

    .. code-block:: bash

        node cli run "<device>" "<path to certificate.json>"

    ``<device>`` is the Linux file where the device is connected to, e.g. ``/dev/ttyACM0``.

The Firmware CI will now process all schedule jobs one after another.

.. _Firmware CI runner: https://github.com/bifravst/firmware-ci-aws