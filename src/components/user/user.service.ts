import { HttpException, Injectable, HttpStatus,Inject,Scope } from "@nestjs/common";
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user/entity/user.entity";
import { Role } from "../user/entity/role.entity";
import { CreateUserDto } from "@components/user/dto/create-user.dto";
import { LoginUserDto } from "./dto/auth-login.dto";
import { Repository } from "typeorm";
import { UserDto } from "./dto/user.dto";
import { comparePasswords } from "@components/utils/commnon-utils";
import { ObjectID } from "mongodb";
import { EmailService } from "@components/utils/sendEmail";
import { NEW_USER_NOTIFICATION, NEW_USER_EMAIL_TEXT } from "@components/utils/message"
import { Cron } from '@nestjs/schedule';
import { CreatePermissionDto } from '@components/user/dto/create-permission.dto'
import { Permission } from '@components/user/entity/permission.entity';
import { RedisCacheService } from "@components/redis/redis.service";
import { All_User_Store } from '@constant/redis.constant'
import { Request } from 'express';

@Injectable()
@Injectable({ scope: Scope.REQUEST })
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
    private readonly emailService: EmailService,
    private readonly redisCacheService: RedisCacheService,
    // @Inject(REQUEST) private readonly request: Request
  ) {}

  public async create(userDto: CreateUserDto): Promise<User> {
    const roleDoc = await this.roleRepository.findOne({ name: userDto.role });
    const user = new User();
    user.email = userDto.email;
    user.password = userDto.password;
    user.isVerified = 'false'
    user.age = userDto.age ? userDto.age : null;
    user.role = { id: roleDoc.id, name: roleDoc.name };
    try {
      const checkUser = await this.userRepository.findOne({ email: userDto.email });
      if(checkUser){
        throw new HttpException("User Already Exist", HttpStatus.CONFLICT);
      } else {
        const userResponce =  await this.userRepository.save(user);
        // this.emailService.example(user.email, NEW_USER_NOTIFICATION,NEW_USER_EMAIL_TEXT)
        await this.redisCacheService.delete(All_User_Store); 
        return userResponce
      }
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  public async deleteUser(id) {
    try {
      const userInfo = await this.userRepository.delete({_id: new ObjectID(id.toString())});
      await this.redisCacheService.delete(All_User_Store); 
      return userInfo;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  public async updateUser(id, userData) {
    try {
      const userInfo =  await this.userRepository.update(
        { _id: new ObjectID(id.toString()) },
        userData
      );
      const allUsers = await this.redisCacheService.delete(All_User_Store); 
      return userInfo;

    } catch (e) {
      console.log(e);
      return e;
    }
  }

  public async logoutUser() {
    try {
      return true;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  public async getUsers(query) {
    try {
      // console.log('Hello...........',this.request)
      let take = query.limit ? parseInt(query.limit) : 5;
      let skip = query.page ? (query.page * 5) : 0;
      let key = `all_user_store_limit:${take}_skip:${skip}`;
      console.log(key)
      const allUsers = await this.redisCacheService.getData(key);
      if(allUsers){
        console.log('found from redis')
        return JSON.parse(allUsers);
      } else {
        console.log('found from db')
        let users = await this.userRepository.findAndCount({
          take:take,
          skip:skip
        });
        //  this.redisCacheService.setData(key, JSON.stringify(users), 360000);
        return {
          data:users[0],
          totalCount:users[1]
        }
      }
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async findByLogin({ email, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    const areEqual = await comparePasswords(user.password, password);

    if (!areEqual) {
      throw new HttpException("Invalid credentials", HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  @Cron('* * 1 * * *')
  async handleCron() {
    try {
      console.log('cron stars')
      const data = await this.userRepository.find({where: {
        "created_at": 
        {
            $gte: new Date((new Date().getTime() - (7 * 24 * 60 * 60 * 1000)))
        }
    }})
    console.log(data)
      // this.emailService.example(process.env.ADMIN_EMAIL, WEEKLY_DATA , data)
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  public async createPermission(createPermission: CreatePermissionDto): Promise<Permission> {
    const roleDoc = await this.roleRepository.findOne({ name: createPermission.role });
    const permission = new Permission();
    permission.name = createPermission.name;
    permission.role = { id: roleDoc.id, name: roleDoc.name };
    try {
      return await this.permissionRepository.save(permission);
    } catch (e) {
      console.log(e);
    }
  }

  public async checkEmail(email: any) {
    try{
      console.log('HEl................')
      const data = await this.userRepository.findOne({ email: email });
      if (data) return false;
      return true;
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}
