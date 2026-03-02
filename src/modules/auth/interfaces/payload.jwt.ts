import { Types } from 'mongoose';
import { ERolUser } from 'src/modules/user/enums/rol.enum';

export interface JwtPayload {
  _id: Types.ObjectId;
  email: string;
  rol: ERolUser[];
}
