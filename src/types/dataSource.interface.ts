import { type Repository, type EntitySchema, type QueryRunner } from "typeorm"; // TODO: own repository representation
import { ReplicationMode } from "typeorm/driver/types/ReplicationMode";
import { ObjectLiteral, ObjectType } from "./common.interface";

export { type Repository, type DataSourceOptions } from "typeorm";

export interface DataSource {
  initialize(): Promise<this>;
  getRepository: <Entity extends ObjectLiteral>(
    target: EntityTarget<Entity>,
  ) => Repository<Entity>;
  createQueryRunner: (mode?: ReplicationMode) => QueryRunner;
}

export type EntityTarget<Entity> =
  | ObjectType<Entity>
  | EntitySchema<Entity>
  | string
  | {
      type: Entity;
      name: string;
    };
