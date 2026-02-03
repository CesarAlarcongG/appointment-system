import { User } from '../../entities/user.entity';

export interface UserRegister<T> {
  registerUser(information: T): Promise<User>;
}
