import { User } from '../modules/user/entities/user.entity';

export interface UserRegister<T> {
  registerUser(information: T): Promise<User>;
}
