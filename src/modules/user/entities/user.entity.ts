import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ERolUser } from '../enums/rol.enum';
import { HydratedDocument } from 'mongoose';
import { EStateUser } from '../enums/state-account.enum';
import { Patient } from 'src/modules/patient/entity/patient.entity';

@Schema()
export class User {
  @Prop()
  firtsName: string;

  @Prop()
  lastName: string;

  @Prop()
  phoneNumber: number;

  @Prop({ unique: true })
  email: string;

  @Prop({ required: false })
  password: string;

  @Prop({
    type: [String],
    enum: Object.values(ERolUser),
    required: true,
  })
  rol: ERolUser[];

  @Prop()
  gender: string;

  @Prop()
  state: EStateUser;

  @Prop({ required: false })
  resetCode: string;

  @Prop({ required: false, type: Object })
  patient: Pick<Patient, 'blodyType' | 'allergies'>; // Es muy bueno para embeber documento, como en este caso
}
export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
