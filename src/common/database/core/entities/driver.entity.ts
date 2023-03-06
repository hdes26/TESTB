import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './shared/base.entity';
import { User } from '.';
import { Request } from './request.entity';

@Entity()
export class Driver extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @ManyToOne(() => User, (user) => user.drivers, { onDelete: 'CASCADE' })
    user: User;
    @Column()
    currentLat: string;
    @Column()
    currentLng: string;
    @Column({ default: true })
    available: boolean;
    @OneToMany(() => Request, (request) => request.driver, { onDelete: 'CASCADE' })
    requests: Request[];
}
