import { z } from "zod";

export const sendMessageRequestBodySchema = z
  .object({
    message: z.string(),
    conversationId: z.string().uuid(),
  })
  .strict();
