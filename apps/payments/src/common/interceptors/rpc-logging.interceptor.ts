import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { RmqContext } from '@nestjs/microservices';
import { Observable, tap } from 'rxjs';

@Injectable()
export class RpcLoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger('Payments');

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        let pattern = context.getHandler().name;
        try {
            const ctx = context.switchToRpc().getContext<RmqContext>();
            pattern = ctx.getPattern() ?? pattern;
        } catch { /* non-RMQ context */ }

        const start = Date.now();
        this.logger.log(`[${pattern}] received`);

        return next.handle().pipe(
            tap({
                next: () => this.logger.log(`[${pattern}] completed in ${Date.now() - start}ms`),
                error: (err) => this.logger.error(`[${pattern}] failed in ${Date.now() - start}ms | ${err?.message}`),
            }),
        );
    }
}
