# Continuous Integration

In order to continuously test the solution against a real Azure account
additional configuration to Azure AD B2C is neccessary:

Follow
[this guide](https://docs.microsoft.com/en-us/azure/active-directory-b2c/microsoft-graph-get-started?tabs=app-reg-ga)
to allow the test-runner to programmatically access Azure AD B2C in order to
manage user accounts.

Copy the Application (client) ID and the Directory (tenant) ID of the created
client and the value of the create secret:

    export E2E_AD_B2C_TENANT_ID=<Directory (tenant) ID>
    export E2E_AD_B2C_CLIENT_ID=<Application (client) ID>
    export E2E_AD_B2C_CLIENT_SECRET=<client secret value>

For the test-runner to be able to programmatically log-in users, the resource
owner password credentials (ROPC) flow also
[needs to be enabled](https://docs.microsoft.com/EN-US/azure/active-directory-b2c/configure-ropc?tabs=app-reg-ga)
with these settings:

- Name: `B2C_1_developer`
- Application claims: select _Show more ..._ and then mark `Email Addresses` as
  a return claim

Grant permission to the Bifravst API for the App registration that is created
for the ROPC flow:

1.  In _API permissions_ click _+ Add a permission_ and under _My APIs_ select
    the app registration
1.  Enable the `bifravst.admin` permission and click _Add permission_
1.  Click _Grant admin consent for &lt;your main directory&gt;_

Copy the Application (client) ID of the created client:

    export E2E_AD_B2C_ROPC_CLIENT_ID=<Application (client) ID>

> _Note:_ If you know how to make the whole set-up process simpler,
> [please provide your input here!](https://github.com/bifravst/azure/issues/1)
