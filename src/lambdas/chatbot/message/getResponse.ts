import "reflect-metadata";
import { getConversationPathParams } from "../../../validation/conversation";
import { HandlerResponse, response } from "../../../middleware/response";
import { validate } from "../../../middleware/validate";
import { getDataSourceInstance } from "../../../instances/dataSource";
import { getConnectionParams } from "../../../config";
import { getMessageResponsePathParams } from "../../../validation/message";
import { buildGetMessageResponse } from "../../../services/message/getResponse";
import MessageStream from "../../../entities/messageStream";

export const logic = async (validRequest: {
  messageId: string;
}): Promise<HandlerResponse> => {
  const dataSource = await getDataSourceInstance(getConnectionParams());
  const getMessageResponse = buildGetMessageResponse({
    streamRepo: dataSource.getRepository(MessageStream),
  });
  const conversation = await getMessageResponse(validRequest.messageId);
  return { data: conversation, statusCode: 200 };
};

export const handler = response(
  validate(logic, getMessageResponsePathParams, "pathParameters"),
);
