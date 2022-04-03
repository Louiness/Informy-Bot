#!/bin/bash

set -e

start=0
stop=1
remove=2
conatiner_name=""

# find executing container
function searchContainerStatus() {
  conatiner_name=$1
  PROC_ID=$(docker ps | grep ${container_name})

  if [ -n "${PROC_ID}" ];
  then
    echo "ALIVE : ${PROC_ID}"
    executeContainer ${STOP}
  else
    echo "DEAD : ${PROC_ID}"
  fi
}

function executeContainer() {
  # Command to execute on the Container
  # 0: start
  # 1: stop
  # 2: remove
  local execCmd=$1

  if [ execCMD -eq ${start} ] ; then
    # start container
    echo "=> Start ${container_name} container..."
  elif [ execCMD -eq ${stop} ] ; then
    # stop container
    echo "=> Stop ${container_name} container..."
  elif [ execCMD -eq ${remove} ] ; then
    # remove container
    echo "=> Remove ${container_name} container..."
  else
    # Exception
    echo "Please check the input parameter again"
    exit 9
  fi
  docker execCMD ${container_name}
}