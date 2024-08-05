import { ToolNode } from "@langchain/langgraph/prebuilt";
import { BaseMessage } from "@langchain/core/messages";
import { retrieverTools } from "./vectorStoreRetrieverTool";
import { connectWithAgent } from "./connectWithAgent";
import { healthInsurancePlans } from "./healthInsurancePlans";

export const tools = [
  ...retrieverTools,
  connectWithAgent,
  healthInsurancePlans,
];
export const toolNode = new ToolNode<{ messages: BaseMessage[] }>(tools);
