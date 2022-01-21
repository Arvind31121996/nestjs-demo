import { Body, Controller, Put, Post, Param, Delete, Get, UseGuards, Session, Request, Query} from '@nestjs/common';
import { User } from '@components/user/entity/user.entity';
import { CreateUserDto } from '@components/user/dto/create-user.dto';
import { UserDto } from '@components/user/dto/user.dto';
import { JwtAuthGuard } from "@components/auth/jwt-auth.guard";
import  RoleGuard from "../auth/role.guard"
import Role from '../auth/role.enum';
import { UserData } from './decorators/user.decorators'
import { UserService } from './user.service';
import { CreatePermissionDto } from '@components/user/dto/create-permission.dto'
import { Permission } from '@components/user/entity/permission.entity';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags, ApiOkResponse, ApiUnauthorizedResponse} from '@nestjs/swagger';


@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @ApiOkResponse({ description: 'Create User' })
  @ApiResponse({status:201})
  @ApiBody({ type:  CreateUserDto})

  @Post()
  public async create(@Body() userDto: CreateUserDto): Promise<User> {
    return this.userService.create(userDto);
  }

  
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'Delete current user' })
  @Delete(':id')
  @ApiTags('users')
  @ApiBearerAuth('JWT')
  public async delete(@Param('id') userId: string){
    return this.userService.deleteUser(userId);
  }


  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'Update current user' })
  @ApiUnauthorizedResponse()
  @ApiBody({ type: User })
  @Put(':id')
  @ApiTags('users')
  @ApiBearerAuth('JWT')
  public async update(
    @Param('id') userId: string,
    @Body() userDto: UserDto){
    return this.userService.updateUser(userId,userDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'Log  x out current user' })
  @ApiUnauthorizedResponse()
  @Get(':id')
  @ApiTags('users')
  @ApiBearerAuth('JWT')
  public async logoutUser(
    @Session() session: {},
    @Param('id') userId: string){
      return this.userService.logoutUser();
  }


  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiTags('users')
  @ApiBearerAuth('JWT')
  public async getUsers(
    @Query() query: Record<string, any>
  ): Promise<User> {
    return this.userService.getUsers(query);
  }

  @Post('/permission')
  @ApiTags('users')
  @ApiBearerAuth('JWT')
  public async createPermission(@Body() permissionDto: CreatePermissionDto): Promise<Permission> {
    return this.userService.createPermission(permissionDto)
  }
}
