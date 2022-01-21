import { Module } from '@nestjs/common';
import { GoogleAuthController } from './googleauth.controller';
import { GoogleAuthService } from './googleauth.service';
import { GoogleStrategy } from './google.strategy'
import { User } from '@components/user/entity/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '@components/user/entity/role.entity'


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),TypeOrmModule.forFeature([Role])
  ],
  controllers: [GoogleAuthController],
  providers: [GoogleAuthService, GoogleStrategy],
})
export class GoogleAuthModule {}
