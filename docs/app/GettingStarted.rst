.. _cat-tracker-webapp-get-started:

Getting started
###############

To setup the Cat Tracker web application, complete the following steps:

1. Check and make sure that you have the necessary system requirements.
#. Clone the project and install the dependencies.

System requirements
*******************

You need a development environment with the `upcoming LTS release candidate of Node.js <https://nodejs.org/en/about/releases/>`_ (current release is version 14).

If you are using Windows, we recommend using the `Windows Subsystem for Linux <https://docs.microsoft.com/en-us/windows/wsl/install-win10>`_ with `Ubuntu 18.04 LTS <https://www.microsoft.com/nb-no/p/ubuntu-1804-lts/9n9tngvndl3q?rtc=1>`_.

Clone the project and install the dependencies
**********************************************

Clone the latest version of the `Cat Tracker Web Application <https://github.com/bifravst/app>`_ project and install the dependencies:

.. code-block:: bash

    git clone https://github.com/bifravst/app.git cat-tracker-app
    cd cat-tracker-app
    npm ci

Set the environment ``EXTEND_ESLINT`` to ``true`` (It is needed for Create React App to pick up the `custom eslint configuration <https://create-react-app.dev/docs/setting-up-your-editor/#experimental-extending-the-eslint-config>`_).

The recommended workflow is to use a `direnv <https://direnv.net/>`_ plugin for your shell, which locates the environment variables in a :file:`.envrc` file in the project folder and automatically exports them.

Create a new :file:`.envrc` file in the project folder and add these environment variables by running the following command:


.. code-block:: bash

    export EXTEND_ESLINT=true

Run the following command to allow the changed file:

.. code-block:: bash

    direnv allow
