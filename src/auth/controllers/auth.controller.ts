import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import {
  AuthLoginDto,
  AuthTokenDto,
  ChangePwdDto,
  CreateUserDto,
  SendRecoverPwdDto,
} from '../dtos/auth.dto';
import { AccessTokenGuard } from '../guards/accessToken.guard';
import { Request } from 'express';
import { RefreshTokenGuard } from '../guards/refreshToken.guard';
import { UserResponseDto } from '../dtos/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() userDataDto: CreateUserDto) {
    return this.authService.register(userDataDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  login(@Body() credentials: AuthLoginDto): Promise<UserResponseDto> {
    return this.authService.login(credentials);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() request: Request) {
    return this.authService.logout(request.user['sub']);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  refreshToken(@Req() request: Request, @Body() tokenData: AuthTokenDto) {
    const refreshToken = tokenData.refreshToken;
    return this.authService.refreshToken(request.user['sub'], refreshToken);
  }

  @Get('send-recover-password')
  send_recover_password(@Body() recoverData: SendRecoverPwdDto) {
    this.authService.generateOTPAndSendRecoverEmail(recoverData.email).then();
    return {
      msg: 'An email has been sent with the recovery link if the user exists',
    };
  }

  @Get('recover-password/:otp')
  recover_password(
    @Param('otp') otp: string,
    @Body() recoverData: ChangePwdDto,
  ) {
    return this.authService.recoverPassword(otp, recoverData);
  }
}
