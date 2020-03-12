# Cell Geolocation

## UnwiredLabs API

To use [UnwiredLabs](https://unwiredlabs.com/) geolocation API, store your API
key as an SSM parameter and redeploy the stack:

    aws ssm put-parameter --name /bifravst/cellGeoLocation/unwiredlabs/apiKey --type String --value <API Key>
    npx cdk deploy '*'

This will update the StateMachine which resolves cells from devices to use the
UnwiredLabs API as a resolver.

> _Note:_ The Unwired Labs' LocationAPI is free for low volumes, however there
> is [opencellid.org](https://opencellid.org/) which allows to use the
> underlying dataset for free. If this is relevant for you, please
> [vote in this issue](https://github.com/bifravst/aws/issues/120).
