import { getDataSourceInstance } from "../../../instances/dataSource";
import { getConnectionParams } from "../../../config";
import Tool from "../../../entities/tool";

export const getToolDescriptionDynamic = async () => {
  const dataSource = await getDataSourceInstance(getConnectionParams());
  const toolDescriptions = await dataSource.getRepository(Tool).find();
  console.info("toolDescriptions", toolDescriptions);
  return toolDescriptions;
};
