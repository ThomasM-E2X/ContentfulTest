# GW E-commerce Contentful

This is the github repo which contains the Contentful intergrations for the GW E-commerce store

## Prerequisites

[Contentful CLI](https://www.contentful.com/developers/docs/tutorials/cli/installation/)

## How to

### Set up

1. Create a new branch in the format `feat/<branchName>`
2. Create/Modify your `.env` file so that

```
CONTENTFUL_SPACE_ID=<spaceID>
CONTENTFUL_ACCESS_TOKEN=<token>
CONTENTFUL_ENVIONMENT_ID=<branchName>
```

3. Login to the contentful cli and set your default space (Read the docs above)
4. Run `sh ./scripts/createNewEnv.sh`

### Update/create content models

1. Create a new file or modify an existing one inside the `/models` dir
2. Once you're happy push those changes to your new contentful environment

### Merge your new contenful environment in to the master branch

1. Create a new PR and Merge it in
2. This will trigger a job which will update the master alias for contentful

## Commands

`yarn contentful:push` - This will push any of your local model changes to your Contentful environment

`yarn contentful:build` - This will build the project
