import "dotenv/config";
import { OpenAIEmbeddings } from "@langchain/openai";
import weaviate from "weaviate-ts-client";
import { WeaviateStore } from "@langchain/weaviate";

const { WEAVIATE_SCHEME, WEAVIATE_HOST, WEAVIATE_API_KEY, INDEX_NAME } =
  process.env;

const indexName = INDEX_NAME || "Test";

const client = (weaviate as any).client({
  scheme: WEAVIATE_SCHEME || "https",
  host: WEAVIATE_HOST || "localhost",
  apiKey: WEAVIATE_API_KEY
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      new (weaviate as any).ApiKey(WEAVIATE_API_KEY)
    : undefined,
});

export const vectorStore = new WeaviateStore(new OpenAIEmbeddings(), {
  client,
  indexName,
  textKey: "text",
});

export const getVectorStoreDynamic = async (indexName: string) => {
  return new WeaviateStore(new OpenAIEmbeddings(), {
    client,
    indexName: indexName.toUpperCase(),
    textKey: "text",
  });
};
