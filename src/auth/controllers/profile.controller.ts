import {Body, Controller, Get, Param, Post, Req, UseGuards,} from '@nestjs/common';
import {ChangePwdDto} from '../dtos/auth.dto';
import {AccessTokenGuard} from '../guards/accessToken.guard';
import {Request} from 'express';
import {ProfileService} from '../services/profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {
  }

  @UseGuards(AccessTokenGuard)
  @Get('me')
  me(@Req() request: Request) {
    return this.profileService.me(request.user['sub']);
  }

  @UseGuards(AccessTokenGuard)
  @Get('get-profile/:id')
  get_profile(@Param('id') id: string) {
    return this.profileService.getProfile(id);
  }

  @UseGuards(AccessTokenGuard)
  @Post('change-password')
  change_password(
    @Req() request: Request,
    @Body() changePasswordDto: ChangePwdDto,
  ) {
    return this.profileService.changePassword(
      request.user['sub'],
      changePasswordDto,
    );
  }
}
