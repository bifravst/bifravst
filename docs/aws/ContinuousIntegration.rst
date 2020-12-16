.. _aws-continuous-integration:

Continuous integration
######################

Continuous integration involves the following actions:

* Every change to the project is tested against an AWS account.
* All the necessary resources are setup using AWS CDK (which ensures that the definitions work) in a separate AWS account.
* A BDD test-suite of end-to-end tests written in `Gherkin <https://cucumber.io/docs/gherkin/>`_, which describes the tests in English, is run.

In this way, the tests are not tied to the implementation and during refactoring, and you cannot accidentally drop tests.
Tests written for test-runners like `Jest <https://jestjs.io/>`_ tend to be closely tied to the API of the source-code implementation.
In the case of bigger refactoring, the tests themselves usually need to be refactored as well.
Since the BDD tests are purely testing based on the public API of the project (which is the native AWS API), they can be kept unchanged during refactoring.

.. note::

   This is an advanced topic for those who want to further develop and customize Bifravst according to their needs. See the `GitHub project page of Bifravst for AWS <https://github.com/bifravst/aws/>`_ , for an implementation of the process outlined in this section.

The project also provides an easily understandable description of the available (and implemented) features, in a single folder called `features <https://github.com/bifravst/aws/tree/saga/features>`_.

Running the tests during development
************************************

You can run the following test during development:

.. code-block:: bash

    npm run test:e2e

Setting up the AWS account and providing the environment variables in GitHub
****************************************************************************

In order to run the end-to-end tests, an AWS Account needs to be set up.
It is recommended to run the tests in a separate, blank account.

Provide the following environment variables for GitHub Actions of the project:

* ``GITHUB_TOKEN`` - A GitHub token (used with `semantic-release <https://github.com/semantic-release/semantic-release>`_)
* ``AWS_ACCESS_KEY_ID`` - Access key id of the user, which is used to run the tests
* ``AWS_SECRET_ACCESS_KEY`` - Secret access key of the user


Known issues
************

If the stack creation fails on the ``AWS::ApiGatewayV2::Stage`` resource with the following error:

.. code-block:: console

    Insufficient permissions to enable logging (Service: AmazonApiGatewayV2; 
    Status Code: 400; Error Code: BadRequestException; 
    Request ID: 378c255b-c3ed-4d2c-8c00-c4cec2153dbf; Proxy: null)

you need to update the ``AWSLogDeliveryWrite20150319`` policy (a built-in policy of the AWS account) as shown below:

.. code-block:: bash

    aws logs put-resource-policy --policy-name AWSLogDeliveryWrite20150319 \
    --policy-document '{"Version":"2012-10-17","Statement":[{"Sid":"AWSLogDeliveryWrite","Effect":"Allow","Principal":{"Service":"delivery.logs.amazonaws.com"},"Action":["logs:CreateLogStream","logs:PutLogEvents"],"Resource":["*"]}]}'
