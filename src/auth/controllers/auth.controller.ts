import {Body, Controller, Get, Param, Post, Req, UseGuards,} from '@nestjs/common';
import {AuthService} from '../services/auth.service';
import {AuthLoginDto, AuthTokenDto, ChangePwdDto, CreateUserDto, SendRecoverPwdDto,} from '../dtos/auth.dto';
import {AccessTokenGuard} from '../guards/accessToken.guard';
import {Request} from 'express';
import {RefreshTokenGuard} from '../guards/refreshToken.guard';
import {UserResponseDto} from '../dtos/user.dto';
import {ApiResponse} from '@nestjs/swagger';
import {BadRequestExceptionDto} from '../../core/dto/exception.dto';
import {Serialize} from "../../core/pagination/serialization.decorator";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('register')
  @Serialize(UserResponseDto)
  @ApiResponse({
    status: 201,
    description: 'User created',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'User already exists',
    type: BadRequestExceptionDto,
  })
  register(@Body() userDataDto: CreateUserDto): Promise<UserResponseDto> {
    return this.authService.register(userDataDto);
  }

  @Post('login')
  @Serialize(UserResponseDto)
  @ApiResponse({
    status: 200,
    description: 'User logged in',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid credentials or user not found',
    type: BadRequestExceptionDto,
  })
  login(@Body() credentials: AuthLoginDto): Promise<UserResponseDto> {
    return this.authService.login(credentials);
  }

  @Get('logout')
  @UseGuards(AccessTokenGuard)
  @ApiResponse({status: 200, description: 'User logged out'})
  @ApiResponse({status: 401, description: 'No logged'})
  logout(@Req() request: Request) {
    return this.authService.logout(request.user['sub']);
  }

  @Post('refresh')
  @UseGuards(RefreshTokenGuard)
  @ApiResponse({
    status: 200,
    description: 'Token refreshed',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid credentials or user not found',
    type: BadRequestExceptionDto,
  })
  refreshToken(
    @Req() request: Request,
    @Body() tokenData: AuthTokenDto,
  ): Promise<UserResponseDto> {
    const refreshToken = tokenData.refreshToken;
    return this.authService.refreshToken(request.user['sub'], refreshToken);
  }

  @Get('send-recover-password')
  @ApiResponse({
    status: 200,
    description:
      'An email has been sent with the recovery link if the user exists',
  })
  send_recover_password(@Body() recoverData: SendRecoverPwdDto) {
    this.authService.generateOTPAndSendRecoverEmail(recoverData.email).then();
    return {
      msg: 'An email has been sent with the recovery link if the user exists',
    };
  }

  @Get('recover-password/:otp')
  @ApiResponse({
    status: 200,
    description: 'Password changed',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid OTP',
    type: BadRequestExceptionDto,
  })
  @ApiResponse({
    status: 400,
    description: 'OTP already used',
    type: BadRequestExceptionDto,
  })
  recover_password(
    @Param('otp') otp: string,
    @Body() recoverData: ChangePwdDto,
  ): Promise<UserResponseDto> {
    return this.authService.recoverPassword(otp, recoverData);
  }
}
