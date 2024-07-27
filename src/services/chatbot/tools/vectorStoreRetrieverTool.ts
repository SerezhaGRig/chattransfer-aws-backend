import { createRetrieverTool } from "langchain/tools/retriever";
import { vectorStore } from "../vectorStore";
import { toolDescriptions } from "./toolDescriptions";
import { translateIntoEnglish } from "./helpers";

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

    tool.invoke = async (params, config) => {
      const { query } = params;
      console.info("params", params);
      console.info("query", query);

      if (!query) {
        console.error("Query is undefined");
        return "Unable to retrieve info from tool";
      }

      try {
        const translatedQuery = await translateIntoEnglish(query);
        console.info("translatedQuery", { translatedQuery });
        return originalInvoke({ query: translatedQuery }, config);
      } catch (error) {
        console.error("Error in translation:", error);
        return "Unable to retrieve info from tool";
      }
    };
  }

  return tool;
});
