import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as dotenv from 'dotenv';
import { ClientProxy } from '@nestjs/microservices';
import { USERPATTERN, UserDto  } from '@shared/contracts/users';
import { USER_CLIENT } from '@shared/contracts';

dotenv.config({ path: './apps/apigateway/.env' });
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
       @Inject(USER_CLIENT) private readonly userClient: ClientProxy
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
        });
    }

    async validate(payload: { sub: string }) {
        try {
            const user = await this.userClient.send<UserDto, string>(USERPATTERN.FINDBYID, payload.sub);

            if (!user) {
                throw new UnauthorizedException('user is unauthorized', {
                    cause: new Error(),
                    description: 'user not found',
                });
            }           
            return user;

        } catch (error) {
            throw new UnauthorizedException('access token is invalid', {
                cause: new Error(),
                description: 'access token is invalid',
            });
        }
    }

}
