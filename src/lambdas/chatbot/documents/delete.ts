import { S3Event } from "aws-lambda";

export const handler = async (event: S3Event) => {
  console.info("event", event);
  console.info("records", event.Records);
  event.Records.map((record) => console.log(record.s3.object.key));
};
