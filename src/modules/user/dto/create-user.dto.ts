import { IsEnum, IsString } from 'class-validator';
import { ERolUser } from 'src/modules/user/enums/rol.enum';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsString()
  phoneNumber: number;
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsEnum(ERolUser)
  role: ERolUser;

  @IsString()
  gender: string;
}
