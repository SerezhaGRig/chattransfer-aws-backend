import { z } from "zod";
import { ToolTypes } from "../entities/tool";
import { ToolPropTypes } from "../entities/toolSchemaPropery";

export const botConfigSchema = z
  .object({
    botName: z.string(),
    tools: z.array(
      z.object({
        name: z.string(),
        description: z.string(),
        response: z.string(),
        type: z.string().default(ToolTypes.FUNCTION),
        props: z.array(
          z.object({
            type: z.enum([ToolPropTypes.STRING, ToolTypes.DOCUMENT]),
            name: z.string(),
            description: z.string(),
          }),
        ),
      }),
    ),
  })
  .strict();
export type BotConfigSchemaType = z.infer<typeof botConfigSchema>;
