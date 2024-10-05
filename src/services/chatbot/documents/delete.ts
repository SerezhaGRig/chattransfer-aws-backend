import { getVectorStoreDynamic } from "../vectorStore";
import { getDataSourceInstance } from "../../../instances/dataSource";
import { getConnectionParams } from "../../../config";
import Tool from "../../../entities/tool";
import * as p from "path";

export const deleteFileFromVectorStore = async (s3Key: string) => {
  const key = decodeURIComponent(s3Key.replace(/\+/g, " "));
  const fileName = p.basename(key);
  const dirPath = p.dirname(key);
  const lastFolderName = p.basename(dirPath);
  const vectorStore = await getVectorStoreDynamic(lastFolderName);
  await vectorStore.delete({
    filter: {
      where: {
        operator: "Like",
        path: ["source"],
        valueText: `*${fileName}*`,
      },
    },
  });
  const dataSource = await getDataSourceInstance(getConnectionParams());
  await dataSource.getRepository(Tool).delete({
    source: fileName,
    bot: {
      name: lastFolderName,
    },
  });
  const tool = await dataSource.getRepository(Tool).find({
    relations: {
      bot: true,
    },
    where: {
      source: fileName,
      bot: {
        name: lastFolderName,
      },
    },
  });
  if (tool) {
    await dataSource.getRepository(Tool).remove(tool);
  }
};
