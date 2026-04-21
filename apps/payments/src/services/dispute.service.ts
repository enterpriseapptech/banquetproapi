import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'apps/payments/database/database.service';
import { $Enums } from 'apps/payments/prisma/@prisma/payments';
import { Decimal } from '@prisma/client/runtime/library';
import {
    DisputeDto, DisputeStatus, UpdateDisputeDto, CreateDisputeDto,
    PaymentReason, IPaymentStatus, ResolveDisputeDto,
} from '@shared/contracts/payments';
import { WalletService } from './wallet.service';
import { RefundService } from './refund.service';

@Injectable()
export class DisputeService {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly walletService: WalletService,
        private readonly refundService: RefundService,
    ) { }

    async create(createDisputeDto: CreateDisputeDto): Promise<DisputeDto> {
        // If linked to a refund, verify the refund was declined
        if (createDisputeDto.refundId) {
            const refund = await this.databaseService.refund.findUnique({ where: { id: createDisputeDto.refundId } });
            if (!refund) throw new NotFoundException('Refund not found');
            if (refund.status !== $Enums.RefundStatus.DECLINED) {
                throw new BadRequestException('Can only dispute a declined refund');
            }
            // Prevent duplicate disputes on same refund
            const existing = await this.databaseService.dispute.findUnique({ where: { refundId: createDisputeDto.refundId } });
            if (existing) throw new BadRequestException('A dispute already exists for this refund');
        }

        const dispute = await this.databaseService.dispute.create({
            data: {
                userId: createDisputeDto.userId,
                paymentId: createDisputeDto.paymentId,
                refundId: createDisputeDto.refundId,
                serviceRequestId: createDisputeDto.serviceRequestId,
                reason: createDisputeDto.reason,
                status: $Enums.DisputeStatus.OPEN,
            },
            include: { payment: true },
        });
        return this.mapToDisputeDto(dispute);
    }

    /**
     * Admin resolves a dispute in the customer's favour.
     * Triggers the refund wallet movement immediately (bypasses normal processing delay).
     */
    async resolve(dto: ResolveDisputeDto): Promise<DisputeDto> {
        const dispute = await this.databaseService.dispute.findUnique({
            where: { id: dto.id },
            include: { refund: true },
        });
        if (!dispute) throw new NotFoundException('Dispute not found');
        if (dispute.status !== $Enums.DisputeStatus.OPEN) {
            throw new BadRequestException(`Dispute is already ${dispute.status}`);
        }

        return this.databaseService.$transaction(async (prisma) => {
            // Update the linked refund: override refundAmount and process immediately
            if (dispute.refundId && dispute.refund) {
                const refundAmount = new Decimal(dto.refundAmount);
                await prisma.refund.update({
                    where: { id: dispute.refundId },
                    data: {
                        refundAmount,
                        status: $Enums.RefundStatus.APPROVED,
                        processAt: new Date(), // process now
                    },
                });
            }

            const updatedDispute = await prisma.dispute.update({
                where: { id: dto.id },
                data: {
                    status: $Enums.DisputeStatus.RESOLVED,
                    adminNote: dto.adminNote,
                },
                include: { payment: true },
            });

            return this.mapToDisputeDto(updatedDispute);
        }).then(async (disputeResult) => {
            // Process the refund immediately outside the transaction to avoid nesting
            // if (dispute.refundId) {
            //     await this.refundService.processRefund(dispute.refundId);
            // }
            return disputeResult;
        });
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
            data: {
                ...(updateDisputeDto.status && { status: updateDisputeDto.status as $Enums.DisputeStatus }),
                ...(updateDisputeDto.adminNote && { adminNote: updateDisputeDto.adminNote }),
                ...(updateDisputeDto.updatedBy && { updatedBy: updateDisputeDto.updatedBy }),
            },
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
