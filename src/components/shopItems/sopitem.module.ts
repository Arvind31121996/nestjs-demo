import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopItems } from './entity/shopitem.entity';
import { ShopItemController } from '@components/shopItems/shopitem.controller';
import { ShopItemService } from '@components/shopItems/shopitem.service';
import { Shop } from '@components/shops/entity/shop.entity';
import { RedisCacheModule } from '@components/redis/redis.module';


@Module({
  imports: [
    RedisCacheModule,
    TypeOrmModule.forFeature([ShopItems]), 
    TypeOrmModule.forFeature([Shop]),
],
  providers: [ShopItemService],
  exports: [ShopItemService],
  controllers: [ShopItemController],
})
export class ShopItemsModule {}
