import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1728146924461 implements MigrationInterface {
  name = "Entities1728146924461";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tool_schema_response" ADD "bot_name" character varying(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tool_schema_response" DROP COLUMN "bot_name"`,
    );
  }
}
