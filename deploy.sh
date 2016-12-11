#!/bin/bash

sed -i -- "s/193476354446811/1299129143443358/g" source/sagas.js
firebase deploy
sed -i -- "s/1299129143443358/193476354446811/g" source/sagas.js
