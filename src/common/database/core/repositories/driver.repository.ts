import { EntityRepository, Repository } from 'typeorm';
import { Driver } from '../entities';

@EntityRepository(Driver)
export class DriverRepository extends Repository<Driver> {
  
}
