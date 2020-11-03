================================================================================
Getting started
================================================================================

System requirements
================================================================================

You need a development environment with the `next LTS release candidate
of Node.js <https://nodejs.org/en/about/releases/>`_ (right now version
14).

If you are using Windows, we recommend the `[Windows Subsystem for
Linux <https://docs.microsoft.com/en-us/windows/wsl/install-win10>`_
with `Ubuntu 18.04
LTS <https://www.microsoft.com/nb-no/p/ubuntu-1804-lts/9n9tngvndl3q?rtc=1>`_.

Clone the project and install dependencies
================================================================================

Clone the latest version of the
`aws <https://github.com/bifravst/aws>`_ project and install the
dependencies:

.. code-block::

    git clone https://github.com/bifravst/aws.git bifravst-aws 
    cd bifravst-aws 
    npm ci npx tsc

Provide your AWS credentials
================================================================================

In order to set up Bifravst on AWS you first need to set up a new
account.

.. note::

    It is recommended to install these resources in a blank AWS account
    to clearly separate them from your other projects. After you have
    registered your personal account, sign-up for `AWS
    Organizations <https://aws.amazon.com/organizations/>`_ and create a
    sub-account for Bifravst. You can have as many sub-accounts as you like,
    without extra costs.

Go to your `IAM
console <https://console.aws.amazon.com/iam/home?region=us-east-1#/home>`_
and add a new user for programmatic access and attach the
:code:`arn:aws:iam::aws:policy/AdministratorAccess` policy
directly. Note that this action will create a user which can do
everything in the account, therefore it should only be created in an
account dedicated for Bifravst.

Follow `this
guide <https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html>`_
to configure AWS CDK.

The recommended workflow is to use a
`direnv <https://direnv.net/>`_ plugin for your shell which will
automatically export the environment variables it finds in a
:code:`.envrc` file in the project folder:

Create a new file :code:`.envrc` in the project folder and add the
credentials that are presented to you after you have created the new
user.

Also add your preferred region and your AWS account ID, which can be
found `under *My Account* on the AWS
console <https://console.aws.amazon.com/billing/home?#/account>`_, to
the :code:`.envrc` file.

.. code-block:: bash

    export AWS_ACCESS_KEY_ID=<value of Access key ID    
    export AWS_SECRET_ACCESS_KEY=<value of Secret access key> 
    export AWS_DEFAULT_REGION=<your preferred AWS region>

.. note::

    You should add the :code:`.envrc` to your `global
    .gitignore
    file <https://help.github.com/en/github/using-git/ignoring-files#create-a-global-gitignore>`_.

Supported regions
================================================================================

Not all AWS features are available in all AWS regions. You will see a
warning if you are deploying to a region that has not been tested and
CDK might fail.

Supported regions are:

-   :code:`us-east-1`
-   :code:`eu-west-1`
-   :code:`eu-central-1`

Install Bifravst into your AWS account
================================================================================

This step sets up the necessary resources in your AWS account:

.. code-block::

    npx cdk -a 'node dist/cdk/cloudformation-sourcecode.js' deploy
    npx cdk bootstrap
    npx cdk deploy '*'

CDK will present you with a list of permission changes to your account,
you need to review them carefully everytime you make changes to your
set-up. You can however skip this step if you are adventurous: 
:code:`npx cdk deploy '*' --require-approval never`. 🤞

After this completed successfully the historical data resources need to
be set up through the CLI:

.. code-block::

    node cli historical-data --setup

What's next:
================================================================================

You can now `deploy the web application <../app/AWS.html>`_ and
`provision credentials to your devices <./DeviceCredentials.html>`_.
