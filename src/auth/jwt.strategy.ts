import _ from 'lodash';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {UserService} from 'src/user/user.service';

import {Injectable, NotFoundException} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {PassportStrategy} from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService
        ) {
        super({
            jwtFormatRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET_KEY')
        });
    }

    async validate(payload: any) {
        const user = await this.userService.findByEmail(payload.email);
        if(_.isNil(user)) {
            throw new NotFoundException('해당하는 사용자를 찾을 수 없습니다.')
        }
        return user;
    }
}

