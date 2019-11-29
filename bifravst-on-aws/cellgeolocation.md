# Cell Geolocation

## UnwiredLabs API

To use [UnwiredLabs](https://unwiredlabs.com/) geolocation API, store your API key as an SSM parameter and redeploy the stack:

```text
aws ssm put-parameter --name /bifravst/cellGeoLocation/unwiredlabs/apiKey --type String --value <API Key>
npx cdk deploy '*'
```

This will update the StateMachine which resolves cells from devices to use the UnwiredLabs API as a resolver.

