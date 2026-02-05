import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { GooglePayload } from '../interfaces/payload.google';
import { VerifiedCallback } from 'passport-jwt';
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly config: ConfigService) {
    super({
      clientID: config.get<string>('GOOGLE_CLIENT_ID')!,
      clientSecret: config.get<string>('GOOGLE_CLIENT_SECRET')!,
      callbackURL: config.get<string>('GOOGLE_CALLBACK_URL')!,
      scope: ['email', 'profile'],
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifiedCallback,
  ): void {
    const { name, emails } = profile;
    if (!emails?.length) {
      throw new UnauthorizedException('No hay un email en la cuenta de google');
    }
    if (!name) {
      throw new UnauthorizedException(
        'No hay datos de ususario en la cuenta de google',
      );
    }
    const email: string = emails[0].value;
    const firtsName: string = name.givenName ?? '';
    const lastName: string = name.familyName ?? '';

    const user: GooglePayload = {
      firtsName,
      lastName,
      email,
      //Ojo que con esto puedes enviar correos, revisar el calendario, etc. >:]
      // Solo dura 1h así que debes usar el refreshtoken
      accessToken,
      refreshToken,
    };

    done(null, user);
  }
}
