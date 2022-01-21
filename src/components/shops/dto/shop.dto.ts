import { IsEmail, IsEmpty } from 'class-validator';

export class ShopDto {
  @IsEmpty()
  _id: string;

  @IsEmail()
  name: string;

  address:string;

}