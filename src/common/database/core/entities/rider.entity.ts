import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './shared/base.entity';
import { User } from '.';
import { Request } from './request.entity';

@Entity()
export class Rider extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @ManyToOne(() => User, (user) => user.riders, { onDelete: 'CASCADE' })
    user: User;
    @OneToMany(() => Request, (request) => request.rider, { onDelete: 'CASCADE' })
    requests: Request[];
}
