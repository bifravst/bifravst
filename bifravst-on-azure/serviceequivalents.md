# Service Equivalents

Porting the [AWS-based](https://github.com/bifravst/aws) implementation to [Microsoft Azure](https://azure.microsoft.com/) \(Azure\) means finding the equivalent services:

| Feature | AWS | GCP |
| :--- | :--- | :--- |
| MQTT Broker | [IoT Core](https://aws.amazon.com/iot-core/) | [IoT Hub](https://azure.microsoft.com/en-us/services/iot-hub/) |
| Historical Data Analysis | [Athena](https://aws.amazon.com/athena/) | ? |
| Website Hosting | [CloudFront](https://aws.amazon.com/cloudfront/) + [S3](https://aws.amazon.com/s3/) | ? |
| CI/CD | [CodeBuild](https://aws.amazon.com/codebuild/) + [CodePipeline](https://aws.amazon.com/codepipeline/) | ? |
| User Authentication | [Cognito](https://aws.amazon.com/cognito/) | ? |
| Infrastructure as Code | [CDK](https://aws.amazon.com/cdk/) | [Resource Manager](https://azure.microsoft.com/en-us/features/resource-manager/) |

