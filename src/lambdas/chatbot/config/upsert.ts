import "reflect-metadata";
import { getDataSourceInstance } from "../../../instances/dataSource";
import { HandlerResponse, response } from "../../../middleware/response";
import { getConnectionParams } from "../../../config";
import Bot from "../../../entities/bot";
import {
  botConfigSchema,
  BotConfigSchemaType,
} from "../../../validation/botConfig";
import { validate } from "../../../middleware/validate";

export const logic = async (
  validRequest: BotConfigSchemaType,
): Promise<HandlerResponse> => {
  const dataSource = await getDataSourceInstance(getConnectionParams());

  const botRepo = dataSource.getRepository(Bot);
  const toolRepo = dataSource.getRepository(Bot);
  try {
    await botRepo.upsert({ name: validRequest.botName }, ["name"]);
  } catch (e) {
    console.error(e);
  }
  const bot = await botRepo.findOne({
    relations: {
      tools: {
        tool_schema_responses: true,
      },
    },
    where: {
      name: validRequest.botName,
    },
  });
  if (!bot) {
    throw new Error(`bot isn't created with name ${validRequest.botName}`);
  }

  await toolRepo.save(
    validRequest.tools.map((tool) => {
      return {
        name: tool.name,
        description: tool.description,
        response: tool.response,
        type: tool.type,
        source: undefined,
        bot,
        tool_schema_responses:
          bot.tools.find((t) => t.name === tool.name)?.tool_schema_responses ||
          [],
        tool_schema_properties: tool.props.map((p) => ({
          type: p.type,
          name: p.name,
          description: p.description,
        })),
      };
    }),
  );
  return {
    data: {
      message: "success",
    },
    statusCode: 200,
  };
};

export const handler = response(validate(logic, botConfigSchema, "body"));
