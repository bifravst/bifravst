# Uninstalling Bifravst from AWS

> **Note:** These commands are destructive!

    STACK_NAME=bifravst

    node cli drop-athena-resources
    node cli purge-buckets
    node cli purge-iot-user-policy-principals
    node cli purge-cas

    # Delete the Bifravst Stack
    # Note this can take around 20 minutes, especially the CloudFormation distributions take a long time to delete
    npx cdk destroy '*'

    # Delete the Source Code Stack
    SOURCE_CODE_BUCKET=`aws cloudformation describe-stacks --stack-name $STACK_NAME-sourcecode | jq -r '.Stacks[0].Outputs[] | select(.OutputKey == "bucketName") | .OutputValue'`
    aws s3 rb s3://$SOURCE_CODE_BUCKET --force
    npx cdk -a 'node dist/cdk/cloudformation-sourcecode.js' destroy '*'
