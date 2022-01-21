import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';
import { Injectable } from '@nestjs/common';
import { User } from '@components/user/entity/user.entity';
import { Role } from '@components/user/entity/role.entity'
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";


config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: 'http://localhost:3003/api/v1/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { name, emails, photos } = profile
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken
    }
    const roleDoc = await this.roleRepository.findOne({ name: 'User' });
    const userDoc = new User();
    userDoc.email = user.email;
    userDoc.password = 'nest@123';
    userDoc.isVerified = 'false'
    userDoc.role = { id: roleDoc.id, name: roleDoc.name };
    try{
      const userResponce = await this.userRepository.save(userDoc);
      done(null, user);
    } catch(e){
        console.log(e)
    }
  }
}
