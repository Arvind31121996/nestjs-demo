import { IsEmail, IsEmpty } from 'class-validator';

export class UserDto {
  @IsEmpty()
  _id: string;

  @IsEmail()
  email: string;

  role:object;

  age: number;
  
  password: string;

}