import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from './repositories/user.repository';
import { OTPRepository } from './repositories/otp.repository';
import { ProfileService } from './services/profile.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    UserRepository,
    OTPRepository,
    AuthService,
    ProfileService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
})
export class AuthModule {}
