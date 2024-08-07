import { S3Event } from "aws-lambda";
import { deleteFileFromVectorStore } from "../../../services/chatbot/documents/delete";

export const handler = async (event: S3Event) => {
  console.info("event", event);
  console.info("records", event.Records);
  const deletePromises = event.Records.map((record) =>
    deleteFileFromVectorStore(record.s3.object.key),
  );
  await Promise.any(deletePromises);
};
