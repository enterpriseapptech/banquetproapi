import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'apps/payments/database/database.service';
import { $Enums, Prisma } from 'apps/payments/prisma/@prisma/payments';
import { InvoiceDto, InvoiceStatus, UpdateInvoiceDto, CreateInvoiceDto, InvoiceItem, BillingAddress, CreateInvoiceDtoForSubscriptions, CreateSecondInvoiceDto, ServiceType } from '@shared/contracts/payments';
import { instanceToPlain } from 'class-transformer';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class InvoiceService {
    private readonly logger = new Logger(InvoiceService.name);

    constructor(
        private readonly databaseService: DatabaseService
    ) { }

    static generateDueDate(): Date {
        const days = Number(process.env.INVOICE_VALID_NO_OF_DAYS ?? 7);
        return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    }
    
    // used by created booking to make a first invoice for the booking
    async generate(createInvoiceDto: CreateInvoiceDto): Promise<InvoiceDto> {
        // Validate service charge: the booking controller fetches the live value from app settings
        // and passes it here as serviceChargeAmount. Cross-check it against the items array so
        // the stored invoice always reflects what was actually charged.
        if (createInvoiceDto.serviceChargeAmount !== undefined) {
            const serviceChargeItem = (createInvoiceDto.items as InvoiceItem[]).find(
                (item) => item.item === 'service charge',
            );
            if (!serviceChargeItem) {
                throw new BadRequestException('Invoice items must include a "service charge" entry');
            }
            if (serviceChargeItem.amount !== createInvoiceDto.serviceChargeAmount) {
                throw new BadRequestException(
                    `Service charge in items (${serviceChargeItem.amount}) does not match the current service charge (${createInvoiceDto.serviceChargeAmount})`,
                );
            }
        }

        const newInvoiceInput: Prisma.InvoiceCreateInput = {
            userId: createInvoiceDto.userId,
            reference: Math.random().toString(16).substring(2, 8),
            bookingId: createInvoiceDto.bookingId,
            items: instanceToPlain(createInvoiceDto.items) as Prisma.JsonArray,
            amountDue: createInvoiceDto.amountDue,
            serviceChargeAmount: createInvoiceDto.serviceChargeAmount,
            currency: createInvoiceDto.currency,
            dueDate: createInvoiceDto.dueDate,
            note: createInvoiceDto.note,
            billingAddress: instanceToPlain(createInvoiceDto.billingAddress) as Prisma.JsonObject,
            status: "PENDING" as $Enums.InvoiceStatus,
        }

        try {
            const invoice = await this.databaseService.invoice.create({ data: newInvoiceInput });
            return {
                ...invoice,
                items: instanceToPlain(invoice.items) as InvoiceItem[],
                billingAddress: instanceToPlain(invoice.billingAddress) as BillingAddress,
                amountDue: Number(invoice.amountDue),
                status: invoice.status as unknown as InvoiceStatus,
                serviceType: invoice.serviceType as unknown as ServiceType,
            };
        } catch (error: any) {
            throw error
        }
    }

    // this is used to create another invoice for booking
    async createSecondInvoice(createInvoiceDto: CreateSecondInvoiceDto): Promise<InvoiceDto> {
        try {
            const invoice = await this.databaseService.$transaction(async (prisma) => {
                const invoices = await prisma.invoice.findMany({
                    where: { bookingId: createInvoiceDto.bookingId },
                    orderBy: { createdAt: 'asc' },
                    select: {
                        id: true,
                        userId: true,
                        items: true,
                        currency: true,
                        billingAddress: true,
                    },
                });

                if (invoices.length === 0) {
                    throw new NotFoundException({
                        statusCode: 404,
                        message: "No invoices found for this booking",
                        error: "No invoices found for this booking",
                    });
                }

                const invoiceIds = invoices.map(i => i.id);
                const walletTxs = await prisma.walletTransaction.findMany({
                    where: { invoiceId: { in: invoiceIds }, reason: 'INVOICE_PAYMENT', type: 'DEBIT' },
                    select: { amount: true },
                });
                const totalPaid = walletTxs.reduce((sum, tx) => sum + Number(tx.amount), 0);
                const amountDue = createInvoiceDto.booking.total - totalPaid

                // TO DO: validate the amount entered by service provider and the amount left.
                // doesn't match, throw error
                const newInvoiceInput: Prisma.InvoiceCreateInput = {
                    userId: invoices[0].userId,
                    reference: Math.random().toString(16).substring(2, 8),
                    bookingId: createInvoiceDto.bookingId,
                    items: invoices[0].items,
                    amountDue: amountDue,
                    currency: invoices[0].currency,
                    dueDate: createInvoiceDto.dueDate,
                    note: createInvoiceDto.note,
                    billingAddress: invoices[0].billingAddress,
                    status: "PENDING" as $Enums.InvoiceStatus,
                }
                return await this.databaseService.invoice.create({ data: newInvoiceInput });
            })

            return {
                ...invoice,
                items: instanceToPlain(invoice.items) as InvoiceItem[],
                billingAddress: instanceToPlain(invoice.billingAddress) as BillingAddress,
                amountDue: Number(invoice.amountDue),
                status: invoice.status as unknown as InvoiceStatus,
                serviceType: invoice.serviceType as unknown as ServiceType,
            };
        } catch (error: any) {
            throw error
        }
    }

    async replace(createInvoiceDto: CreateInvoiceDto): Promise<InvoiceDto> {
        await this.databaseService.$transaction(async (prisma) => {
            if (createInvoiceDto.replaceInvoice && createInvoiceDto.replaceInvoice.length > 0) {
                const invoices = await prisma.invoice.findMany({
                    where: {
                        id: { in: createInvoiceDto.replaceInvoice },
                        status: $Enums.InvoiceStatus.PAID || $Enums.InvoiceStatus.PARTIALLY_PAID
                    }
                });

                if (invoices && invoices.length > 0) {
                    throw new BadRequestException('One or More of the invoice you want to replace has been paid for and can not be replaced or deleted', {
                        cause: new Error(),
                        description: 'One or More of the invoice you want to replace has been paid for and can not be replaced or deleted'
                    });
                }
            }
        })

        if (!createInvoiceDto.items) {
            throw new InternalServerErrorException('We could not generate invoice, as the items been paid for were not listed', {
                cause: new Error(),
                description: 'We could not generate invoice, as the items been paid for are not listed'
            });
        }

        let itemsTotal = 0;
        createInvoiceDto.items.forEach((item) => { itemsTotal += item.amount })
        const discount = itemsTotal * (createInvoiceDto.discount / 100)
        if ((itemsTotal - discount) !== (createInvoiceDto.total)) {
            throw new InternalServerErrorException(`We could not generate invoice, total amount is incorrect for the items. Should be ${itemsTotal - discount}`, {
                cause: new Error(),
                description: 'We could not generate invoice, total amount is incorrect for the items'
            });
        }

        const newInvoiceInput: Prisma.InvoiceCreateInput = {
            userId: createInvoiceDto.userId,
            reference: Math.random().toString(16).substring(2, 8),
            bookingId: createInvoiceDto.bookingId,
            items: instanceToPlain(createInvoiceDto.items) as Prisma.JsonArray,
            amountDue: createInvoiceDto.amountDue,
            currency: createInvoiceDto.currency,
            dueDate: createInvoiceDto.dueDate,
            note: createInvoiceDto.note,
            billingAddress: instanceToPlain(createInvoiceDto.billingAddress) as Prisma.JsonObject,
            status: "PENDING" as $Enums.InvoiceStatus,
        }

        try {
            const invoice = await this.databaseService.invoice.create({ data: newInvoiceInput });
            this.logger.log(`Invoice created | invoiceId=${invoice.id} ref=${invoice.reference} bookingId=${invoice.bookingId} amount=${invoice.amountDue}`);
            return {
                ...invoice,
                items: instanceToPlain(invoice.items) as InvoiceItem[],
                billingAddress: instanceToPlain(invoice.billingAddress) as BillingAddress,
                amountDue: Number(invoice.amountDue),
                status: invoice.status as unknown as InvoiceStatus,
                serviceType: invoice.serviceType as unknown as ServiceType,
            };
        } catch (error: any) {
            throw error
        }
    }

    async createInvoiceForPlatformPayments(createInvoiceDto: CreateInvoiceDtoForSubscriptions): Promise<InvoiceDto> {
        if (!createInvoiceDto.items) {
            throw new InternalServerErrorException('We could not generate invoice, as the items been paid for were not listed', {
                cause: new Error(),
                description: 'We could not generate invoice, as the items been paid for are not listed'
            });
        }

        // Validate the invoice amount against the actual price stored in the DB for this payment type.
        const subscription = await this.databaseService.subscriptions.findUnique({
            where: { id: createInvoiceDto.subscriptionId },
            include: { subscriptionplan: true },
        });
        if (!subscription) {
            throw new NotFoundException(`Subscription not found: ${createInvoiceDto.subscriptionId}`);
        }

        switch (subscription.type) {
            case $Enums.PaymentType.SUBSCRIPTIONPLANS: {
                const expectedAmount = Number(subscription.subscriptionplan.amount);
                if (createInvoiceDto.amountDue !== expectedAmount) {
                    throw new BadRequestException(
                        `Invoice amount (${createInvoiceDto.amountDue}) does not match subscription plan price (${expectedAmount})`,
                    );
                }
                break;
            }
            case $Enums.PaymentType.KYC:
                // TODO: look up Fees where name = KYC and verify createInvoiceDto.amountDue === fee.amount
                break;
            case $Enums.PaymentType.CERTIFICATION:
                // TODO: look up Fees where name = CERTIFICATION and verify createInvoiceDto.amountDue === fee.amount
                break;
            case $Enums.PaymentType.FEATUREDPLANS:
                // TODO: look up FeaturedPlans by subscription's featured plan id and verify createInvoiceDto.amountDue === plan.amount
                break;
        }

        const newInvoiceInput: Prisma.InvoiceCreateInput = {
            userId: createInvoiceDto.userId,
            reference: Math.random().toString(16).substring(2, 8),
            subscription: { connect: { id: createInvoiceDto.subscriptionId } },
            serviceType: createInvoiceDto.serviceType as unknown as $Enums.ServiceType,
            serviceId: createInvoiceDto.serviceId,
            subscriptionPlanId: createInvoiceDto.subscriptionPlanId,
            items: instanceToPlain(createInvoiceDto.items) as Prisma.JsonArray,
            amountDue: createInvoiceDto.amountDue,
            currency: createInvoiceDto.currency,
            dueDate: createInvoiceDto.dueDate,
            billingAddress: instanceToPlain(createInvoiceDto.billingAddress) as Prisma.JsonObject,
            status: $Enums.InvoiceStatus.PENDING
        }

        try {
            const invoice = await this.databaseService.invoice.create({ data: newInvoiceInput });
            return {
                ...invoice,
                items: instanceToPlain(invoice.items) as InvoiceItem[],
                billingAddress: instanceToPlain(invoice.billingAddress) as BillingAddress,
                amountDue: Number(invoice.amountDue),
                status: invoice.status as unknown as InvoiceStatus,
                serviceType: invoice.serviceType as unknown as ServiceType,
            };
        } catch (error: any) {
            throw error
        }
    }

    async findAll(
        limit: number,
        offset: number,
        subscriptionId?: string,
        bookingId?: string,
        userId?: string,
        status?: string,
        currency?: string,
        deleted?: boolean): Promise<any> {
        const whereClause: any = {}
        if (deleted === undefined) whereClause.deletedAt = undefined
        if (bookingId) whereClause.bookingId = bookingId
        if (userId) whereClause.userId = userId
        if (subscriptionId) whereClause.subscriptionId = subscriptionId
        if (currency) whereClause.currency = currency
        if (status) whereClause.status = status as $Enums.InvoiceStatus
        whereClause.deletedAt = deleted == true ? { not: null } : null

        const [invoices, total] = await this.databaseService.$transaction([
            this.databaseService.invoice.findMany({
                take: limit,
                skip: offset,
                where: whereClause,
                orderBy: { createdAt: 'asc' },
            }),
            this.databaseService.invoice.count({ where: whereClause }),
        ]);

        return { count: total, data: invoices.map(invoice => this.mapToInvoiceDto(invoice)) };
    }

    async findOne(id: string): Promise<InvoiceDto> {
        try {
            const invoice = await this.databaseService.invoice.findUnique({
                where: { id: id, deletedAt: null },
                include: { payments: true, subscription: true }
            });

            return {
                ...invoice,
                items: instanceToPlain(invoice.items) as InvoiceItem[],
                billingAddress: instanceToPlain(invoice.billingAddress) as BillingAddress,
                amountDue: Number(invoice.amountDue),
                status: invoice.status as unknown as InvoiceStatus,
                serviceType: invoice.serviceType as unknown as ServiceType,
            };
        } catch (error) {
            throw new NotFoundException({
                statusCode: 404,
                message: "Invoice not found",
                error: "Invoice not found",
            });
        }
    }

    async update(id: string, updateInvoiceDto: UpdateInvoiceDto): Promise<InvoiceDto> {
        try {
            const updateInvoiceInput: Prisma.InvoiceUpdateInput = {
                ...updateInvoiceDto,
                items: updateInvoiceDto.items ? updateInvoiceDto.items as unknown as Prisma.InputJsonValue[] : undefined,
                billingAddress: updateInvoiceDto.billingAddress ? updateInvoiceDto.billingAddress as unknown as Prisma.InputJsonValue : undefined
            };

            const invoice = await this.databaseService.invoice.update({
                where: { id },
                data: updateInvoiceInput
            });

            return {
                ...invoice,
                items: instanceToPlain(invoice.items) as InvoiceItem[],
                billingAddress: instanceToPlain(invoice.billingAddress) as BillingAddress,
                amountDue: Number(invoice.amountDue),
                status: invoice.status as unknown as InvoiceStatus,
                serviceType: invoice.serviceType as unknown as ServiceType,
            };
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async remove(id: string, updaterId: string): Promise<InvoiceDto> {
        const invoice = await this.databaseService.$transaction(async (prisma) => {
            const invoices = await prisma.invoice.findUnique({
                where: { id, status: $Enums.InvoiceStatus.PAID || $Enums.InvoiceStatus.PARTIALLY_PAID }
            });

            if (invoices) {
                throw new BadRequestException('The invoice you want to replace has been paid for and can not be replaced or deleted', {
                    cause: new Error(),
                    description: 'One or More of the invoice you want to replace has been paid for and can not be replaced or deleted'
                });
            }

            const deletedInvoice = await prisma.invoice.update({
                where: { id, status: { not: $Enums.InvoiceStatus.PAID || $Enums.InvoiceStatus.PARTIALLY_PAID } },
                data: { deletedAt: new Date(), deletedBy: updaterId }
            });

            return deletedInvoice
        });

        return {
            ...invoice,
            items: instanceToPlain(invoice.items) as InvoiceItem[],
            billingAddress: instanceToPlain(invoice.billingAddress) as BillingAddress,
            amountDue: Number(invoice.amountDue),
            status: invoice.status as unknown as InvoiceStatus,
            serviceType: invoice.serviceType as unknown as ServiceType,
        };
    }

    async permanentDelete(id: string): Promise<InvoiceDto> {
        const invoice = await this.databaseService.$transaction(async (prisma) => {
            const deletedInvoice = await prisma.invoice.delete({ where: { id } });
            return deletedInvoice
        });

        return {
            ...invoice,
            items: instanceToPlain(invoice.items) as InvoiceItem[],
            billingAddress: instanceToPlain(invoice.billingAddress) as BillingAddress,
            amountDue: Number(invoice.amountDue),
            status: invoice.status as unknown as InvoiceStatus,
            serviceType: invoice.serviceType as unknown as ServiceType,
        };
    }


    async calculateTotals(bookingId?: string, subscriptionId?: string): Promise<{ totalDue: number; totalPaid: number }> {
        const where = subscriptionId ? { subscriptionId } : { bookingId };
        const invoices = await this.databaseService.invoice.findMany({ where });
        const invoiceIds = invoices.map(inv => inv.id);

        const walletTxs = await this.databaseService.walletTransaction.findMany({
            where: { invoiceId: { in: invoiceIds }, reason: 'INVOICE_PAYMENT' as any, type: 'DEBIT' as any },
            select: { amount: true },
        });

        const totalDue = invoices.reduce((sum, inv) => sum + Number(inv.amountDue), 0);
        const totalPaid = walletTxs.reduce((sum, tx) => sum + Number(tx.amount), 0);
        return { totalDue, totalPaid };
    }

    /** Returns how much of the invoice amount is still unpaid, based on INVOICE_PAYMENT wallet debit transactions */
    async calculateRemainingAmount(invoiceId: string, prisma?: any): Promise<Decimal> {
        const db = prisma ?? this.databaseService;
        const invoice = await db.invoice.findUnique({ where: { id: invoiceId } });
        if (!invoice) throw new NotFoundException('Invoice not found');

        const walletTxs = await db.walletTransaction.findMany({
            where: { invoiceId, reason: 'INVOICE_PAYMENT', type: 'DEBIT'},
            select: { amount: true },
        });

        const totalApplied = (walletTxs as any[]).reduce(
            (sum: Decimal, tx: any) => sum.plus(new Decimal(tx.amount)),
            new Decimal(0),
        );
        const remaining = new Decimal(invoice.amountDue).minus(totalApplied);
        return remaining.lt(0) ? new Decimal(0) : remaining;
    }

    private mapToInvoiceDto(invoice: any): InvoiceDto {
        return {
            ...invoice,
            items: instanceToPlain(invoice.items) as InvoiceItem[],
            billingAddress: instanceToPlain(invoice.billingAddress) as BillingAddress,
            amountDue: Number(invoice.amountDue),
            status: invoice.status as unknown as InvoiceStatus,
            serviceType: invoice.serviceType as unknown as ServiceType,
        };
    }
}
