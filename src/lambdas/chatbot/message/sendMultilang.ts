import { translateInto } from "../../../services/chatbot/tools/helpers";
import { z } from "zod";
import { sendMessageRequestBodySchema } from "../../../validation/message";
import { sendMessage } from "../../../services/chatbot/main";
import { response } from "../../../middleware/response";
import { validate } from "../../../middleware/validate";
import { franc } from "franc";

type SendMessageParams = z.infer<typeof sendMessageRequestBodySchema>;
export const logic = async (p: SendMessageParams) => {
  const translatedMessage = await translateInto(p.message, "en");
  const result = await sendMessage(translatedMessage, p.conversationId);
  const language = franc(p.message);
  const translatedResult = await translateInto(result, language);
  return { data: translatedResult, statusCode: 200 };
};

export const handler = response(
  validate(logic, sendMessageRequestBodySchema, "body"),
);
