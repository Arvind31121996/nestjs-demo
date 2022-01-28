import { HttpException, Injectable, HttpStatus, Req } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ShopItems } from "./entity/shopitem.entity";
import { Shop } from "@components/shops/entity/shop.entity";
import { CreateShopItemDto } from "@components/shopItems/dto/createShopitem.dto";
import { Repository } from "typeorm";
import { ObjectID } from "mongodb";
import { RedisCacheService } from "@components/redis/redis.service";
import { User } from "@components/user/entity/user.entity";


@Injectable()
export class ShopItemService {
  constructor(
    @InjectRepository(ShopItems)
    private readonly shopItemsRepository: Repository<ShopItems>,
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
    private readonly redisCacheService: RedisCacheService,
  ) {}

  public async createShopItem(shopItemDto: CreateShopItemDto, currentUser): Promise<ShopItems> {
    const shopDoc = await this.shopRepository.findOne({_id: new ObjectID(shopItemDto.shopId.toString())});
    if(!shopDoc){
      throw new HttpException("Shop Does Not Exist with this Id", HttpStatus.NOT_FOUND);
    } else if(shopDoc.createdBy !== currentUser.email){
      throw new HttpException("You do not have permission for this action", HttpStatus.FORBIDDEN);
    } else {
    const shopitem = new ShopItems();
    shopitem.name = shopItemDto.name;
    shopitem.brand = shopItemDto.brand;
    shopitem.mrp = shopItemDto.mrp;
    shopitem.shopId = new ObjectID(shopItemDto.shopId.toString())
    this.redisCacheService.delete(shopItemDto.shopId);
    try {
      const checkShop = await this.shopItemsRepository.findOne({ name: shopItemDto.name });
      if(checkShop){
        throw new HttpException("ShopItem Already Exist with this Name", HttpStatus.CONFLICT);
      } else {
        const shopItemsData = await this.shopItemsRepository.save(shopitem);
        this.redisCacheService.setData(shopItemsData._id, JSON.stringify(shopItemsData), 360000);
      }
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}

  public async deleteShop(id) {
    try {
      this.redisCacheService.delete(id);
      return this.shopRepository.delete({_id: new ObjectID(id.toString())});
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  public async updateShop(id, shopItemsData) {
    try {
      this.redisCacheService.setData(id, shopItemsData, 36000);
      const updteShopData = await this.shopItemsRepository.update(
        { _id: new ObjectID(id.toString()) },
        shopItemsData
      );
      console.log('Data....',updteShopData)
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  public async getShopItemsByShopId(shopId) {
    try {
      const shopItems = await this.redisCacheService.getData(shopId);
        if(shopItems){
          return JSON.parse(shopItems)
        } else{
        let shopItemsWithShop = await this.shopItemsRepository.findAndCount({where:{shopId:new ObjectID(shopId.toString())},order:{created_at:-1}});
        const shopData =  {
          data:shopItemsWithShop[0],
          totalCount:shopItemsWithShop[1]
        }
        this.redisCacheService.setData(shopId, JSON.stringify(shopData), 360000);
        return shopData;
        }
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}
