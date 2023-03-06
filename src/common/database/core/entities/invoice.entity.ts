import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './shared/base.entity';
import { Request } from './request.entity';

@Entity()
export class Invoice extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ nullable: true })
    total: number;
    @OneToOne(() => Request, { "cascade": true })
    @JoinColumn({ name: "requestid" } )
    request: Request;
}
