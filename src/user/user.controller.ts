
import {Body, Controller, Get, Post, UseGuards, Request} from '@nestjs/common';

import {AuthGuard} from '@nestjs/passport';

import {SignUpDto, SignInDto} from './dto/signing.dto';

import {UserService} from './user.service'
import {AuthService} from '../auth/auth.service'

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService) {}

    //1. 회원가입(손 좀 봐야할 듯)
    @Post('signUp')
    async signUp(@Body() signUpDto: SignUpDto) {
        return await this.userService.signUp(signUpDto)
    }

    //2. 로그인
    @UseGuards(AuthGuard('local'))
    @Post('signIn')
    async signIn(@Request() request) {
        return this.authService.signIn(request.user)
    }

    // 3. 프로필 보기
    //Guards를 이용해서 회원이 맞는지 확인
    // 바디로 email과 비밀번호를 받아서 일치하면 볼 수 있도록 함.
    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    async profile(@Body() signInDto: Partial<SignInDto>) {
        return await this.userService.profile(signInDto)
    }
}
