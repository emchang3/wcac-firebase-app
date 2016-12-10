#!/bin/bash

if [ $1 == "master" ]
then
  echo "--- Checking out: $1 ---"
  sed -i -- "s/# source\/database.js/source\/database.js/g" .gitignore
  sed -i -- "s/# database.rules.json/database.rules.json/g" .gitignore
  git checkout $1
  git rebase firebase
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
fi
