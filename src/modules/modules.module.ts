import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://admin:admin123@localhost:27017/appointment-system?authSource=admin',
    ),
    UserModule,
    AuthModule,
  ],
})
export class ModulesModule {}
