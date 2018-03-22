#!/bin/sh

if [ ! $1 ] ;then
    env="env"
else
    env=$1
fi

echo ":::::::::backent environment service for : $env"

if [ "$env" = "env" ];then
   sed -i "s/backend: '.*/backend: ''/g" ./src/env/env.ts
elif [ "$env" = "test" ];then
   sed -i "s/backend: '.*/backend: 'https:\/\/loclife.365gl.com'/g" ./src/env/env.ts
elif [ "$env" = "prod" ];then
   sed -i "s/backend: '.*/backend: 'https:\/\/life.365gl.com'/g" ./src/env/env.ts
else
   sed -i "s/backend: '.*/backend: ''/g" ./src/env/env.ts
fi
