import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'apps/payments/database/database.service';
import { $Enums } from 'apps/payments/prisma/@prisma/payments';
import { DisputeDto, DisputeStatus, UpdateDisputeDto, CreateDisputeDto, PaymentReason, IPaymentStatus } from '@shared/contracts/payments';

@Injectable()
export class DisputeService {
    constructor(private readonly databaseService: DatabaseService) {}

    async create(createDisputeDto: CreateDisputeDto): Promise<DisputeDto> {
        const dispute = await this.databaseService.dispute.create({
            data: {
                userId: createDisputeDto.userId,
                paymentId: createDisputeDto.paymentId,
                serviceRequestId: createDisputeDto.serviceRequestId,
                reason: createDisputeDto.reason,
                status: createDisputeDto.status as $Enums.DisputeStatus,
            },
            include: { payment: true },
        });
        return this.mapToDisputeDto(dispute);
    }

    async findAll(limit: number, offset: number, userId?: string, paymentId?: string): Promise<{ count: number; docs: DisputeDto[] }> {
        const where: any = { deletedAt: null };
        if (userId) where.userId = userId;
        if (paymentId) where.paymentId = paymentId;
        const [disputes, count] = await this.databaseService.$transaction([
            this.databaseService.dispute.findMany({ take: limit, skip: offset, where, include: { payment: true }, orderBy: { createdAt: 'desc' } }),
            this.databaseService.dispute.count({ where }),
        ]);
        return { count, docs: disputes.map(d => this.mapToDisputeDto(d)) };
    }

    async findOne(id: string): Promise<DisputeDto> {
        const dispute = await this.databaseService.dispute.findUnique({
            where: { id, deletedAt: null },
            include: { payment: true },
        });
        if (!dispute) throw new NotFoundException({ statusCode: 404, message: 'Dispute not found', error: 'Not found' });
        return this.mapToDisputeDto(dispute);
    }

    async update(id: string, updateDisputeDto: UpdateDisputeDto): Promise<DisputeDto> {
        const dispute = await this.databaseService.dispute.update({
            where: { id },
            data: { ...updateDisputeDto, status: updateDisputeDto.status as $Enums.DisputeStatus },
            include: { payment: true },
        });
        return this.mapToDisputeDto(dispute);
    }

    async remove(id: string, updaterId: string): Promise<DisputeDto> {
        const dispute = await this.databaseService.dispute.update({
            where: { id },
            data: { deletedAt: new Date(), deletedBy: updaterId },
            include: { payment: true },
        });
        return this.mapToDisputeDto(dispute);
    }

    private mapToDisputeDto(dispute: any): DisputeDto {
        return {
            ...dispute,
            status: dispute.status as unknown as DisputeStatus,
            payment: dispute.payment ? {
                ...dispute.payment,
                amount: Number(dispute.payment.amount),
                amountCharged: Number(dispute.payment.amountCharged),
                paymentReason: dispute.payment.paymentReason as unknown as PaymentReason,
                paymentAuthorization: dispute.payment.paymentAuthorization as Record<string, any>,
                status: dispute.payment.status as unknown as IPaymentStatus,
            } : undefined,
        };
    }
}
