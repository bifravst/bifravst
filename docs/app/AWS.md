# Deploying to AWS

> **Note**: first make sure you have [set up the necessary AWS resources](../aws/GettingStarted.md).

## Configure ids of your AWS resources

The web app needs to know the ids of the AWS resources that were created during the set-up of the stack. Run this command in the `bifravst-aws` directory and copy the output to a file called `.env.local`.

    node dist/scripts/print-react-app-configuration.js

Example output:

	REACT_APP_WEBSITE_BUCKET_NAME=bifravst-websitbucketc74c6fbf-e126q3sws4eq
	REACT_APP_USER_POOL_CLIENT_ID=7mfbudbt5eq56kgo2244sa9kc8
	REACT_APP_MQTT_ENDPOINT=a34x44yyrk96tg-ats.iot.eu-central-1.amazonaws.com
	REACT_APP_USER_POOL_ID=eu-central-1_KBMdKxWIt
	REACT_APP_IDENTITY_POOL_ID=eu-central-1:5b979419-01d8-498a-a024-c344ac2a3301
	REACT_APP_WEBSITE_DOMAIN_NAME=bifravst-websitbucketc74c6fbf-e126q3sws4eq.s3.eu-central-1.amazonaws.com
	REACT_APP_AWS_REGION=eu-central-1

Create React App [makes these available as environment variables during build time](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables).
