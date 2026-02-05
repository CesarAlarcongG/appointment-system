import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google.guard';
import { GoogleRegisterService } from './services/google.service';
import { UserService } from '../user/user.service';
import { Token } from './dto/token.dto';
import type { GooglePayload } from './interfaces/payload.google';
import type { Request } from 'express';
import { CredentialsDto } from './dto/credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly googleRegisterService: GoogleRegisterService,
  ) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  googleAuth(): void {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() request: Request): Promise<Token> {
    if (!request.user) {
      throw new UnauthorizedException(
        'La autenticación con Google falló o el usuario no existe',
      );
    }

    const googleUser: GooglePayload = request.user as GooglePayload;

    return await this.userService.registerUser<GooglePayload>(
      googleUser,
      this.googleRegisterService,
    );
  }

  @Post('login')
  async userLogin(@Body() credentials: CredentialsDto): Promise<Token> {
    return await this.authService.login(credentials);
  }
}
