#!/usr/bin/env bash

CONTAINER_NAME="opensearch-local";

if [ $( docker container ps -a -f name=${CONTAINER_NAME} | wc -l ) -eq 2 ]; then
    echo "${CONTAINER_NAME} exists"
    docker container rm -f ${CONTAINER_NAME}
fi

docker container run -d \
    -p 9200:9200 -p 9600:9600 \
    -e "discovery.type=single-node" \
    --name ${CONTAINER_NAME} \
    opensearchproject/opensearch:latest
