import { ChatOpenAI } from "@langchain/openai";
import { RunnableConfig } from "@langchain/core/runnables";
import * as https from "node:https";
import { SystemMessage } from "@langchain/core/messages";
import { tools } from "../tools";
import { IState } from "../types";
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
  const { messages } = state;
  console.info("state", { state });
  const enhancedMessages = [
    new SystemMessage({ content: personalityPreamble }),
    new SystemMessage({ content: responseFormat }),
    ...messages,
  ];
  const response = await boundModel.invoke(enhancedMessages, config);
  console.log("response", { response });
  return { messages: [response] };
};
