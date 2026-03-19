import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ClientProxy } from '@nestjs/microservices';
import { DatabaseService } from 'apps/payments/database/database.service';
import { $Enums } from 'apps/payments/prisma/@prisma/payments';
import { EVENT_CENTER_CLIENT, CATERING_CLIENT, NOTIFICATION_CLIENT } from '@shared/contracts';
import { EVENTCENTERPATTERN } from '@shared/contracts/eventcenters';
import { CATERINGPATTERN } from '@shared/contracts/catering';
import { NOTIFICATIONPATTERN, NotificationType } from '@shared/contracts/notifications';

@Injectable()
export class SubscriptionExpiryService {
    private readonly logger = new Logger(SubscriptionExpiryService.name);

    constructor(
        private readonly databaseService: DatabaseService,
        @Inject(EVENT_CENTER_CLIENT) private readonly eventCenterClient: ClientProxy,
        @Inject(CATERING_CLIENT) private readonly cateringClient: ClientProxy,
        @Inject(NOTIFICATION_CLIENT) private readonly notificationClient: ClientProxy,
    ) {}

    @Cron(CronExpression.EVERY_DAY_AT_1AM)
    async expireSubscriptions() {
        const now = new Date();

        const expired = await this.databaseService.subscriptions.findMany({
            where: {
                status: $Enums.Status.ACTIVE,
                expiryDate: { lte: now },
                deletedAt: null,
            },
            include: {
                invoice: { take: 1, orderBy: { createdAt: 'desc' } },
            },
        });

        if (!expired.length) return;

        this.logger.log(`Expiring ${expired.length} subscription(s)`);

        await this.databaseService.subscriptions.updateMany({
            where: { id: { in: expired.map(s => s.id) } },
            data: { status: $Enums.Status.INACTIVE },
        });

        for (const subscription of expired) {
            const serviceType = (subscription as any).invoice?.[0]?.serviceType as $Enums.ServiceType | null;

            if (serviceType === $Enums.ServiceType.EVENTCENTER) {
                this.eventCenterClient.emit(EVENTCENTERPATTERN.UPDATESUBSCRIPTION, {
                    serviceId: subscription.serviceId,
                    subscriptionStatus: 'INACTIVE',
                });
            } else if (serviceType === $Enums.ServiceType.CATERING) {
                this.cateringClient.emit(CATERINGPATTERN.UPDATESUBSCRIPTION, {
                    serviceId: subscription.serviceId,
                    subscriptionStatus: 'INACTIVE',
                });
            }

            this.notificationClient.emit(NOTIFICATIONPATTERN.SEND, {
                userId: subscription.serviceProviderId,
                internalId: 'system_notification',
                message: `Your subscription has expired. Renew to keep your service listed.`,
                type: NotificationType.WARNING,
            });
        }
    }
}
