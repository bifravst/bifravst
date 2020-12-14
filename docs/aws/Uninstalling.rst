.. _uninstalling_bifravst:

Uninstalling Bifravst from AWS
##############################

To uninstall Bifravst, execute the commands described in this section.

.. note::

    The commands must be executed with care since they are destructive.

.. code-block:: bash

    STACK_NAME=bifravst
    
    node cli purge-buckets
    node cli purge-iot-user-policy-principals
    node cli purge-cas
    
    # Delete the Bifravst Stack 
    # Note that the action can take around 20 minutes  
    # The CloudFormation distributions especially take a long time to get deleted
    npx cdk destroy '*'
    
    # Delete the Source Code Stack 
    SOURCE_CODE_BUCKET=`aws cloudformation describe-stacks --stack-name $STACK_NAME-sourcecode | jq -r '.Stacks[0].Outputs[] | select(.OutputKey == "bucketName") | .OutputValue'` 
    aws s3 rb s3://$SOURCE_CODE_BUCKET --force
    npx cdk -a 'node dist/cdk/cloudformation-sourcecode.js' destroy '*'
