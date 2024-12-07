import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1732939206834 implements MigrationInterface {
  name = "InitialMigration1732939206834";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`film\` (\`film_id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`overview\` text NOT NULL, \`poster_path\` varchar(255) NOT NULL, \`backdrop_path\` varchar(255) NOT NULL, \`release_date\` varchar(255) NOT NULL, \`vote_average\` int NOT NULL, \`vote_count\` int NOT NULL, \`is_upcoming\` boolean NOT NULL DEFAULT false, \`genres\` text NOT NULL, \`runtime\` int NOT NULL, PRIMARY KEY (\`film_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`film_function\` (\`function_id\` int NOT NULL AUTO_INCREMENT, \`film_id\` int NOT NULL, \`function_date\` date NOT NULL, \`start_time\` time NOT NULL, \`end_time\` time NOT NULL, \`ticket_price\` decimal(10,2) NOT NULL, PRIMARY KEY (\`function_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`customer\` (\`customer_id\` int NOT NULL AUTO_INCREMENT, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_fdb2f3ad8115da4c7718109a6e\` (\`email\`), PRIMARY KEY (\`customer_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`seat\` (\`seat_id\` int NOT NULL AUTO_INCREMENT, \`seat_number\` varchar(255) NOT NULL, \`row_identifier\` varchar(255) NOT NULL, \`row\` int NOT NULL, \`column\` int NOT NULL, \`functionFunctionId\` int NULL, PRIMARY KEY (\`seat_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`ticket\` (\`ticket_id\` int NOT NULL AUTO_INCREMENT, \`function_id\` int NOT NULL, \`customer_id\` int NOT NULL, \`seat_id\` int NOT NULL, \`purchase_date\` timestamp NOT NULL, \`total_price\` decimal(10,2) NOT NULL, PRIMARY KEY (\`ticket_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`film_function\` ADD CONSTRAINT \`FK_4c550c790725890c29acd109e9f\` FOREIGN KEY (\`film_id\`) REFERENCES \`film\`(\`film_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`seat\` ADD CONSTRAINT \`FK_49faccb2d536fc118b75af59eca\` FOREIGN KEY (\`functionFunctionId\`) REFERENCES \`film_function\`(\`function_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`ticket\` ADD CONSTRAINT \`FK_068020d538635b5bdcc6356795d\` FOREIGN KEY (\`function_id\`) REFERENCES \`film_function\`(\`function_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`ticket\` ADD CONSTRAINT \`FK_9a40df465b0e9ef73b469fb289d\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customer\`(\`customer_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`ticket\` ADD CONSTRAINT \`FK_bc6a9497287b609dbd2806850c7\` FOREIGN KEY (\`seat_id\`) REFERENCES \`seat\`(\`seat_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`ticket\` DROP FOREIGN KEY \`FK_bc6a9497287b609dbd2806850c7\``);
    await queryRunner.query(`ALTER TABLE \`ticket\` DROP FOREIGN KEY \`FK_9a40df465b0e9ef73b469fb289d\``);
    await queryRunner.query(`ALTER TABLE \`ticket\` DROP FOREIGN KEY \`FK_068020d538635b5bdcc6356795d\``);
    await queryRunner.query(`ALTER TABLE \`seat\` DROP FOREIGN KEY \`FK_49faccb2d536fc118b75af59eca\``);
    await queryRunner.query(`ALTER TABLE \`film_function\` DROP FOREIGN KEY \`FK_4c550c790725890c29acd109e9f\``);
    await queryRunner.query(`DROP TABLE \`ticket\``);
    await queryRunner.query(`DROP TABLE \`seat\``);
    await queryRunner.query(`DROP INDEX \`IDX_fdb2f3ad8115da4c7718109a6e\` ON \`customer\``);
    await queryRunner.query(`DROP TABLE \`customer\``);
    await queryRunner.query(`DROP TABLE \`film_function\``);
    await queryRunner.query(`DROP TABLE \`film\``);
  }
}
