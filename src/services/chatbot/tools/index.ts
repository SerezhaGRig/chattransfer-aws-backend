import { ToolNode } from "@langchain/langgraph/prebuilt";
import { BaseMessage } from "@langchain/core/messages";
import { connectWithAgent } from "./connectWithAgent";
import { healthInsurancePlans } from "./healthInsurancePlans";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { getRetrieverToolsDynamic } from "./vectorStoreRetrieverToolDynamic";

export const tools: DynamicStructuredTool[] = [
  healthInsurancePlans,
  connectWithAgent,
];
export const toolNode = new ToolNode<{ messages: BaseMessage[] }>(tools);
export const loadRetrieverTools = async () => {
  const retrieverToolsDynamic = await getRetrieverToolsDynamic();
  tools.push(...retrieverToolsDynamic);
};
