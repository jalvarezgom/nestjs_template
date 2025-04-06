import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Language {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  shortName: string;

  @Column()
  name: string;
}
