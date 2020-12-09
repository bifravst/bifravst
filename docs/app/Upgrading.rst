================================================================================
Upgrading an existing installation
================================================================================

If you already have an installation and you want to upgrade to the latest
release, follow these steps.

.. code-block:: bash

    git pull
    npm ci

Publishing the upgrade to AWS
================================================================================

Now follow the `same steps <./AWS.html>`_ as with the first installation.

Continuously deploy upgrades
--------------------------------------------------------------------------------

If you want to automate this proces, follow
`these instructions <../aws/ContinuousDeployment.html>`_.
