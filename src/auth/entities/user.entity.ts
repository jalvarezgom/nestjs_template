import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OTP } from './otp.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    nullable: false,
  })
  username: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    nullable: false,
  })
  email: string;

  @Column({
    nullable: true,
  })
  refreshToken: string;

  // RELATIONS
  @OneToMany(() => OTP, (otp) => otp.user)
  otps: OTP[];
}
