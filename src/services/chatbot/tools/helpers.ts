import { translatorModel } from "../models/translator";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

export const translateIntoEnglish = async (message: string) => {
  const response = await translatorModel.invoke([
    new SystemMessage({
      content: `translate user massage into english if it is in english respond with the same message`,
    }),
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
export const generateDescription = async (message: string) => {
  const response = await translatorModel.invoke([
    new SystemMessage({
      content: `generate description for user message description length should be less then 1024 characters and description should be as short as possible`,
    }),
    new HumanMessage({ content: message }),
  ]);
  console.log("generated description response", { response });
  if (typeof response.content === "string") {
    console.log("generated description", { content: response.content });
    return response.content;
  }
  return message;
};
