import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'apps/payments/database/database.service';
import { $Enums } from 'apps/payments/prisma/@prisma/payments';
import { RefundDto, RefundStatus, UpdateRefundDto, CreateRefundDto, PaymentReason, IPaymentStatus } from '@shared/contracts/payments';

@Injectable()
export class RefundService {
    constructor(private readonly databaseService: DatabaseService) {}

    async create(createRefundDto: CreateRefundDto): Promise<RefundDto> {
        const refund = await this.databaseService.refund.create({
            data: {
                paymentId: createRefundDto.paymentId,
                amount: createRefundDto.amount,
                reason: createRefundDto.reason,
                status: createRefundDto.status as $Enums.RefundStatus,
            },
            include: { payment: true },
        });
        return this.mapToRefundDto(refund);
    }

    async findAll(limit: number, offset: number, paymentId?: string): Promise<{ count: number; docs: RefundDto[] }> {
        const where: any = { deletedAt: null };
        if (paymentId) where.paymentId = paymentId;
        const [refunds, count] = await this.databaseService.$transaction([
            this.databaseService.refund.findMany({ take: limit, skip: offset, where, include: { payment: true }, orderBy: { createdAt: 'desc' } }),
            this.databaseService.refund.count({ where }),
        ]);
        return { count, docs: refunds.map(r => this.mapToRefundDto(r)) };
    }

    async findOne(id: string): Promise<RefundDto> {
        const refund = await this.databaseService.refund.findUnique({
            where: { id, deletedAt: null },
            include: { payment: true },
        });
        if (!refund) throw new NotFoundException({ statusCode: 404, message: 'Refund not found', error: 'Not found' });
        return this.mapToRefundDto(refund);
    }

    async update(id: string, updateRefundDto: UpdateRefundDto): Promise<RefundDto> {
        const refund = await this.databaseService.refund.update({
            where: { id },
            data: { ...updateRefundDto, status: updateRefundDto.status as $Enums.RefundStatus },
            include: { payment: true },
        });
        return this.mapToRefundDto(refund);
    }

    async remove(id: string, updaterId: string): Promise<RefundDto> {
        const refund = await this.databaseService.refund.update({
            where: { id },
            data: { deletedAt: new Date(), deletedBy: updaterId },
            include: { payment: true },
        });
        return this.mapToRefundDto(refund);
    }

    private mapToRefundDto(refund: any): RefundDto {
        return {
            ...refund,
            status: refund.status as unknown as RefundStatus,
            payment: refund.payment ? {
                ...refund.payment,
                amount: Number(refund.payment.amount),
                amountCharged: Number(refund.payment.amountCharged),
                paymentReason: refund.payment.paymentReason as unknown as PaymentReason,
                paymentAuthorization: refund.payment.paymentAuthorization as Record<string, any>,
                status: refund.payment.status as unknown as IPaymentStatus,
            } : undefined,
        };
    }
}
