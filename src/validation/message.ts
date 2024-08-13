import { z } from "zod";

export const sendMessageRequestBodySchema = z
  .object({
    message: z.string(),
    conversationId: z.string().uuid(),
    messageId: z.string().uuid(),
  })
  .strict();

export const getMessageResponsePathParams = z
  .object({
    messageId: z.string().uuid(),
  })
  .strict();
