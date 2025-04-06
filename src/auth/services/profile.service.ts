import {BadRequestException, Injectable} from '@nestjs/common';
import {UserRepository} from '../repositories/user.repository';
import {User} from '../entities/user.entity';
import {HashUtil} from '../../core/utils/hash.util';
import {ChangePwdDto} from '../dtos/auth.dto';

@Injectable()
export class ProfileService {
  constructor(private usersRepository: UserRepository) {
  }

  async me(user: User | string) {
    user = await this.usersRepository.getUser(user);
    return user;
  }

  async getProfile(user: User | string) {
    user = await this.usersRepository.getUser(user);
    return user;
  }

  async changePassword(user: User | string, passwordDto: ChangePwdDto) {
    user = await this.usersRepository.getUser(user);
    if (!user) {
      throw new BadRequestException('Invalid credentials or user not found');
    }
    user.password = await HashUtil.hashData(passwordDto.newPassword);
    await this.usersRepository.save(user);
  }

  async changePasswordWithOldPassword(
    user: User | string,
    passwordDto: ChangePwdDto,
  ) {
    user = await this.usersRepository.getUser(user);
    const isPasswordValid = await HashUtil.verifyHash(
      user.password,
      passwordDto.oldPassword,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password, please try again');
    }
    await this.changePassword(user, passwordDto);
  }
}
