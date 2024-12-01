import { Client, Account } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(import.meta.env.VITE_API_APPWRITE_PROJECT_ID);

const account = new Account(client);

export { client, account };
