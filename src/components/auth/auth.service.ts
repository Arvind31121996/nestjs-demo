import { Injectable} from '@nestjs/common';
import { LoginUserDto } from '../user/dto/auth-login.dto';
import { LoginStatus } from './interfaces/login-status.interface';
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import config from '@components/utils/config'

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UserService,
        private readonly jwtService: JwtService,
      ) {}

    async login(loginUserDto: LoginUserDto,session): Promise<LoginStatus> {
        // find user in db
        const user = await this.usersService.findByLogin(loginUserDto);
        console.log(user)
        // generate and sign token
        let userPayload = {
          _id:user._id,
          email:user.email,
          role:user.role
        }
        const token = this._createToken(userPayload, session);
    
        return {
          email: user.email,
          role:user.role,
          session,
          ...token,
        };
      }

      private _createToken(users:any, session) {
        const expiresIn = process.env.EXPIRESIN
        const accessToken = this.jwtService.sign(users);
        session.token = accessToken;
        return {
          expiresIn,
          accessToken,
          session
        };
      }
}
