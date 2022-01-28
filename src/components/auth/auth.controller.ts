import { Body, Controller, Post, Session, Request, UseGuards, Get } from "@nestjs/common";
import { LoginUserDto } from "../user/dto/auth-login.dto";
import { AuthService } from "./auth.service";
import { LoginStatus } from "./interfaces/login-status.interface";
import { JwtAuthGuard } from "@components/auth/jwt-auth.guard";
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags, ApiOkResponse, ApiUnauthorizedResponse} from '@nestjs/swagger';


@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  public async login(@Request() req,@Body() loginUserDto: LoginUserDto,  @Session() session: Record<string,any>): Promise<LoginStatus> {
    const userData = await this.authService.login(loginUserDto, session);
    return userData;
  }

  @UseGuards(JwtAuthGuard)
  @ApiTags('auth')
  @ApiOkResponse({ description: 'Verify Token' })
  @Get('verifyToken')
  @ApiBearerAuth('JWT')
  public async verifyToken(){
    return true;
  }}
