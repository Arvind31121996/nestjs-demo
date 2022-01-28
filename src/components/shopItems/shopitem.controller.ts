import { Body, Controller, Put, Post, Param, Delete, Get, UseGuards, Request} from '@nestjs/common';
import { User } from '@components/user/entity/user.entity';
import { CreateShopItemDto } from '@components/shopItems/dto/createShopitem.dto';
import { ShopItemsDto } from '@components/shopItems/dto/shopItem.dto';
import { JwtAuthGuard } from "@components/auth/jwt-auth.guard";
import { ShopItemService } from './shopitem.service';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags, ApiOkResponse, ApiUnauthorizedResponse} from '@nestjs/swagger';
import { ShopItems } from './entity/shopitem.entity';
import  RoleGuard from "../auth/role.guard"
import Role from '../auth/role.enum';


@Controller('shopItems')
export class ShopItemController {
  constructor(
    private readonly shopItemService: ShopItemService,
  ) {}

  @ApiOkResponse({ description: 'Create Shop Items' })
  @ApiResponse({status:201})
  @ApiBody({ type: CreateShopItemDto})
  @ApiTags('shopItem')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard, RoleGuard(Role.Owner))
  @Post()
  public async createShop(@Request() req: any,
  @Body() shopItemDto: CreateShopItemDto): Promise<ShopItems> {
    return this.shopItemService.createShopItem(shopItemDto, req.user);
  }

  
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'Delete current Shop Items' })
  @Delete(':id')
  @ApiTags('shopItem')
  @ApiBearerAuth('JWT')
  public async delete(@Param('id') shopId: string){
    return this.shopItemService.deleteShop(shopId);
  }


  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'Update current shop Items' })
  @ApiUnauthorizedResponse()
  @ApiBody({ type: User })
  @Put(':id')
  @ApiTags('shopItem')
  @ApiBearerAuth('JWT')
  public async updateShop(
    @Param('id') shopId: string,
    @Body() shopItemsDto: ShopItemsDto){
    return this.shopItemService.updateShop(shopId,shopItemsDto);
  }


  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'get all shop Items with particular shop' })
  @Get(':shopId/items')
  @ApiTags('shopItem')
  @ApiBearerAuth('JWT')
  public async getShops(
    @Param('shopId') shopId: string,
  ): Promise<User> {
    return this.shopItemService.getShopItemsByShopId(shopId);
  }

}
