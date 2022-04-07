import "dotenv/config";
import ContentfulClient from "./contentfulClient";
import { models } from "./models";

const client = new ContentfulClient();
// client.pushChanges(models);
// client.removeEnv("GH-refactorContentfulClient");
client.createEnv();
