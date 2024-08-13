import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1723194838302 implements MigrationInterface {
  name = "Entities1723194838302";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tool" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "source" character varying(255) NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_3bf5b1016a384916073184f99b7" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tool"`);
  }
}
