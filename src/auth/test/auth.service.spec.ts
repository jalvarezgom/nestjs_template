import {Test, TestingModule} from '@nestjs/testing';
import {AuthService} from '../services/auth.service';
import {AppModule} from '../../app.module';
import {BadRequestException} from '@nestjs/common';
import {UserRepository} from '../repositories/user.repository';
import {ProfileService} from '../services/profile.service';
import {ChangePwdDto} from '../dtos/auth.dto';

describe('AuthService', () => {
  let service: AuthService;
  let profileService: ProfileService;
  let userRepository: UserRepository;
  const userDataDto = {
    username: 'test',
    email: 'test@test.com',
    password: 'test',
  };
  const authDto = {
    username: userDataDto.username,
    password: userDataDto.password,
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    service = module.get<AuthService>(AuthService);
    profileService = module.get<ProfileService>(ProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(profileService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const result = await service.register(userDataDto);
      expect(result).toBeDefined();
    });

    it('should throw an error if the user already exists', async () => {
      try {
        await service.register(userDataDto);
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('login', () => {
    it('should generate tokens', async () => {
      const user = await userRepository.findByUsername('test');
      const {accessToken, refreshToken} = await service.getTokens(
        user.id,
        user.username,
      );
      expect(accessToken).toBeDefined();
      expect(refreshToken).toBeDefined();
    });

    it('should refresh a token', async () => {
      const user = await userRepository.findByUsername('test');
      const {refreshToken} = await service.getTokens(user.id, user.username);
      const result = await service.refreshToken(user.id, refreshToken);
      expect(result).toBeDefined();
    });

    it('should login a user', async () => {
      const result = await service.login(authDto);
      expect(result).toBeDefined();
    });

    it('should throw an error if the user does not exist', async () => {
      try {
        await service.login({username: 'test2', password: 'test'});
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('logout', () => {
    it('should logout a user', async () => {
      const user = await userRepository.findByUsername('test');
      await service.logout(user);
      expect(true).toBe(true);
    });

    it('should throw an error if the user does not exist', async () => {
      try {
        await service.logout('test2');
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('recoverPassword', () => {
    it('should change the password of a user', async () => {
      const user = await userRepository.findByUsername('test');
      const changePasswordDto: ChangePwdDto = {
        newPassword: userDataDto.password,
      };
      await profileService.changePassword(user, changePasswordDto);
      expect(true).toBe(true);
    });

    it('should throw an error if the user does not exist', async () => {
      try {
        const changePasswordDto: ChangePwdDto = {
          newPassword: userDataDto.password,
        };
        await profileService.changePassword('test2', changePasswordDto);
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it('should create a OTP and send an email', async () => {
      const otp = await service.generateOTPAndSendRecoverEmail(
        userDataDto.email,
      );
      expect(otp).toBeDefined();
    });

    it('should throw an error if the email does not exist', async () => {
      const otp = await service.generateOTPAndSendRecoverEmail(
        'random_email@test.com',
      );
      expect(otp).toBe(null);
    });
  });
});
