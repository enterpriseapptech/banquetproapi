/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

export class VerificationGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }

    handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {
        if (user) {
            console.log(user)
            return user; // Allow access
        }
        console.log(user)
        throw err || new UnauthorizedException('account verification error!', {
            cause: new Error(),
            description: 'access denied! you need to verify your account.'
        })
        
    }
      
}

