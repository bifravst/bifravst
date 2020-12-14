================================================================================
Connect using the simulator
================================================================================

Running the simulator
================================================================================

The CLI provides a software implementation of a Cat Tracker for *testing purposes*:
it allows to verify that the cloud configuration works, and this features is
also used for testing Bifravst using `Continuous Integration <../ContinuousIntegration.html>`_.

You can create certificates for a simulated device using:

.. code-block:: bash

    node create-device-cert

You can then run a simulated device using the generated certificate by running
this command:

.. code-block:: bash

    node cli connect "<id of your device>"

.. note::

    The device simulator will print a link to the Device Simulator Web Application. In
    order for it to work, either `Continuous Deployment <./ContinuousDeployment.html>`_
    needs to be enabled, or it has to be manually deployed (see below).

Using the Device Simulator Web Application
================================================================================

The device-ui_ provides a
browser-based UI to control the simulated device.

.. figure:: ./device-simulator.png
   :alt: Device Simulator Web Application

   Device Simulator Web Application

Clone the project and install dependencies
--------------------------------------------------------------------------------

Clone the latest version of the
device-ui_ project and
install the dependencies:

.. code-block:: bash

    git clone https://github.com/bifravst/device-ui.git bifravst-device-ui
    cd bifravst-device-ui
    npm ci

Run the Device Simulator Web Application
--------------------------------------------------------------------------------

.. code-block:: bash

    npm run

Then copy the connection string printed from :code:`node cli connect "<id of your device>"`
(e.g. :code:`?endpoint=http%3A%2F%2Flocalhost%3A23719`) and append it to the
browsers address: e.g. :code:`http://localhost:8080/?endpoint=http%3A%2F%2Flocalhost%3A23719`.

Deploying the Device Simulator Web Application
================================================================================

This builds and deploys the Device Simulator Web Application to the S3 bucket created
when setting up *Bifravst* in your AWS account.

.. code-block:: bash

    export $(cd ../bifravst-aws && node cli device-ui-config | xargs) 
    npm run build
    aws s3 cp build s3://$SNOWPACK_PUBLIC_DEVICE_UI_BUCKET_NAME \
    --recursive --metadata-directive REPLACE \
    --cache-control 'public,max-age=600' --expires ''
    aws cloudfront create-invalidation --distribution-id \
    $SNOWPACK_PUBLIC_CLOUDFRONT_DISTRIBUTION_ID_DEVICE_UI --paths /,/index.html
    echo "Done. Now open $SNOWPACK_PUBLIC_DEVICE_UI_BASE_URL to view the web app."

Afterwards you can open the domain name printed in
:code:`SNOWPACK_PUBLIC_DEVICE_UI_BASE_URL` to view the Device Simulator Web Application.

.. _device-ui: https://github.com/bifravst/device-ui