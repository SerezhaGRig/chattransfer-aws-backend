import "reflect-metadata";
import { getDataSourceInstance } from "../../../instances/dataSource";
import { HandlerResponse, response } from "../../../middleware/response";
import { getConnectionParams } from "../../../config";
import Bot from "../../../entities/bot";

export const logic = async (): Promise<HandlerResponse> => {
  const dataSource = await getDataSourceInstance(getConnectionParams());

  const botRepo = dataSource.getRepository(Bot);
  const data = await botRepo.find({
    relations: {
      tools: {
        tool_schema_properties: true,
      },
    },
  });
  return { data, statusCode: 200 };
};

export const handler = response(logic);
