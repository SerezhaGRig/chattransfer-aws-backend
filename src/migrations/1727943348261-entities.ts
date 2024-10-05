import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1727943348261 implements MigrationInterface {
  name = "Entities1727943348261";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "bot" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, CONSTRAINT "UQ_b423b82835dfb7fd8d850b2cfda" UNIQUE ("name"), CONSTRAINT "PK_bc6d59d7870eb2efd5f7f61e5ca" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b423b82835dfb7fd8d850b2cfd" ON "bot" ("name") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."tool_schema_response_type_enum" AS ENUM('string', 'number')`,
    );
    await queryRunner.query(
      `CREATE TABLE "tool_schema_response" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "type" "public"."tool_schema_response_type_enum" NOT NULL DEFAULT 'string', "value" text NOT NULL, "conversation_id" character varying(255) NOT NULL, "toolId" uuid, CONSTRAINT "PK_083d334bc277fdcceee5c80224c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."tool_schema_property_type_enum" AS ENUM('string', 'number', 'boolean')`,
    );
    await queryRunner.query(
      `CREATE TABLE "tool_schema_property" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "type" "public"."tool_schema_property_type_enum" NOT NULL DEFAULT 'string', "description" text NOT NULL, "toolId" uuid, CONSTRAINT "PK_1e6bfde71d950a93078fa3f5acb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."tool_type_enum" AS ENUM('DOCUMENT', 'FUNCTION')`,
    );
    await queryRunner.query(
      `ALTER TABLE "tool" ADD "type" "public"."tool_type_enum" NOT NULL DEFAULT 'DOCUMENT'`,
    );
    await queryRunner.query(`ALTER TABLE "tool" ADD "response" text`);
    await queryRunner.query(`ALTER TABLE "tool" ADD "botId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "contact" ADD "conversation_id" character varying(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "contact" ADD "botId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "tool" ALTER COLUMN "source" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tool" ADD CONSTRAINT "FK_5b8a74e1ecffc7d6e489f588471" FOREIGN KEY ("botId") REFERENCES "bot"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tool_schema_response" ADD CONSTRAINT "FK_a20f1eed75933a7f93e1c37a415" FOREIGN KEY ("toolId") REFERENCES "tool"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tool_schema_property" ADD CONSTRAINT "FK_c5be7f908239cb2c2cca434cf98" FOREIGN KEY ("toolId") REFERENCES "tool"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact" ADD CONSTRAINT "FK_d7c82f0cfe556f0734c19896e8a" FOREIGN KEY ("botId") REFERENCES "bot"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contact" DROP CONSTRAINT "FK_d7c82f0cfe556f0734c19896e8a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tool_schema_property" DROP CONSTRAINT "FK_c5be7f908239cb2c2cca434cf98"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tool_schema_response" DROP CONSTRAINT "FK_a20f1eed75933a7f93e1c37a415"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tool" DROP CONSTRAINT "FK_5b8a74e1ecffc7d6e489f588471"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tool" ALTER COLUMN "source" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "contact" DROP COLUMN "botId"`);
    await queryRunner.query(
      `ALTER TABLE "contact" DROP COLUMN "conversation_id"`,
    );
    await queryRunner.query(`ALTER TABLE "tool" DROP COLUMN "botId"`);
    await queryRunner.query(`ALTER TABLE "tool" DROP COLUMN "response"`);
    await queryRunner.query(`ALTER TABLE "tool" DROP COLUMN "type"`);
    await queryRunner.query(`DROP TYPE "public"."tool_type_enum"`);
    await queryRunner.query(`DROP TABLE "tool_schema_property"`);
    await queryRunner.query(
      `DROP TYPE "public"."tool_schema_property_type_enum"`,
    );
    await queryRunner.query(`DROP TABLE "tool_schema_response"`);
    await queryRunner.query(
      `DROP TYPE "public"."tool_schema_response_type_enum"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b423b82835dfb7fd8d850b2cfd"`,
    );
    await queryRunner.query(`DROP TABLE "bot"`);
  }
}
