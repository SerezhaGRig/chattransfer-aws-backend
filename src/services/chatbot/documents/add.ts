import {vectorStore} from "../vectorStore";
import {RecursiveCharacterTextSplitter} from "@langchain/textsplitters";
import {DirectoryLoader} from "langchain/document_loaders/fs/directory";
import {PDFLoader} from "@langchain/community/document_loaders/fs/pdf";
import {TextLoader} from "langchain/document_loaders/fs/text";
import {CSVLoader} from "langchain/document_loaders/fs/csv";
import {DocxLoader} from "@langchain/community/document_loaders/fs/docx";
import path from 'path';
import os from 'os';
import * as fs from "node:fs";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from 'stream'
const { LIVE_LEADS_DOCUMENTS_BUCKET_NAME } =
    process.env;

const client = new S3Client();


export const addFileIntoVectorStoreFromS3 = async (s3Key: string) => {
    const key = decodeURIComponent(s3Key.replace(/\+/g, ' '));
    const fileName = path.basename(key);

    // Create a unique temporary directory
    const appPrefix = 'live-leads';
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), appPrefix));
    const filePath = path.join(tmpDir, fileName);

    // Download the file from S3
    const input = {
        Bucket: LIVE_LEADS_DOCUMENTS_BUCKET_NAME,
        Key: key
    };
    const command = new GetObjectCommand(input);
    const response = await client.send(command);

    await new Promise((resolve, reject) => {
        const readable = response.Body as Readable
        readable.pipe(fs.createWriteStream(filePath))
    });

    const directoryLoader = new DirectoryLoader(tmpDir, {
        ".pdf": (path) => new PDFLoader(path),
        ".txt": (path) => new TextLoader(path),
        ".csv": (path) => new CSVLoader(path),
        ".docx": (path) => new DocxLoader(path),
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
    const docsToLoad = splitDocs
        .map((doc) => ({
            ...doc,
            metadata: { ...doc.metadata, timestamp, pdf: undefined },
        }));
    await vectorStore.addDocuments(docsToLoad);
}
