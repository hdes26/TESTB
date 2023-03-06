import { EntityRepository, Repository } from 'typeorm';
import { Invoice } from '../entities';

@EntityRepository(Invoice)
export class InvoiceRepository extends Repository<Invoice> {

   
}
