import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { RiderService } from './use-case/rider.service';
import { CreateRiderDto } from './core/dto/create-rider.dto';
import { UpdateRiderDto } from './core/dto/update-rider.dto';
import {  ApiTags } from '@nestjs/swagger';


@ApiTags('rider')
@Controller('rider')
export class RiderController {
  constructor(private readonly riderService: RiderService) {}

  @Post('/create')
 async create(@Body() createRiderDto: CreateRiderDto) {
    return this.riderService.create(createRiderDto);
  }

  @Get()
  async findAll() {
    return this.riderService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.riderService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateRiderDto: UpdateRiderDto) {
    return this.riderService.update(id, updateRiderDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.riderService.remove(id);
  }
}
