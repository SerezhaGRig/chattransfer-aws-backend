import { ToolNode } from "@langchain/langgraph/prebuilt";
import { BaseMessage } from "@langchain/core/messages";
import { retrieverTools } from "./vectorStoreRetrieverTool";
import { connectWithAgent } from "./connectWithAgent";

export const tools = [...retrieverTools, connectWithAgent];
export const toolNode = new ToolNode<{ messages: BaseMessage[] }>(tools);
