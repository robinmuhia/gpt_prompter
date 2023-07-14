import { PineconeClient } from "@pinecone-database/pinecone";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { createPineconeIndex } from "./createPinecone";
import { updatePinecone } from "./updatePinecone";
import { queryPineconeVectorStoreAndQueryLLM } from "./queryPineconeandGPT";

export const generateResponse = async (question: string) => {
  const loader = new DirectoryLoader("./app/chat-bot", {
    ".txt": (path) => new TextLoader(path),
  });
  const docs = await loader.load();
  const indexName = "ayirachatbot";
  const vectorDimension = 1536;
  const client = new PineconeClient();
  await client.init({
    apiKey: process.env.NEXT_PUBLIC_PINECONE_API_KEY,
    environment: process.env.NEXT_PUBLIC_PINECONE_ENVIRONMENT,
  });
  await createPineconeIndex(client, indexName, vectorDimension, docs);
  await updatePinecone(client, indexName, docs);
  const chat = await queryPineconeVectorStoreAndQueryLLM(
    client,
    indexName,
    question
  );
  return chat;
};
