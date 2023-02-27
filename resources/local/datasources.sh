#!/usr/bin/env bash


SOURCE_DIR=$(cd $(dirname ${BASH_SOURCE:-0}) && pwd)
cd ${SOURCE_DIR}

. ${SOURCE_DIR}/dynamodb/dynamodb.sh
. ${SOURCE_DIR}/opensearch/opensearch.sh
