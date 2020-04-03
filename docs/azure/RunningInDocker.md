# Running the app locally with Docker

In case your system has a different Node.js version you can run the app locally
[_in a Docker container_](https://hub.docker.com/r/bifravst/azure-dev).

Export the IotHub connection string (can be found in the function app's
configuration) to the environment variable `IOT_HUB_CONNECTION_STRING`.

Run the functions app:

    docker run --rm --net=host -P -e IOT_HUB_CONNECTION_STRING \
        -v ${PWD}:/workdir bifravst/azure-dev:latest \
        func start --typescript

You can then use `http://localhost:7071/` as your `REACT_APP_AZURE_API_ENDPOINT`
for the app.
