import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

import {SignInDto} from '../user/dto/signing.dto'


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
    ) {}

  async validateUser(signInDto: SignInDto): Promise<any> {
    const {password} = signInDto
    const user = await this.userService.profile(signInDto);
    if (user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signIn(user:any) {
    const payload = {email: user.email, nickname: user.nickname}
    return {
        access_token: this.jwtService.sign(payload)
    }
  }
}