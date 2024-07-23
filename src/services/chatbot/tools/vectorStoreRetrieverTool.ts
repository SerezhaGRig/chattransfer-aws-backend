import { createRetrieverTool } from "langchain/tools/retriever";
import { vectorStore } from "../vectorStore";
import { toolDescriptions } from "./toolDescriptions";

export const retrieverTools = toolDescriptions.map((toolDescr) =>
  createRetrieverTool(
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
  ),
);
