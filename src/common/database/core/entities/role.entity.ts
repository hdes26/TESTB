import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './shared/base.entity';
import { User } from '.';
import { RoleNameEnum } from '../enums';

@Entity()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ type: 'enum', enum: RoleNameEnum })
  name: RoleNameEnum;
  @Column({ nullable: true })
  description: string;
  @OneToMany(() => User, (user) => user.role, { onDelete: 'CASCADE' })
  users: User[];
}
