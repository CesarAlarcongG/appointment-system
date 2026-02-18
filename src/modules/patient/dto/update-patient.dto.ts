import { PartialType } from '@nestjs/mapped-types';
import { InfoPatientDto } from './info-patient.dto';

export class UpdatePatientDto extends PartialType(InfoPatientDto) {}
