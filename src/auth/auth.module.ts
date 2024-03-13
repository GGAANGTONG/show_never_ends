import {UserModule} from 'src/user/user.module';

import { Module } from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';

import {JwtStrategy} from './jwt.strategy'
import {LocalStrategy} from './local.strategy'
import {AuthService} from './auth.service'

@Module({
    imports:[
        PassportModule.register({
            defaultStrategy: 'jwt',
            session: false
        }),
        JwtModule.registerAsync({
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>('JWT_SECRET_KEY'),
                signOptions:{expiresIn: '240s'}
            }),
            inject: [ConfigService]
        }),
        UserModule
    ],
    providers: [JwtStrategy, AuthService, LocalStrategy],
    exports: [AuthService]
})
export class AuthModule {}
