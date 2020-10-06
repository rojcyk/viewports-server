import {MigrationInterface, QueryRunner} from "typeorm";

export class AddingTeams1602016789510 implements MigrationInterface {
    name = 'AddingTeams1602016789510'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "team" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "slackId" character varying NOT NULL, "domain" character varying NOT NULL, "botUserToken" character varying, "botUserId" character varying, "emailDomain" character varying, CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "team"`);
    }

}
