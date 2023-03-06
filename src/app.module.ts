import { validationSchema } from './common/settings/validation';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DriverModule } from './features/driver/driver.module';
import { RiderModule } from './features/rider/rider.module';
import { DatabaseModule } from './common/database/database.module';
import { AuthModule } from './features/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { RequestModule } from './features/request/request.module';
import { BasicStrategy } from './common/utils/strategies/basic';
import { AccessTokenStrategy, RefreshTokenStrategy } from './common/utils/strategies/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
    }),
    {
      ...JwtModule.register({}),
      global: true,
    },
    DatabaseModule,
    DriverModule,
    RiderModule,
    AuthModule,
    RequestModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    BasicStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy
  ],
})
export class AppModule { }
