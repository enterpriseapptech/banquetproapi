import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'apps/payments/database/database.service';
import { $Enums, Prisma } from 'apps/payments/prisma/@prisma/payments';
import { SubscriptionDto, UpdateSubscriptionDto, CreateSubscriptionDto, PaymentType, Status } from '@shared/contracts/payments';
import { PrismaErrorHandler } from '@shared/contracts/prisma.error.handler';
import { InvoiceService } from './invoice.service';

@Injectable()
export class SubscriptionService {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly invoiceService: InvoiceService,
    ) {}

    static generateDueDate(): Date {
        const days = Number(process.env.INVOICE_VALID_NO_OF_DAYS ?? 7);
        return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    }

    async create(createSubscriptionDto: CreateSubscriptionDto): Promise<SubscriptionDto> {
        try {
            

            const [plan, subscription, amountDue] = await this.databaseService.$transaction(async (tx) => {

                const plan = await this.databaseService.subscriptionPlans.findUnique({
                    where: { id: createSubscriptionDto.subscriptionplanId },
                });
                if (!plan) throw new NotFoundException('Subscription plan not found', {
                    cause: new Error(),
                    description: 'Subscription plan not found'
                });

                const activeSubscription = await this.databaseService.subscriptions.findFirst({
                    where: {
                        serviceProviderId: createSubscriptionDto.serviceProviderId,
                        subscriptionplanId: createSubscriptionDto.subscriptionplanId,
                        status: $Enums.Status.ACTIVE,
                        deletedAt: null,
                    },
                });

                const startDate = activeSubscription ? activeSubscription.expiryDate : new Date();
                const expiryDate = new Date(startDate.getTime() + plan.timeFrame * 24 * 60 * 60 * 1000);
                const amountDue = plan.amount;

                const subscription =  await tx.subscriptions.create({
                    data: {
                        serviceProviderId: createSubscriptionDto.serviceProviderId,
                        serviceId: createSubscriptionDto.serviceId,
                        type: createSubscriptionDto.type as $Enums.PaymentType,
                        feesId: createSubscriptionDto.feesId,
                        subscriptionplanId: createSubscriptionDto.subscriptionplanId,
                        featuredPlanId: createSubscriptionDto.featuredPlanId,
                        status: $Enums.Status.INACTIVE,
                        expiryDate,
                    },
                });

                return [plan, subscription, amountDue];
            });

            const planAmount = Number(amountDue);
            const invoice = await this.invoiceService.createInvoiceForSubscriptions({
                userId: createSubscriptionDto.serviceProviderId,
                subscriptionId: subscription.id,
                items: [{ item: plan.plan, amount: planAmount }],
                subTotal: planAmount,
                discount: 0,
                total: planAmount,
                amountDue: planAmount,
                currency: createSubscriptionDto.currency,
                dueDate: SubscriptionService.generateDueDate(),
                billingAddress: createSubscriptionDto.billingAddress,
            });

            return {
                ...this.mapToSubscriptionDto(subscription),
                invoice,
            };
        } catch (error) {
            PrismaErrorHandler.handle(error, Prisma);
            throw new InternalServerErrorException('sever error could not create subscription', {
                cause: new Error(),
                description: 'Subscription creation failed, please try again'
            });
        }
    }

    async findAll(limit: number, offset: number, serviceProviderId?: string, status?: string): Promise<{ count: number; docs: SubscriptionDto[] }> {
        const where: any = { deletedAt: null };
        if (serviceProviderId) where.serviceProviderId = serviceProviderId;
        if (status) where.status = status as $Enums.Status;
        const [subscriptions, count] = await this.databaseService.$transaction([
            this.databaseService.subscriptions.findMany({ take: limit, skip: offset, where, orderBy: { createdAt: 'desc' } }),
            this.databaseService.subscriptions.count({ where }),
        ]);
        return { count, docs: subscriptions.map(s => this.mapToSubscriptionDto(s)) };
    }

    async findOne(id: string): Promise<SubscriptionDto> {
        const subscription = await this.databaseService.subscriptions.findUnique({
            where: { id, deletedAt: null },
        });
        if (!subscription) throw new NotFoundException({ statusCode: 404, message: 'Subscription not found', error: 'Not found' });
        return this.mapToSubscriptionDto(subscription);
    }

    async update(id: string, updateSubscriptionDto: UpdateSubscriptionDto): Promise<SubscriptionDto> {
        const subscription = await this.databaseService.subscriptions.update({
            where: { id },
            data: {
                ...updateSubscriptionDto,
                type: updateSubscriptionDto.type as $Enums.PaymentType,
                status: updateSubscriptionDto.status as $Enums.Status,
            },
        });
        return this.mapToSubscriptionDto(subscription);
    }

    async remove(id: string, updaterId: string): Promise<SubscriptionDto> {
        const subscription = await this.databaseService.subscriptions.update({
            where: { id },
            data: { deletedAt: new Date(), deletedBy: updaterId },
        });
        return this.mapToSubscriptionDto(subscription);
    }

    private mapToSubscriptionDto(subscription: any): SubscriptionDto {
        return {
            ...subscription,
            type: subscription.type as unknown as PaymentType,
            status: subscription.status as unknown as Status,
        };
    }
}
