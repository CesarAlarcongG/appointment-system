import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ERolUser } from '../enums/rol.enum';

export class UpdateDataDto {
  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  firtsName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsEnum({
    string: ERolUser,
  })
  @IsOptional()
  gender?: ERolUser;
}
