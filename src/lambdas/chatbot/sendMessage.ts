import { response } from "../../middleware/response";
import { validate } from "../../middleware/validate";
import { sendMessageRequestBodySchema } from "../../validation/sendMessage";
import { z } from "zod";
import { sendMessage } from "../../services/chatbot/main";

type SendMessageParams = z.infer<typeof sendMessageRequestBodySchema>;
export const logic = async (p: SendMessageParams) => {
  const result = await sendMessage(p.message, p.conversationId);
  return { data: result, statusCode: 200 };
};

export const handler = response(
  validate(logic, sendMessageRequestBodySchema, "body"),
);
