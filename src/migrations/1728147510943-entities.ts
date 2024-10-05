import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1728147510943 implements MigrationInterface {
  name = "Entities1728147510943";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tool_schema_response" ADD "bot_name" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tool" ADD CONSTRAINT "UQ_d719d31382581fd2777884dd395" UNIQUE ("botId", "name")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tool" DROP CONSTRAINT "UQ_d719d31382581fd2777884dd395"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tool_schema_response" DROP COLUMN "bot_name"`,
    );
  }
}
