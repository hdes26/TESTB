import { Module } from '@nestjs/common';
import { RequestService } from './use-case/request.service';
import { RequestController } from './request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverRepository, InvoiceRepository, RequestRepository, RiderRepository } from 'src/common/database/core/repositories';
import { MapsModule } from 'src/common/google/maps/maps.module';
import { AxiosModule } from 'src/common/axios/axios.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DriverRepository, RiderRepository, RequestRepository, InvoiceRepository]),
    MapsModule,
    AxiosModule
  ],
  controllers: [RequestController],
  providers: [RequestService]
})
export class RequestModule {}
