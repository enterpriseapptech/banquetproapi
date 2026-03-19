import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { correlationStorage } from '../context/correlation.context';

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger('HTTP');

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        if (context.getType() !== 'http') return next.handle();

        const req = context.switchToHttp().getRequest();
        const { method, url } = req;
        const traceId = correlationStorage.getStore()?.traceId ?? 'no-trace';
        const start = Date.now();

        return next.handle().pipe(
            tap({
                next: () => {
                    const res = context.switchToHttp().getResponse();
                    this.logger.log(
                        `${method} ${url} → ${res.statusCode} [${Date.now() - start}ms] trace=${traceId} user=${req.user?.id ?? 'anon'}`,
                    );
                },
                error: (err) => {
                    this.logger.error(
                        `${method} ${url} → ${err?.status ?? 500} [${Date.now() - start}ms] trace=${traceId} user=${req.user?.id ?? 'anon'} | ${err?.message}`,
                    );
                },
            }),
        );
    }
}
