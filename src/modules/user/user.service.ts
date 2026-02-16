import { User, UserDocument } from './entities/user.entity';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AuthService } from '../auth/auth.service';
import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Token } from '../auth/dto/token.dto';
import { RegisterFactory } from './factories/register.factory';
import { UserRegisterStrategy } from './interfaces/user-register-strategy.interface';
import { UpdateDataDto } from './dto/update-data.dto';
import { JwtPayload } from '../auth/interfaces/payload.jwt';
import { EStateUser } from './enums/state-account.enum';

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

    const user: UserDocument = await strategy.registerUser(information);
    if (!user)
      throw new InternalServerErrorException(
        'No se puedo registrar el ususario',
      );

    const token: Token = this.authService.generateToken(user);

    return token;
  }

  async findUserByEmail(email: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ email }).exec();
  }

  async updateUserData(jwt: JwtPayload, data: UpdateDataDto): Promise<User> {
    const userUpdate: User | null = await this.userModel
      .findOneAndUpdate(
        { _id: jwt._id },
        {
          $set: {
            ...data,
          },
        },
        { new: true },
      )
      .exec();

    if (!userUpdate) throw new NotFoundException('No se necontro al ususario');
    return userUpdate;
  }

  async suspendUserAccount(idUser: ObjectId) {
    const userSuspended = await this.userModel.findOneAndUpdate(
      { _id: idUser },
      {
        state: EStateUser.SUSPENDED,
      },
    );

    if (!userSuspended)
      throw new NotFoundException('No se encontro al ususario');
    return userSuspended;
  }
}
