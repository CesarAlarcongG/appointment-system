import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ERolUser } from 'src/modules/user/enums/rol.enum';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsOptional()
  phoneNumber?: number;

  @IsString()
  email: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsEnum(ERolUser)
  @IsOptional()
  role?: ERolUser;

  @IsString()
  @IsOptional()
  gender?: string;
}
