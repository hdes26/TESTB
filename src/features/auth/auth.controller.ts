import { Controller,Post, Body } from '@nestjs/common';
import { AuthService } from './use-case/auth.service';
import { LoginDto } from './core/dto/login.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login')
  async login(@Body() data: LoginDto) {
    return await this.authService.login(data);
  }
}
