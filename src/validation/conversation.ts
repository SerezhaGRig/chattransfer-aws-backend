import { z } from "zod";

export const getConversationPathParams = z
  .object({
    conversationId: z.string().uuid(),
    botName: z.string()
  })
  .strict();
