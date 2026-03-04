import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schedule, ScheduleSchema } from './schedule.schema';
import { HydratedDocument, Types } from 'mongoose';
import { EStatusAppointment } from '../enums/appintiment-status.enum';
import { EPriority } from '../enums/priority.enum';

@Schema()
export class Appointment {
  @Prop({ type: ScheduleSchema })
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

export type AppointmentDocument = HydratedDocument<Appointment>;
export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
