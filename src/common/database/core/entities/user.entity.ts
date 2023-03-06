import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './shared/base.entity';
import { Role } from '.';
import { Driver } from './driver.entity';
import { Rider } from './rider.entity';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    @Index('IDX_user_email', { unique: true, where: `(deleted_at is null)` })
    email: string;
    @Column({ select: false })
    password: string;
    @Column({ default: true })
    status: boolean;
    @Column()
    firstname: string;
    @Column({ nullable: true })
    lastname: string;
    @Column()
    phone: string;
    @ManyToOne(() => Role, (role) => role.users, { onDelete: 'CASCADE' })
    role: Role;
    @OneToMany(() => Driver, (driver) => driver.user, { onDelete: 'CASCADE' })
    drivers: Driver[];
    @OneToMany(() => Rider, (rider) => rider.user, { onDelete: 'CASCADE' })
    riders: Rider[];
}
