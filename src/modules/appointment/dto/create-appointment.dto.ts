import { IsEnum, IsMongoId, ValidateNested } from 'class-validator';
import { EPriority } from '../enums/priority.enum';
import { EStatusAppointment } from '../enums/appintiment-status.enum';
import { Transform, Type } from 'class-transformer';
import { Types } from 'mongoose';
import { ScheduleDto } from './appointment-aschedule.dto';

export class CreateAppointmentDto {
  @Type(() => ScheduleDto)
  @ValidateNested()
  schedule: ScheduleDto;

  @IsEnum(EStatusAppointment)
  status: EStatusAppointment;

  @IsEnum(EPriority)
  priority: EPriority;

  @IsMongoId()
  @Transform(() => Types.ObjectId)
  patientId: Types.ObjectId;
}
