import { createRetrieverTool } from "langchain/tools/retriever";
import { vectorStore } from "../vectorStore";
import { toolDescriptions } from "./toolDescriptions";
import { translateIntoEnglish, translateIntoSpanish } from "./helpers";

export const retrieverTools = toolDescriptions.map((toolDescr) => {
  const tool = createRetrieverTool(
    vectorStore.asRetriever({
      k: 1,
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const query = params.query || params.args.query;
      console.info("params", params);
      console.info("query", query);

      if (!query) {
        console.error("Query is undefined");
        return "Unable to retrieve info from tool";
      }

      try {
        const translatedQuery = await translateIntoEnglish(query);
        console.info("translatedQuery", { translatedQuery });
        const response = await originalInvoke(
          { query: translatedQuery },
          config,
        );
        const responseTranslatedToSpanish =
          await translateIntoSpanish(response);
        return responseTranslatedToSpanish;
      } catch (error) {
        console.error("Error in translation:", error);
        return "Unable to retrieve info from tool";
      }
    };
  }

  if (process.env.BOT_LANGUAGE === "multilang") {
    const originalInvoke = tool.invoke.bind(tool);

    tool.invoke = async (params, config) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const query = params.query || params.args.query;
      console.info("params", params);
      console.info("query", query);

      if (!query) {
        console.error("Query is undefined");
        return "Unable to retrieve info from tool";
      }

      try {
        const translatedQuery = await translateIntoEnglish(query);
        console.info("translatedQuery", { translatedQuery });
        const response = await originalInvoke(
          { query: translatedQuery },
          config,
        );
        return response;
      } catch (error) {
        console.error("Error in translation:", error);
        return "Unable to retrieve info from tool";
      }
    };
  }

  return tool;
});
