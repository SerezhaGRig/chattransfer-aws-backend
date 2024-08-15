import "reflect-metadata";
import { HandlerResponse, response } from "../../../middleware/response";
import { validate } from "../../../middleware/validate";
import { getDataSourceInstance } from "../../../instances/dataSource";
import { getConnectionParams } from "../../../config";
import { deleteMessageResponsePathParams } from "../../../validation/message";
import MessageStream from "../../../entities/messageStream";
import { buildDeleteMessageResponse } from "../../../services/message/deleteResponse";

export const logic = async (validRequest: {
  messageId: string;
}): Promise<HandlerResponse> => {
  const dataSource = await getDataSourceInstance(getConnectionParams());
  const deleteMessageResponse = buildDeleteMessageResponse({
    streamRepo: dataSource.getRepository(MessageStream),
  });
  await deleteMessageResponse(validRequest.messageId);
  return { data: "Message response successfully deleted.", statusCode: 200 };
};

export const handler = response(
  validate(logic, deleteMessageResponsePathParams, "pathParameters"),
);
