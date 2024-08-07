import { vectorStore } from "../vectorStore";

export const deleteFileFromVectorStore = async (fileName: string) => {
  await vectorStore.delete({
    filter: {
      where: {
        operator: "Like",
        path: ["source"],
        valueText: `*${fileName}*`,
      },
    },
  });
};
