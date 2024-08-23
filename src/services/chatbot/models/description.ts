import { ChatOpenAI } from "@langchain/openai";
import https from "node:https";

export const descriptionModel = new ChatOpenAI(
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
