import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { DriverService } from './use-case/driver.service';
import { CreateDriverDto } from './core/dto/create-driver.dto';
import { UpdateDriverDto } from './core/dto/update-driver.dto';
import { ApiTags } from '@nestjs/swagger';



@ApiTags('driver')
@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) { }

  @Post()
  async create(@Body() createDriverDto: CreateDriverDto) {
    return await this.driverService.create(createDriverDto);
  }

  @Get()
  async findAll() {
    return await this.driverService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.driverService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    
    return await this.driverService.update(id, updateDriverDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.driverService.remove(id);
  }
}
