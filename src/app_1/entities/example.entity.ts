import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class ExampleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  @ApiProperty({
    example: 'Example name',
    description: 'The name of the Example',
  })
  name: string;

  @Column({
    length: 100,
  })
  @ApiProperty({
    example: 'This is an example entity',
    description: 'The description of the Example',
  })
  description: string;

  @Column()
  price: number;


}
