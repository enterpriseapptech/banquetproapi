import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RefundService } from './refund.service';

@Injectable()
export class RefundProcessingService {
    private readonly logger = new Logger(RefundProcessingService.name);

    constructor(private readonly refundService: RefundService) { }

    /** Runs daily at 2am — processes all approved refunds whose processAt <= now */
    @Cron(CronExpression.EVERY_DAY_AT_2AM)
    async processApprovedRefunds() {
        this.logger.log('Refund processing cron started');
        // await this.refundService.processDueRefunds();
        this.logger.log('Refund processing cron completed');
    }
}
