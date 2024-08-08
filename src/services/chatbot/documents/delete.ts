import { vectorStore } from "../vectorStore";

export const deleteFileFromVectorStore = async (s3Key: string) => {
  const fileName = decodeURIComponent(s3Key.replace(/\+/g, " "));

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
