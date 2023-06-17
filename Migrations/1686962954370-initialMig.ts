import { MigrationInterface, QueryRunner } from "typeorm"

export class InitialMig1686962954370 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createDatabase('UI75DB', true);

    // Create the table
    await queryRunner.query(`
      CREATE TABLE UI75DB.checkoutDetails (
        id INT PRIMARY KEY AUTO_INCREMENT,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL
      )`
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query('DROP TABLE UI75DB.checkoutDetails');

    // Drop the database
    await queryRunner.dropDatabase('UI75DB');
    }

}
