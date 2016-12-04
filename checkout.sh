#!/bin/bash

if [ $1 == "master" ]
then
  echo "--- Checking out: master ---"
  sed -i -- "s/# source\/database.js/source\/database.js/g" .gitignore
  git checkout master
fi

if [ $1 == "heroku"]
then
  echo "--- Checking out: heroku ---"
  sed -i -- "s/source\/database.js/# source\/database.js/g" .gitignore
  git checkout heroku
fi
