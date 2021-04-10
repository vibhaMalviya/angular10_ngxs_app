#!/bin/bash

appName=apm-analysis-microapp
appVersion=3.0.0

function buildFailed {
    echo
    echo !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    echo ${cc_red} BUILD FAILED: "$@"${cc_normal}
    echo !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    echo
}

function die {
    buildFailed "$@"
    exit 1
}

function print {
    echo ---\> "$@"
}

function printHeader {
    echo --------------------------------------------------
    print "$@"
}

function printEnvironmentVariables {
    printHeader ENVIRONMENT VARIABLES
    printenv
    echo Node version:
    node -v
}

function removeDistFolder {
  print Removing dist folder
  rm -rf dist
  echo removed dist folder
}

function installNodePackages {
   printHeader STARTING YARN INSTALL
   echo yarn version:
   yarn --version
   yarn install --silent || die yarn install failed
   print yarn install completed.
}

function installBowerPackages {
  printHeader STARTING BOWER INSTALL
  echo bower version:
  bower -v
  bower install --silent || die "bower install failed"
  print bower install completed.
}

function generatePolymerBundle {
  printHeader STARTING POLYMER BUNDLE
  yarn run polymerize
  print polymer bundle generated
}

function createArtifacts {
  printHeader CREATING ARTIFACTS
  artifactFileName=${appName}-${appVersion}-SNAPSHOT.zip
  cd dist
  zip -r ${artifactFileName} .
  print artifact ${artifactFileName} created
}

function generateDistBundle {
  printHeader STARTING DIST BUNDLE
  yarn run build
  cp package.json dist/package.json
  print dist bundle generated
}

function build {
    printHeader STARTING BUILD SCRIPT
    printEnvironmentVariables
    removeDistFolder
    installNodePackages
    installBowerPackages
    generatePolymerBundle
    generateDistBundle
    createArtifacts
}

build
print Build Done
