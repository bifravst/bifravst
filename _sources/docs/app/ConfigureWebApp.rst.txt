.. _app-configuration:

.. configure_web_app_start

The web application needs to be configured to be able to run with your account.

As a first step, you need to create a file called :file:`.env.local`, which `Create React App <https://create-react-app.dev/docs/adding-custom-environment-variables/>`_ uses to make the settings in the file available as environment variables during build-time.

.. configure_web_app_end

.. provide_versionstring_start

Run the following command to provide the version to the application:

.. code-block:: bash

    echo REACT_APP_VERSION=`git describe --tags $(git rev-list --tags --max-count=1)` >> .env.local

.. provide_versionstring_end

