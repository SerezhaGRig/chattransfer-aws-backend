import { z } from "zod";

export const sendMessageRequestBodySchema = z
  .object({
    message: z.string(),
    conversationId: z.string().uuid(),
    botName: z.string().transform((name) => {
      return name.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    }),
  })
  .strict();

export const sendMessageAndStreamSchema = z
  .object({
    message: z.string(),
    conversationId: z.string().uuid(),
    messageId: z.string().uuid(),
    botName: z.string().transform((name) => {
      return name.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    }),
  })
  .strict();

export const getMessageResponseQueryParams = z
  .object({
    messageId: z.string().uuid(),
    from: z.number().int().gte(0).optional(),
  })
  .strict();
export const deleteMessageResponsePathParams = z
  .object({
    messageId: z.string().uuid(),
  })
  .strict();
