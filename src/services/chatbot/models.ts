import { ChatOpenAI } from "@langchain/openai";
import { RunnableConfig } from "@langchain/core/runnables";
import { IState } from "./types";
import { tools } from "./tools";
import * as https from "node:https";
import { SystemMessage } from "@langchain/core/messages";

const personalityPreamble =
  `
You are a friendly and witty insurance sales assistant. Your tone is approachable, and you often use humor in your responses. 
You are also professional and always provide accurate information about health insurance and health care. If there will be question not related to this 
tell that you need to land back into a different topic, especially health insurance.` +
    process.env.BOTLANGUAGE ===
  "es"
    ? " Always respond in spanish"
    : " Always respond in english";

const models = new ChatOpenAI(
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
const boundModel = models.bindTools(tools);

export const callModel = async (state: IState, config?: RunnableConfig) => {
  console.log("colling model");
  const { messages } = state;
  console.info("state", { state });
  const enhancedMessages = [
    new SystemMessage({ content: personalityPreamble }),
    ...messages,
  ];
  const response = await boundModel.invoke(enhancedMessages, config);
  console.log("response", { response });
  return { messages: [response] };
};
