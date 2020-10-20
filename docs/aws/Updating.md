# Updating an existing installation

If you already have an installation and you want to update to the latest
release, perform the following steps:

    git pull
    npm ci
    npx tsc
    npx cdk deploy '*'
    node cli historical-data --setup -r
