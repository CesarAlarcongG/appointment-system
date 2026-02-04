import { ERolUser } from 'src/modules/user/enums/rol.enum';

export interface JwtPayload {
  email: string;
  rol: ERolUser;
}
