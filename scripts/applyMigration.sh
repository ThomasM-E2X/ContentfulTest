#!/bin/bash

wholeID=$(grep "CONTENTFUL_ENVIONMENT_ID=" .env)
envName=${wholeID#*=}
echo "Attempting migration of $1 to  ${envName}"

filePath=migrations/$1

tsc && contentful space migration --environment-id ${envName} ./dist/$filePath.js --yes

touch migrations/$(($1 + 1)).ts
echo 'import Migration from "contentful-migration"; \n export = function (migration: Migration) {};' >> migrations/$(($1 + 1)).ts
rm $filePath.ts