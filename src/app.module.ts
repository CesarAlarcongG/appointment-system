import { Module } from '@nestjs/common';
import { ModulesModule } from './modules/modules.module';
import { ConfigModule } from '@nestjs/config';
import { JwtGuard } from './guards/jwt/jwt.guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ModulesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
