import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';
import { correlationStorage } from '../context/correlation.context';

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const traceId = (req.headers['x-trace-id'] as string) ?? randomUUID();
        res.setHeader('x-trace-id', traceId);
        correlationStorage.run({ traceId }, () => next());
    }
}
