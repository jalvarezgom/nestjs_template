export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
}

export interface AuthLoginDto {
  username: string;
  password: string;
}

export interface AuthTokenDto {
  accessToken?: string;
  refreshToken: string;
}

export interface SendRecoverPwdDto {
  email: string;
}

export interface ChangePwdDto {
  oldPassword?: string;
  newPassword: string;
}
