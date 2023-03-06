import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { RequestService } from './use-case/request.service';
import { CreateRequestDto } from './core/dto/create-request.dto';
import { FinishRequestDto } from './core/dto/finish-request.dto';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/common/utils/guards/jwt';
import { Roles, RolesGuard } from 'src/common/utils/guards/roles';
import { RoleNameEnum } from 'src/common/database/core/enums';

@UseGuards(AccessTokenGuard, RolesGuard)
@ApiBearerAuth()
@ApiTags('request')
@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) { }

  @Roles(RoleNameEnum.RIDER)
  @Post()
  async create(@Body() createRequestDto: CreateRequestDto) {
    return this.requestService.create(createRequestDto);
  }

  @Get()
  async findAll() {
    return this.requestService.findAll();
  }
  @Roles(RoleNameEnum.RIDER, RoleNameEnum.DRIVER)
  @Get(':requestId')
  async findOne(@Param('requestId') id: string) {
    return this.requestService.findOne(id);
  }

  @Roles(RoleNameEnum.DRIVER , RoleNameEnum.DRIVER)
  @Post('/finishRequest/:requestId')
  async fisnish(@Param('requestId') requestId: string, @Body() finishRequestDto: FinishRequestDto) {
    return await this.requestService.finishRequest(requestId, finishRequestDto);
  }
}
