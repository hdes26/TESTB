import { Injectable, NotFoundException } from '@nestjs/common';
import { RoleNameEnum } from 'src/common/database/core/enums';
import { RiderRepository, RoleRepository, UserRepository } from 'src/common/database/core/repositories';
import { encryptPassword } from 'src/common/utils/functions';
import { CreateRiderDto } from '../core/dto/create-rider.dto';
import { UpdateRiderDto } from '../core/dto/update-rider.dto';

@Injectable()
export class RiderService {
  constructor(
    private roleRepository: RoleRepository,
    private userRepository: UserRepository,
    private riderRepository: RiderRepository,
  ) { }
  async create(createDriverDto: CreateRiderDto) {
    let roles = await this.roleRepository.find();
    if (roles.length === 0) await this.roleRepository.seeder();
    const roleFound = await this.roleRepository.findOne({ where: { name: RoleNameEnum.RIDER } });
    if (!roleFound) throw new NotFoundException('role not found');
    const userFound = await this.userRepository.findOne({ where: { email: createDriverDto.email } });
    if (userFound) throw new NotFoundException('an account has already been created with this email');
    let newUser = await this.userRepository.save({ ...createDriverDto, role: roleFound, password: encryptPassword(createDriverDto.password) });
    await this.riderRepository.save({ user: newUser });
    return newUser;
  }

  async findAll() {
    const roleFound = await this.roleRepository.findOne({ where: { name: RoleNameEnum.RIDER } });
    if (!roleFound) throw new NotFoundException('role not found');
    const userFound = await this.riderRepository.find({ where: { is_deleted: false }, relations: ['user', 'user.role'] });
    return userFound;
  }

  async findOne(id: string) {
    const roleFound = await this.roleRepository.findOne({ where: { name: RoleNameEnum.RIDER } });
    if (!roleFound) throw new NotFoundException('role not found');
    const userFound = await this.riderRepository.findOne({ where: { id, is_deleted: false }, relations: ['user','user.role'] });
    if (!userFound) throw new NotFoundException('user not found');
    return userFound;
  }

  async update(id: string, updateDriverDto: UpdateRiderDto) {
    const roleFound = await this.roleRepository.findOne({ where: { name: RoleNameEnum.RIDER } });
    if (!roleFound) throw new NotFoundException('role not found');
    const userFound = await this.userRepository.findOne({ where: { role: roleFound, id, status: true }, });
    if (!userFound) throw new NotFoundException('user not found');
    if (updateDriverDto.password) updateDriverDto.password = encryptPassword(updateDriverDto.password)

    return await this.userRepository.update(userFound.id, updateDriverDto);
  }

  async remove(id: string) {
    const roleFound = await this.roleRepository.findOne({ where: { name: RoleNameEnum.RIDER } });
    if (!roleFound) throw new NotFoundException('role not found');
    const userFound = await this.userRepository.findOne({ where: { role: roleFound, id }, });
    if (!userFound) throw new NotFoundException('role not found');
    return await this.userRepository.update(userFound.id, { status: false, is_deleted: true });
  }
}
