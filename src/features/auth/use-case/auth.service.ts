import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from '../core/dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/common/database/core/repositories/user.repository';
import { comparePassword } from 'src/common/utils/functions';
import { User } from 'src/common/database/core/entities';


@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private configService: ConfigService) { }

  private async getTokens(user: User) {
    const payload = { id: user.id, role: user.role };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_KEY'),
        expiresIn: '12h',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_KEY'),
        expiresIn: '7d',
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
  async login({ email, password }: LoginDto) {
    const userFound = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'password', 'status'],
      relations: ['role'],
    });
    if (!userFound || !userFound.status || (userFound && comparePassword(password, userFound.password) === false)
    ) {
      throw new BadRequestException('e-mail or password invalid');
    }
    return await this.getTokens(userFound);
  }
}
