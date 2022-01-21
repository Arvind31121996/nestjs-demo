import { IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { NAME_ERROR_MESSAGE, BRAND_ERROR_MESSAGE, MRP_ERROR_MESSAGE, SHOPID_ERROR_MESSAGE } from "@components/utils/message";

export class CreateShopItemDto {
  @IsNotEmpty({ message: NAME_ERROR_MESSAGE })
  @ApiProperty()
  name: string;

  @IsNotEmpty({ message: BRAND_ERROR_MESSAGE })
  @ApiProperty()
  brand: string;

  @IsNotEmpty({ message: MRP_ERROR_MESSAGE })
  @ApiProperty()
  mrp: number;

  @IsNotEmpty({ message: SHOPID_ERROR_MESSAGE })
  @ApiProperty()
  shopId: string;
}
