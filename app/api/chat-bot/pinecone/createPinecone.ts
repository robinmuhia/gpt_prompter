import { CreateRequest } from "@pinecone-database/pinecone";
import { updatePinecone } from "./updatePinecone";

export const createPineconeIndex = async (
  client: any,
  indexName: string,
  vectorDimension: number,
  docs: any
) => {
  try {
    console.log(`Checking "${indexName}"...`);

    const existingIndexes = await client.listIndexes();
    console.log(existingIndexes);

    if (!existingIndexes.includes(indexName)) {
      console.log(`Creating "${indexName}"...`);
      const createRequest: CreateRequest = {
        name: indexName,
        dimension: vectorDimension,
        metric: "cosine",
      };
      const createClient = await client.createIndex({
        createRequest,
      });
      console.log(`Created with client:`, createClient);
      await new Promise((resolve) => setTimeout(resolve, 60000));
      await updatePinecone(client, indexName, docs);
    } else {
      console.log(`"${indexName}" already exists.`);
    }
  } catch (err) {
    console.log(err);
  }
};
