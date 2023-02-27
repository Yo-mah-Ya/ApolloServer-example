#!/usr/bin/env bash

SOURCE_DIR=$(cd $(dirname ${BASH_SOURCE:-$0}) && pwd)
cd ${SOURCE_DIR}

export $(cat ${SOURCE_DIR}/.env | grep -v ^\#)

yarn compile
yarn start
