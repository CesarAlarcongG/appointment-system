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
import { Token } from './dto/token.dto';
import { CredentialsDto } from './dto/credentials.dto';
import { AuthService } from './auth.service';
import { GooglePayload } from '../user/types/google.payload';
import type { Request } from 'express';
import { Public } from 'src/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  @Public()
  googleAuth(): void {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  @Public()
  async googleAuthRedirect(@Req() request: Request): Promise<Token> {
    if (!request.user) {
      throw new UnauthorizedException(
        'La autenticación con Google falló o el usuario no existe',
      );
    }

    const googleUser: GooglePayload = request.user as GooglePayload;

    return this.authService.validateGoogleAccount(googleUser);
  }

  @Post('login')
  @Public()
  async userLogin(@Body() credentials: CredentialsDto): Promise<Token> {
    return await this.authService.validateCredencial(credentials);
  }
}
