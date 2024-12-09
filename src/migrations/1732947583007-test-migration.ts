import { MigrationInterface, QueryRunner } from "typeorm";

export class TestMigration1732947583007 implements MigrationInterface {
  name = "TestMigration1732947583007";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`seat\` DROP FOREIGN KEY \`FK_49faccb2d536fc118b75af59eca\``);
    await queryRunner.query(`ALTER TABLE \`seat\` CHANGE \`functionFunctionId\` \`functionFunctionId\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`ticket\` CHANGE \`purchase_date\` \`purchase_date\` timestamp NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE \`seat\` ADD CONSTRAINT \`FK_49faccb2d536fc118b75af59eca\` FOREIGN KEY (\`functionFunctionId\`) REFERENCES \`film_function\`(\`function_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`seat\` DROP FOREIGN KEY \`FK_49faccb2d536fc118b75af59eca\``);
    await queryRunner.query(
      `ALTER TABLE \`ticket\` CHANGE \`purchase_date\` \`purchase_date\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`,
    );
    await queryRunner.query(
      `ALTER TABLE \`seat\` CHANGE \`functionFunctionId\` \`functionFunctionId\` int NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`seat\` ADD CONSTRAINT \`FK_49faccb2d536fc118b75af59eca\` FOREIGN KEY (\`functionFunctionId\`) REFERENCES \`film_function\`(\`function_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
