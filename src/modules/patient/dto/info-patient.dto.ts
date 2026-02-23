import { IsArray, IsEnum, IsObject } from 'class-validator';
import { EBlodyType } from '../enums/blody-type.enum';
import type { Insurance } from '../types/insurance.type';

export class InfoPatientDto {
  @IsEnum(EBlodyType)
  blodyType: EBlodyType;

  @IsArray()
  allergies: string[];

  @IsObject()
  insurance: Insurance;
}
