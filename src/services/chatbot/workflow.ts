import { END, START, StateGraph, StateGraphArgs } from "@langchain/langgraph";
import { IState } from "./types";
import { callModel } from "./models";
import { getToolsNode } from "./tools";
import { AIMessage, BaseMessage } from "@langchain/core/messages";

const graphState: StateGraphArgs<IState>["channels"] = {
  messages: {
    value: (x: BaseMessage[], y: BaseMessage[]) => x.concat(y),
    default: () => [],
  },
};

const routeMessage = (state: IState) => {
  const { messages } = state;
  const lastMessage = messages[messages.length - 1] as AIMessage;
  // If no tools are called, we can finish (respond to the user)
  if (!lastMessage.tool_calls?.length) {
    return END;
  }
  // console.info("tool call", { tool_calls: lastMessage.tool_calls });
  // Otherwise if there is, we continue and call the tools
  return "tools";
};

export const createWorkflow = async () => {
  const toolNode = await getToolsNode();
  const workflow = new StateGraph<IState>({
    channels: graphState,
  })
    .addNode("agent", callModel)
    .addNode("tools", toolNode);

  workflow
    .addEdge(START, "agent")
    .addConditionalEdges("agent", routeMessage)
    .addEdge("tools", "agent");
  return workflow;
};
