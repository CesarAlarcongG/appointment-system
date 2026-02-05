import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/modules/auth/auth.service';
import { User } from 'src/modules/user/entities/user.entity';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { UserRegister } from 'src/interfaces/user-register.interface';

@Injectable()
export class TraditionalRegisterService implements UserRegister<CreateUserDto> {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly authService: AuthService,
  ) {}

  async registerUser(dto: CreateUserDto): Promise<User> {
    const exists = await this.userModel.exists({ email: dto.email });
    if (exists) throw new ConflictException('Email ya registrado');

    if (!dto.password)
      throw new BadRequestException('No se envió la contraseña');

    const hashedPassword = await this.authService.encripPassword(dto.password);

    return this.userModel.create({
      ...dto,
      password: hashedPassword,
    });
  }
}
