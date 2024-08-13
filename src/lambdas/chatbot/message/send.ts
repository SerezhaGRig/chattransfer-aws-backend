import { z } from "zod";
import { sendMessage } from "../../../services/chatbot/main";
import { sendMessageRequestBodySchema } from "../../../validation/message";

type SendMessageParams = z.infer<typeof sendMessageRequestBodySchema>;
export const logic = async (event: SendMessageParams) => {
  console.info("event", event);
  const result = await sendMessage(
    {
      text: event.message,
      id: event.messageId,
    },
    event.conversationId,
  );
  return { data: result, statusCode: 200 };
};

export const handler = logic;
