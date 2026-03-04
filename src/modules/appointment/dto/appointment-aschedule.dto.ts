import { IsString } from 'class-validator';

export class ScheduleDto {
  @IsString()
  date: string;
  @IsString()
  startTime: string;
  @IsString()
  endTime: string;
}
