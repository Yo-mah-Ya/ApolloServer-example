#!/usr/bin/env bash

set -euo pipefail

CONTAINER_NAME="dynamodb-local";

if [ $( docker container ps -a -f name=${CONTAINER_NAME} | wc -l ) -eq 2 ]; then
    echo "${CONTAINER_NAME} exists"
    docker container rm -f ${CONTAINER_NAME}
fi

docker container run \
    -itd \
    -v $PWD/docker/dynamodb:/home/dynamodblocal/data \
    --name ${CONTAINER_NAME} \
    -p 8000:8000 \
    amazon/dynamodb-local:latest
sleep 1


tables=(
    films
    people
    planets
    species
    starships
    vehicles
)
for table in "${tables[@]}" ; do
    aws dynamodb create-table \
        --endpoint-url http://localhost:8000 \
        --table-name ${table} \
        --attribute-definitions \
            AttributeName=id,AttributeType=S \
        --key-schema \
            AttributeName=id,KeyType=HASH \
        --provisioned-throughput \
            ReadCapacityUnits=1,WriteCapacityUnits=1
done
