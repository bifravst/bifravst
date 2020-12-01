================================================================================
Continuous Integration
================================================================================

.. note::

    This is an advanced topic for those who want to further
    develop and customize Bifravst according to their needs. Please see
    the `GitHub project page <https://github.com/bifravst/aws/>`_ of
    Bifravst for AWS which implements the process outlined here.

Every change to the project is tested against an AWS account, all
necessary resources are set-up using CDK (this ensures that the
definitions actually work) in a separate AWS account, and then a BDD
test-suite of end-to-end tests written in
`Gherkin <https://cucumber.io/docs/gherkin/>`_, which describes tests
in plain english, is run.

This way the tests itself are not tied to the implementation and during
refactoring one cannot accidentally drop tests: tests written for test
runners like Jest tend to be tied closely to the API of the source-code
implementation, in a case of bigger refactoring the tests themselves
usually need to be refactored as well. Since the BDD test are purely
testing based on the public API of the project (which is the native AWS
API), they can be kept unchanged during refactoring.

This also provides an easily grokable description of the available (and
implemented) features, `in one
folder <https://github.com/bifravst/aws/tree/saga/features>`_.

Running during development
================================================================================

You can run these test when developing:

.. code-block:: bash

    npm run test:e2e

Set up on GitHub
================================================================================

In order to run the end-to-end tests an AWS Account needs to be
prepared. It is recommended to run them against a separate, blank
account.

Provide these environment variables for GitHub Actions of the project:

-   :code:`GITHUB_TOKEN`: a GitHub token (used with
    `semantic-release <https://github.com/semantic-release/semantic-release>`_)
-   :code:`AWS_ACCESS_KEY_ID`: the access key id of the user which should
    run the tests
-   :code:`AWS_SECRET_ACCESS_KEY`: the secret access key of that user


Know issues
================================================================================

If the stack creation fails on the :code:`AWS::ApiGatewayV2::Stage` resource
with this error:

.. epigraph::

    Insufficient permissions to enable logging (Service: AmazonApiGatewayV2; 
    Status Code: 400; Error Code: BadRequestException; 
    Request ID: 378c255b-c3ed-4d2c-8c00-c4cec2153dbf; Proxy: null)

you need to update the AWSLogDeliveryWrite20150319 policy, which is a built-in
policy of the AWS account:

.. code-block:: bash

    aws logs put-resource-policy --policy-name AWSLogDeliveryWrite20150319 \
    --policy-document '{"Version":"2012-10-17","Statement":[{"Sid":"AWSLogDeliveryWrite","Effect":"Allow","Principal":{"Service":"delivery.logs.amazonaws.com"},"Action":["logs:CreateLogStream","logs:PutLogEvents"],"Resource":["*"]}]}`
