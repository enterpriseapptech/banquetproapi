/* eslint-disable @typescript-eslint/no-unused-vars */
import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserDto } from "@shared/contracts";
import { firstValueFrom} from "rxjs";

export class AccountStatusGuard extends AuthGuard('jwt') implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const activate = super.canActivate(context) as Promise<boolean>;
        const request = await context.switchToHttp().getRequest();
        const user: UserDto = await firstValueFrom(request.user);
        if (!user || user.status !== 'ACTIVE') {
            throw new UnauthorizedException('Account verification error!', {
                cause: new Error(),
                description: 'Access denied! User account is not verified, kindly verify your account to proceed.'
            });
        }
        return await activate;
    }
}