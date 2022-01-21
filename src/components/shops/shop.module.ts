import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@components/user/entity/user.entity';
import { Shop } from './entity/shop.entity';
import { ShopController } from '@components/shops/shop.controller';
import { ShopService } from '@components/shops/shop.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),TypeOrmModule.forFeature([Shop]),
],
  providers: [ShopService],
  exports: [ShopService],
  controllers: [ShopController],
})
export class ShopModule {}
