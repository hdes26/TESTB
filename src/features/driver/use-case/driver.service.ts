import { Injectable, NotFoundException } from '@nestjs/common';
import { RoleNameEnum } from 'src/common/database/core/enums';
import { DriverRepository } from 'src/common/database/core/repositories';
import { RoleRepository } from 'src/common/database/core/repositories/role.repository';
import { UserRepository } from 'src/common/database/core/repositories/user.repository';
import { encryptPassword } from 'src/common/utils/functions';
import { CreateDriverDto } from '../core/dto/create-driver.dto';
import { UpdateDriverDto } from '../core/dto/update-driver.dto';

@Injectable()
export class DriverService {
  constructor(
    private roleRepository: RoleRepository,
    private userRepository: UserRepository,
    private driverRepository: DriverRepository
  ) { }
  async create({ currentLat, currentLng, ...createDriverDto }: CreateDriverDto) {
    let roles = await this.roleRepository.find();
    if (roles.length === 0) await this.roleRepository.seeder();
    const roleFound = await this.roleRepository.findOne({ where: { name: RoleNameEnum.DRIVER } });
    if (!roleFound) throw new NotFoundException('role not found');
    const userFound = await this.userRepository.findOne({ where: { email: createDriverDto.email } });
    if (userFound) throw new NotFoundException('an account has already been created with this email');
    let newUser = await this.userRepository.save({ ...createDriverDto, role: roleFound, password: encryptPassword(createDriverDto.password) });
    await this.driverRepository.save({ currentLat: currentLat, currentLng: currentLng, user: newUser });
    return newUser;
  }

  async findAll() {
    const roleFound = await this.roleRepository.findOne({ where: { name: RoleNameEnum.DRIVER } });
    if (!roleFound) throw new NotFoundException('role not found');
    const userFound = await this.driverRepository.find({ where: { is_deleted: false }, relations: ['user', 'user.role'] });
    return userFound;
  }

  async findOne(id: string) {
    const roleFound = await this.roleRepository.findOne({ where: { name: RoleNameEnum.DRIVER } });
    if (!roleFound) throw new NotFoundException('role not found');
    const userFound = await this.driverRepository.findOne({ where: { id, is_deleted: false }, relations: ['user', 'user.role'] });
    if (!userFound) throw new NotFoundException('user not found');
    return userFound;
  }

  async update(id: string, updateDriverDto: UpdateDriverDto) {
    const roleFound = await this.roleRepository.findOne({ where: { name: RoleNameEnum.DRIVER } });
    if (!roleFound) throw new NotFoundException('role not found');
    const userFound = await this.userRepository.findOne({ where: { role: roleFound, id, status: true }, });
    if (!userFound) throw new NotFoundException('user not found');
    if (updateDriverDto.password) updateDriverDto.password = encryptPassword(updateDriverDto.password)

    return await this.userRepository.update(userFound.id, updateDriverDto);
  }

  async remove(id: string) {
    const roleFound = await this.roleRepository.findOne({ where: { name: RoleNameEnum.DRIVER } });
    if (!roleFound) throw new NotFoundException('role not found');
    const userFound = await this.userRepository.findOne({ where: { role: roleFound, id }, });
    if (!userFound) throw new NotFoundException('role not found');
    return await this.userRepository.update(userFound.id, { status: false, is_deleted: true });
  }
}
