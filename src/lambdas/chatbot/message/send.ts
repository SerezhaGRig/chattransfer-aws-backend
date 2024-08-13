import { z } from "zod";
import { sendMessage } from "../../../services/chatbot/main";
import { sendMessageRequestBodySchema } from "../../../validation/message";

type SendMessageParams = z.infer<typeof sendMessageRequestBodySchema>;
export const logic = async (event: SendMessageParams) => {
  console.info("event", event);
  const p = sendMessageRequestBodySchema.parse(event);
  const result = await sendMessage(
    {
      text: p.message,
      id: p.messageId,
    },
    p.conversationId,
  );
  return { data: result, statusCode: 200 };
};

export const handler = logic;
