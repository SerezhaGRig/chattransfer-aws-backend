import { MissingEnvException } from "../utils/errors";
import { getMigrations } from "../migrations";
import Tool from "../entities/tool";
import MessageStream from "../entities/messageStream";
import Bot from "../entities/bot";
import ToolSchemaResponse from "../entities/toolSchemaResponse";
import ToolSchemaProperty from "../entities/toolSchemaPropery";
import Contact from "../entities/contact";

const dbConnectionData = () => ({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const getConnectionParams = () => {
  const missingDbParams: string[] = [];
  Object.entries(dbConnectionData()).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      missingDbParams.push(key);
    }
  });
  if (missingDbParams.length > 0) {
    throw new MissingEnvException(missingDbParams);
  }
  return {
    ...dbConnectionData(),
    type: "postgres" as const,
    logging: false,
    synchronize: false,
    entities: [
      Contact,
      Tool,
      MessageStream,
      Bot,
      Tool,
      ToolSchemaResponse,
      ToolSchemaProperty,
    ],
    migrations: [...getMigrations],
    migrationsTransactionMode: "each" as const,
  };
};
