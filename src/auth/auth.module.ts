import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { AuthRepository } from './repositories/auth.repository';
import config from '../config/configuration';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: config().jwtSecret,
      signOptions: { expiresIn: parseInt(config().tokenLife) },
    }),
  ],
  providers: [AuthService, AuthRepository],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
