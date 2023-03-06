import {MigrationInterface, QueryRunner} from "typeorm";

export class firstMigration1678028996805 implements MigrationInterface {
    name = 'firstMigration1678028996805'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."role_name_enum" AS ENUM('Rider', 'Driver')`);
        await queryRunner.query(`CREATE TABLE "role" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "is_deleted" boolean NOT NULL DEFAULT false, "id" SERIAL NOT NULL, "name" "public"."role_name_enum" NOT NULL, "description" character varying, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "invoice" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "is_deleted" boolean NOT NULL DEFAULT false, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "total" integer, "requestid" uuid, CONSTRAINT "REL_aa93c4a8d0358aac7e1382adbc" UNIQUE ("requestid"), CONSTRAINT "PK_15d25c200d9bcd8a33f698daf18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."request_status_enum" AS ENUM('NEW', 'INPROGRESS', 'FINISH')`);
        await queryRunner.query(`CREATE TABLE "request" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "is_deleted" boolean NOT NULL DEFAULT false, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "lat" character varying, "lng" character varying, "distance" character varying, "timeofarrival" character varying, "status" "public"."request_status_enum" DEFAULT 'NEW', "riderId" uuid, "driverId" uuid, CONSTRAINT "PK_167d324701e6867f189aed52e18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rider" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "is_deleted" boolean NOT NULL DEFAULT false, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, CONSTRAINT "PK_1ed6540e613592e2a470a162ef1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "is_deleted" boolean NOT NULL DEFAULT false, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "status" boolean NOT NULL DEFAULT true, "firstname" character varying NOT NULL, "lastname" character varying, "phone" character varying NOT NULL, "roleId" integer, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_user_email" ON "user" ("email") WHERE (deleted_at is null)`);
        await queryRunner.query(`CREATE TABLE "driver" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "is_deleted" boolean NOT NULL DEFAULT false, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "currentLat" character varying NOT NULL, "currentLng" character varying NOT NULL, "available" boolean NOT NULL DEFAULT true, "userId" uuid, CONSTRAINT "PK_61de71a8d217d585ecd5ee3d065" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "invoice" ADD CONSTRAINT "FK_aa93c4a8d0358aac7e1382adbc9" FOREIGN KEY ("requestid") REFERENCES "request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "request" ADD CONSTRAINT "FK_3f449d0151371b1e66437639347" FOREIGN KEY ("riderId") REFERENCES "rider"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "request" ADD CONSTRAINT "FK_fb7a42d1d3e0cf4d1360847d0bf" FOREIGN KEY ("driverId") REFERENCES "driver"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rider" ADD CONSTRAINT "FK_71a3a9758e8b4eb857c53bfdf4e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "driver" ADD CONSTRAINT "FK_abf4fe92b1ed7d4ffa2d4e8045a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "driver" DROP CONSTRAINT "FK_abf4fe92b1ed7d4ffa2d4e8045a"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
        await queryRunner.query(`ALTER TABLE "rider" DROP CONSTRAINT "FK_71a3a9758e8b4eb857c53bfdf4e"`);
        await queryRunner.query(`ALTER TABLE "request" DROP CONSTRAINT "FK_fb7a42d1d3e0cf4d1360847d0bf"`);
        await queryRunner.query(`ALTER TABLE "request" DROP CONSTRAINT "FK_3f449d0151371b1e66437639347"`);
        await queryRunner.query(`ALTER TABLE "invoice" DROP CONSTRAINT "FK_aa93c4a8d0358aac7e1382adbc9"`);
        await queryRunner.query(`DROP TABLE "driver"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_user_email"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "rider"`);
        await queryRunner.query(`DROP TABLE "request"`);
        await queryRunner.query(`DROP TYPE "public"."request_status_enum"`);
        await queryRunner.query(`DROP TABLE "invoice"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TYPE "public"."role_name_enum"`);
    }

}
