import { Module } from '@nestjs/common';
import { DriverService } from './use-case/driver.service';
import { DriverController } from './driver.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/common/database/core/repositories/user.repository';
import { RoleRepository } from 'src/common/database/core/repositories/role.repository';
import { DriverRepository } from 'src/common/database/core/repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, RoleRepository, DriverRepository]),
  ],
  controllers: [DriverController],
  providers: [DriverService]
})
export class DriverModule {}
