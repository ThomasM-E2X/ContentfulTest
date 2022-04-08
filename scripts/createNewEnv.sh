#!/bin/bash


wholeID=$(grep "CONTENTFUL_ENVIONMENT_ID=" .env)
envName=${wholeID#*=}
echo "Creating a new contentful environment called ${envName}"

contentful space environment create --name ${envName} --environment-id ${envName}