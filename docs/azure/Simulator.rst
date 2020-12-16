================================================================================
Connect using the simulator
================================================================================

Running the simulator
================================================================================

The CLI provides a software implementation of a Cat Tracker for *testing purposes*:
it allows to verify that the cloud configuration works, and this features is
also used for testing Bifravst using :ref:`Continuous Integration <azure-continuous-integration>` .

You can create certificates for a simulated device using:

.. code-block:: bash

    node create-device-cert

You can then run a simulated device using the generated certificate by running
this command:

.. code-block:: bash

    node cli connect "<id of your device>"

.. note::

    The device simulator will print a link to the Device Simulator Web Application. In
    order for it to work, either :ref:`Continuous Deployment <azure-continuous-deployment>` 
    needs to be enabled, or it has to be manually deployed (see below).

Using the Device Simulator Web Application
================================================================================

The device-ui_ provides a
browser-based UI to control the simulated device.

.. figure:: ../aws/device-simulator.png
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

Then copy the connection string printed from ``node cli connect "<id of your device>"``
(e.g. ``?endpoint=http%3A%2F%2Flocalhost%3A23719``) and append it to the
browsers address: e.g. ``http://localhost:8080/?endpoint=http%3A%2F%2Flocalhost%3A23719``.

Deploying the Device Simulator Web Application
================================================================================

This builds and deploys the Device Simulator Web Application to the S3 bucket created
when setting up *Bifravst* in your AWS account.

.. code-block:: bash

    cd ../bifravst-azure
    export $(cd ../bifravst-azure && node cli device-ui-config | xargs)
    export APP_NAME=${APP_NAME:-bifravst}
    cd ../bifravst-device-ui
    export SNOWPACK_PUBLIC_VERSION=`git describe --tags $(git rev-list --tags --max-count=1)`

    npm run build

    export DEVICE_UI_STORAGE_CONNECTION_STRING=`az storage account show-connection-string --name ${APP_NAME}deviceui --query 'connectionString'` 
    az storage blob service-properties update --connection-string ${DEVICE_UI_STORAGE_CONNECTION_STRING} --account-name ${APP_NAME}deviceui --static-website --404-document index.html --index-document index.html
    az storage blob upload-batch --connection-string ${DEVICE_UI_STORAGE_CONNECTION_STRING} --account-name ${APP_NAME}deviceui -s ./build -d '$web'

    echo "Done. Now open $SNOWPACK_PUBLIC_DEVICE_UI_BASE_URL to view the web app."

Afterwards you can open the domain name printed in
``SNOWPACK_PUBLIC_DEVICE_UI_BASE_URL`` to view the Device Simulator Web Application.

.. _device-ui: https://github.com/bifravst/device-ui