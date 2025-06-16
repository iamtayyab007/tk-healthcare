import * as sdk from "node-appwrite";

export const {
  PROJECT_ID,
  API_KEY,
  NEXT_PUBLIC_ENDPOINT: endpoint,
} = process.env;

const client = new sdk.Client();
client.setEndpoint(endpoint!).setProject(PROJECT_ID!).setKey(API_KEY!);

export const users = new sdk.Users(client);
export const databases = new sdk.Databases(client);
