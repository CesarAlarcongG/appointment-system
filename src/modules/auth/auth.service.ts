import { Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/payload.jwt';
import { User } from '../user/entities/user.entity';
import { Token } from './dto/token.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtServce: JwtService) {}

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
}
