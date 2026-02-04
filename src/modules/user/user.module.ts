import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { TraditionalRegisterService } from './interfaces/user-register/implements/traditional-register.implement';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService, TraditionalRegisterService],
  exports: [UserService],
})
export class UserModule {}
