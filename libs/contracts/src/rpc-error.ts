import { HttpException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

/**
 * Convert any error thrown inside a microservice handler into an RpcException
 * whose payload is { statusCode, message, error }. The API gateway's
 * RpcToHttpExceptionFilter turns that payload back into an HTTP response.
 *
 * Handles:
 *  - RpcException: passed through unchanged
 *  - HttpException (NotFoundException, BadRequestException, ...): keeps its status and message
 *  - plain { statusCode } objects: errors re-thrown from another microservice call (firstValueFrom(client.send(...)))
 *  - anything else: 500
 *
 * Unlike `err.response.statusCode`, this never throws when `err.response` is undefined.
 */
export function toRpcException(err: unknown): RpcException {
    if (err instanceof RpcException) return err;

    if (err instanceof HttpException) {
        const res = err.getResponse();
        const body = (typeof res === 'string' ? { message: res } : res) as Record<string, any>;
        return new RpcException({
            statusCode: err.getStatus(),
            message: body.message ?? err.message,
            error: body.error ?? err.name,
        });
    }

    if (err && typeof err === 'object') {
        const { statusCode, message, error } = err as Record<string, any>;
        const status = Number(statusCode);
        if (Number.isInteger(status) && status >= 400 && status <= 599) {
            return new RpcException({ statusCode: status, message: message ?? 'Error', error });
        }
    }

    return new RpcException({
        statusCode: 500,
        message: 'Internal Server Error',
        error: 'Internal Server Error',
    });
}
