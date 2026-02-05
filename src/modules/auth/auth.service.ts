import { Injectable, UnauthorizedException } from '@nestjs/common';
import { hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/payload.jwt';
import { User } from '../user/entities/user.entity';
import { Token } from './dto/token.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CredentialsDto } from './dto/credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtServce: JwtService,
  ) {}

  async encripPassword(password: string): Promise<string> {
    return hash(password, 10);
  }

  generateToken({ email, rol }: User): Token {
    const payload: JwtPayload = {
      email,
      rol,
    };
    const token: Token = { token: this.jwtServce.sign(payload) };
    return token;
  }

  async login({ email, password }: CredentialsDto): Promise<Token> {
    const user: User = await this.findUserByEmail(email);

    await this.validatePassword(password, user.password);

    return this.generateToken(user);
  }

  async findUserByEmail(email: string): Promise<User> {
    const user: User | null = await this.userModel.findOne({
      email: email,
    });

    if (!user) {
      throw new UnauthorizedException(
        'No hay una cuenta registrada con este email',
      );
    }
    return user;
  }

  async validatePassword(
    passwordCredencial: string,
    passwordDb: string,
  ): Promise<void> {
    const validate: boolean = await compare(passwordCredencial, passwordDb);
    if (!validate) throw new UnauthorizedException('Credenciales invalidas');
  }
}
