import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1724229657833 implements MigrationInterface {
  name = "Entities1724229657833";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "message_stream" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "message_id" character varying(255) NOT NULL, "content" text NOT NULL, "timestamp" bigint NOT NULL, "ended" bigint NOT NULL, CONSTRAINT "PK_d3134df239362c2909106fefa0b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8e6530f66275cc7cb707d986b5" ON "message_stream" ("message_id") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8e6530f66275cc7cb707d986b5"`,
    );
    await queryRunner.query(`DROP TABLE "message_stream"`);
  }
}
