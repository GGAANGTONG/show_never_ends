import {compare, hash} from 'bcrypt';
import _ from 'lodash';
import {Repository} from 'typeorm';

import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {InjectRepository} from '@nestjs/typeorm';

import {User} from './entities/user.entity';
import {Category} from '../show/types/category.type'
import {SignUpDto, SignInDto} from './dto/signing.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) {
}
    //애시당초 controller에서 preference에 대한 타입 검사를 하고 내려오니까, string으로 잡아도 상관이 없나?

    //1. 회원가입
    async signUp(signUpDto:SignUpDto) {

        const {email, password, name, nickname, phone, preference} = signUpDto
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


    //2. 프로필 보기
    async profile(signInDto:Partial<SignInDto>): Promise<User | undefined> {
        const {email} = signInDto
        return await this.userRepository.createQueryBuilder('user').select(['user.email','user.name', 'user.nickname', 'user.role', 'user.phone', 'user.preference', 'user.point', 'user.reservation']).where('user.email = :email', {email}).getOne()
    }

    async findByEmail(email: string) {
        return await this.userRepository.findOne({where:{email}})
    }
}
