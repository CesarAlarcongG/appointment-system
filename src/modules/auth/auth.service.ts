import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/payload.jwt';
import { UserDocument } from '../user/entities/user.entity';
import { Token } from './dto/token.dto';
import { CredentialsDto } from './dto/credentials.dto';
import { UserService } from '../user/user.service';
import { GooglePayload } from '../user/types/google.payload';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly notificationService: NotificationService,
  ) {}

  async encriptPassword(password: string): Promise<string> {
    return hash(password, 10);
  }

  generateToken({ _id, email, rol }: UserDocument): Token {
    const payload: JwtPayload = {
      _id: _id,
      email,
      rol,
    };
    const token: Token = { token: this.jwtService.sign(payload) };
    return token;
  }

  async validateCredencial({
    email,
    password,
  }: CredentialsDto): Promise<Token> {
    const user: UserDocument | null =
      await this.userService.findUserByEmail(email);

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
    const user: UserDocument | null = await this.userService.findUserByEmail(
      googlePayload.email,
    );
    if (user) return this.generateToken(user);

    return this.userService.registerUser(googlePayload, 'google');
  }

  getJwtPayload(jwt: string): JwtPayload {
    try {
      const token: string[] = jwt.split(' ');

      const payload = this.jwtService.verify<JwtPayload>(token[1]);

      return {
        _id: payload._id,
        email: payload.email,
        rol: payload.rol,
      };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }

  async sendCode(email: string): Promise<void> {
    const user = await this.userService.findUserByEmail(email);
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

    await this.userService.saveResetCode(user._id.toString(), resetCode);

    await this.notificationService.sendResetCode(user.email, resetCode);
  }
}
