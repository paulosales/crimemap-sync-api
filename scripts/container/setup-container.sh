#!/bin/bash

echo "Checking if docker is installed...";
docker -v >> /dev/null 2>&1
if [ $? == 0 ]; then
  echo "installed"
else
  echo "not installed"
  exit
fi;

echo "Checking if docker-composer is installed...";
docker-compose -v >> /dev/null 2>&1
if [ $? == 0 ]; then
  echo "installed"
else
  echo "not installed"
  exit
fi;

DOCKER_COMPOSE=docker-compose.yml
INITDB_SCRIPT=init.db.sh

if [[ ! -f "$DOCKER_COMPOSE" ]]; then
  echo "Checking if wget is installed...";
  wget --version >> /dev/null 2>&1
  if [ $? == 0 ]; then
    echo "installed"
    echo "downloading docker-compose.yml file"
    wget https://raw.githubusercontent.com/paulosales/crimemap-sync-api/master/scripts/container/docker-compose.yml

    echo "downloading init.db.sh file"
    wget https://raw.githubusercontent.com/paulosales/crimemap-sync-api/master/scripts/container/init.db.sh
  else
    echo "not installed"
    exit
  fi;    
fi

echo ""
echo "We downloaded a functional 'docker-compose.yml' sample file and a database initializer script 'init.db.sh'."
echo "You can customize ot not these files and run the api application with:"
echo ""
echo "docker-compose up -d"
