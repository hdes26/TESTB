import { Injectable, NotFoundException } from '@nestjs/common';
import { AxiosService } from 'src/common/axios/axios.service';
import { RequestStatusTypeEnum } from 'src/common/database/core/enums';
import { DriverRepository, InvoiceRepository, RequestRepository, RiderRepository } from 'src/common/database/core/repositories';
import { MapsService } from 'src/common/google/maps/maps.service';
import { CreateRequestDto } from '../core/dto/create-request.dto';
import { FinishRequestDto } from '../core/dto/finish-request.dto';
import { UpdateRequestDto } from '../core/dto/update-request.dto';

@Injectable()
export class RequestService {

  constructor(
    private riderRepository: RiderRepository,
    private driverRepository: DriverRepository,
    private requestRepository: RequestRepository,
    private invoiceRepository: InvoiceRepository,
    private mapsService: MapsService,
    private axiosService: AxiosService
  ) { }

  async create({ riderId, ...createRequestDto }: CreateRequestDto) {
    const rider = await this.riderRepository.findOne({ where: { id: riderId } });
    if (!rider) throw new NotFoundException('rider not found');
    let requests = await this.requestRepository.find({ where: { rider } });
    let activeRequest = requests.filter(request => request.status !== RequestStatusTypeEnum.FINISH);

    if (activeRequest.length > 0) throw new NotFoundException('rider has active requests');

    let availableDrivers = await this.driverRepository.find({ where: { available: true } })

    if (availableDrivers.length == 0) throw new NotFoundException('no drivers available');

    //ASSIGN THE DRIVER
    let driver = availableDrivers[0];

    let data = await this.mapsService.getDirections(
      `${driver.currentLat},${driver.currentLng}`,
      `${createRequestDto.lat},${createRequestDto.lng}`,
    );
    //SAVE TIME OF ARRIVAL AND DISTANCE USING GOOGLE MAPS API
    if (data.status === 'OK') {

      let { distance, duration } = data.routes[0].legs[0];


      let request = await this.requestRepository.save({ rider, timeofarrival: duration.value.toString(), distance: distance.value.toString(), status: RequestStatusTypeEnum.INPROGRESS, driver, ...createRequestDto });


      await this.driverRepository.update({ id: driver.id }, { available: false });

      return request;
    }

    else {
      console.log('[REQUEST] GOOGLE MAPS ERROR');
      throw new NotFoundException('[REQUEST] GOOGLE MAPS ERROR');
    }

  }

  async findAll() {
    return await this.requestRepository.find();
  }

  async findOne(id: string) {
    return await this.requestRepository.find({ where: { id } });
  }

  async finishRequest(requestId: string, { type, acceptance_token, payment_method_token, payment_source_id }: FinishRequestDto) {

    let request = await this.requestRepository.findOne({ where: { id: requestId }, relations: ['driver'] });
    
    if (!request) throw new NotFoundException('request not found');

    if (request.status !== RequestStatusTypeEnum.INPROGRESS) throw new NotFoundException(`this request cannot be finalized`);

    let driver = await this.driverRepository.findOne({ where: { id: request.driver.id } });
    if (!driver) throw new NotFoundException('driver not found');

    //CALCULATE PRICE TO CHARGE
    let amount = parseInt(request.distance) + ((parseInt(request.timeofarrival) / 60) * 200) + 3500;

    //CREATE INVOICE
    await this.invoiceRepository.save({ total: amount, request: request });

    //PAYMENT WITH WOMPI API
    await this.axiosService.createTransaction(type, payment_method_token, payment_source_id, acceptance_token, amount)


    await this.driverRepository.update({ id: request.driver.id }, { available: true })
    return await this.requestRepository.update({ id: requestId }, { status: RequestStatusTypeEnum.FINISH, driver });

  }
}
