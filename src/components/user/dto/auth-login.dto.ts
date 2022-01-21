import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EMAIL_ERROR_MESSAGE, PASSOWRD_ERROR_MESSAGE } from '@components/utils/message';


export class LoginUserDto {
  @IsNotEmpty({message: EMAIL_ERROR_MESSAGE})
  @ApiProperty()
  readonly email: string;

  @IsNotEmpty({message: PASSOWRD_ERROR_MESSAGE})
  @ApiProperty()
  readonly password: string;
}
