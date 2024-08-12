import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { PostgresSaver } from "./checkpointer/postgres";
import { getPostgresConfig } from "./checkpointer/config";
import { createWorkflow } from "./workflow";

export const sendMessage = async (message: string, threadId: string) => {
  const checkpointer = await PostgresSaver.fromConnString(getPostgresConfig());
  const workflow = await createWorkflow();
  const app = workflow.compile({ checkpointer });
  const config = { configurable: { thread_id: threadId } };
  const inputs = { messages: [new HumanMessage({ content: message })] };

  console.log("start sending");
  console.log({ key: process.env.OPENAI_API_KEY });
  for await (const { messages } of await app.stream(inputs, {
    ...config,
    streamMode: "values",
  })) {
    const msg = messages[messages?.length - 1];
    if (msg?.content) {
      if (msg instanceof AIMessage) {
        console.log("AI Assistant:", msg.content);
        console.log("-----\n");
        if (typeof msg.content === "string") {
          return msg.content.replace(/```html\s*|```/g, "");
        }
      }
      // } else if (msg instanceof HumanMessage) {
      //   console.log("User:", msg.content);
      //   console.log("-----\n");
      // }
    }
  }
};
