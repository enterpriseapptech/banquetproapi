import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

/**
 * Errors thrown by microservices (RpcException({ statusCode, message, error }))
 * reach the gateway as plain objects, not HttpExceptions. Nest's default handler
 * treats those as unknown errors and responds 500. This filter turns them back
 * into HttpExceptions so the client gets the original status and message.
 * Everything else falls through to Nest's default behaviour.
 */
@Catch()
export class RpcToHttpExceptionFilter extends BaseExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        if (host.getType() === 'http' && !(exception instanceof HttpException)) {
            const httpException = toHttpException(exception);
            if (httpException) return super.catch(httpException, host);
        }
        return super.catch(exception, host);
    }
}

function toHttpException(exception: unknown): HttpException | null {
    if (!exception || typeof exception !== 'object') return null;

    const { statusCode, message, error } = exception as {
        statusCode?: unknown;
        message?: unknown;
        error?: unknown;
    };

    const status = Number(statusCode);
    if (!Number.isInteger(status) || status < 400 || status > 599) return null;

    return new HttpException(
        { statusCode: status, message: message ?? 'Error', error: error ?? undefined },
        status,
    );
}
