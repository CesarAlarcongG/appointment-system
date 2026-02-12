import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/modules/auth/auth.service';
import { User, UserDocument } from 'src/modules/user/entities/user.entity';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { UserRegisterStrategy } from '../interfaces/user-register-strategy.interface';
import { EStateUser } from '../enums/state-account.enum';

@Injectable()
export class TraditionalRegisterStrategy implements UserRegisterStrategy<CreateUserDto> {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly authService: AuthService,
  ) {}

  provider = 'traditional';

  async registerUser(dto: CreateUserDto): Promise<UserDocument> {
    const exists = await this.userModel.exists({ email: dto.email });
    if (exists) throw new ConflictException('Email ya registrado');

    if (!dto.password)
      throw new BadRequestException('No se envió la contraseña');

    const hashedPassword = await this.authService.encriptPassword(dto.password);

    return this.userModel.create({
      ...dto,
      password: hashedPassword,
      state: EStateUser.INFORMATION_INCOMPLETE,
    });
  }
}
