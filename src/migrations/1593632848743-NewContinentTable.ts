import {MigrationInterface, QueryRunner} from "typeorm";

export class NewContinentTable1593632848743 implements MigrationInterface {
    name = 'NewContinentTable1593632848743'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "continent" ("id" SERIAL NOT NULL, "code" character varying(230) NOT NULL, "name" character varying(230) NOT NULL, CONSTRAINT "UQ_528fae9a2b3be47bc463ddfc2a5" UNIQUE ("code"), CONSTRAINT "PK_1d0d8f1398cdebe7f83068b269c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "continent"`);
    }

}
