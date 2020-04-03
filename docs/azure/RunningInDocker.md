# Running the app locally with Docker

In case your system has a different Node.js version you can run the app locally
[_in a Docker container_](https://hub.docker.com/r/bifravst/azure-dev).

Export the IotHub connection string, the Avatar storage environment variables
(can be found in the function app's configuration) to the environment variables
`IOT_HUB_CONNECTION_STRING`,`AVATAR_STORAGE_ACCOUNT_NAME`,
`AVATAR_STORAGE_ACCESS_KEY`, `AVATAR_STORAGE_CONTAINER`,

Run the functions app:

    docker run --rm --net=host -P \
        -e IOT_HUB_CONNECTION_STRING \
        -e AVATAR_STORAGE_ACCOUNT_NAME \
        -e AVATAR_STORAGE_ACCESS_KEY \
        -e AVATAR_STORAGE_CONTAINER \
        -v ${PWD}:/workdir bifravst/azure-dev:latest \
        func start --typescript

You can then use `http://localhost:7071/` as your `REACT_APP_AZURE_API_ENDPOINT`
for the app.
