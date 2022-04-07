import {
  createClient,
  PlainClientAPI,
  GetContentTypeParams,
} from "contentful-management";
import "dotenv/config";
import { models } from "./models";

const HandlerErrors = (error: any, contentModelName: string) => {
  let { status, statusText, message, details } = JSON.parse(error.message);
  console.log(`ERROR: ContentModel: ${contentModelName} returned an error message, see below for more info... 
  \n status:${status} - ${statusText} 
  \n message:${message} 
  \n Error:${JSON.stringify(details.errors, null, 2)}}`);
};

const updateData = (client: PlainClientAPI) => {
  for (const model of models) {
    const params: GetContentTypeParams = {
      contentTypeId: model.name,
      environmentId: "master",
      spaceId: process.env.CONTENTFUL_SPACE_ID as string,
    };
    client.contentType
      .get(params)
      .then((found) => {
        client.contentType
          .update(params, {
            sys: found.sys,
            ...model,
            description: found.description,
            displayField: found.displayField,
          })
          .then((res) => console.log(`...${model.name} successfully updated`));
      })
      .catch((err) => {
        console.log("contentType not found, creating now...");
        client.contentType
          .createWithId(params, model)
          .then((res) => console.log(`...${model.name} successfully created`))
          .catch((err) => HandlerErrors(err, model.name));
      });
  }
};

const client = createClient(
  {
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
  },
  { type: "plain" }
);

updateData(client);
