import { Logger } from '@nestjs/common';

export class AppLogger extends Logger {
    log(message: string, data?: Record<string, any>) {
        super.log(data ? `${message} | ${JSON.stringify(data)}` : message);
    }

    error(message: string, data?: Record<string, any>) {
        super.error(data ? `${message} | ${JSON.stringify(data)}` : message);
    }

    warn(message: string, data?: Record<string, any>) {
        super.warn(data ? `${message} | ${JSON.stringify(data)}` : message);
    }

    debug(message: string, data?: Record<string, any>) {
        super.debug(data ? `${message} | ${JSON.stringify(data)}` : message);
    }
}
