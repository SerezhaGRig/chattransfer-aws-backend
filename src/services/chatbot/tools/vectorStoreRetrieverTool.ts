import { createRetrieverTool } from "langchain/tools/retriever";
import { vectorStore } from "../vectorStore";
import { filesDescriptions } from "./fileDescriptions";

export const retrieverTools = filesDescriptions.map((file) =>
  createRetrieverTool(
    vectorStore.asRetriever({
      filter: {
        where: {
          operator: "Like",
          path: ["source"],
          valueText: `*${file.source}*`,
        },
      },
    }),
    {
      name: file.name,
      description: file.description,
    },
  ),
);
