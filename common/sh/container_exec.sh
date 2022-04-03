# 2022. 03. 13 kwangsoo_kim

#Reference1. https://graycha.tistory.com/116
#Reference2. https://zinirun.github.io/2020/09/18/docker-automation-shellscript/

#!/bin/bash

# when was error, exit shell script
set -e

source ./common_func.sh

version="latest"
container_name=$1

function createMongoDBContainer() {
  # create mongodb Container
  echo "=> Start create mongodb container..."
  setVariable "mongo" "kks518" "mongo" 27017
  oldContainerSearchAndRemove
  pull_docker_images
  createContainer
  executeContainer ${start}
}

function createInformyBotContainer() {
  # create informy-bot Container
  echo "=> Start create Informy-Bot container..."
  setVariable "informy-bot" "kks518" "node-web-app" 8080
  oldContainerSearchAndRemove
  pull_docker_images
  createContainer
  copyEnvFile
  executeContainer ${start}
  docker exec informy-bot npm run run
}

function setVariable() {
  container_name=$1
  dockerhub_image_name=$2
  dockerhub_username=$3
  port=$4
}

# Auto create container
function oldContainerSearchAndRemove() {
  searchContainerStatus ${container_name}
  executeContainer ${remove}
}

function pull_docker_images() {
  # pull latest docker image
  echo "=> Pull latest image..."
  docker pull ${dockerhub_username}/${dockerhub_image_name}:${version}
}

function createContainer() {
  # create container
  echo "=> Create container..."
  docker create -p ${port}:${port} --name ${container_name} ${dockerhub_username}/${dockerhub_image_name}
}

function copyEnvFile() {
  # copy .env file
  echo "=> Copy .env file..."
  docker cp ~/Informy-Bot/.env informy-bot:/usr/src/app/
}

echo "## Automaion docker build and run ##"
createMongoDBContainer
createInformyBotContainer