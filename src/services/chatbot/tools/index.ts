import { ToolNode } from "@langchain/langgraph/prebuilt";
import { BaseMessage } from "@langchain/core/messages";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { getRetrieverToolsDynamic } from "./vectorStoreRetrieverToolDynamic";

export const getTools = async (botName?: string) => {
  let tools: DynamicStructuredTool[] | undefined;
  if (tools === undefined) {
    try {
      const retrieverToolsDynamic = await getRetrieverToolsDynamic(botName);
      tools = [...retrieverToolsDynamic];
    } catch (e) {
      console.error(e);
      tools = [];
    }
  }
  return tools;
};

export const getToolsNode = async (botName: string) => {
  const tools: DynamicStructuredTool[] = await getTools(botName);
  if (tools.length > 0) {
    const toolNode = new ToolNode<{ messages: BaseMessage[] }>(tools);
    return toolNode;
  }
  return () => {
    return "agent";
  };
};
