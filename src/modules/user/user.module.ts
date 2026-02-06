import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { TraditionalRegisterStrategy } from './strategies/traditional-register.strategy';
import { GoogleRegisterStrategy } from './strategies/google-register.strategy';
import { RegisterFactory } from './factories/register.factory';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    RegisterFactory,
    GoogleRegisterStrategy,
    TraditionalRegisterStrategy,
    {
      provide: 'REGISTER_STRATEGIES',
      useFactory: (
        traditional: TraditionalRegisterStrategy,
        google: GoogleRegisterStrategy,
      ) => [traditional, google],
      inject: [TraditionalRegisterStrategy, GoogleRegisterStrategy],
    },
  ],
  exports: [UserService],
})
export class UserModule {}
