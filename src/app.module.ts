import { Module, MiddlewareConsumer, CacheModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from '@database/config/ormconfig';
import { AuthModule } from '@components/auth/auth.module';
import { UserModule } from '@components/user/user.module';
import {LogsMiddleware} from "./components/utils/logger"
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import DailyRotateFile = require('winston-daily-rotate-file');
import { LoggerLevel } from './constant';
import { GoogleAuthModule } from '@components/googleauth/googleauth.module';
import { RedisCacheModule } from "@components/redis/redis.module"
import { ShopModule } from '@components/shops/shop.module'
import { PassportModule } from '@nestjs/passport';
import {ShopItemsModule} from '@components/shopItems/sopitem.module'


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(ormConfig()),
    AuthModule,
    UserModule,
    ShopModule,
    ShopItemsModule,
    // PassportModule.register({
    //   session:true
    // }),
    RedisCacheModule,
    CacheModule.register({
      ttl: 5,
      max: 100,
    }),
    GoogleAuthModule, 
    WinstonModule.forRoot({
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.errors({ stack: true }),
        format.align(),
        format.colorize(),
        format.printf(
          info =>
            `${info.timestamp} [${info.label}] ${info.level.slice(
              5,
              info.level.length - 5,
            )}: ${info.message}`,
        ),
      ),
      transports: [
        new DailyRotateFile({
          filename: process.env.LOG_FOLDER + 'all/' + process.env.LOG_FILE,
          zippedArchive: true,
          frequency: '24h',
          maxSize: '20m',
          maxFiles: '14d',
          level: process.env.LOG_LEVEL,
          silent: !JSON.parse(process.env.LOG_FILE_ENABLE),
        }),
        new DailyRotateFile({
          filename: process.env.LOG_FOLDER + 'errors/' + process.env.LOG_FILE,
          zippedArchive: true,
          frequency: process.env.LOG_FREQUENCY,
          maxSize: process.env.LOG_MAX_SIZE,
          maxFiles: process.env.LOG_MAX_FILES,
          level: LoggerLevel.ERROR,
          silent: !JSON.parse(process.env.LOG_FILE_ENABLE),
        }),
        new DailyRotateFile({
          format: format.combine(
            format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss',
            }),
            format.errors({ stack: true }),
            format.json(),
            format.splat(),
            format.colorize(),
          ),
          filename: process.env.LOG_FOLDER + 'json/' + process.env.LOG_FILE,
          zippedArchive: true,
          frequency: process.env.LOG_FREQUENCY,
          maxSize: process.env.LOG_MAX_SIZE,
          maxFiles: process.env.LOG_MAX_FILES,
          level: process.env.LOG_LEVEL,
          silent: !JSON.parse(process.env.LOG_FILE_ENABLE),
        }),
        new transports.Console({
          format: format.simple(),
          level: LoggerLevel.SILLY,
          silent: !JSON.parse(process.env.LOG_CONSOLE_ENABLE),
        }),
      ],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LogsMiddleware)
      .forRoutes('*');
  }
}
