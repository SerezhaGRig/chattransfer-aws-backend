import { getDataSourceInstance } from "../../../instances/dataSource";
import { getConnectionParams } from "../../../config";
import Tool from "../../../entities/tool";

export const getToolDescriptionDynamic = async (botName?: string) => {
  const dataSource = await getDataSourceInstance(getConnectionParams());
  const toolDescriptions = await dataSource.getRepository(Tool).find({
    relations: botName && {
      bot: true,
      tool_schema_properties: true,
    },
    where: {
      bot: botName && {
        name: botName,
      },
    },
  });
  console.info("toolDescriptions", toolDescriptions);
  return toolDescriptions;
};
