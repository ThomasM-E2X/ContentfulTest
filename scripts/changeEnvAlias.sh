#!/bin/bash


wholeID=$(grep "CONTENTFUL_ENVIONMENT_ID=" .env)
envName=${wholeID#*=}
echo "Pointing Master to the ${envName} environment"

contentful space environment-alias update --alias-id master --target-environment-id ${envName}