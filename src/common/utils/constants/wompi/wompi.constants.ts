import { ConfigService } from '@nestjs/config';

require('dotenv').config();
const configService = new ConfigService();

export const wompiConstants = {
  wompiPublicKey: configService.get<string>('STRIPE_SECRET_PUBLIC_KEY'),
  wompiSecretKey: configService.get<string>('STRIPE_SECRET_PRIVATE_KEY'),
};
