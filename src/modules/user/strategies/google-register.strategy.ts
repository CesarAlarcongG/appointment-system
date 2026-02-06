import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/user.service';
import { UserRegisterStrategy } from '../interfaces/user-register-strategy.interface';
import { GooglePayload } from '../types/google.payload';

@Injectable()
export class GoogleRegisterStrategy implements UserRegisterStrategy<GooglePayload> {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly userService: UserService,
  ) {}

  provider = 'google';

  async registerUser(payload: GooglePayload): Promise<User> {
    const exists = await this.userService.findUserByEmail(payload.email);

    if (exists)
      throw new ConflictException('Email ya registrado --desde google');

    return this.userModel.create({
      email: payload.email,
      firtsName: payload.firtsName,
      lastName: payload.lastName,
    });
  }
}
