import { ToolNode } from "@langchain/langgraph/prebuilt";
import { BaseMessage } from "@langchain/core/messages";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { getRetrieverToolsDynamic } from "./vectorStoreRetrieverToolDynamic";
import { connectWithAgent } from "./connectWithAgent";
import { healthInsurancePlans } from "./healthInsurancePlans";

export const getTools = async (botName?: string) => {
  let tools: DynamicStructuredTool[] | undefined;
  if (tools === undefined) {
    try {
      const retrieverToolsDynamic = await getRetrieverToolsDynamic(botName);
      tools = [...retrieverToolsDynamic];
    } catch (e) {
      console.error(e);
      tools = [await connectWithAgent(), await healthInsurancePlans()];
    }
  }
  return tools;
};

export const getToolsNode = async (botName: string) => {
  const tools: DynamicStructuredTool[] = await getTools(botName);
  const toolNode = new ToolNode<{ messages: BaseMessage[] }>(tools);
  return toolNode;
};
