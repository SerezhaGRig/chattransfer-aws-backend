import { DynamicStructuredTool } from "@langchain/core/tools";
import { connectWithAgentToolDescription } from "./toolDescriptions";

export const connectWithAgent = new DynamicStructuredTool({
  name: "connect-with-agent",
  description: connectWithAgentToolDescription.description,
  schema: connectWithAgentToolDescription.schema,
  func: async () => {
    // api call
    return connectWithAgentToolDescription.response;
  },
});
