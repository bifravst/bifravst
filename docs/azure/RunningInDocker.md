# Running the app locally with Docker

In case your system has a different Node.js version you can run the app locally
_in a Docker container_.

Build the docker image:

    docker build  -t azure-functions-nodejs-12 .

Export the IotHub connection string (can be found in the function app's
configuration) to the environment variable `IOT_HUB_CONNECTION_STRING`.

Run the functions app:

    docker run --rm  -net=host -P -e IOT_HUB_CONNECTION_STRING \
        -v ${PWD}:/workdir azure-functions-nodejs-12:latest \
        func start --typescript
