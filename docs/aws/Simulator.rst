.. _simulator:

Connect using the simulator
###########################

The CLI provides a software implementation of Cat Tracker for *testing purposes*.
This implementation allows to verify that the cloud configuration works, and this feature is also used for testing Bifravst using :ref:`aws-continuous-integration`.

To connect to a device and control the device using the simulator, complete the following steps:

* Create certificates for the device
* Connect to the device
* Use the Device simulator web application to control the device

To create certificates for a simulated device, run the following command:

.. code-block:: bash

    node create-device-cert

As the next step, you can run a simulated device using the generated certificate by running the following command:

.. code-block:: bash

    node cli connect "<id of your device>"

.. note::

   The device simulator will print a link to the Device simulator web application.
   For the link to work, either enable :ref:`aws-continuous-deployment`, or manually deploy the Device simulator web application as described in :ref:`deploy_dev_sim_web_app`.

Using the Device simulator web application
******************************************

The `device-ui <https://github.com/bifravst/device-ui>`_ provides a browser-based UI to control the simulated device.

.. figure:: ./device-simulator.png
   :alt: Device simulator web application

   Device simulator web application   

To use the Device simulator web application, complete the following steps:

* Clone the project and install the dependencies
* Run the Device simulator web application


Clone the project and install the dependencies
==============================================

Clone the latest version of the `device-ui`_ project and install the dependencies:

.. code-block:: bash

    git clone https://github.com/bifravst/device-ui.git bifravst-device-ui
    cd bifravst-device-ui
    npm ci

Run the Device simulator web application
========================================

You can run the Device simulator web application by using the following command:

.. code-block:: bash

    npm run

After executing the above command, copy the connection string printed from ``node cli connect "<id of your device>"`` (e.g. ``?endpoint=http%3A%2F%2Flocalhost%3A23719``) and append it to the browser address. (for example, ``http://localhost:8080/?endpoint=http%3A%2F%2Flocalhost%3A23719``).

.. _deploy_dev_sim_web_app:

Deploying the Device simulator web application
**********************************************

To build and setup the Device simulator web application to the S3 bucket created when setting up *Bifravst* in your AWS account, run the following commands:

.. code-block:: bash

    export $(cd ../bifravst-aws && node cli device-ui-config | xargs) 
    npm run build
    aws s3 cp build s3://$SNOWPACK_PUBLIC_DEVICE_UI_BUCKET_NAME \
    --recursive --metadata-directive REPLACE \
    --cache-control 'public,max-age=600' --expires ''
    aws cloudfront create-invalidation --distribution-id \
    $SNOWPACK_PUBLIC_CLOUDFRONT_DISTRIBUTION_ID_DEVICE_UI --paths /,/index.html
    echo "Done. Now open $SNOWPACK_PUBLIC_DEVICE_UI_BASE_URL to view the web app."

After executing the above commands, you can open the domain name printed in ``SNOWPACK_PUBLIC_DEVICE_UI_BASE_URL`` to view the Device simulator web application.
