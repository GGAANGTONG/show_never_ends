import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

import {SignInDto} from '../user/dto/signing.dto'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService) {
    super();
  }

  async validate(signInDto:SignInDto): Promise<any> {
    const user = await this.authService.validateUser(signInDto);
    if (!user) {
      throw new UnauthorizedException('올바르지 않은 계정 정보입니다.');
    }
    return user;
  }
}