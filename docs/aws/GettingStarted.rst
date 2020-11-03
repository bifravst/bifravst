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

Clone the latest version of the `Bifravst AWS <https://github.com/bifravst/aws>`_
project and install the dependencies using the following commands:

.. code-block:: bash

    git clone https://github.com/bifravst/aws.git bifravst-aws 
    cd bifravst-aws 
    npm ci npx tsc

Provide your AWS credentials
================================================================================

In order to set up Bifravst on AWS you first need to set up a new AWS account
and provide AWS credentials.

.. note::

    It is recommended to install these resources in a blank AWS account
    to clearly separate them from your other projects. After you have
    registered your personal account, sign up for `AWS
    Organizations <https://aws.amazon.com/organizations/>`_ and create a
    sub-account for Bifravst. You can have many sub-accounts, without extra costs.

To setup a new AWS account and provide credentials, complete the following steps:

1.  Navigate to your `IAM console <https://console.aws.amazon.com/iam/home?region=us-east-1#/home>`_
    and add a new user for `programmatic access <https://wa.aws.amazon.com/wat.question.SEC_3.en.html>`_ 

2.  Attach the :code:`arn:aws:iam::aws:policy/AdministratorAccess` policy directly.

    .. warning::

        This action will create a user which can do
        everything in the account, therefore it should only be created in an
        account dedicated for Bifravst.

3.  See the `Getting Started guide <https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html>`_
    to configure the AWS CDK.

4.  As a recommended workflow, use a `direnv <https://direnv.net/>`_ plugin
    for your shell, which locates the environment variables in a :code:`.envrc` file in
    the project folder and automatically exports them.

5.  Create a new :code:`.envrc` file in the project folder and add the credentials
    that are provided to you when you create the new user.

6.  Also add your preferred region and your AWS account ID (that can be found
    under `My Account on the AWS console <https://console.aws.amazon.com/billing/home?#/account>`_),
    to the :code:`.envrc` file, as shown in the following code:

    .. code-block::

        export AWS_ACCESS_KEY_ID=<value of Access key ID    
        export AWS_SECRET_ACCESS_KEY=<value of Secret access key> 
        export AWS_DEFAULT_REGION=<your preferred AWS region>

    .. note::

        You should add the :code:`.envrc` file to your global 
        `.gitignore file <https://help.github.com/en/github/using-git/ignoring-files#create-a-global-gitignore>`_.

Supported regions
================================================================================

.. warning::

    Not all AWS features are available in all AWS regions. You will see a
    warning if you are deploying to a region that has not been tested and
    CDK might fail.

The supported regions are listed below:

-   :code:`us-east-1`
-   :code:`eu-west-1`
-   :code:`eu-central-1`

Install Bifravst into your AWS account
================================================================================

The following commands set up the necessary resources in your AWS account:

.. code-block:: bash

    npx cdk -a 'node dist/cdk/cloudformation-sourcecode.js' deploy
    npx cdk bootstrap
    npx cdk deploy '*'

The AWS CDK will provide a list of permission changes to your account, and you
need to review them carefully whenever you make changes to the setup.
However, this step is not mandatory, and you can skip it by using the following
command:

.. code-block:: bash

    # 🤞
    npx cdk deploy '*' --require-approval never

After this completed successfully the historical data resources need to
be set up through the CLI:

.. code-block:: bash

    node cli historical-data --setup

What's next:
================================================================================

You can now `deploy the web application <../app/AWS.html>`_ and
`provision credentials to your devices <./DeviceCredentials.html>`_.
