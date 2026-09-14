import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { of, throwError } from 'rxjs';
import { JwtStrategy } from './jwt.strategy';
import { USER_CLIENT } from '@shared/contracts';
import { UserDto } from '@shared/contracts/users';

describe('JwtStrategy', () => {
    let strategy: JwtStrategy;
    let userClient: { send: jest.Mock };

    const userDto = { id: 'user-1', email: 'user@example.com' } as UserDto;

    beforeEach(async () => {
        userClient = { send: jest.fn() };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                JwtStrategy,
                { provide: USER_CLIENT, useValue: userClient },
            ],
        }).compile();

        strategy = module.get<JwtStrategy>(JwtStrategy);
    });

    it('resolves the user before returning it, instead of handing back the raw Observable', async () => {
        userClient.send.mockReturnValue(of(userDto));

        const result = await strategy.validate({ sub: userDto.id });

        // Regression guard for the Observable-await bug: awaiting a cold
        // Observable directly resolves to the Observable instance itself,
        // not its emitted value, because Observable has no `.then`.
        expect(result).toEqual(userDto);
        expect(typeof (result as any).subscribe).toBe('undefined');
    });

    it('throws UnauthorizedException when the user service reports no user', async () => {
        userClient.send.mockReturnValue(of(null));

        await expect(strategy.validate({ sub: 'missing-user' })).rejects.toThrow(
            UnauthorizedException,
        );
    });

    it('throws UnauthorizedException when the user service call errors', async () => {
        userClient.send.mockReturnValue(throwError(() => new Error('rpc failed')));

        await expect(strategy.validate({ sub: userDto.id })).rejects.toThrow(
            UnauthorizedException,
        );
    });
});
