import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { CSVLoader } from "langchain/document_loaders/fs/csv";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";
import * as p from "path";
import os from "os";
import * as fs from "node:fs";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";
import { getDataSourceInstance } from "../../../instances/dataSource";
import { getConnectionParams } from "../../../config";
import Tool from "../../../entities/tool";
import { generateDescription } from "../tools/helpers";
import { getVectorStoreDynamic } from "../vectorStore";
import Bot from "../../../entities/bot";
const { LIVE_LEADS_DOCUMENTS_BUCKET_NAME } = process.env;

const client = new S3Client();

export const addFileIntoVectorStoreFromS3 = async (s3Key: string) => {
  const key = decodeURIComponent(s3Key.replace(/\+/g, " "));
  const fileName = p.basename(key);
  const dirPath = p.dirname(key);
  const lastFolderName = p.basename(dirPath);

  // Create a unique temporary directory
  const appPrefix = "live-leads";
  const tmpDir = fs.mkdtempSync(p.join(os.tmpdir(), appPrefix));
  const filePath = p.join(tmpDir, fileName);

  // Download the file from S3
  const input = {
    Bucket: LIVE_LEADS_DOCUMENTS_BUCKET_NAME,
    Key: key,
  };
  const command = new GetObjectCommand(input);
  const response = await client.send(command);
  console.info("fileName", fileName);
  console.info("tmpDir", tmpDir);

  const readable = response.Body as Readable;
  const writeStream = fs.createWriteStream(filePath, { encoding: "utf8" });
  await new Promise((resolve, reject) => {
    readable.pipe(writeStream);
    writeStream.on("finish", resolve);
    writeStream.on("error", reject);
  });
  const directoryLoader = new DirectoryLoader(tmpDir, {
    ".pdf": (pathToFile) => new PDFLoader(pathToFile),
    ".txt": (pathToFile) => new TextLoader(pathToFile),
    ".csv": (pathToFile) => new CSVLoader(pathToFile),
    ".docx": (pathToFile) => new DocxLoader(pathToFile),
  });
  const docs = await directoryLoader.load();
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const splitDocs = await textSplitter.splitDocuments(docs);
  console.log({ splitDocs });
  console.log({ metadata: splitDocs.map((doc) => doc.metadata.pdf) });
  const timestamp = Date.now();
  const docsToLoad = splitDocs.map((doc) => ({
    ...doc,
    metadata: { ...doc.metadata, timestamp, pdf: undefined },
  }));
  const dataSource = await getDataSourceInstance(getConnectionParams());
  const vectorStore = await getVectorStoreDynamic(lastFolderName);
  await vectorStore.addDocuments(docsToLoad);
  const name = fileName
    .split(".")[0]
    .toLowerCase()
    .replace(/[^a-zA-Z0-9_-]/g, "_")
    .slice(0, 63);
  const description = await generateDescription(
    docsToLoad
      .map((doc) => doc.pageContent)
      .slice(0, 3)
      .join(),
  );
  const bot = await dataSource.getRepository(Bot).findOne({
    where: {
      name: lastFolderName.replace(/[^a-zA-Z0-9]/g, "").toUpperCase(),
    },
  });
  await dataSource.getRepository(Tool).insert({
    source: fileName,
    name,
    bot: bot?.id && {
      id: bot?.id,
    },
    description: description.slice(0, 1023),
  });
};
