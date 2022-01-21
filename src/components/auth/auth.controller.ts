import { Body, Controller, Post, Session, Request, Response } from "@nestjs/common";
import { LoginUserDto } from "../user/dto/auth-login.dto";
import { AuthService } from "./auth.service";
import { LoginStatus } from "./interfaces/login-status.interface";
// import { Response } from 'express';

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  public async login(@Request() req,@Body() loginUserDto: LoginUserDto,  @Session() session: Record<string,any>): Promise<LoginStatus> {
    const userData = await this.authService.login(loginUserDto, session);

    // let sessionId = session.id
    // const data = {
    //   email:userData.email,
    //   accessToken:userData.accessToken,
    //   expiresIn: userData.expiresIn,
    //   role:userData.role,
    //   sessionId}
    return userData;
  }
}
