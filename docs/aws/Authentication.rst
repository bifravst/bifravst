================================================================================
Authentication
================================================================================

Web App
================================================================================

`The Cat Tracker Web Application <../app/GettingStarted.html>`_ on AWS
connects to the AWS IoT broker using WebSockets, and the authentication
is done through AWS Cognito.

.. note::

    The way authorization works is explained
    `in the AWS docs <https://docs.aws.amazon.com/iot/latest/developerguide/cognito-identities.html>`_
    and in little more detail
    `here <https://docs.aws.amazon.com/iot/latest/developerguide/pub-sub-policy.html#pub-sub-policy-cognito>`_.

An Amazon Cognito authenticated user needs two policies to access AWS
IoT.

1.  The first policy is attached to the role of the authenticated pool
    to authenticate and authorize the Cognito user to communicate with
    AWS IoT.
2.  The second policy is attached to the authenticated Cognito user ID
    principal for fine-grained permissions.

**When authorizing Cognito identities, AWS IoT will consider both these
policies and grant the least privileges specified.** An action is only
allowed if both the policies allow the requested action, and if either
one of these policies disallow an action, that action will be
unauthorized.

Example
--------------------------------------------------------------------------------

Let's say we have this IAM policy on the authenticated role:

.. literalinclude:: ./iam-policy.json
  :language: JSON

And we have this IoT policy assigned to the Cognito Identity:

.. literalinclude:: ./iot-policy.json
  :language: JSON

The two policies will be ANDed and only the least combined privilege are
granted. That means the user can only subscribe to the "messages"
topic.
