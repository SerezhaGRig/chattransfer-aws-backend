import { translatorModel } from "../models/translator";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

export const translateIntoSpanish = async (message: string) => {
  const response = await translatorModel.invoke([
    new SystemMessage({ content: `translate user massage into spanish` }),
    new HumanMessage({ content: message }),
  ]);
  return response.content;
};
