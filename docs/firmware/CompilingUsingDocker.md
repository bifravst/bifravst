# Compiling using Docker

The docker image is not intended to be shared, but to simplify compiling
locally. It includes the source code so the dependencies can be cached.

    mkdir ./workdir
    docker build -t ncs .
    docker run --name ncs --rm -v ${PWD}:/workdir/nrf/fw-nrfconnect-nrf ncs west build -p auto -b nrf9160_pca20035ns
