import { DataSource, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { GenericRepository } from '../../core/providers/repository.provider';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository extends GenericRepository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource);
  }

  async getUser(user: User | string) {
    if (typeof user === 'string') {
      user = await this.findOneBy({ id: user });
    }
    return user;
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return await this.findOne({ where: { username } });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.findOne({ where: { email } });
  }

  async findByUsernameAndPassword(
    username: string,
    password: string,
  ): Promise<User | undefined> {
    return await this.findOne({ where: { username, password } });
  }

  async updateRefreshToken(
    user: User | string,
    refreshToken: string | null,
  ): Promise<UpdateResult> {
    let updateResult: UpdateResult;
    if (typeof user === 'string') {
      updateResult = await this.update(user, { refreshToken });
    } else {
      updateResult = await this.update(user.id, { refreshToken });
    }
    if (updateResult.affected === 0) {
      throw new Error('User not found');
    }
    return updateResult;
  }
}
