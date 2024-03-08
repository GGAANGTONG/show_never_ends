import {compare, hash} from 'bcrypt';
import _ from 'lodash';
import {Repository} from 'typeorm';

import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {InjectRepository} from '@nestjs/typeorm';

import {User} from './entities/user.entity';
import {Category} from '../show/types/category.type'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) {
}
    //애시당초 controller에서 preference에 대한 타입 검사를 하고 내려오니까, string으로 잡아도 상관이 없나?
    async signUp(email: string, password: string, name: string, nickname: 
    string, phone: string, preference?: Category) {
        const existingUser = await this.userRepository.findOne({
            where:{
                email
            }
        });

        if(!existingUser) {
            throw new ConflictException('이미 해당 이메일로 가입한 사용자가 있습니다!')
        }

        const hashedPassword = await hash(password, 10)
        this.userRepository.save(
            {
            email,
            password: hashedPassword,
            name,
            nickname,
            phone,
            preference
        })

    }

    async signIn(email: string, password: string) {
        const user = await this.userRepository.findOne({
            select: ['id', 'email', 'password'],
            where: {
                email
            }
        })
        if(_.isNil(user)) {
            throw new UnauthorizedException('이메일을 확인해주세요.')
        }

        if(!(await compare(password, user.password))) {
            throw new UnauthorizedException('비밀번호를 확인해주세요.')
        }

        const payload = {email, sub: user.id}
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
