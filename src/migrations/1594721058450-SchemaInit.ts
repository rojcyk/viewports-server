import {MigrationInterface, QueryRunner} from "typeorm";

export class SchemaInit1594721058450 implements MigrationInterface {
    name = 'SchemaInit1594721058450'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "display" ("id" SERIAL NOT NULL, "width" integer NOT NULL, "height" integer NOT NULL, CONSTRAINT "PK_a182ee331ff540498c3fcad9923" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "month" ("id" SERIAL NOT NULL, "number" integer NOT NULL, "year" integer NOT NULL, CONSTRAINT "PK_e253c67eb75a81acf16f7f79323" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "platform" ("id" SERIAL NOT NULL, "code" character varying(230) NOT NULL, "title" character varying(230) NOT NULL, CONSTRAINT "UQ_a5e12cd9f2b46a6ee77881a2c92" UNIQUE ("code"), CONSTRAINT "PK_c33d6abeebd214bd2850bfd6b8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "region" ("id" SERIAL NOT NULL, "title" character varying(230) NOT NULL, "code" character varying(230) NOT NULL, "url" character varying(230) NOT NULL, CONSTRAINT "UQ_74f7723fdff738f92929c0056cb" UNIQUE ("code"), CONSTRAINT "PK_5f48ffc3af96bc486f5f3f3a6da" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "viewport" ("id" SERIAL NOT NULL, "share" numeric(5,2) NOT NULL, "platformId" integer, "regionId" integer, "displayId" integer, "monthId" integer, CONSTRAINT "UQ_VIEWPORT" UNIQUE ("displayId", "platformId", "regionId"), CONSTRAINT "PK_7e8b09deafe11c008e826637551" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "viewport" ADD CONSTRAINT "FK_55286e5116e28a83a8de7942827" FOREIGN KEY ("platformId") REFERENCES "platform"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "viewport" ADD CONSTRAINT "FK_37edab870c86ee265c8bf83a914" FOREIGN KEY ("regionId") REFERENCES "region"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "viewport" ADD CONSTRAINT "FK_3565fad7fc25c5001e3f85ef471" FOREIGN KEY ("displayId") REFERENCES "display"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "viewport" ADD CONSTRAINT "FK_20d3d447812e949bf70dde4535c" FOREIGN KEY ("monthId") REFERENCES "month"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "viewport" DROP CONSTRAINT "FK_20d3d447812e949bf70dde4535c"`);
        await queryRunner.query(`ALTER TABLE "viewport" DROP CONSTRAINT "FK_3565fad7fc25c5001e3f85ef471"`);
        await queryRunner.query(`ALTER TABLE "viewport" DROP CONSTRAINT "FK_37edab870c86ee265c8bf83a914"`);
        await queryRunner.query(`ALTER TABLE "viewport" DROP CONSTRAINT "FK_55286e5116e28a83a8de7942827"`);
        await queryRunner.query(`DROP TABLE "viewport"`);
        await queryRunner.query(`DROP TABLE "region"`);
        await queryRunner.query(`DROP TABLE "platform"`);
        await queryRunner.query(`DROP TABLE "month"`);
        await queryRunner.query(`DROP TABLE "display"`);
    }

}
