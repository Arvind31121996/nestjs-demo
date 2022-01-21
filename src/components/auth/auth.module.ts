import { Module } from '@nestjs/common';
import { AuthController } from '@components/auth/auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { SessionSerializer } from './session.serailizer';


@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: {
        expiresIn: '2d',
      },
    }),
  ],  
  providers: [AuthService, JwtStrategy, SessionSerializer],
  exports: [JwtModule],

  controllers: [AuthController],
})
export class AuthModule {}
