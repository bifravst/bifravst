# Authentication

## Web App

[The Cat Tracker Web Application](../app/GettingStarted.md) on AWS connects to the AWS IoT broker using WebSockets, and the authentication is done through AWS Cognito.

> Note: The way authorization works is explained in the AWS docs [here](https://docs.aws.amazon.com/iot/latest/developerguide/cognito-identities.html) and in little more detail [here](https://docs.aws.amazon.com/iot/latest/developerguide/pub-sub-policy.html#pub-sub-policy-cognito).

An Amazon Cognito authenticated user needs two policies to access AWS IoT. 

1. The first policy is attached to the role of the authenticated pool to authenticate and authorize the Cognito user to communicate with AWS IoT. 
2. The second policy is attached to the authenticated Cognito user ID principal for fine-grained permissions.

**When authorizing Cognito identities, AWS IoT will consider both these policies and grant the least privileges specified.** An action is only allowed if both the policies allow the requested action, and if either one of these policies disallow an action, that action will be unauthorized.

### Example

Let's say we have this IAM policy on the authenticated role:

	{
		"Version": "2012-10-17",
		"Statement": [
			{
				"Effect": "Allow",
				"Action": [
					"iot:Subscribe"
				],
				"Resource": [
					"*"
				]
			}
		]
	}

And we have this IoT policy assigned to the Cognito Identity:

	{
		"Version": "2012-10-17",
		"Statement": [
			{
				"Effect": "Allow",
				"Action": [
					"iot:Subscribe"
				],
				"Resource": [
					"arn:aws:iot:*:*:topicfilter/messages"
				]
			}
		]
	}


The two policies will be ANDed and only the least combined privilege are granted. That means the user can only subscribe to the "messages" topic.
