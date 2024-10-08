import { getDataSourceInstance } from "../../../instances/dataSource";
import { getConnectionParams } from "../../../config";
import Bot from "../../../entities/bot";

let botConfig: Bot | undefined;

export const initBotConfig = async (botName: string) => {
  const dataSource = await getDataSourceInstance(getConnectionParams());
  botConfig = await dataSource.getRepository(Bot).findOne({
    relations: {
      tools: {
        tool_schema_properties: true,
      },
    },
    where: {
      name: botName,
    },
  });
};

export const getBotConfigDynamic = async () => {
  if (!botConfig) {
    throw new Error("bot config is missing");
  }
  return botConfig;
};
