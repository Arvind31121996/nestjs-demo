import { HttpException, Injectable, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user/entity/user.entity";
import { Shop } from "./entity/shop.entity";
import { CreateShopDto } from "@components/shops/dto/createShop.dto";
import { Repository } from "typeorm";
import { ObjectID } from "mongodb";

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
  ) {}

  public async createShop(shopDto: CreateShopDto, currentUser): Promise<Shop> {
    const shop = new Shop();
    shop.name = shopDto.name;
    shop.address = shopDto.address;
    shop.category = shopDto.category;
    shop.createdBy = currentUser.email;
    try {
      const checkShop = await this.shopRepository.findOne({ name: shopDto.name });
      if(checkShop){
        throw new HttpException("Shop Already Exist with this Name", HttpStatus.CONFLICT);
      } else {
          return await this.shopRepository.save(shop);
      }
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  public async deleteShop(id) {
    try {
      return this.shopRepository.delete({_id: new ObjectID(id.toString())});
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  public async updateShop(id, shopData) {
    try {
      return this.shopRepository.update(
        { _id: new ObjectID(id.toString()) },
        shopData
      );
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  public async getShops() {
    try {     
      const shops = await this.shopRepository.findAndCount();
      return {
        data:shops[0],
        totalCount:shops[1]
      }
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}
