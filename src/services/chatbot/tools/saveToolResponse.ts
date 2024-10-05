import { getDataSourceInstance } from "../../../instances/dataSource";
import { getConnectionParams } from "../../../config";
import ToolSchemaResponse from "../../../entities/toolSchemaResponse";
import { RunnableConfig } from "@langchain/core/runnables";

export const saveToolResponse = async (
  toolId: string,
  botName: string,
  input: { [key: string]: number | string },
  config: RunnableConfig,
) => {
  const dataSource = await getDataSourceInstance(getConnectionParams());
  await dataSource.getRepository(ToolSchemaResponse).insert(
    Object.keys(input).map((key) => {
      return {
        name: key,
        value: String(input[key]),
        bot_name: botName,
        conversation_id: config.metadata.thread_id as string,
        tool: {
          id: toolId,
        },
      };
    }),
  );
};
