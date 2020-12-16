.. _aws-getting-started:

Getting started
###############

To setup *Bifravst* on AWS, complete the following steps:

1. Check and make sure that you have the necessary system requirements.
#. Clone the project and install dependencies.
#. Provide your AWS credentials.
#. Check and verify that the deployment is planned in one of the supported regions.
#. Install *Bifravst* into your AWS account.

System requirements
*******************

You need a development environment with the `upcoming LTS release candidate of Node.js <https://nodejs.org/en/about/releases/>`_ (current release is version 14).

If you are using Windows, we recommend using the `Windows Subsystem for Linux <https://docs.microsoft.com/en-us/windows/wsl/install-win10>`_ with `Ubuntu 18.04
LTS <https://www.microsoft.com/nb-no/p/ubuntu-1804-lts/9n9tngvndl3q?rtc=1>`_.

.. note::

   Windows is not included in the continuous integration tests, and hence if you encounter issues, you can open an `issue in the Bifravst AWS project <https://github.com/bifravst/aws/issues/new>`_ 

Clone the project and install dependencies
******************************************

Clone the latest version of the `Bifravst AWS <https://github.com/bifravst/aws>`_ project and install the dependencies using the following commands:

.. code-block:: bash

    git clone https://github.com/bifravst/aws.git bifravst-aws 
    cd bifravst-aws 
    npm ci
    npx tsc

Provide your AWS credentials
****************************

To set up Bifravst on AWS, you must first set up a new AWS account and provide the AWS credentials.

.. note::

   It is recommended to install these resources in a blank AWS account to clearly separate them from your other projects.
   After you have registered your personal account, sign up for `AWS Organizations <https://aws.amazon.com/organizations/>`_ and create a sub-account for Bifravst.
   You can have many sub-accounts, without extra costs.

To setup a new AWS account and provide credentials, complete the following steps:

1.  Navigate to your `IAM console <https://console.aws.amazon.com/iam/home?region=us-east-1#/home>`_ and add a new user for `programmatic access <https://wa.aws.amazon.com/wat.question.SEC_3.en.html>`_.

#.  Attach the ``arn:aws:iam::aws:policy/AdministratorAccess`` policy directly.

    .. note::

       This action will create a user with full access rights to the account, and therefore it must only be created in an account dedicated for Bifravst.

#.  See the `CDK Getting Started guide <https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html>`_ to configure the AWS CDK.

#.  As a recommended workflow, use a `direnv <https://direnv.net/>`_ plugin for your shell, which locates the environment variables in a :file:`.envrc` file in the project folder and automatically exports them.

#.  Create a new :file:`.envrc` file in the project folder and add the credentials that are provided to you when you create the new user.

#.  Also add your preferred region and your AWS account ID (that can be found under `My Account on the AWS console <https://console.aws.amazon.com/billing/home?#/account>`_), to the :file:`.envrc` file, as shown in the following code:

    .. code-block:: bash

        export AWS_ACCESS_KEY_ID="<value of Access key ID>"
        export AWS_SECRET_ACCESS_KEY="<value of Secret access key>"
        export AWS_DEFAULT_REGION="<your preferred AWS region>"

    .. note::

       You must add the :file:`.envrc` file to your global `.gitignore file <https://help.github.com/en/github/using-git/ignoring-files#create-a-global-gitignore>`_.

Supported regions
*****************

You must also confirm that you are deploying to a region that is supported.

.. note::

   Not all AWS features are available in all AWS regions.
   You will see a warning if you are deploying to a region that has not been tested and the AWS CDK might fail.

The supported regions are listed below:

*   ``us-east-1``
*   ``us-east-2``
*   ``us-west-1``
*   ``us-west-2``
*   ``eu-west-1``

Install *Bifravst* into your AWS account
****************************************

The following commands set up the necessary resources in your AWS account:

.. code-block:: bash

    npx cdk -a 'node dist/cdk/cloudformation-sourcecode.js' deploy
    npx cdk bootstrap
    npx cdk deploy '*'
    # This is a fix for a bug with AWS CloudFormation and HTTP APIs
    # See https://github.com/bifravst/aws/issues/455
    node dist/cdk/helper/addFakeRoute.js

The AWS CDK will provide a list of permission changes to your account, and you need to review them carefully whenever you make changes to the setup.
However, this step is not mandatory, and you can skip it by using the following command:

.. code-block:: bash

   npx cdk deploy '*' --require-approval never

Next steps
**********

You can now :ref:`deploy the web application <app-aws>`  and :ref:`provision credentials to your devices <aws-device-credentials>`.
