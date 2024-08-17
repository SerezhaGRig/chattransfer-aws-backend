import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1723892658427 implements MigrationInterface {
  name = "Entities1723892658427";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("conversation_id" uuid NOT NULL, "name" character varying(255), "email" character varying(255), "phoneNumber" character varying(255), "tobacco_use" boolean, "zipcode" character varying(255), "effective_date" character varying(255), "household_income" character varying(255), "household_size" character varying(255), "age" character varying(255), CONSTRAINT "PK_3dad130078898b9325da36ab3db" PRIMARY KEY ("conversation_id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
