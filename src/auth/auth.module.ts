import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AccessTokenStrategy } from './strategy/access-token.strategy';

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
    UserModule,
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy],
})
export class AuthModule {}
