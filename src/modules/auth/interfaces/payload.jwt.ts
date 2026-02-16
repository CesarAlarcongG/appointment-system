import { ERolUser } from 'src/modules/user/enums/rol.enum';

export interface JwtPayload {
  _id: string;
  email: string;
  rol: ERolUser[];
}
