import { EntityRepository, Repository } from 'typeorm';
import { Role } from '../entities';
import { RoleNameEnum } from '../enums';

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {

    async seeder() {
        const queryRunner = this.manager.connection.createQueryRunner();
        let error: any;
        await queryRunner.startTransaction();
        try {
            await queryRunner.query(
                `INSERT INTO role(name, description) VALUES ('${RoleNameEnum.RIDER}', 'Pasajero');`
            );
            await queryRunner.query(
                `INSERT INTO role(name, description) VALUES ('${RoleNameEnum.DRIVER}', 'Conductor');`
            );

        } catch (e) {
            error = e;
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
        console.log(error);
        if (error) throw error;
    }
}
