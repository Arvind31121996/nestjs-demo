import { Body, Controller, Put, Post, Param, Delete, Get, UseGuards, Request, } from '@nestjs/common';
import { User } from '@components/user/entity/user.entity';
import { CreateShopDto } from '@components/shops/dto/createShop.dto';
import { ShopDto } from '@components/shops/dto/shop.dto';
import { JwtAuthGuard } from "@components/auth/jwt-auth.guard";
import  RoleGuard from "../auth/role.guard"
import Role from '../auth/role.enum';
import { ShopService } from './shop.service';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags, ApiOkResponse, ApiUnauthorizedResponse} from '@nestjs/swagger';
import { Shop } from './entity/shop.entity';


@Controller('shop')
export class ShopController {
  constructor(
    private readonly shopService: ShopService,
  ) {}

  @ApiOkResponse({ description: 'Create Shop' })
  @ApiResponse({status:201})
  @ApiBody({ type: CreateShopDto})
  @ApiTags('shop')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard, RoleGuard(Role.Owner))
  @Post()
  public async createShop(@Body() shopDto: CreateShopDto,@Request() req: any,): Promise<Shop> {
    return this.shopService.createShop(shopDto,req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'Delete current Shop' })
  @Delete(':id')
  @ApiTags('shop')
  @UseGuards(JwtAuthGuard, RoleGuard(Role.Admin))
  @ApiBearerAuth('JWT')
  public async delete(@Param('id') shopId: string){
    return this.shopService.deleteShop(shopId);
  }


  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'Update current shop' })
  @ApiUnauthorizedResponse()
  @ApiBody({ type: User })
  @Put(':id')
  @ApiTags('shop')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard, RoleGuard(Role.Owner))
  public async updateShop(
    @Param('id') shopId: string,
    @Body() shopDto: ShopDto){
    return this.shopService.updateShop(shopId,shopDto);
  }


  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiTags('shop')
  @ApiBearerAuth('JWT')
  public async getShops(
  ): Promise<User> {
    return this.shopService.getShops();
  }

}
