import {UserInfo} from './utils/userInfo.decorator';

import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';

import {SignUpDto, SignInDto} from './dto/signing.dto';
import {User} from './entities/user.entity';
import {UserService} from './user.service'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('signUp')
    async signUp(@Body() signUpDto: SignUpDto) {
        return await this.userService.signUp(signUpDto.email, signUpDto.password, signUpDto.name, signUpDto.nickname, signUpDto.phone, signUpDto.preference)
    }

    @Post('signIn')
    async signIn(@Body() signInDto: SignInDto) {
        return await this.userService.signIn(signInDto.email, signInDto.password)
    }
}
