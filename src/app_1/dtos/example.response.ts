import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ExampleResponseDto {
  @Expose()
  @ApiProperty({
    example: '1',
    description: 'The name of the Example',
  })
  name: string;

  @Expose({ groups: ['admin'] })
  @ApiProperty({
    example: 'This is an example entity',
    description: 'The description of the Example',
  })
  description: string;

  constructor(partial: Partial<ExampleResponseDto>) {
    Object.assign(this, partial);
  }
}
