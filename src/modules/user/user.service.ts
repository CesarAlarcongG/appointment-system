import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AuthService } from '../auth/auth.service';
import { UserRegister } from './interfaces/user-register/user-register.interface';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Token } from '../auth/dto/token.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly authService: AuthService,
  ) {}

  async registerUser<T>(
    information: T,
    userRegister: UserRegister<T>,
  ): Promise<Token> {
    const user = await userRegister.registerUser(information);
    if (!user)
      throw new InternalServerErrorException(
        'No se puedo registrar el ususario',
      );
    const token = this.authService.generateToken(user);
    return token;
  }
}
