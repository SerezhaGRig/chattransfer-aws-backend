import { translatorModel } from "../models/translator";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

export const translateIntoEnglish = async (message: string) => {
  const response = await translatorModel.invoke([
    new SystemMessage({ content: `translate user massage into english` }),
    new HumanMessage({ content: message }),
  ]);
  console.log("en translation response", { response });
  if (typeof response.content === "string") {
    return response.content;
  }
  return message;
};
export const translateIntoSpanish = async (message: string) => {
  const response = await translatorModel.invoke([
    new SystemMessage({ content: `translate user massage into spanish` }),
    new HumanMessage({ content: message }),
  ]);
  console.log("es translation response", { response });
  if (typeof response.content === "string") {
    return response.content;
  }
  return message;
};
export const translateInto = async (message: string, language: string) => {
  const response = await translatorModel.invoke([
    new SystemMessage({ content: `translate user massage into ${language}` }),
    new HumanMessage({ content: message }),
  ]);
  console.log(`${language} translation response`, { response });
  if (typeof response.content === "string") {
    return response.content;
  }
  return message;
};
