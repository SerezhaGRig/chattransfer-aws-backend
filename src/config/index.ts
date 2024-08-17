import { MissingEnvException } from "../utils/errors";
import Contact from "../entities/contact";
import { getMigrations } from "../migrations";
import MessageStream from "../entities/messageStream";
import User from "../entities/user";

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
    entities: [User, Contact, MessageStream],
    migrations: [...getMigrations],
    migrationsTransactionMode: "each" as const,
  };
};
