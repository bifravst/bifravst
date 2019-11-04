# Continuous Integration

Every change to the project is tested against an AWS account, all necessary
resources are set-up using CDK (this ensures that the definitions actually work)
in a separate AWS account, and then a BDD test-suite of end-to-end tests written
in [Gherkin](https://cucumber.io/docs/gherkin/), which describes tests in plain
english, is run.

This way the tests itself are not tied to the implementation and during
refactoring one cannot accidentally drop tests: tests written for test runners
like Jest tend to be tied closely to the API of the source-code implementation,
in a case of bigger refactoring the tests themselves usually need to be
refactored as well. Since the BDD test above are purely testing based on the
public API of the project (which is the native AWS API), they can be kept
unchanged during refactoring.

This also provides an easily grokable description of the available (and
implemented) features,
[in one folder](https://github.com/bifravst/aws/tree/saga/features).

## Running during development

You can run these test when developing:

    npm run test:e2e

## Set up on GitHub

In order to run the end-to-end tests an AWS Account needs to be prepared. It is
recommended to run them against a separate, blank account.

Provide these environment variables for GitHub Actions of the project:

- `GITHUB_TOKEN`: a GitHub token (used with `semantic-release`)
- `AWS_ACCOUNT`: the AWS account ID to run the e2e tests in
- `AWS_ACCESS_KEY_ID`: the access key id of the user which should run the tests
- `AWS_SECRET_ACCESS_KEY`: the secret access key of that user
