/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

export class AdminRoleGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }

    handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {
        if (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') {
            return user; // Allow access
        }
        throw err || new UnauthorizedException('Restricted area! you must be an admin', {
            cause: new Error(),
            description: 'Unauthorized user! Access denied'
        })
        
    }
      
}

