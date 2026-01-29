import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ERolUser } from '../enums/rol.enum';
import { HydratedDocument } from 'mongoose';

@Schema()
export class User {
  @Prop()
  name: string;
  @Prop()
  lastName: string;
  @Prop()
  phoneNumber: number;
  @Prop({ unique: true })
  email: string;
  @Prop()
  password: string;
  @Prop({
    type: String,
    enum: Object.values(ERolUser),
    required: true,
  })
  role: ERolUser;
  @Prop()
  gender: string;
}
export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
