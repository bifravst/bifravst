.. _index_azure:

Bifravst on Azure
#################

.. note::

   The Azure implementation is a `work in progress <https://github.com/bifravst/bifravst/issues/29>`_.

Bifravst on Azure is a reference implementation of a serverless backend for an IoT product developed using `Azure Resource Manager <https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/overview>`_ in `TypeScript <https://www.typescriptlang.org/>`_.

.. note::

    The Azure solution is using `Cosmos DB <https://docs.microsoft.com/en-us/azure/cosmos-db/introduction>`_ for querying historical device data and hence the minimum costs to run Bifravst on Azure is around $24 per month.
    However, you can check if you are eligible for `the free tier for new accounts <https://azure.microsoft.com/en-us/pricing/details/cosmos-db/>`_.


Documentation
*************

.. toctree::
   :titlesonly:

   GettingStarted.rst
   RunningInDocker.rst
   Upgrading.rst
   DeviceCredentials.rst
   Simulator.rst
   ContinuousDeployment.rst
   ContinuousIntegration.rst
   UnwiredLabsAPI.rst
   IoTShadowAndTopics.rst
   secure-azure-function-apps-with-microsoft-b2c.rst
