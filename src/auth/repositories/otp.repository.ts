import { DataSource, MoreThan } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { GenericRepository } from '../../core/providers/repository.provider';
import { OTP } from '../entities/otp.entity';

@Injectable()
export class OTPRepository extends GenericRepository<OTP> {
  constructor(private dataSource: DataSource) {
    super(OTP, dataSource);
  }

  async findByOTP(otp: string): Promise<OTP | undefined> {
    const base_filters = { expirationDate: MoreThan(new Date()) };
    const filters = { value: otp };
    return await this.findOne({ where: { ...base_filters, ...filters } });
  }
}
