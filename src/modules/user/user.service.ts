import { Body, ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly authService: AuthService,
  ) {}

  async registerUser(createUserDto: CreateUserDto): Promise<User> {
    const isEmailExist = await this.checkEmailExists(createUserDto.email);
    if (isEmailExist) {
      throw new ConflictException(
        'Ya hay una registrada con el email, pruebe con otro',
      );
    }

    const hashedPassword = await this.authService.excriptPassword(
      createUserDto.password,
    );

    return this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async checkEmailExists(email: string): Promise<boolean> {
    const validate = await this.userModel
      .exists({
        email: email,
      })
      .exec();
    return !!validate;
  }
}
