import { translatorModel } from "../models/translator";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

export const translateIntoEnglish = async (message: string) => {
  const response = await translatorModel.invoke([
    new SystemMessage({ content: `translate user massage into english` }),
    new HumanMessage({ content: message }),
  ]);
  console.log("trResponse", { response });
  return response.content;
};
