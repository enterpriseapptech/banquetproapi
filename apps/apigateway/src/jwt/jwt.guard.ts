/* eslint-disable @typescript-eslint/no-unused-vars */
import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }
    // constructor() {
    //     super();
    // }

    // async canActivate(context: ExecutionContext): Promise<boolean> {
    //     const request = context.switchToHttp().getRequest();
    //     console.log('Headers:', request.headers);  // Log headers to debug
    //     return super.canActivate(context) as Promise<boolean>;
    // }
    handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {
        if (err || !user) {
            
            throw err || new UnauthorizedException('Restricted area! you must login first', {
                cause: new Error(),
                description: 'Unauthorized user'
            })
        }
        console.log(user)
        return user;
    }
}

