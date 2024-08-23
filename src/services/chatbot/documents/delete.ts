import { vectorStore } from "../vectorStore";
import { getDataSourceInstance } from "../../../instances/dataSource";
import { getConnectionParams } from "../../../config";
import Tool from "../../../entities/tool";
import * as p from "path";

export const deleteFileFromVectorStore = async (s3Key: string) => {
  const fileName = p.basename(decodeURIComponent(s3Key.replace(/\+/g, " ")));
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
  });
};
