import { IsEmail, IsNotEmpty, MaxLength, MinLength, Matches, IsNumber } from "class-validator";
import { IsAgeExist } from '../decorators/user.decorators'
import { ApiProperty } from '@nestjs/swagger';
import { WEAK_PASSWORD_MESSAGE,EMAIL_ERROR_MESSAGE,PASSOWRD_ERROR_MESSAGE,AGE_ERROR_MESSAGE,ROLE_ERROR_MESSAGE } from "@components/utils/message";

export class CreateUserDto {
  @IsNotEmpty({message:EMAIL_ERROR_MESSAGE})
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty({message:PASSOWRD_ERROR_MESSAGE})
  @MinLength(5)
  @MaxLength(10)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: WEAK_PASSWORD_MESSAGE})
  @ApiProperty()
  password: string;

  @IsNotEmpty({message: ROLE_ERROR_MESSAGE})
  @ApiProperty()
  role: string;

  @IsNumber()
  @IsAgeExist({
    message: AGE_ERROR_MESSAGE,
  })
  @ApiProperty()
  age: number;
}
