import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GoogleAuthService } from './googleauth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('google')
export class GoogleAuthController {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

  @Get()
  @UseGuards(AuthGuard('google')) 
  async googleAuth(@Req() req) {
      console.log('Hello Google')
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.googleAuthService.googleLogin(req)
  }
}
