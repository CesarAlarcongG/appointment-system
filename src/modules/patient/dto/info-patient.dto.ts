import { IsArray, IsEnum, IsObject } from 'class-validator';
import { EBlodyType } from '../enums/blody-type.enum';
import type { Insurance } from '../types/insurance.type';
import { User } from 'src/modules/user/entities/user.entity';

export class InfoPatientDto {
  @IsEnum(EBlodyType)
  blodyType: EBlodyType;

  @IsArray()
  allergies: string[];

  @IsObject()
  insurance: Insurance;

  userInformation: Pick<User, 'firtsName' | 'lastName'>;
}
