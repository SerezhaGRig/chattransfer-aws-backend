import { ChatOpenAI } from "@langchain/openai";
import { RunnableConfig } from "@langchain/core/runnables";
import * as https from "node:https";
import { AIMessage, SystemMessage } from "@langchain/core/messages";
import { IState } from "../types";
import MessageStream from "../../../entities/messageStream";
import { getDataSourceInstance } from "../../../instances/dataSource";
import { getConnectionParams } from "../../../config";
import { personalityPreamble, responseFormat } from "./prompts";
import { getTools } from "../tools";

const model = new ChatOpenAI(
  { model: "gpt-4o-mini" },
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

export const callModel = async (state: IState, config?: RunnableConfig) => {
  console.log("colling model");
  console.info("state", state);
  console.info("config", config);
  const { messages } = state;
  console.info("state", { state });
  const botName = config?.metadata?.bot_name;
  const enhancedMessages = [
    new SystemMessage({
      content:
        typeof botName === "string"
          ? await personalityPreamble(botName)
          : await personalityPreamble(),
    }),
    new SystemMessage({ content: responseFormat }),
    ...messages,
  ];
  const tools = await getTools();
  const boundModel = model.bindTools(tools);
  if (config.metadata.mode === "invoke") {
    const response = await boundModel.invoke(enhancedMessages, config);
    console.log("response", { response });
    return { messages: [response] };
  }
  const stream = await boundModel.stream(enhancedMessages, config);
  let fullMessage = ""; // Initialize an empty string to accumulate the chunks
  const dataSource = await getDataSourceInstance(getConnectionParams());
  const streamRepo = dataSource.getRepository(MessageStream);
  // Iterate through each chunk of the streamed response
  const { message_id: messageId } = config.metadata;
  let first = true;
  for await (const messageChunk of stream) {
    const { content } = messageChunk;
    console.info("content", content);
    if (typeof content === "string" && typeof messageId === "string") {
      fullMessage += content; // Append each chunk to the full message
      try {
        await streamRepo.insert({
          message_id: messageId,
          content: fullMessage,
          //           .replace(/<(\w+)(\s+[^>]*)?>\s*<\/\1>/g, ""),
          ended: first === false && content === "",
          timestamp: Date.now(),
        });
        if (first && content === "") {
          first = false;
        }
      } catch (e) {
        console.error(e);
      }
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
