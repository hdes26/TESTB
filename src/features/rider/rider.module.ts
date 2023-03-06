import { Module } from '@nestjs/common';
import { RiderService } from './use-case/rider.service';
import { RiderController } from './rider.controller';
import { UserRepository } from 'src/common/database/core/repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiderRepository, RoleRepository } from 'src/common/database/core/repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, RoleRepository,RiderRepository]),
  ],
  controllers: [RiderController],
  providers: [RiderService]
})
export class RiderModule {}
