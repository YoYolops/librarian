import {MigrationInterface, QueryRunner} from "typeorm";

export class NomeDaMigracao1645810370932 implements MigrationInterface {
    name = 'NomeDaMigracao1645810370932'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_personal_data" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "birth" character varying NOT NULL, CONSTRAINT "REL_1abe1c4ec84d6eadcedc865a02" UNIQUE ("user_id"), CONSTRAINT "PK_fc4821895c2d37e8d15e0f3091f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_personal_data" ADD CONSTRAINT "FK_1abe1c4ec84d6eadcedc865a025" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_personal_data" DROP CONSTRAINT "FK_1abe1c4ec84d6eadcedc865a025"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "user_personal_data"`);
    }

}
