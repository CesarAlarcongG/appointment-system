import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EBlodyType } from '../enums/blody-type.enum';
import type { Insurance } from '../types/insurance.type';
import { HydratedDocument, Types } from 'mongoose';

@Schema()
export class Patient {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({
    type: String,
    enum: Object.values(EBlodyType),
    required: true,
  })
  blodyType: EBlodyType;

  @Prop({ type: [String] })
  allergies: string[];

  @Prop({ type: Object })
  insurance: Insurance;
}
export type PatientDocument = HydratedDocument<Patient>;
export const PatientSchema = SchemaFactory.createForClass(Patient);
