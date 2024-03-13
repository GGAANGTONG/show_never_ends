import { Module } from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {JwtModule} from '@nestjs/jwt';
import {TypeOrmModule} from '@nestjs/typeorm'

import {User} from './entities/user.entity'
import { UserService } from './user.service';
import { UserController } from './user.controller';

import {AuthService} from '../auth/auth.service' 

@Module({
  imports: [
    AuthService,
    TypeOrmModule.forFeature([User])
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
