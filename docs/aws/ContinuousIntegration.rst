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

-   :code:`USER_GITHUB_TOKEN_FOR_ACTION_TRIGGER`: In order to be able to trigger this
    action, a GitHub user token with the permissions :code:`public_repo`, :code:`repo:status`,
    :code:`repo_deployment` is needed (the default Actions credentials
    `can't trigger other Actions <https://help.github.com/en/actions/reference/events-that-trigger-workflows#triggering-new-workflows-using-a-personal-access-token>`_).
-   :code:`AWS_ACCESS_KEY_ID`: the access key id of the user which should
    run the tests
-   :code:`AWS_SECRET_ACCESS_KEY`: the secret access key of that user
