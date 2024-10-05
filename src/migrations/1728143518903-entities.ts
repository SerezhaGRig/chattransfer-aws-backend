import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1728143518903 implements MigrationInterface {
  name = "Entities1728143518903";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tool_schema_response" DROP CONSTRAINT "FK_a20f1eed75933a7f93e1c37a415"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tool_schema_response" ADD CONSTRAINT "FK_a20f1eed75933a7f93e1c37a415" FOREIGN KEY ("toolId") REFERENCES "tool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tool_schema_response" DROP CONSTRAINT "FK_a20f1eed75933a7f93e1c37a415"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tool_schema_response" ADD CONSTRAINT "FK_a20f1eed75933a7f93e1c37a415" FOREIGN KEY ("toolId") REFERENCES "tool"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
