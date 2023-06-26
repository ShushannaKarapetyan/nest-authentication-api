import * as fs from 'fs';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfileModule } from './profile/profile.module';
import { AuthMiddleware } from './auth/middlewares/authMiddleware';
import config from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: fs.existsSync(
        `${process.cwd()}/.env.${process.env.NODE_ENV}`,
      )
        ? `${process.cwd()}/.env.${process.env.NODE_ENV}`
        : '.env',
      load: [config],
    }),
    MongooseModule.forRoot(`${process.env.DB_HOST}/${process.env.DB_SCHEMA}`),
    AuthModule,
    UsersModule,
    ProfileModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('profile');
  }
}
