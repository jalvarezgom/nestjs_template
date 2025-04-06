import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from './user.entity';

@Entity()
export class OTP {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.otps)
  user: User;

  @Column({
    nullable: false,
  })
  value: string;

  @Column({
    default: false,
  })
  isUsed: boolean;

  @Column({
    nullable: false,
  })
  expirationDate: Date;
}
