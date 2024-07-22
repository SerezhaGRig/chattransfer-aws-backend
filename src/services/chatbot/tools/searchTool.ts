import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";

export const searchTool = new DynamicStructuredTool({
  name: "search",
  description:
    "Use to fetch current information and retrieve other information.",
  schema: z.object({
    query: z.string().describe("The info to use in response"),
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  func: async ({ query }: { query: string }) => {
    // This is a placeholder for the actual implementation
    return "In New York now -14 F";
  },
});
