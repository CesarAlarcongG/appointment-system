import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategies/google.strategy';
import { GoogleAuthGuard } from './guards/google.guard';
import { GoogleRegisterService } from './services/google.service';
import { UserModule } from '../user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/entities/user.entity';

@Module({
  imports: [
    PassportModule,
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: '123456abcd789',
      signOptions: { expiresIn: '1d' },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleStrategy,
    GoogleAuthGuard,
    GoogleRegisterService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
