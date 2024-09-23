import { z } from "zod";

export const getConversationPathParams = z
  .object({
    conversationId: z.string().uuid(),
  })
  .strict();
