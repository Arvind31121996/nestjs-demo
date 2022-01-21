import { IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { NAME_ERROR_MESSAGE, ROLE_ERROR_MESSAGE } from '@components/utils/message';


export class CreatePermissionDto {
  @IsNotEmpty({message: NAME_ERROR_MESSAGE})
  @ApiProperty()
  name: string;

  @IsNotEmpty({message: ROLE_ERROR_MESSAGE})
  @ApiProperty()
  role: string;
}
