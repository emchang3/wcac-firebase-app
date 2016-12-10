#!/bin/bash

if [ $1 == "master" ]
then
  echo "--- Checking out: $1 ---"
  sed -i -- "s/# source\/database.js/source\/database.js/g" .gitignore
  sed -i -- "s/# database.rules.json/database.rules.json/g" .gitignore
  git checkout $1
  git rebase firebase
  sed -i -- "s/1299129143443358/193476354446811/g" source/sagas.js
fi

if [ $1 == "heroku" ]
then
  echo "--- Checking out: $1 ---"
  sed -i -- "s/source\/database.js/# source\/database.js/g" .gitignore
  git checkout heroku
  git rebase master
fi

if [ $1 == "firebase" ]
then
  echo "--- Checking out: $1 ---"
  sed -i -- "s/source\/database.js/# source\/database.js/g" .gitignore
  sed -i -- "s/database.rules.json/# database.rules.json/g" .gitignore
  git checkout $1
  git rebase master
  sed -i -- "s/193476354446811/1299129143443358/g" source/sagas.js
fi
