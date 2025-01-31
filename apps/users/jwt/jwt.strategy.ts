import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DatabaseService } from '../database/database.service';
import * as dotenv from 'dotenv';
dotenv.config({ path: './apps/users/.env' });

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly databaseService: DatabaseService,

    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
        });
    }

    async validate(payload: { email: string }) {
        const user = await this.databaseService.user.findUnique({
            where: {
                email: payload.email,
            },
        });
        if (!user) {
            throw new UnauthorizedException('user is unauthorized', {
                cause: new Error(),
                description: 'user not found',
            });
        }
        return user;
    }


    // async login(user: any) {
    //     const payload = { sub: user.id, email: user.email };

    //     return {
    //         access_token: this.jwtService.sign(payload, {
    //             expiresIn: '15m', // Short expiry for security
    //         }),
    //         refresh_token: this.jwtService.sign(payload, {
    //             secret: process.env.JWT_REFRESH_TOKEN_SECRET,
    //             expiresIn: '7d', // Longer expiry for refresh token
    //         }),
    //     };
    // }



    // async validate(payload: any) {
    //     return { id: payload.sub, email: payload.email };
    // }
}
