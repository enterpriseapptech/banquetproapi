import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'apps/payments/database/database.service';
import { $Enums, Prisma } from 'apps/payments/prisma/@prisma/payments';
import { InvoiceDto, InvoiceStatus, UpdateInvoiceDto, CreateInvoiceDto, InvoiceItem, BillingAddress, CreateInvoiceDtoForSubscriptions, CreateSecondInvoiceDto, ServiceType } from '@shared/contracts/payments';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class InvoiceService {
    constructor(
        private readonly databaseService: DatabaseService
    ) { }

    static generateDueDate(): Date {
        const days = Number(process.env.INVOICE_VALID_NO_OF_DAYS ?? 7);
        return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    }
    // used by created booking to make a first invoice for the booking
    async generate(createInvoiceDto: CreateInvoiceDto): Promise<InvoiceDto> {
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

    // this is used to create another invoice and the amount is to be determined by the service provider strictly
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
                        payments: { select: { amount: true } },
                    },
                });

                if (invoices.length === 0) {
                    throw new NotFoundException({
                        statusCode: 404,
                        message: "No invoices found for this booking",
                        error: "No invoices found for this booking",
                    });
                }

                const totalPaid = invoices.reduce((acc, invoice) => {
                    const invoiceTotal = invoice.payments.reduce(
                        (sum, payment) => sum + Number(payment.amount),
                        0
                    );
                    return acc + invoiceTotal;
                }, 0);
                const amountDue = createInvoiceDto.booking.total - totalPaid
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
            console.log({ invoice })
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

    async createInvoiceForSubscriptions(createInvoiceDto: CreateInvoiceDtoForSubscriptions): Promise<InvoiceDto> {
        if (!createInvoiceDto.items) {
            throw new InternalServerErrorException('We could not generate invoice, as the items been paid for were not listed', {
                cause: new Error(),
                description: 'We could not generate invoice, as the items been paid for are not listed'
            });
        }

        let itemsTotal = 0;
        createInvoiceDto.items.map((item) => { itemsTotal += item.amount })
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
        const invoices = await this.databaseService.invoice.findMany({
            where,
            include: { payments: true },
        });
        let totalDue = 0;
        let totalPaid = 0;
        for (const inv of invoices) {
            totalDue += Number(inv.amountDue);
            totalPaid += (inv.payments || []).reduce((sum, p) => sum + Number(p.amount), 0);
        }
        return { totalDue, totalPaid };
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
