#!/bin/bash

dockerize -wait tcp://db:3306 -timeout 60s

npm install
node /usr/src/app/index.js
