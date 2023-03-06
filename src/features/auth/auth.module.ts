import { Module } from '@nestjs/common';
import { AuthService } from './use-case/auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from 'src/common/database/core/repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
