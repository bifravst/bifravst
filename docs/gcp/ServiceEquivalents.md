# Service Equivalents

Porting the [AWS-based](https://github.com/bifravst/aws) implementation to
[Google Cloud Platform](https://cloud.google.com/) (GCP) means finding the
equivalent services:

| Feature                  | AWS                                                                                                   | GCP                                                                                                                                                                                     |
| ------------------------ | ----------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MQTT Broker              | [IoT Core](https://aws.amazon.com/iot-core/)                                                          | [IoT](https://cloud.google.com/solutions/iot/)                                                                                                                                          |
| Historical Data Analysis | [Athena](https://aws.amazon.com/athena/)                                                              | [BigQuery](https://cloud.google.com/bigquery/)                                                                                                                                          |
| Website Hosting          | [CloudFront](https://aws.amazon.com/cloudfront/) + [S3](https://aws.amazon.com/s3/)                   | [Firebase Hosting](https://firebase.google.com/docs/hosting/)                                                                                                                           |
| CI/CD                    | [CodeBuild](https://aws.amazon.com/codebuild/) + [CodePipeline](https://aws.amazon.com/codepipeline/) | [Cloud Build](https://cloud.google.com/cloud-build/)                                                                                                                                    |
| User Authentication      | [Cognito](https://aws.amazon.com/cognito/)                                                            | [Identity Platform](https://cloud.google.com/identity-platform/) which is the same as [Firebase Authentication](https://firebase.google.com/docs/auth)                                  |
| Infrastructure as Code   | [CDK](https://aws.amazon.com/cdk/)                                                                    | [Deployment Manager](https://cloud.google.com/deployment-manager/) ([Supported GCP type providers](https://cloud.google.com/deployment-manager/docs/configuration/supported-gcp-types)) |
