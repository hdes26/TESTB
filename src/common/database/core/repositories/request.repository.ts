import { EntityRepository, Repository } from 'typeorm';
import { Request } from '../entities';
import { RequestStatusTypeEnum } from 'src/common/database/core/enums';

@EntityRepository(Request)
export class RequestRepository extends Repository<Request> {
    async getAvailableDriver() {
        return await this.createQueryBuilder('request')
            .leftJoinAndSelect('request.driver', 'driver')
            .where('request.status != :status', { status: RequestStatusTypeEnum.INPROGRESS })
            .getRawMany();
    }

}
