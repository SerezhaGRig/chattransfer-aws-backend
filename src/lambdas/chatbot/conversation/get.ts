import "reflect-metadata";
import { getConversationPathParams } from "../../../validation/conversation";
import { HandlerResponse, response } from "../../../middleware/response";
import { validate } from "../../../middleware/validate";
import { getDataSourceInstance } from "../../../instances/dataSource";
import { getConnectionParams } from "../../../config";
import { buildGetConversationById } from "../../../services/conversation/get";

export const logic = async (validRequest: {
  conversationId: string;
}): Promise<HandlerResponse> => {
  const dataSource = await getDataSourceInstance(getConnectionParams());
  const getConversationById = buildGetConversationById({
    queryRunner: dataSource.createQueryRunner(),
  });
  const conversation = await getConversationById(validRequest.conversationId);
  return { data: conversation, statusCode: 200 };
};

export const handler = response(
  validate(logic, getConversationPathParams, "pathParameters"),
);
