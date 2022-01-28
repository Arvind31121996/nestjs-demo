import {  IsEmpty } from 'class-validator';

export class ShopItemsDto {
  @IsEmpty()
  _id: string;

  name: string;

  brand:string;

  mrp: number;

}