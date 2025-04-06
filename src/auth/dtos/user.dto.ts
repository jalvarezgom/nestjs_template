import { Exclude, Expose } from 'class-transformer';
import { AuthTokenDto } from './auth.dto';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class UserResponseDto {
  @Expose()
  @ApiProperty({
    example: 'demo',
    description: 'The username of the User',
  })
  username: string;

  @Expose()
  @ApiProperty({
    example: 'demo@gmail.com',
    description: 'The email of the User',
  })
  email: string;

  @Expose()
  @ApiProperty({
    description: 'The token of the User',
  })
  token?: AuthTokenDto;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
