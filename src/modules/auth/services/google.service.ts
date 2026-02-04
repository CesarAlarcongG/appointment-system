import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRegister } from 'src/interfaces/user-register.interface';
import { User } from 'src/modules/user/entities/user.entity';
import { GooglePayload } from '../interfaces/payload.google';

@Injectable()
export class GoogleRegisterService implements UserRegister<GooglePayload> {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async registerUser(payload: GooglePayload): Promise<User> {
    const exists = await this.userModel.exists({ email: payload.email });

    if (exists) throw new ConflictException('Email ya registrado');

    return this.userModel.create({
      email: payload.email,
      firtsName: payload.firtsName,
      lastName: payload.lastName,
    });
  }
}
