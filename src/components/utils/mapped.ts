import { User } from '../user/entity/user.entity'
import { UserDto } from '../user/dto/user.dto';



export const toUserDto = (data: User): UserDto => {
    const { _id,  email, password, role, age } = data;
    let userDto: UserDto = {
      _id,
      email,
      password,
      role,
      age
    };
  
    return userDto;
  };