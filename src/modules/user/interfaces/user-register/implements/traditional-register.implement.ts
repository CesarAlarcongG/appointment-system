import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/modules/auth/auth.service';
import { User } from 'src/modules/user/entities/user.entity';
import { UserRegister } from '../user-register.interface';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { ConflictException, Injectable } from '@nestjs/common';

@Injectable()
export class TraditionalRegisterService implements UserRegister<CreateUserDto> {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly authService: AuthService,
  ) {}

  async registerUser(dto: CreateUserDto): Promise<User> {
    const exists = await this.userModel.exists({ email: dto.email });
    if (exists) throw new ConflictException('Email ya registrado');

    const hashedPassword = await this.authService.encripPassword(dto.password);

    return this.userModel.create({
      ...dto,
      password: hashedPassword,
    });
  }
}
