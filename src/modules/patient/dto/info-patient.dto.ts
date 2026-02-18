import { IsArray, IsEnum, IsMongoId, IsObject } from 'class-validator';
import { EBlodyType } from '../enums/blody-type.enum';
import type { Insurance } from '../types/insurance.type';

export class InfoPatientDto {
  @IsMongoId()
  userId: string;

  @IsEnum(EBlodyType)
  blodyType: EBlodyType;

  @IsArray()
  allergies: string[];

  @IsObject()
  insurance: Insurance;
}
