"use client";

import Chat from "components/Chat";
import { OpenAI } from "langchain/llms/openai";
import { RetrievalQAChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import * as fs from "fs";
import * as dotenv from "dotenv";

dotenv.config();

const runWithEmbeddings = async (
  question: any,
  txtPath: any,
  VECTOR_STORE_PATH: any
) => {
  const model = new OpenAI({
    temperature: 0.9,
  });
  let vectorStore;
  if (fs.existsSync(VECTOR_STORE_PATH)) {
    vectorStore = await HNSWLib.load(VECTOR_STORE_PATH, new OpenAIEmbeddings());
  } else {
    const text = fs.readFileSync(txtPath, "utf8");
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
    });
    const docs = await textSplitter.createDocuments([text]);
    vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());
    await vectorStore.save(VECTOR_STORE_PATH);
  }
  const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());
  const res = await chain.call({
    query: question,
  });
  return res;
};

const ChatBot = () => {
  const txtFilename = "Ayira";
  const txtPath = `./${txtFilename}.txt`;
  const VECTOR_STORE_PATH = `${txtFilename}.index`;

  const generateStory = async (question: string) => {
    const response = await runWithEmbeddings(
      question,
      txtPath,
      VECTOR_STORE_PATH
    );
    return response;
  };

  return (
    <div>
      <Chat generateStory={generateStory} />
    </div>
  );
};

export default ChatBot;
