import { getDataSourceInstance } from "../../../instances/dataSource";
import { getConnectionParams } from "../../../config";
import Bot from "../../../entities/bot";

let botConfig: Bot | undefined;

export const initBotConfig = async (botName: string) => {
  const dataSource = await getDataSourceInstance(getConnectionParams());
  const toolDescriptions = await dataSource.getRepository(Bot).find({
    relations: {
      tools: {
        tool_schema_properties: true,
      },
    },
    where: {
      name: botName,
    },
  });
  console.info("toolDescriptions", toolDescriptions);
};

export const getBotConfigDynamic = async () => {
  if (botConfig) {
    throw new Error("bot config is missing");
  }
  return botConfig;
};
