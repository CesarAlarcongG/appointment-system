import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/payload.jwt';
import { User } from '../user/entities/user.entity';
import { Token } from './dto/token.dto';
import { CredentialsDto } from './dto/credentials.dto';
import { UserService } from '../user/user.service';
import { GooglePayload } from '../user/types/google.payload';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtServce: JwtService,
  ) {}

  async encriptPassword(password: string): Promise<string> {
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

  async validateCredencial({
    email,
    password,
  }: CredentialsDto): Promise<Token> {
    const user: User | null = await this.userService.findUserByEmail(email);

    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    await this.validatePassword(password, user.password);

    return this.generateToken(user);
  }

  async validatePassword(
    passwordCredencial: string,
    passwordDb: string,
  ): Promise<void> {
    const validate: boolean = await compare(passwordCredencial, passwordDb);
    if (!validate) throw new UnauthorizedException('Credenciales invalidas');
  }

  async validateGoogleAccount(googlePayload: GooglePayload): Promise<Token> {
    return this.userService.registerUser(googlePayload, 'google');
  }
}
