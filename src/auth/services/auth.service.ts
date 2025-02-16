import {BadRequestException, Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';
import {UserRepository} from '../repositories/user.repository';
import {User} from '../entities/user.entity';
import {AuthLoginDto, AuthTokenDto, ChangePwdDto, CreateUserDto,} from '../dtos/auth.dto';
import {HashUtil} from '../../core/utils/hash.util';
import {OTP} from '../entities/otp.entity';
import {OTPRepository} from '../repositories/otp.repository';
import {UUIDUtil} from '../../core/utils/uuid.util';
import {ProfileService} from './profile.service';
import {UserResponseDto} from '../dtos/user.dto';

@Injectable()
export class AuthService {
  OTP_EXPIRATION_MINUTES = 10;

  constructor(
    private readonly usersRepository: UserRepository,
    private readonly otpRepository: OTPRepository,
    private readonly profileService: ProfileService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
  }

  async register(userDto: CreateUserDto): Promise<AuthTokenDto> {
    let user: User | undefined = await this.usersRepository.findByUsername(
      userDto.username,
    );
    if (user) {
      throw new BadRequestException('User already exists');
    }

    user = new User();
    user.username = userDto.username;
    user.email = userDto.email;
    user.password = await HashUtil.hashData(userDto.password);
    await this.usersRepository.save(user);

    const {accessToken, refreshToken} = await this.getTokens(
      user.id,
      user.username,
    );
    await this.usersRepository.updateRefreshToken(
      user,
      await HashUtil.hashData(refreshToken),
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  async login(credentials: AuthLoginDto): Promise<UserResponseDto> {
    const user: User | undefined = await this.usersRepository.findByUsername(
      credentials.username,
    );
    if (!user) {
      throw new BadRequestException('Invalid credentials or user not found');
    }

    const isPasswordValid = await HashUtil.verifyHash(
      user.password,
      credentials.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials or user not found');
    }
    const {accessToken, refreshToken} = await this.getTokens(
      user.id,
      user.username,
    );
    await this.usersRepository.updateRefreshToken(
      user,
      await HashUtil.hashData(refreshToken),
    );
    const response: UserResponseDto = new UserResponseDto(user);
    response.token = {
      accessToken,
      refreshToken,
    };
    return response;
  }

  async logout(user: User | string) {
    await this.usersRepository.updateRefreshToken(user, null);
  }

  async refreshToken(user: User | string, reqRefreshToken: string) {
    user = await this.usersRepository.getUser(user);
    if (!user || !user.refreshToken) {
      throw new BadRequestException('Invalid credentials or user not found');
    }
    const isValid = await HashUtil.verifyHash(
      user.refreshToken,
      reqRefreshToken,
    );
    if (!isValid) {
      throw new BadRequestException('Invalid credentials or user not found');
    }
    const {accessToken, refreshToken} = await this.getTokens(
      user.id,
      user.username,
    );
    await this.usersRepository.updateRefreshToken(
      user,
      await HashUtil.hashData(refreshToken),
    );
    const response: UserResponseDto = new UserResponseDto(user);
    response.token = {
      accessToken,
      refreshToken,
    };
    return response;
  }

  async generateOTPAndSendRecoverEmail(email: string): Promise<OTP | null> {
    const user = await this.usersRepository.findByEmail(email);
    if (user) {
      const otp = new OTP();
      otp.user = user;
      otp.value = UUIDUtil.generateUUID();
      otp.expirationDate = new Date(
        new Date().getTime() + this.OTP_EXPIRATION_MINUTES * 60000,
      );
      await this.otpRepository.save(otp);
      // TODO: Send email with recovery link
      return otp;
    }
    return null;
  }

  async recoverPassword(otpValue: string, recoverData: ChangePwdDto) {
    // Validate otp
    const otp = await this.otpRepository.findByOTP(otpValue);
    if (!otp) {
      throw new BadRequestException('Invalid OTP, please try again');
    }
    if (otp.isUsed) {
      throw new BadRequestException(
        'OTP already used, please request a new one',
      );
    }

    // Update user password
    const user = otp.user;
    await this.profileService.changePassword(user, recoverData);

    otp.isUsed = true;
    await this.otpRepository.save(otp);

    // Return new access and refresh tokens
    const {accessToken, refreshToken} = await this.getTokens(
      user.id,
      user.username,
    );
    await this.usersRepository.updateRefreshToken(
      user,
      await HashUtil.hashData(refreshToken),
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  async getTokens(userId: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('token.accessSecret'),
          expiresIn: this.configService.get<string>(
            'token.accessSecretExpirationTime',
          ),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('token.refreshSecret'),
          expiresIn: this.configService.get<string>(
            'token.refreshSecretExpirationTime',
          ),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
