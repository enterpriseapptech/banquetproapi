import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as dotenv from 'dotenv';
import { USER_CLIENT } from '../users/constants';
import { ClientProxy } from '@nestjs/microservices';
import { USERPATTERN, UserDto} from '@shared/contracts';

dotenv.config({ path: './apps/users/.env' });
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
            // The `payload.sub` is typically the user identifier (ID or email).
            // Now use the `sub` to query your User Microservice for the user data

            const user = await this.userClient.send<UserDto, string>(USERPATTERN.FINDUSERBYID, payload.sub);

            if (!user) {
                throw new UnauthorizedException('user is unauthorized', {
                    cause: new Error(),
                    description: 'user not found',
                });
            }

            // Return user data to the request context, so it can be used in controllers
            return user;
        } catch (error) {
            throw new UnauthorizedException('access token is invalid', {
                cause: new Error(),
                description: 'access token is invalid',
            });
        }
    }

}
