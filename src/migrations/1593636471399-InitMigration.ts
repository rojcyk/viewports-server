import {MigrationInterface, QueryRunner} from "typeorm";

export class InitMigration1593636471399 implements MigrationInterface {
    name = 'InitMigration1593636471399'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "region" ("id" SERIAL NOT NULL, "title" character varying(230) NOT NULL, "code" character varying(230) NOT NULL, "url" character varying(230) NOT NULL, CONSTRAINT "UQ_74f7723fdff738f92929c0056cb" UNIQUE ("code"), CONSTRAINT "PK_5f48ffc3af96bc486f5f3f3a6da" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "viewport" ("id" SERIAL NOT NULL, "size" character varying(230) NOT NULL, "share" numeric(5,2) NOT NULL, "platform" integer, "region" integer, CONSTRAINT "UQ_1e3c4413f5e8efa485cee29fd5c" UNIQUE ("size"), CONSTRAINT "UQ_VIEWPORT" UNIQUE ("size", "platform", "region"), CONSTRAINT "PK_7e8b09deafe11c008e826637551" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "platform" ("id" SERIAL NOT NULL, "code" character varying(230) NOT NULL, "title" character varying(230) NOT NULL, CONSTRAINT "UQ_a5e12cd9f2b46a6ee77881a2c92" UNIQUE ("code"), CONSTRAINT "PK_c33d6abeebd214bd2850bfd6b8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "viewport" ADD CONSTRAINT "FK_c08d0ef6accdbf2cc1885073c1d" FOREIGN KEY ("platform") REFERENCES "platform"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "viewport" ADD CONSTRAINT "FK_85dfed300babacd6850675a7c35" FOREIGN KEY ("region") REFERENCES "region"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "viewport" DROP CONSTRAINT "FK_85dfed300babacd6850675a7c35"`);
        await queryRunner.query(`ALTER TABLE "viewport" DROP CONSTRAINT "FK_c08d0ef6accdbf2cc1885073c1d"`);
        await queryRunner.query(`DROP TABLE "platform"`);
        await queryRunner.query(`DROP TABLE "viewport"`);
        await queryRunner.query(`DROP TABLE "region"`);
    }

}
