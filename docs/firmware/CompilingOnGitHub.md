# Compiling using GitHub actions

Since it is a tedious effort to compile the application, you can leverage GitHub
Actions (which is free for open-source projects) to compile the application for
you. Using the
[provided workflow](https://github.com/bifravst/firmware/blob/saga/.github/workflows/build-and-release.yaml)
you can quickly set up compilation for your application using a fork.

After you have forked the repository,
[enable GitHub Actions](https://help.github.com/en/github/automating-your-workflow-with-github-actions/about-github-actions#requesting-to-join-the-limited-public-beta-for-github-actions)
and look for the _Actions_ tab in your repo, there you will find the the Action
runs.

Go to your repo's settings and configure a new Secret called `BROKER_HOSTNAME`.
Put the hostname of your AWS IoT Core MQTT broker in there. You can retrieve it
using this command:

    aws iot describe-endpoint --endpoint-type iot:Data-ATS

Now commit a change to your repo, e.g. change the MQTT hostname, and the Action
will compile the application and attach the HEX files to a release.
