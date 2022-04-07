import {
  createClient,
  PlainClientAPI,
  GetContentTypeParams,
  CreateContentTypeProps,
  ContentTypeProps,
} from "contentful-management";
import "dotenv/config";

class ContentfulClient {
  contentfulClient: PlainClientAPI;
  constructor() {
    this.contentfulClient = createClient(
      {
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
      },
      { type: "plain" }
    );
  }
  private handlerErrors = (error: any, contentModelName: string) => {
    let { status, statusText, message, details } = JSON.parse(error.message);
    console.log(`ERROR: ContentModel: ${contentModelName} returned an error message, see below for more info... 
  \n status:${status} - ${statusText} 
  \n message:${message} 
  \n Error:${JSON.stringify(details.errors, null, 2)}}`);
  };

  //TODO: Type this correctly
  pushChanges(modelsList: any) {
    for (const model of modelsList) {
      const params: GetContentTypeParams = {
        contentTypeId: model.name,
        environmentId: process.env.CONTENTFUL_ENVIONMENT_ID as string,
        spaceId: process.env.CONTENTFUL_SPACE_ID as string,
      };
      this.contentfulClient.contentType
        .get(params)
        .then((found) => {
          this.contentfulClient.contentType
            .update(params, {
              sys: found.sys,
              ...model,
              description: found.description,
              displayField: found.displayField,
            })
            .then((res) =>
              console.log(`...${model.name} successfully updated`)
            );
        })
        .catch((err) => {
          console.log("contentType not found, creating now...");
          this.contentfulClient.contentType
            .createWithId(params, model)
            .then((res) => console.log(`...${model.name} successfully created`))
            .catch((err) => this.handlerErrors(err, model.name));
        });
    }
  }

  removeEnv(env?: string) {
    const params = {
      environmentId: env
        ? env
        : process.env.CONTENTFUL_SPACE_ID?.toLowerCase().includes("master")
        ? ""
        : process.env.CONTENTFUL_SPACE_ID,
      spaceId: process.env.CONTENTFUL_SPACE_ID as string,
    };
    this.contentfulClient.environment
      .delete(params)
      .then(() => console.log(`${env} deleted`))
      .catch((err) => console.log(`$failed to delete ${env} \n ${err}`));
  }

  createEnv() {
    const params = {
      environmentId: process.env.CONTENTFUL_ENVIONMENT_ID as string,
      spaceId: process.env.CONTENTFUL_SPACE_ID as string,
      sourceEnvironmentId: "master",
    };
    this.contentfulClient.environment
      .createWithId(params, {
        name: process.env.CONTENTFUL_ENVIONMENT_ID,
      })
      .then(() =>
        console.log(`${process.env.CONTENTFUL_ENVIONMENT_ID} Created`)
      )
      .catch((err) =>
        console.log(
          `$failed to delete ${process.env.CONTENTFUL_ENVIONMENT_ID} \n ${err}`
        )
      );
  }
}

export default ContentfulClient;
