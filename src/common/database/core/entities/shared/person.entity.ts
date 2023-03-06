import { Column } from 'typeorm';
import { BaseEntity } from './base.entity';

export class PersonEntity extends BaseEntity {
    @Column()
    name: string;
    @Column()
    lastname: string;
    @Column()
    cellphone: string;
}

/**
 * this entity will be parameterized for all users people
 */
