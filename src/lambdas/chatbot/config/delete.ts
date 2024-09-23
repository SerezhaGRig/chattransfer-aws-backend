import "reflect-metadata";
import { getDataSourceInstance } from "../../../instances/dataSource";
import { HandlerResponse, response } from "../../../middleware/response";
import { getConnectionParams } from "../../../config";
import Bot from "../../../entities/bot";
import { deleteBotPathParams } from "../../../validation/botConfig";
import { validate } from "../../../middleware/validate";

export const logic = async (validRequest: {
  botName: string;
}): Promise<HandlerResponse> => {
  const dataSource = await getDataSourceInstance(getConnectionParams());

  const botRepo = dataSource.getRepository(Bot);

  await botRepo.delete({
    name: validRequest.botName,
  });
  return {
    data: {
      message: "success",
    },
    statusCode: 200,
  };
};

export const handler = response(
  validate(logic, deleteBotPathParams, "pathParameters"),
);
