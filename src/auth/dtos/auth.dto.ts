import {IsEmail, IsNotEmpty, IsOptional} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'demo',
    description: 'The username of the User',
  })
  username: string;

  @IsEmail()
  @ApiProperty({
    example: 'demo@gmail.com',
    description: 'The email of the User',
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'password',
    description: 'The password of the User',
  })
  password: string;
}

export class AuthLoginDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'demo',
    description: 'The username of the User',
  })
  username: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'password',
    description: 'The password of the User',
  })
  password: string;
}

export class AuthTokenDto {
  @IsOptional()
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.....',
    description: 'The access token',
  })
  accessToken?: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.....',
    description: 'The refresh token',
  })
  refreshToken: string;
}

export class SendRecoverPwdDto {
  @IsEmail()
  @ApiProperty({
    example: 'demo@gmail.com',
    description: 'The email of the User where the recovery link will be sent',
  })
  email: string;
}

export class ChangePwdDto {
  @IsOptional()
  @ApiProperty({
    example: 'password',
    description: 'The new password',
  })
  oldPassword?: string;
  @IsNotEmpty()
  @ApiProperty({
    example: 'newpassword',
    description: 'The new password',
  })
  newPassword: string;
}
