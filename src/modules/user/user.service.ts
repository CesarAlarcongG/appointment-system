import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AuthService } from '../auth/auth.service';
import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Token } from '../auth/dto/token.dto';
import { RegisterFactory } from './factories/register.factory';
import { UserRegisterStrategy } from './interfaces/user-register-strategy.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly factoryRegister: RegisterFactory,
  ) {}

  async registerUser<T>(information: T, provider: string): Promise<Token> {
    const strategy: UserRegisterStrategy<T> =
      this.factoryRegister.get(provider);

    const user: User = await strategy.registerUser(information);
    if (!user)
      throw new InternalServerErrorException(
        'No se puedo registrar el ususario',
      );

    const token: Token = this.authService.generateToken(user);

    return token;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email }).exec();
  }
}
