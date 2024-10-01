import { z } from "zod";
import { sendMessage } from "../../../services/chatbot/main";
import { sendMessageAndStreamSchema } from "../../../validation/message";

type SendMessageParams = z.infer<typeof sendMessageAndStreamSchema>;
export const logic = async (event: SendMessageParams) => {
  console.info("event", event);
  const p = sendMessageAndStreamSchema.parse(event);
  const result = await sendMessage(
    p.botName,
    {
      text: p.message,
      id: p.messageId,
    },
    p.conversationId,
    "stream",
  );
  return { data: result, statusCode: 200 };
};

export const handler = logic;
