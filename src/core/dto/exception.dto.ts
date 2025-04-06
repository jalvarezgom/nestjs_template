import {ApiProperty} from '@nestjs/swagger';

export class ExceptionResponseDto {
  @ApiProperty({
    example: 'User already exists',
    description: 'The error message',
  })
  message: string;

  @ApiProperty({
    example: 'Bad Request',
    description: 'The error name',
  })
  error: string;

  @ApiProperty({
    example: 400,
    description: 'The error status code',
  })
  statusCode: number;
}

export class BadRequestExceptionDto extends ExceptionResponseDto {
}
