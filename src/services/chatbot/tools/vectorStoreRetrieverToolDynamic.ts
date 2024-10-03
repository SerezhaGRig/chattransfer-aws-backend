import { getToolDescriptionDynamic } from "./toolDescriptionDynamic";
import { createRetrieverTool } from "langchain/tools/retriever";
import { vectorStore } from "../vectorStore";
import { translateIntoEnglish } from "./helpers";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { saveToolResponse } from "./saveToolResponse";

export const getRetrieverToolsDynamic = async (botName?: string) => {
  const toolDescriptionsDynamic = await getToolDescriptionDynamic(botName);
  return toolDescriptionsDynamic.map((toolDescr) => {
    if (toolDescr.type === "DOCUMENT") {
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

      return tool;
    } else {
      const object = {};
      toolDescr.tool_schema_properties?.forEach((prop) => {
        console.log(prop);
        object[prop.name] =
          prop.type === "string"
            ? z.string().optional().describe(prop.description)
            : prop.type === "boolean"
              ? z.boolean().optional().describe(prop.description)
              : z.number().optional().describe(prop.description);
      });
      const schema = z.object(object);
      return new DynamicStructuredTool({
        name: toolDescr.name,
        description: toolDescr.description,
        schema,
        func: async (input, runManager, config) => {
          try {
            console.info("input", input);
            await saveToolResponse(toolDescr.id, input, config);
          } catch (e) {
            console.error(e);
            return "Unable to retrieve info from tool";
          }
          if (toolDescr.response) {
            return toolDescr.response;
          }
          return "Unable to retrieve info from tool";
        },
      });
    }
  });
};
