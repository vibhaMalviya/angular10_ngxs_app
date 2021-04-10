#!/bin/bash

ENV="$1"

function buildFailed {
    echo
    echo !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    echo !!!!!!!!!!!!!!!  ${cc_red}$@ BUILD FAILED${cc_normal} !!!!!!!!!!!!!!!
    echo !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    echo
}

function die {
    buildFailed $@
    exit 1
}

function setEnvironmentVariables {
    echo -------------------------------------------------
    echo "Setting environment variables for ${ENV}..."

    source ./local-dev-setup/.env.local.${ENV} || die could not set environment variables
}

function setLocalConfigInAppHub {
    echo -------------------------------------------------
    echo "Setting local config file for app hub for ${ENV}..."
    if [ $APP_HUB_DIR ]
    then
      APP_HUB_DIR=$APP_HUB_DIR
    else
      APP_HUB_DIR='./../ui-app-hub'
    fi
    cp ./local-dev-setup/localconfig.json.${ENV} ${APP_HUB_DIR}/localconfig.json || die could not set local config
}

function startServer {
    $(npm bin)/nodemon ./dist/server/server.js
}

setEnvironmentVariables
setLocalConfigInAppHub
startServer
