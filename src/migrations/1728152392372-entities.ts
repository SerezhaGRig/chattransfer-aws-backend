import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1728152392372 implements MigrationInterface {
  name = "Entities1728152392372";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bot" ADD "personal_preamble" character varying(255)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bot" DROP COLUMN "personal_preamble"`,
    );
  }
}
