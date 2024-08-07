import { S3Event } from "aws-lambda";
import { addFileIntoVectorStoreFromS3 } from "../../../services/chatbot/documents/add";

export const handler = async (event: S3Event) => {
  console.info("event", event);
  console.info("records", event.Records);
  const uploadPromises = event.Records.map((record) => addFileIntoVectorStoreFromS3(record.s3.object.key))
  await Promise.any(uploadPromises)
  event.Records.map((record) => console.log(record.s3.bucket));
  event.Records.map((record) => console.log(record.s3.object));

};
