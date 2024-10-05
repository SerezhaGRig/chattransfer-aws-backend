import { z } from "zod";
import { ToolTypes } from "../entities/tool";
import { ToolPropTypes } from "../entities/toolSchemaPropery";

export const botConfigSchema = z
  .object({
    botName: z.string(),
    personalPreamble: z.string().optional(),
    tools: z.array(
      z.object({
        name: z.string(),
        description: z.string(),
        response: z.string(),
        type: z
          .enum([ToolTypes.FUNCTION, ToolTypes.DOCUMENT])
          .default(ToolTypes.FUNCTION),
        props: z.array(
          z.object({
            type: z.enum([
              ToolPropTypes.STRING,
              ToolPropTypes.NUMBER,
              ToolPropTypes.BOOLEAN,
            ]),
            name: z.string(),
            description: z.string(),
          }),
        ),
      }),
    ),
  })
  .strict();
export type BotConfigSchemaType = z.infer<typeof botConfigSchema>;
export const deleteBotPathParams = z
  .object({
    botName: z.string(),
  })
  .strict();
