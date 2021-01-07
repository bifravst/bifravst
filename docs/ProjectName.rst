Project Naming conventions
##########################

.. admonition:: Written name

    The overall name for the project is: **Asset Tracker Cloud Example**

When individual _flavors_ are considered, the name is **Asset Tracker for [Vendor Name] Example**

- **Asset Tracker for AWS Example**
- **Asset Tracker for Azure Example**
- ... and so forth

Instance naming
***************

Since the software / firmware itself provides the implementation of a *Cat Tracker*, in case where it is referenced in the documenation it is called **Cat Tracker**.

Example
-------

    - "To deploy the Cat Tracker web application to AWS, complete the following steps ..."
    - "In order to connect the cloud using the Cat Tracker firmware ..."

Slug
****

Main projects
=============

The project slugs use the following naming rules for the **main** project repositories that implement the Asset Tracker Cloud Example or contain otherwise source code *specific to the Asset Tracker Cloud Example*.

.. admonition:: Conventions

    - use ``asset-tracker-cloud-[vendor]`` as a prefix to denote that it contains *cloud example code*
    - append ``-[vendor]`` to the prefix if the project relates to a specific cloud vendor
    - for the firmware repo use ``asset-tracker-firmware``
    - do not use ``example`` as part of the slug

Examples
--------

+--------------------------------------------------+--------------------------------------------------------------------+
| Project                                          | Purpose                                                            |
+==================================================+====================================================================+
| ``asset-tracker-cloud-docs``                     | Documentation                                                      |
+--------------------------------------------------+--------------------------------------------------------------------+
| ``asset-tracker-cloud-aws``                      | AWS cloud resources                                                |
+--------------------------------------------------+--------------------------------------------------------------------+
| ``asset-tracker-cloud-azure``                    | Azure cloud resources                                              |
+--------------------------------------------------+--------------------------------------------------------------------+
| ``asset-tracker-cloud-app``                      | Web App                                                            |
+--------------------------------------------------+--------------------------------------------------------------------+
| ``asset-tracker-firmware``                       | Firmware                                                           |
+--------------------------------------------------+--------------------------------------------------------------------+
| ``asset-tracker-cloud-device-ui``                | Device Simulator Web App                                           |
+--------------------------------------------------+--------------------------------------------------------------------+
| ``asset-tracker-cloud-device-ui-server``         | Device Simulator Server used by the Device Simulator Web App       |
+--------------------------------------------------+--------------------------------------------------------------------+
| ``asset-tracker-cloud-code-style``               | Code style for all Asset Tracker Cloud Example projects            |
+--------------------------------------------------+--------------------------------------------------------------------+
| ``asset-tracker-cloud-eslint-config-typescript`` | TypeScript code style for all Asset Tracker Cloud Example projects |
+--------------------------------------------------+--------------------------------------------------------------------+

Helper projects
===============

The project slugs use the following naming rules for **helper** repositories:

.. admonition:: Conventions for cloud vendor specific projects

    Use ``cloud-[vendor]-`` as a prefix for projects that have cloud vendor specific code, but are **not specific to the asset tracker application**, e.g. helper libraries for a specific AWS service.

Examples
--------

+---------------------------------------+----------------------------------------------------+
| Project                               | Purpose                                            |
+=======================================+====================================================+
| ``cloud-aws-cloudformation-cleaner``  | cleans up left-over stacks from CI runs            |
+---------------------------------------+----------------------------------------------------+
| ``cloud-aws-cloudformation-helpers``  | simplifies working with AWS CloudFormation stacks. |
+---------------------------------------+----------------------------------------------------+
| ``cloud-aws-package-layered-lambdas`` | packages lambdas with Webpack for deploying to AWS |
+---------------------------------------+----------------------------------------------------+
| ``cloud-aws-timestream-helpers``      | simplifies working with AWS Timestream             |
+---------------------------------------+----------------------------------------------------+
| ``cloud-aws-firmware-ci``             | Firmware CI runner for AWS                         |
+---------------------------------------+----------------------------------------------------+

.. admonition:: Convention for cloud agnostic projects

    Use ``cloud-`` as a prefix for prjects that are used with a cloud but are vendor-agnostic.

Examples
--------

+---------------------------------------+-----------------------------------------------------------------------------------------------------------+
| Project                               | Purpose                                                                                                   |
+=======================================+===========================================================================================================+
| ``cloud-firmware-ci``                 | Contains helper functions for interacting with the nRF9160 used during end-to-end tests                   |
+---------------------------------------+-----------------------------------------------------------------------------------------------------------+
| ``cloud-e2e-bdd-test-runner``         | Implementation of a test-runner for end-to-end tests of cloud-native applications using Gherkin features. |
+---------------------------------------+-----------------------------------------------------------------------------------------------------------+
| ``cloud-e2e-bdd-test-runner-example`` | Demonstrates ``e2e-bdd-test-runner``                                                                      |
+---------------------------------------+-----------------------------------------------------------------------------------------------------------+

.. admonition:: Convention for libraries

    Use ``-[language]`` as a suffix for projects that provide libraries for a specific programming environment or language.

Examples
--------

+---------------------------------+---------------------------------------------------------------------------------------------------+
| Project                         | Purpose                                                                                           |
+=================================+===================================================================================================+
| ``cell-geolocation-helpers-js`` | Helper functions for the cell geolocation feature.                                                |
+---------------------------------+---------------------------------------------------------------------------------------------------+
| ``object-to-env-js``            | Convert an object to environment variable definitions                                             |
+---------------------------------+---------------------------------------------------------------------------------------------------+
| ``random-words-js``             | Returns random 8-letter words from the Webster's Unabridged Dictionary.                           |
+---------------------------------+---------------------------------------------------------------------------------------------------+
| ``rsrp-bar-react``              | React component to render an RSRP bar or a failover icon in case the reported value is not valid. |
+---------------------------------+---------------------------------------------------------------------------------------------------+

.. admonition:: Convention for standalone projects

    Keep standalone projects as is.

Examples
--------

+-------------------------+---------------------------------------------------------------------------------+
| Project                 | Purpose                                                                         |
+=========================+=================================================================================+
| ``at_client``           | Compile the AT client sample for 9160DK and Thingy:91 and publish it regularly. |
+-------------------------+---------------------------------------------------------------------------------+
