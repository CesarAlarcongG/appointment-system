import { SetMetadata } from '@nestjs/common';
import { ERolUser } from 'src/modules/user/enums/rol.enum';

export const RequiresRole = (...roles: ERolUser[]) =>
  SetMetadata('require-rol', roles);
