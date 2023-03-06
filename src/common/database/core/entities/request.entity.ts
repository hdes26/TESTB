import { Entity, ManyToOne, PrimaryGeneratedColumn, OneToOne, Column } from 'typeorm';
import { BaseEntity } from './shared/base.entity';
import { Rider } from './rider.entity';
import { Driver } from './driver.entity';
import { Invoice } from './invoice.entity';
import { RequestStatusTypeEnum } from '../enums';

@Entity()
export class Request extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ nullable: true })
    lat: string;
    @Column({ nullable: true })
    lng: string;
    @Column({ nullable: true })
    distance: string;
    @Column({ nullable: true })
    timeofarrival: string;
    @Column({ nullable: true, type: 'enum', enum: RequestStatusTypeEnum, default: RequestStatusTypeEnum.NEW })
    status: RequestStatusTypeEnum;
    @ManyToOne(() => Rider, (rider) => rider.requests, { onDelete: 'CASCADE' })
    rider: Rider;
    @ManyToOne(() => Driver, (driver) => driver.requests, { onDelete: 'CASCADE' })
    driver: Driver;
    @OneToOne(() => Invoice, (invoice) => invoice.request, { onDelete: 'CASCADE' })
    invoice: Invoice;
}
