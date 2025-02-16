import {Exclude} from 'class-transformer';
import {AuthTokenDto} from './auth.dto';

export class UserResponseDto {
  id: string;
  username: string;
  @Exclude()
  password: string;
  email: string;
  @Exclude()
  refreshToken: string;
  token?: AuthTokenDto;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
