# Updating an existing installation

If you already have an installation and you want to update to the latest release, follow these steps.

```text
git pull
npm ci
npx tsc
LOCATION=northeurope
az group deployment create --resource-group bifravst --mode Complete --name bifravst --template-file azuredeploy.json \
    --parameters iotHubName='bifravst' location="$LOCATION"
```

