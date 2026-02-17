import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://admin:admin123@localhost:27017/appointment-system?authSource=admin',
    ),
    UserModule,
    AuthModule,
    NotificationModule,
  ],
})
export class ModulesModule {}
