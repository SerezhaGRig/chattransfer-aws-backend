import "reflect-metadata";
import { HandlerResponse, response } from "../../../middleware/response";
import { validate } from "../../../middleware/validate";
import { getDataSourceInstance } from "../../../instances/dataSource";
import { getConnectionParams } from "../../../config";
import { getMessageResponseQueryParams } from "../../../validation/message";
import { buildGetMessageResponse } from "../../../services/message/getResponse";
import MessageStream from "../../../entities/messageStream";
import { validateParams } from "../../../validation";

export const logic = async (validRequest: {
  validParams: {
    messageId: string;
    from: number;
  };
}): Promise<HandlerResponse> => {
  const dataSource = await getDataSourceInstance(getConnectionParams());
  const getMessageResponse = buildGetMessageResponse({
    streamRepo: dataSource.getRepository(MessageStream),
  });
  const conversation = await getMessageResponse(validRequest.validParams);
  return { data: conversation, statusCode: 200 };
};

export const handler = response(
  validate(logic, (event) => {
    const { messageId, from } = event.queryStringParameters;

    return {
      validParams: validateParams(
        {
          messageId,
          from: from && Number.parseInt(from, 10),
        },
        getMessageResponseQueryParams,
      ),
    };
  }),
);
