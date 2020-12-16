.. _app-aws:

================================================================================
Deploying to AWS
================================================================================

.. note::

    first make sure you have :ref:`set up the necessary AWS resources <aws-getting-started>` .

Configure the react app
================================================================================

The app needs to be configured to be able to run against your account.

In this section we will create a file called ``.env.local`` which Create React App uses to make the settings in there available `as environment variables during build time <https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables>`_.

Configure ids of your AWS resources
--------------------------------------------------------------------------------

The web app needs to know the ids of the AWS resources that were created during the set-up of the stack.
Run this command in the ``bifravst-app`` directory to copy the output to a file called ``.env.local``.

.. code-block:: bash

    node ../bifravst-aws/cli react-config > .env.local

Version string
--------------------------------------------------------------------------------

Run this command to provide the version to the app:

.. code-block:: bash

    echo REACT_APP_VERSION=`git describe --tags $(git rev-list --tags --max-count=1)` >> .env.local

Example ``.env.local``
--------------------------------------------------------------------------------

This is how the file would look like:

.. code-block:: bash

    REACT_APP_REGION=eu-west-1
    REACT_APP_HISTORICALDATA_TABLE_INFO=historicalDatadb40B23029-Qzk2Jrr88tOy|historicalDatatableD9D795E1-zdSByjtTqoAE
    REACT_APP_USER_IOT_POLICY_ARN=arn:aws:iot:eu-west-1:249963682018:policy/bifravst-userIotPolicy-OMYBF5CI5Q6A
    REACT_APP_DFU_BUCKET_NAME=bifravst-dfustoragebucket2cc839ff-qz8k9bslldrf
    REACT_APP_JITP_ROLE_ARN=arn:aws:iam::249963682018:role/bifravst-iotJitpRole7B509A5D-5Y6BQY6KD9TX
    REACT_APP_THING_GROUP_NAME=bifravstThings
    REACT_APP_AVATAR_BUCKET_NAME=bifravst-avatarsbucket8221a59f-1usxf1qi1qj1r
    REACT_APP_USER_POOL_CLIENT_ID=1rh4eacmu5c5ppq2pspnq8tcu5
    REACT_APP_MQTT_ENDPOINT=a3g4yd69u8cu7b-ats.iot.eu-west-1.amazonaws.com
    REACT_APP_DEVELOPER_PROVIDER_NAME=developerAuthenticated
    REACT_APP_THING_POLICY_ARN=arn:aws:iot:eu-west-1:249963682018:policy/bifravst-thingPolicy-1GR1TP3RXOO0G
    REACT_APP_USER_POOL_ID=eu-west-1_FiY6h4xjd
    REACT_APP_IDENTITY_POOL_ID=eu-west-1:52cc8188-ec90-47d7-b3ee-634187fa6413
    REACT_APP_WEB_APP_DOMAIN_NAME=d250wnpv81c7q9.cloudfront.net
    REACT_APP_WEB_APP_BUCKET_NAME=bifravst-webapps-webapphostingbucketc58d3c2b-1or3is1vmmq5q
    REACT_APP_CLOUDFRONT_DISTRIBUTION_ID_WEB_APP=EGNO6F61DSJ5Y
    REACT_APP_VERSION=v3.6.1

Deploy the app
================================================================================

This builds and deploys the app to the S3 bucket created when setting up *Bifravst* in your AWS account.

.. code-block:: bash

    export $(cat .env.local | xargs)
    export EXTEND_ESLINT=true
    npm run build
    aws s3 cp build s3://$REACT_APP_WEB_APP_BUCKET_NAME \
    --recursive --metadata-directive REPLACE \
    --cache-control 'public,max-age=600' --expires ''
    aws cloudfront create-invalidation --distribution-id \
    $REACT_APP_CLOUDFRONT_DISTRIBUTION_ID_WEB_APP --paths /,/index.html
    echo "Done. Now open https://$REACT_APP_WEB_APP_DOMAIN_NAME/ to view the web app."

Afterwards you can open the domain name printed in ``REACT_APP_WEB_APP_DOMAIN_NAME`` to view the web app.

Registering a user
================================================================================

There are no predefined user accounts in the userpool, so you need to register a new user.

.. note::

    The UserPool is configured to use the email address as the username.
