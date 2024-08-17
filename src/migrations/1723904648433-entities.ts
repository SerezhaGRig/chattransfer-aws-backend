import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1723904648433 implements MigrationInterface {
  name = "Entities1723904648433";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "message_stream" ("message_id" uuid NOT NULL, "content" text NOT NULL, "timestamp" bigint NOT NULL, "ended" boolean NOT NULL, CONSTRAINT "PK_8e6530f66275cc7cb707d986b5e" PRIMARY KEY ("message_id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "message_stream"`);
  }
}
