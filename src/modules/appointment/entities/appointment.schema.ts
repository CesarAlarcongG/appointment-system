import { Prop, Schema } from '@nestjs/mongoose';
import type { Schedule } from './schedule.schema';
import { Types } from 'mongoose';
import { EStatusAppointment } from '../enums/appintiment-status.enum';
import { EPriority } from '../enums/priority.enum';

@Schema()
export class Appointment {
  @Prop({ type: Object })
  schedule: Schedule;
  @Prop({ type: String, enum: EStatusAppointment, required: true })
  status: EStatusAppointment;

  @Prop({ type: String, enum: EPriority, required: true })
  priority: EPriority;

  @Prop({ type: Types.ObjectId, ref: 'Patient', required: true })
  patientId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Medic', required: false })
  medicId?: Types.ObjectId;
}
