.. _upgrading-installation:

Upgrading an existing installation
##################################

If you already have an installation and you want to upgrade to the latest release, run the following commands:

.. code-block:: bash

    git pull
    npm ci

Publishing the upgrade to AWS
*****************************

If you want to publish the upgrade to AWS, perform the steps for the initial installation described in :ref:`aws-getting-started`.

Continuously deploy upgrades
============================

If you want to automate the process of continuous deployment of upgrades, follow the instructions in :ref:`aws-continuous-deployment`.
