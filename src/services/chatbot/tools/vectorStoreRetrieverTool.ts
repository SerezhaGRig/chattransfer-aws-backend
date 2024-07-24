import { createRetrieverTool } from "langchain/tools/retriever";
import { vectorStore } from "../vectorStore";
import { toolDescriptions } from "./toolDescriptions";
import { translateIntoSpanish } from "./helpers";

export const retrieverTools = toolDescriptions.map((toolDescr) => {
  const tool = createRetrieverTool(
    vectorStore.asRetriever({
      filter: {
        where: {
          operator: "Like",
          path: ["source"],
          valueText: `*${toolDescr.source}*`,
        },
      },
    }),
    {
      name: toolDescr.name,
      description: toolDescr.description,
    },
  );
  if (process.env.BOT_LANGUAGE === "es") {
    const originalInvoke = tool.invoke.bind(tool);
    tool.invoke = async (
      {
        query,
      }: {
        query: string;
      },
      config,
    ) => {
      const translatedQuery = await translateIntoSpanish(query);
      return originalInvoke(translatedQuery, config);
    };
  }
  return tool;
});
