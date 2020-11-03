================================================================================
Getting started
================================================================================

System requirements
================================================================================

You need a development environment with the `upcoming LTS release candidate
of Node.js <https://nodejs.org/en/about/releases/>`_ (current release is version
14).

If you are using Windows, we recommend using the `Windows Subsystem for
Linux <https://docs.microsoft.com/en-us/windows/wsl/install-win10>`_
with `Ubuntu 18.04
LTS <https://www.microsoft.com/nb-no/p/ubuntu-1804-lts/9n9tngvndl3q?rtc=1>`_.

Clone the project and install dependencies
================================================================================

Clone the latest version of the
`app <https://github.com/bifravst/app>`_ project and install the
dependencies:

.. code-block:: bash

    git clone https://github.com/bifravst/app.git bifravst-app
    cd bifravst-app
    npm ci

Set the environment :code:`EXTEND_ESLINT` to :code:`true`
(this is needed for Create React App to pick up the
`custom eslint configuration <https://create-react-app.dev/docs/setting-up-your-editor/#experimental-extending-the-eslint-config>`_).

The recommended workflow is to use a
`direvn <https://direnv.net/>` plugin for your shell which will
automatically export the environment variables it finds in a
:code:`.envrc` file in the project folder:

Create a new :code:`.envrc` file in the project folder and add
these environment variables.

.. code-block:: bash

    export EXTEND_ESLINT=true

Remember to allow the changed file:

.. code-block:: bash

    direnv allow
