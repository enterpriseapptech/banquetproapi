/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'apps/payments/database/database.service';
import { $Enums } from 'apps/payments/prisma/@prisma/payments';
import { Decimal } from '@prisma/client/runtime/library';
import {
    RefundDto, RefundStatus, UpdateRefundDto, CreateRefundDto,
    PaymentReason, IPaymentStatus, WalletTxReason,
} from '@shared/contracts/payments';
import { WalletService } from './wallet.service';

@Injectable()
export class RefundService {
    private readonly logger = new Logger(RefundService.name);

    constructor(
        private readonly databaseService: DatabaseService,
        private readonly walletService: WalletService,
    ) { }

//     /** Customer requests a refund. Policy check and calculation done by gateway before calling this. */
//     async create(createRefundDto: CreateRefundDto): Promise<RefundDto> {
//         // Verify the payment exists and belongs to the customer
//         const payment = await this.databaseService.payment.findUnique({
//             where: { id: createRefundDto.paymentId },
//         });
//         if (!payment) throw new NotFoundException('Payment not found');
//         if (payment.userId !== createRefundDto.customerId) {
//             throw new BadRequestException('Payment does not belong to this user');
//         }

//         // Prevent duplicate refund requests on same payment
//         const existing = await this.databaseService.refund.findUnique({
//             where: { paymentId: createRefundDto.paymentId },
//         });
//         if (existing) throw new BadRequestException('A refund request already exists for this payment');

//         const refund = await this.databaseService.refund.create({
//             data: {
//                 paymentId: createRefundDto.paymentId,
//                 invoiceId: createRefundDto.invoiceId,
//                 customerId: createRefundDto.customerId,
//                 serviceProviderId: createRefundDto.serviceProviderId,
//                 bookingId: createRefundDto.bookingId,
//                 refundReason: createRefundDto.refundReason,
//                 policySnapshot: createRefundDto.policySnapshot as any,
//                 deductionPercentage: createRefundDto.deductionPercentage != null
//                     ? new Decimal(createRefundDto.deductionPercentage) : null,
//                 deductionAmount: createRefundDto.deductionAmount != null
//                     ? new Decimal(createRefundDto.deductionAmount) : null,
//                 refundAmount: new Decimal(createRefundDto.refundAmount),
//                 status: $Enums.RefundStatus.REQUESTED,
//             },
//             include: { payment: true },
//         });

//         this.logger.log(`Refund requested | refundId=${refund.id} paymentId=${createRefundDto.paymentId} customerId=${createRefundDto.customerId}`);
//         return this.mapToRefundDto(refund);
//     }

//     /** SP approves refund — sets processAt, status → APPROVED */
//     async approve(id: string, serviceProviderId: string): Promise<RefundDto> {
//         const refund = await this.databaseService.refund.findUnique({ where: { id }, include: { payment: true } });
//         if (!refund) throw new NotFoundException('Refund not found');
//         if (refund.serviceProviderId !== serviceProviderId) {
//             throw new BadRequestException('You are not authorised to approve this refund');
//         }
//         if (refund.status !== $Enums.RefundStatus.REQUESTED) {
//             throw new BadRequestException(`Refund cannot be approved from status: ${refund.status}`);
//         }

//         const processingDays = parseInt(process.env.REFUND_PROCESSING_DAY ?? '3', 10);
//         const processAt = new Date();
//         processAt.setDate(processAt.getDate() + processingDays);

//         const updated = await this.databaseService.refund.update({
//             where: { id },
//             data: { status: $Enums.RefundStatus.APPROVED, processAt, updatedBy: serviceProviderId },
//             include: { payment: true },
//         });

//         this.logger.log(`Refund approved | refundId=${id} processAt=${processAt.toISOString()}`);
//         return this.mapToRefundDto(updated);
//     }

//     /** SP declines refund */
//     async decline(id: string, serviceProviderId: string, reason: string): Promise<RefundDto> {
//         const refund = await this.databaseService.refund.findUnique({ where: { id } });
//         if (!refund) throw new NotFoundException('Refund not found');
//         if (refund.serviceProviderId !== serviceProviderId) {
//             throw new BadRequestException('You are not authorised to decline this refund');
//         }
//         if (refund.status !== $Enums.RefundStatus.REQUESTED) {
//             throw new BadRequestException(`Refund cannot be declined from status: ${refund.status}`);
//         }

//         const updated = await this.databaseService.refund.update({
//             where: { id },
//             data: {
//                 status: $Enums.RefundStatus.DECLINED,
//                 refundReason: `${refund.refundReason} | SP decline reason: ${reason}`,
//                 updatedBy: serviceProviderId,
//             },
//             include: { payment: true },
//         });

//         this.logger.log(`Refund declined | refundId=${id} by SP=${serviceProviderId}`);
//         return this.mapToRefundDto(updated);
//     }

//     /**
//      * Process a single approved refund.
//      * Called by cron or by admin dispute resolution.
//      * Determines source wallet: SP wallet or platform (if still in escrow).
//      */
//     async processRefund(refundId: string): Promise<RefundDto> {
//         const refund = await this.databaseService.refund.findUnique({
//             where: { id: refundId },
//             include: { payment: true },
//         });
//         if (!refund) throw new NotFoundException('Refund not found');
//         if (refund.status !== $Enums.RefundStatus.APPROVED && refund.status !== $Enums.RefundStatus.PROCESSING) {
//             throw new BadRequestException(`Cannot process refund with status: ${refund.status}`);
//         }

//         const refundAmount = new Decimal(refund.refundAmount);

//         const updated = await this.databaseService.$transaction(async (prisma) => {
//             await prisma.refund.update({ where: { id: refundId }, data: { status: $Enums.RefundStatus.PROCESSING } });

//             // Determine source wallet: escrow or SP
//             const holdInEscrow = process.env.HOLD_PAYMENT_IN_ESCROW_WALLET === 'true';
//             let sourceWalletId: string;

//             if (holdInEscrow) {
//                 // Check if escrow has been released already
//                 const escrowReleased = await prisma.walletTransaction.findFirst({
//                     where: { invoiceId: refund.invoiceId, reason: $Enums.WalletTxReason.ESCROW_RELEASE },
//                 });
//                 if (!escrowReleased) {
//                     // Funds still in platform — debit platform
//                     const platformWallet = await this.walletService.getPlatformWallet(prisma);
//                     sourceWalletId = platformWallet.id;
//                 } else {
//                     // Already released to SP — debit SP
//                     const spWallet = await this.walletService.findWalletByUserId(refund.serviceProviderId, prisma);
//                     sourceWalletId = spWallet.id;
//                 }
//             } else {
//                 // Direct mode: always debit SP wallet
//                 const spWallet = await this.walletService.findWalletByUserId(refund.serviceProviderId, prisma);
//                 sourceWalletId = spWallet.id;
//             }

//             // Debit source
//             await this.walletService.creditOrDebit(
//                 prisma, sourceWalletId, $Enums.WalletTxType.DEBIT,
//                 refundAmount, $Enums.WalletTxReason.REFUND,
//                 { refundId, invoiceId: refund.invoiceId, description: 'Refund to customer' },
//             );

//             // Credit customer
//             const customerWallet = await this.walletService.findorCreateWalletByUserId(refund.customerId, prisma);
//             const creditTx = await this.walletService.creditOrDebit(
//                 prisma, customerWallet.id, $Enums.WalletTxType.CREDIT,
//                 refundAmount, $Enums.WalletTxReason.REFUND,
//                 { refundId, invoiceId: refund.invoiceId, description: 'Refund received' },
//             );

//             const completedRefund = await prisma.refund.update({
//                 where: { id: refundId },
//                 data: { status: $Enums.RefundStatus.COMPLETED, walletTransactionId: creditTx.id },
//                 include: { payment: true },
//             });

//             return completedRefund;
//         });

//         this.logger.log(`Refund processed | refundId=${refundId} amount=${refundAmount}`);
//         return this.mapToRefundDto(updated);
//     }

//     /** Cron: process all approved refunds whose processAt <= now */
//     async processDueRefunds(): Promise<void> {
//         const due = await this.databaseService.refund.findMany({
//             where: {
//                 status: $Enums.RefundStatus.APPROVED,
//                 processAt: { lte: new Date() },
//                 deletedAt: null,
//             },
//         });

//         this.logger.log(`Processing ${due.length} due refund(s)`);
//         for (const refund of due) {
//             try {
//                 await this.processRefund(refund.id);
//             } catch (err) {
//                 this.logger.error(`Failed to process refund ${refund.id}: ${err.message}`);
//                 await this.databaseService.refund.update({
//                     where: { id: refund.id },
//                     data: { status: $Enums.RefundStatus.FAILED },
//                 });
//             }
//         }
//     }

//     async findAll(limit: number, offset: number, paymentId?: string, customerId?: string, serviceProviderId?: string): Promise<{ count: number; docs: RefundDto[] }> {
//         const where: any = { deletedAt: null };
//         if (paymentId) where.paymentId = paymentId;
//         if (customerId) where.customerId = customerId;
//         if (serviceProviderId) where.serviceProviderId = serviceProviderId;

//         const [refunds, count] = await this.databaseService.$transaction([
//             this.databaseService.refund.findMany({ take: limit, skip: offset, where, include: { payment: true }, orderBy: { createdAt: 'desc' } }),
//             this.databaseService.refund.count({ where }),
//         ]);
//         return { count, docs: refunds.map(r => this.mapToRefundDto(r)) };
//     }

//     async findOne(id: string): Promise<RefundDto> {
//         const refund = await this.databaseService.refund.findUnique({
//             where: { id, deletedAt: null },
//             include: { payment: true },
//         });
//         if (!refund) throw new NotFoundException({ statusCode: 404, message: 'Refund not found', error: 'Not found' });
//         return this.mapToRefundDto(refund);
//     }

//     async update(id: string, updateRefundDto: UpdateRefundDto): Promise<RefundDto> {
//         const refund = await this.databaseService.refund.update({
//             where: { id },
//             data: {
//                 ...(updateRefundDto.status && { status: updateRefundDto.status as $Enums.RefundStatus }),
//                 ...(updateRefundDto.updatedBy && { updatedBy: updateRefundDto.updatedBy }),
//             },
//             include: { payment: true },
//         });
//         return this.mapToRefundDto(refund);
//     }

//     async remove(id: string, updaterId: string): Promise<RefundDto> {
//         const refund = await this.databaseService.refund.update({
//             where: { id },
//             data: { deletedAt: new Date(), deletedBy: updaterId },
//             include: { payment: true },
//         });
//         return this.mapToRefundDto(refund);
//     }

//     private mapToRefundDto(refund: any): RefundDto {
//         return {
//             ...refund,
//             refundAmount: Number(refund.refundAmount),
//             deductionPercentage: refund.deductionPercentage != null ? Number(refund.deductionPercentage) : undefined,
//             deductionAmount: refund.deductionAmount != null ? Number(refund.deductionAmount) : undefined,
//             status: refund.status as unknown as RefundStatus,
//             payment: refund.payment ? {
//                 ...refund.payment,
//                 amount: Number(refund.payment.amount),
//                 amountCharged: Number(refund.payment.amountCharged),
//                 paymentReason: refund.payment.paymentReason as unknown as PaymentReason,
//                 paymentAuthorization: refund.payment.paymentAuthorization as Record<string, any>,
//                 status: refund.payment.status as unknown as IPaymentStatus,
//             } : undefined,
//         };
//     }
}
