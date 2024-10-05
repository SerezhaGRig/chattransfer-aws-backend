import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1728154083290 implements MigrationInterface {
  name = "Entities1728154083290";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bot" DROP COLUMN "personal_preamble"`,
    );
    await queryRunner.query(`ALTER TABLE "bot" ADD "personal_preamble" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bot" DROP COLUMN "personal_preamble"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bot" ADD "personal_preamble" character varying(255)`,
    );
  }
}
