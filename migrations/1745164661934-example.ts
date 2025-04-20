import { MigrationInterface, QueryRunner } from "typeorm";

export class Example1745164661934 implements MigrationInterface {
    name = 'Example1745164661934'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "otp" ("id" varchar PRIMARY KEY NOT NULL, "value" varchar NOT NULL, "isUsed" boolean NOT NULL DEFAULT (0), "expirationDate" datetime NOT NULL, "userId" varchar)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, "email" varchar NOT NULL, "refreshToken" varchar, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"))`);
        await queryRunner.query(`CREATE TABLE "language" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "shortName" varchar NOT NULL, "name" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "profile" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "photoUrl" varchar NOT NULL, "languageId" integer)`);
        await queryRunner.query(`CREATE TABLE "example_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(100) NOT NULL, "description" varchar(100) NOT NULL, "price" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_otp" ("id" varchar PRIMARY KEY NOT NULL, "value" varchar NOT NULL, "isUsed" boolean NOT NULL DEFAULT (0), "expirationDate" datetime NOT NULL, "userId" varchar, CONSTRAINT "FK_db724db1bc3d94ad5ba38518433" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_otp"("id", "value", "isUsed", "expirationDate", "userId") SELECT "id", "value", "isUsed", "expirationDate", "userId" FROM "otp"`);
        await queryRunner.query(`DROP TABLE "otp"`);
        await queryRunner.query(`ALTER TABLE "temporary_otp" RENAME TO "otp"`);
        await queryRunner.query(`CREATE TABLE "temporary_profile" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "photoUrl" varchar NOT NULL, "languageId" integer, CONSTRAINT "FK_a7296aca2cbe563aa3dd2fc9146" FOREIGN KEY ("languageId") REFERENCES "language" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_profile"("id", "photoUrl", "languageId") SELECT "id", "photoUrl", "languageId" FROM "profile"`);
        await queryRunner.query(`DROP TABLE "profile"`);
        await queryRunner.query(`ALTER TABLE "temporary_profile" RENAME TO "profile"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" RENAME TO "temporary_profile"`);
        await queryRunner.query(`CREATE TABLE "profile" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "photoUrl" varchar NOT NULL, "languageId" integer)`);
        await queryRunner.query(`INSERT INTO "profile"("id", "photoUrl", "languageId") SELECT "id", "photoUrl", "languageId" FROM "temporary_profile"`);
        await queryRunner.query(`DROP TABLE "temporary_profile"`);
        await queryRunner.query(`ALTER TABLE "otp" RENAME TO "temporary_otp"`);
        await queryRunner.query(`CREATE TABLE "otp" ("id" varchar PRIMARY KEY NOT NULL, "value" varchar NOT NULL, "isUsed" boolean NOT NULL DEFAULT (0), "expirationDate" datetime NOT NULL, "userId" varchar)`);
        await queryRunner.query(`INSERT INTO "otp"("id", "value", "isUsed", "expirationDate", "userId") SELECT "id", "value", "isUsed", "expirationDate", "userId" FROM "temporary_otp"`);
        await queryRunner.query(`DROP TABLE "temporary_otp"`);
        await queryRunner.query(`DROP TABLE "example_entity"`);
        await queryRunner.query(`DROP TABLE "profile"`);
        await queryRunner.query(`DROP TABLE "language"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "otp"`);
    }

}
