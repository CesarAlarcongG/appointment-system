import { UserDocument } from '../entities/user.entity';

export interface UserRegisterStrategy<T> {
  readonly provider: string;
  registerUser(information: T): Promise<UserDocument>;
}
