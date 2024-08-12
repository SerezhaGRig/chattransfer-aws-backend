import { ToolNode } from "@langchain/langgraph/prebuilt";
import { BaseMessage } from "@langchain/core/messages";
import { connectWithAgent } from "./connectWithAgent";
import { healthInsurancePlans } from "./healthInsurancePlans";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { getRetrieverToolsDynamic } from "./vectorStoreRetrieverToolDynamic";

let tools: DynamicStructuredTool[] | undefined;

export const getTools = async () => {
  if (tools === undefined) {
    try {
      const retrieverToolsDynamic = await getRetrieverToolsDynamic();
      tools = [
        healthInsurancePlans,
        connectWithAgent,
        ...retrieverToolsDynamic,
      ];
    } catch (e) {
      tools = [healthInsurancePlans, connectWithAgent];
    }
  }
  return tools;
};

export const getToolsNode = async () => {
  const tools: DynamicStructuredTool[] = await getTools();
  const toolNode = new ToolNode<{ messages: BaseMessage[] }>(tools);
  return toolNode;
};
