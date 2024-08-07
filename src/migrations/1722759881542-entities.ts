import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1722759881542 implements MigrationInterface {
  name = "Entities1722759881542";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "contact" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255), "email" character varying(255), "phoneNumber" character varying(255), CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "contact"`);
  }
}
