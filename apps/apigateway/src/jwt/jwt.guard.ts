/* eslint-disable @typescript-eslint/no-unused-vars */
import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CacheStore } from "../common/cache/cache.store";

const LOGOUT_CACHE_KEY = "logged_out_jwt_tokens";

export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader: string = request.headers['authorization'];
        if (authHeader?.startsWith('Bearer ')) {
            const token = authHeader.slice(7);
            const isBlacklisted = await CacheStore.manager.get(`${LOGOUT_CACHE_KEY}_${token}`);
            if (isBlacklisted) {
                throw new UnauthorizedException('Restricted area! you must login first', {
                    cause: new Error(),
                    description: 'Token has been invalidated'
                });
            }
        }
        return super.canActivate(context) as Promise<boolean>;
    }

    handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {
        if (err || !user) {
            throw err || new UnauthorizedException('Restricted area! you must login first', {
                cause: new Error(),
                description: 'Unauthorized user'
            })
        }
        return user;
    }
}

