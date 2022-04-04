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
    echo "ALIVE : ${container_name}"
    executeContainer ${STOP}
  else
    echo "DEAD : ${container_name}"
  fi
}

function executeContainer() {
  # Command to execute on the Container
  # 0: start
  # 1: stop
  # 2: remove
  local execCmd=$1
  local stringExecCmd=""

  if [ ${execCmd} = ${start} ] ; then
    # start container
    echo "=> Start ${container_name} container..."
    stringExecCmd="start"
  elif [ ${execCmd} = ${stop} ] ; then
    # stop container
    echo "=> Stop ${container_name} container..."
    stringExecCmd="stop"
  elif [ ${execCmd} = ${remove} ] ; then
    # remove container
    echo "=> Remove ${container_name} container..."
    stringExecCmd="rm"
  else
    # Exception
    echo "Please check the input parameter again"
    exit 9
  fi
  docker ${stringExecCmd} ${container_name}
}