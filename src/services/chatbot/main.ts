import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { PostgresSaver } from "./checkpointer/postgres";
import { getPostgresConfig } from "./checkpointer/config";
import { createWorkflow } from "./workflow";
import { markedToHtml } from "./helper";

export const sendMessage = async (
  message: {
    text: string;
    id?: string;
  },
  threadId: string,
  mode: "invoke" | "stream" = "invoke",
) => {
  const checkpointer = await PostgresSaver.fromConnString(getPostgresConfig());
  const workflow = await createWorkflow();
  const app = workflow.compile({ checkpointer });
  const config = {
    configurable: { thread_id: threadId, message_id: message.id, mode },
  };
  const inputs = { messages: [new HumanMessage({ content: message.text })] };

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
          console.info("msg", { content: msg.content });
          const messageParsed = markedToHtml(
            msg.content.replace(/```html\s*|```/g, ""),
          );
          return messageParsed;
        }
      }
      // } else if (msg instanceof HumanMessage) {
      //   console.log("User:", msg.content);
      //   console.log("-----\n");
      // }
    }
  }
};
