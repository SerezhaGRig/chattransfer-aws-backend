import { ChatOpenAI } from "@langchain/openai";
import { RunnableConfig } from "@langchain/core/runnables";
import * as https from "node:https";
import { AIMessage, SystemMessage } from "@langchain/core/messages";
import { tools } from "../tools";
import { IState } from "../types";
import MessageStream from "../../../entities/messageStream";
import { getDataSourceInstance } from "../../../instances/dataSource";
import { getConnectionParams } from "../../../config";
import { personalityPreamble, responseFormat } from "./propts";

const model = new ChatOpenAI(
  { model: "gpt-4o" },
  {
    httpAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
    fetch: async (url, init) => {
      const response = await fetch(url, init);
      console.info("response", { response });
      return response;
    },
  },
);
const boundModel = model.bindTools(tools);

export const callModel = async (state: IState, config?: RunnableConfig) => {
  console.log("colling model");
  console.info("state", state);
  console.info("config", config);
  const { messages } = state;
  console.info("state", { state });
  const enhancedMessages = [
    new SystemMessage({ content: personalityPreamble }),
    new SystemMessage({ content: responseFormat }),
    ...messages,
  ];
  const stream = await boundModel.stream(enhancedMessages, config);
  let fullMessage = ""; // Initialize an empty string to accumulate the chunks
  const dataSource = await getDataSourceInstance(getConnectionParams());
  const streamRepo = dataSource.getRepository(MessageStream);
  // Iterate through each chunk of the streamed response
  const { message_id: messageId } = config.metadata;
  for await (const messageChunk of stream) {
    const { content } = messageChunk;
    console.info("content", content);
    if (typeof content === "string" && typeof messageId === "string") {
      fullMessage += content; // Append each chunk to the full message
      await streamRepo.insert({
        message_id: messageId,
        content,
        timestamp: Date.now(),
      });
    }
  }
  console.log("fullMessage", { fullMessage });
  return {
    messages: [
      new AIMessage({
        content: fullMessage,
      }),
    ],
  };
};
