import { EntityRepository, Repository } from 'typeorm';
import { Rider } from '../entities';

@EntityRepository(Rider)
export class RiderRepository extends Repository<Rider> {

   
}
